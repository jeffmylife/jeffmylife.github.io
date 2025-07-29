'use client';

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  children: string;
}

export default function MermaidDiagram({ children }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      // Get computed theme colors
      const isDark = document.documentElement.classList.contains('dark');
      const gruvboxColors = isDark ? {
        background: '#282828',
        foreground: '#ebdbb2',
        surface: '#3c3836',
        surfaceVariant: '#504945',
        accentBlue: '#83a598',
        accentGreen: '#b8bb26',
        accentOrange: '#fe8019',
        accentRed: '#fb4934',
        accentPurple: '#d3869b',
        accentPrimary: '#fabd2f',
        border: '#504945',
      } : {
        background: '#fbf1c7',
        foreground: '#3c3836',
        surface: '#f2e5bc',
        surfaceVariant: '#ebdbb2',
        accentBlue: '#458588',
        accentGreen: '#98971a',
        accentOrange: '#d65d0e',
        accentRed: '#cc241d',
        accentPurple: '#b16286',
        accentPrimary: '#d79921',
        border: '#d5c4a1',
      };

      // Initialize Mermaid with Gruvbox theme using actual hex colors
      mermaid.initialize({
        theme: 'base',
        themeVariables: {
          // Gruvbox color scheme with hex values
          background: gruvboxColors.surface,
          primaryColor: gruvboxColors.accentBlue,
          primaryTextColor: gruvboxColors.foreground,
          primaryBorderColor: gruvboxColors.accentBlue,
          lineColor: gruvboxColors.accentBlue,
          textColor: gruvboxColors.foreground,
          mainBkg: gruvboxColors.surfaceVariant,
          secondBkg: gruvboxColors.surface,
          tertiaryColor: gruvboxColors.accentOrange,
          
          // Flowchart specific
          nodeBorder: gruvboxColors.border,
          clusterBkg: gruvboxColors.surfaceVariant,
          clusterBorder: gruvboxColors.border,
          
          // Additional colors for variety
          pie1: gruvboxColors.accentBlue,
          pie2: gruvboxColors.accentGreen,
          pie3: gruvboxColors.accentOrange,
          pie4: gruvboxColors.accentRed,
          pie5: gruvboxColors.accentPurple,
          
          // Git diagram colors
          git0: gruvboxColors.accentBlue,
          git1: gruvboxColors.accentGreen,
          git2: gruvboxColors.accentOrange,
          git3: gruvboxColors.accentRed,
          git4: gruvboxColors.accentPurple,
          
          // Sequence diagram
          actorBkg: gruvboxColors.surfaceVariant,
          actorBorder: gruvboxColors.border,
          actorTextColor: gruvboxColors.foreground,
          actorLineColor: gruvboxColors.accentBlue,
          signalColor: gruvboxColors.foreground,
          signalTextColor: gruvboxColors.foreground,
        },
        flowchart: {
          useMaxWidth: true,
          htmlLabels: true,
        },
        sequence: {
          useMaxWidth: true,
        },
        gantt: {
          useMaxWidth: true,
        },
        // Enable responsive behavior
        maxWidth: 1200,
        responsive: true,
      });
      setIsInitialized(true);
    }
  }, [isInitialized]);

  useEffect(() => {
    if (isInitialized && ref.current) {
      const renderDiagram = async () => {
        try {
          // Generate unique ID for this diagram
          const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
          
          // Clear previous content
          if (ref.current) {
            ref.current.innerHTML = '';
          }
          
          // Render the diagram
          const { svg } = await mermaid.render(id, children.trim());
          
          if (ref.current) {
            ref.current.innerHTML = svg;
            
            // Apply responsive styling to the SVG
            const svgElement = ref.current.querySelector('svg');
            if (svgElement) {
              svgElement.style.width = '100%';
              svgElement.style.maxWidth = '100%';
              svgElement.style.height = 'auto';
              svgElement.style.display = 'block';
              // Ensure minimum size for readability
              svgElement.style.minHeight = '200px';
            }
          }
        } catch (error) {
          console.error('Mermaid rendering error:', error);
          if (ref.current) {
            ref.current.innerHTML = `
              <div style="
                color: var(--accent-red);
                background: var(--surface);
                border: 1px solid var(--border);
                border-radius: 0.5rem;
                padding: 1rem;
                font-family: monospace;
              ">
                <strong>Mermaid Error:</strong><br/>
                <pre style="margin: 0.5rem 0;">${children}</pre>
                <small>${error}</small>
              </div>
            `;
          }
        }
      };

      renderDiagram();
    }
  }, [isInitialized, children]);

  return (
    <div className="my-8 w-full">
      <div 
        ref={ref} 
        className="mermaid-container w-full flex justify-center"
        style={{ minHeight: '200px' }}
      />
    </div>
  );
}