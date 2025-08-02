#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const readline = require('readline');
const { execSync } = require('child_process');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

function resolvePath(inputPath) {
  // Remove quotes if present
  let cleanPath = inputPath.replace(/^["']|["']$/g, '');
  
  // Remove escape characters (backslashes before spaces and special chars)
  cleanPath = cleanPath.replace(/\\(.)/g, '$1');
  
  // Handle tilde expansion
  if (cleanPath.startsWith('~/')) {
    cleanPath = path.join(os.homedir(), cleanPath.slice(2));
  }
  
  // Resolve relative paths
  cleanPath = path.resolve(cleanPath);
  
  return cleanPath;
}

function generateFileName(url) {
  // Extract meaningful parts from the URL to create a filename
  const urlParts = url.match(/\/status\/(\d+)/);
  const statusId = urlParts ? urlParts[1] : Date.now().toString();
  return `tweet-${statusId}`;
}

function convertToWebP(inputPath, outputPath) {
  try {
    // Check if ImageMagick is available
    execSync('which convert', { stdio: 'ignore' });
    execSync(`convert "${inputPath}" "${outputPath}"`, { stdio: 'inherit' });
    console.log(`✅ Converted to WebP using ImageMagick: ${outputPath}`);
  } catch (error) {
    try {
      // Fallback to cwebp if available
      execSync('which cwebp', { stdio: 'ignore' });
      execSync(`cwebp "${inputPath}" -o "${outputPath}"`, { stdio: 'inherit' });
      console.log(`✅ Converted to WebP using cwebp: ${outputPath}`);
    } catch (fallbackError) {
      // If neither is available, just copy the file as PNG
      const pngOutput = outputPath.replace('.webp', '.png');
      fs.copyFileSync(inputPath, pngOutput);
      console.log(`⚠️  WebP conversion tools not found. Copied as PNG: ${pngOutput}`);
      console.log('Install ImageMagick (brew install imagemagick) or libwebp (brew install webp) for WebP conversion');
      return pngOutput;
    }
  }
  return outputPath;
}

function saveMetadata(fileName, url, article, outputDir) {
  const metadataPath = path.join(path.dirname(outputDir), 'metadata.json');
  let metadata = {};
  
  // Load existing metadata if it exists
  if (fs.existsSync(metadataPath)) {
    try {
      metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    } catch (error) {
      console.log('⚠️  Could not read existing metadata, creating new file');
    }
  }
  
  // Add new entry
  metadata[fileName] = {
    url: url,
    article: article,
    createdAt: new Date().toISOString(),
    fileName: fileName
  };
  
  // Save metadata
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
  console.log(`💾 Saved metadata for ${fileName} in article: ${article}`);
}

function getAvailableArticles() {
  const postsDir = path.join(process.cwd(), 'posts');
  if (!fs.existsSync(postsDir)) {
    return [];
  }
  
  return fs.readdirSync(postsDir)
    .filter(file => file.endsWith('.mdx'))
    .map(file => file.replace('.mdx', ''))
    .sort();
}

async function getArticleSlug() {
  const articles = getAvailableArticles();
  
  if (articles.length === 0) {
    console.log('⚠️  No articles found in posts/ directory');
    return await question('📝 Enter article slug: ');
  }
  
  console.log('📚 Available articles:');
  articles.forEach((article, index) => {
    console.log(`  ${index + 1}. ${article}`);
  });
  
  const choice = await question('📝 Enter article number or slug: ');
  
  // Check if it's a number
  const choiceNum = parseInt(choice);
  if (!isNaN(choiceNum) && choiceNum >= 1 && choiceNum <= articles.length) {
    return articles[choiceNum - 1];
  }
  
  // Check if it's a valid slug
  if (articles.includes(choice)) {
    return choice;
  }
  
  // Allow new articles
  console.log(`ℹ️  "${choice}" is not an existing article, creating new one`);
  return choice;
}

async function main() {
  console.log('🐦 Tweet Screenshot Processor');
  console.log('==============================');
  
  try {
    // Get input file path
    const rawScreenshotPath = await question('📁 Enter the path to your PNG screenshot: ');
    const screenshotPath = resolvePath(rawScreenshotPath);
    
    console.log(`🔍 Resolved path: ${screenshotPath}`);
    
    if (!fs.existsSync(screenshotPath)) {
      console.log('❌ File not found!');
      console.log(`   Tried: ${screenshotPath}`);
      process.exit(1);
    }
    
    // Get tweet URL
    const tweetUrl = (await question('🔗 Enter the tweet URL: ')).trim();
    
    if (!tweetUrl.includes('twitter.com') && !tweetUrl.includes('x.com')) {
      console.log('⚠️  Warning: URL doesn\'t look like a Twitter/X URL');
    }
    
    // Get article slug
    const articleSlug = await getArticleSlug();
    console.log(`📝 Article: ${articleSlug}`);
    
    // Generate filename
    const fileName = generateFileName(tweetUrl);
    console.log(`📝 Generated filename: ${fileName}`);
    
    // Create article-specific directory
    const articleDir = path.join(process.cwd(), 'public', 'static', articleSlug);
    if (!fs.existsSync(articleDir)) {
      fs.mkdirSync(articleDir, { recursive: true });
      console.log(`📁 Created directory: ${articleDir}`);
    }
    
    // Convert to WebP
    const outputPath = path.join(articleDir, `${fileName}.webp`);
    const finalPath = convertToWebP(screenshotPath, outputPath);
    
    // Save metadata
    saveMetadata(fileName, tweetUrl, articleSlug, articleDir);
    
    console.log('');
    console.log('✅ Processing complete!');
    console.log(`📂 Files created in: ${articleDir}`);
    console.log(`🖼️  Image: ${path.basename(finalPath)}`);
    console.log(`📊 Metadata: public/static/metadata.json`);
    console.log('');
    console.log('📝 Usage in your MDX file:');
    console.log(`   <TweetImage id="${fileName}" />`);
    console.log('');
    console.log('💡 Import the component at the top of your MDX:');
    console.log('   import { TweetImage } from "../../src/components/TweetImage";');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Run the script
if (require.main === module) {
  main();
}