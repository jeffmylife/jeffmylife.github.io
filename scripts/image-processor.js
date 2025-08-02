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

function generateFileName(description) {
  // Generate filename from description or timestamp
  const cleanDescription = description
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50);
  
  return cleanDescription || `image-${Date.now()}`;
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
  console.log('🖼️  Image Processor for Blog');
  console.log('===========================');
  
  try {
    // Get input file path
    const rawImagePath = await question('📁 Enter the path to your image (PNG/JPG): ');
    const imagePath = resolvePath(rawImagePath);
    
    console.log(`🔍 Resolved path: ${imagePath}`);
    
    if (!fs.existsSync(imagePath)) {
      console.log('❌ File not found!');
      console.log(`   Tried: ${imagePath}`);
      process.exit(1);
    }
    
    // Get image description
    const description = await question('📝 Enter image description (for filename): ');
    
    // Get optional URL (for clickable images)
    const imageUrl = (await question('🔗 Enter URL to link to (optional, press Enter to skip): ')).trim();
    
    // Get article slug
    const articleSlug = await getArticleSlug();
    console.log(`📝 Article: ${articleSlug}`);
    
    // Generate filename
    const fileName = generateFileName(description);
    console.log(`📝 Generated filename: ${fileName}`);
    
    // Create article-specific directory
    const articleDir = path.join(process.cwd(), 'public', 'static', articleSlug);
    if (!fs.existsSync(articleDir)) {
      fs.mkdirSync(articleDir, { recursive: true });
      console.log(`📁 Created directory: ${articleDir}`);
    }
    
    // Convert to WebP
    const outputPath = path.join(articleDir, `${fileName}.webp`);
    const finalPath = convertToWebP(imagePath, outputPath);
    
    // Generate MDX code
    const relativePath = `/static/${articleSlug}/${path.basename(finalPath)}`;
    const mdxCode = imageUrl ? 
      `<div 
    data-img-src="${relativePath}" 
    data-img-alt="${description}" 
    data-img-url="${imageUrl}" 
    data-img-size="400" 
    data-img-caption="${description}"
    >
    Loading image...
</div>` :
      `<div 
    data-img-src="${relativePath}" 
    data-img-alt="${description}" 
    data-img-size="400"
    >
    Loading image...
</div>`;
    
    console.log('');
    console.log('✅ Processing complete!');
    console.log(`📂 Image saved: ${finalPath}`);
    console.log('');
    console.log('📝 Copy this code into your MDX file:');
    console.log('');
    console.log(mdxCode);
    console.log('');
    console.log('💡 Adjust data-img-size to change the image width (e.g., "200", "600")');
    
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