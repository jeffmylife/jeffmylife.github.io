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

## Tweet Image Workflow

This blog has a streamlined workflow for embedding tweet screenshots as clickable images:

### Quick Start

1. Take a screenshot of a tweet (PNG format)
2. Run `npm run tweet`
3. Follow the prompts to select your article and provide the tweet URL
4. Add `<div data-tweet-id="tweet-ID" class="tweet-placeholder">Loading tweet...</div>` to your MDX

### How It Works

1. **Screenshot Processing**: The `npm run tweet` script:
   - Converts PNG screenshots to WebP format (smaller file size)
   - Stores images in `public/static/{article}/tweet-{id}.webp`
   - Saves metadata in `public/static/metadata.json` with tweet URLs
   - Organizes by article to keep things tidy

2. **Rendering Process**:
   - MDX files contain placeholder divs with `data-tweet-id` attributes
   - `react-markdown` processes the MDX and renders the HTML
   - Custom div component in `src/app/blog/[slug]/page.tsx` detects tweet placeholders
   - Replaces placeholders with `TweetImage` React components
   - `TweetImage` component loads the WebP image and makes it clickable to the original tweet

3. **File Structure**:

   ```text
   public/static/
   ├── metadata.json           # Central registry of all tweet data
   ├── vibe-coding/           # Article-specific images
   │   └── tweet-123.webp
   └── other-article/
       └── tweet-456.webp
   ```

### Example Usage

```html
<!-- In your MDX file -->
<div data-tweet-id="tweet-1886192184808149383" class="tweet-placeholder">Loading tweet...</div>
```

This creates a clickable image that opens the original tweet in a new tab.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
