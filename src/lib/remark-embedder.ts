import fauxRemarkEmbedder from '@remark-embedder/core';
import fauxOembedTransformer from '@remark-embedder/transformer-oembed';
import type { Pluggable } from 'unified';

// Configure the embedder with oEmbed transformer
export const remarkEmbedderPlugin: Pluggable = [
  fauxRemarkEmbedder,
  {
    transformers: [fauxOembedTransformer],
    // Configure which services to support and styling
    handleHTML: (html: string) => {
      // Check if this is a Twitter/X embed
      if (html.includes('twitter-tweet') || html.includes('x.com') || html.includes('twitter.com')) {
        // Modify the blockquote to include data-theme attribute for dark mode
        const modifiedHtml = html.replace(
          /<blockquote([^>]*)class="twitter-tweet"([^>]*)>/,
          '<blockquote$1class="twitter-tweet"$2 data-theme="dark" data-width="550" data-dnt="true" data-conversation="none">'
        );
        
        return `<div class="tweet-embed-wrapper my-6 mx-auto max-w-full">
          ${modifiedHtml}
          <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
        </div>`;
      }
      
      // Default wrapper for other embeds
      return `<div class="embed-responsive my-6 mx-auto max-w-full">${html}</div>`;
    }
  }
];