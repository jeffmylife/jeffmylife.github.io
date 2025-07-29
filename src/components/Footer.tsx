import { FaXTwitter, FaLinkedin } from 'react-icons/fa6';
import { SiGooglescholar } from 'react-icons/si';

export default function Footer() {
  return (
    <footer className="mt-16 py-8 border-t" style={{borderColor: 'var(--border)'}}>
      <div className="max-w-4xl mx-auto px-8">
        <div className="flex justify-center items-center gap-6">
          <a
            href="https://x.com/jeffreylemoine"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
            style={{color: 'var(--text-muted)'}}
          >
            <FaXTwitter size={20} />
          </a>
          
          <a
            href="https://www.linkedin.com/in/jeffreylemoine/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
            style={{color: 'var(--text-muted)'}}
          >
            <FaLinkedin size={20} />
          </a>
          
          <a
            href="https://scholar.google.com/citations?user=_BQzeWkAAAAJ&hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
            style={{color: 'var(--text-muted)'}}
          >
            <SiGooglescholar size={20} />
          </a>
        </div>
        
        <div className="text-center mt-4 text-xs" style={{color: 'var(--text-muted)'}}>
          © 2025 Jeffrey Lemoine
        </div>
      </div>
    </footer>
  );
}