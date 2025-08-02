# Jeff's Blog

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Image Workflow

This blog has a streamlined workflow for embedding images with SEO optimization:

### Quick Start

1. Take any screenshot or image (PNG/JPG format)
2. Run `npm run img`
3. Follow the prompts to describe the image, add optional URL, and select your article
4. Paste the generated code into your MDX file

### How It Works

1. **Image Processing**: The `npm run img` script:
   - Converts images to WebP format (smaller file size)
   - Stores images in `public/static/{article}/image-name.webp`
   - Organizes by article to keep things tidy
   - Generates ready-to-use MDX code

2. **Rendering Process**:
   - MDX files contain placeholder divs with image data attributes
   - `react-markdown` processes the MDX and renders the HTML
   - Custom div component detects image placeholders
   - Replaces placeholders with optimized `Img` React components
   - Component uses Next.js Image optimization with lazy loading

3. **File Structure**:

   ```text
   public/static/
   ├── vibe-coding/           # Article-specific images
   │   ├── tweet-screenshot.webp
   │   └── diagram-example.webp
   └── other-article/
       └── chart-data.webp
   ```

### Example Usage

```html
<!-- In your MDX file -->
<div 
    data-img-src="/static/article/image.webp" 
    data-img-alt="Image description" 
    data-img-url="https://optional-link.com" 
    data-img-size="400" 
    data-img-caption="Optional caption"
    >
    Loading image...
</div>
```

### Features

- ✅ **SEO Optimized** - Proper alt text, lazy loading, responsive images
- ✅ **WebP Conversion** - Smaller file sizes, faster loading
- ✅ **Dynamic Sizing** - Change `data-img-size` to resize images
- ✅ **Optional Linking** - Images can link to external URLs
- ✅ **Captions** - Semantic figure/figcaption elements
- ✅ **Article Organization** - Images stored per article

## Development Workflow

This project uses pre-commit hooks to ensure code quality:

### Pre-commit Hooks

- **Linting**: ESLint runs on staged TypeScript/JavaScript files
- **Type Checking**: TypeScript compiler validates types
- **Commit Message Validation**: Ensures conventional commit format

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint + TypeScript checking
npm run type-check   # TypeScript type checking only
npm run img          # Process images for blog posts
```

### Commit Message Format

Follow the conventional commit format:
```
type(scope): description

Examples:
feat(blog): add new post about TypeScript
fix(ci): resolve build error in deployment
docs(readme): update installation instructions
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
