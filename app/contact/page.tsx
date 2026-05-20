'use client';

import { useEffect } from 'react';
import { usePageNavigate } from '@/app/components/PageTransition';

const EMAIL = 'song.r1@northeastern.edu';

export default function ContactPage() {
  const navigate = usePageNavigate();

  useEffect(() => {
    document.body.classList.add('ct-page');
    return () => document.body.classList.remove('ct-page');
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const name = (f.elements.namedItem('name') as HTMLInputElement).value;
    const subject = encodeURIComponent((f.elements.namedItem('subject') as HTMLInputElement).value);
    const body = encodeURIComponent(
      'From: ' + name + '\n\n' + (f.elements.namedItem('message') as HTMLTextAreaElement).value
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <div className="ct-container">
      {/* Nav */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', width: '100%', zIndex: 10 }}>
        <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="ct-logo" aria-label="Back to home">
          snow<sup style={{ fontSize: '0.45em', verticalAlign: 'super', marginLeft: '1px', fontWeight: 400 }}>®</sup>
        </a>
        <div style={{ display: 'flex', gap: '48px', alignItems: 'center' }}>
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="ct-navlink">Bio</a>
          <span className="ct-active">Contact</span>
        </div>
      </nav>

      {/* Main */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 20px 40px', position: 'relative' }}>
        <div className="ct-eyebrow">Get in touch</div>

        <h1 className="ct-headline">
          What&apos;s on your mind?
        </h1>

        <form className="ct-form" onSubmit={handleSubmit}>
          <div className="ct-field">
            <label htmlFor="name" className="ct-label">Name</label>
            <input type="text" id="name" name="name" placeholder="Your name" required className="ct-input" />
          </div>

          <div className="ct-field">
            <label htmlFor="subject" className="ct-label">Subject</label>
            <input type="text" id="subject" name="subject" placeholder="What is this about?" required className="ct-input" />
          </div>

          <div className="ct-field">
            <label htmlFor="message" className="ct-label">Message</label>
            <textarea id="message" name="message" placeholder="Tell me a story..." required className="ct-input ct-textarea" />
          </div>

          <div className="ct-submit-row">
            <button type="submit" className="ct-submit">Send message →</button>
            <span className="ct-submit-hint">Or reach out below</span>
          </div>
        </form>

        {/* Socials */}
        <div className="ct-socials-wrap">
          <div className="ct-socials-rule" />
          <div className="ct-socials">

            {/* Email */}
            <a href={`mailto:${EMAIL}`} className="ct-social" aria-label="Email">
              <svg className="ct-social-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="7" width="26" height="18" rx="1" />
                <path d="M3 9l13 9 13-9" />
              </svg>
              <span className="ct-social-label">Email</span>
            </a>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/ruisnowsong" target="_blank" rel="noopener" className="ct-social" aria-label="LinkedIn">
              <svg className="ct-social-icon" viewBox="0 0 32 32" fill="currentColor">
                <path d="M27 3H5a2 2 0 0 0-2 2v22a2 2 0 0 0 2 2h22a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM10.5 25H6.75V12.5h3.75V25zM8.625 10.875A2.187 2.187 0 1 1 8.626 6.5a2.187 2.187 0 0 1 0 4.375zM25.5 25h-3.75v-6.625c0-1.75-.625-2.625-1.875-2.625-1.375 0-2.125 1-2.125 2.625V25h-3.75V12.5h3.625v1.625C18.25 13 19.5 12.125 21.5 12.125c2.25 0 4 1.375 4 4.625V25z" />
              </svg>
              <span className="ct-social-label">LinkedIn</span>
            </a>

            {/* GitHub */}
            <a href="https://github.com/ruisnow-e" target="_blank" rel="noopener" className="ct-social" aria-label="GitHub">
              <svg className="ct-social-icon" viewBox="0 0 32 32" fill="currentColor">
                <path d="M16 2C8.27 2 2 8.27 2 16c0 6.18 4.01 11.42 9.57 13.27.7.13.96-.3.96-.67 0-.33-.01-1.2-.02-2.36-3.9.85-4.72-1.88-4.72-1.88-.64-1.62-1.56-2.05-1.56-2.05-1.27-.87.1-.85.1-.85 1.4.1 2.14 1.44 2.14 1.44 1.25 2.14 3.28 1.52 4.08 1.16.13-.9.49-1.52.89-1.87-3.11-.35-6.39-1.56-6.39-6.93 0-1.53.55-2.78 1.44-3.76-.14-.35-.62-1.78.14-3.7 0 0 1.18-.38 3.85 1.43 1.12-.31 2.32-.47 3.51-.47 1.19 0 2.39.16 3.51.47 2.67-1.81 3.85-1.43 3.85-1.43.76 1.92.28 3.35.14 3.7.9.98 1.44 2.23 1.44 3.76 0 5.38-3.28 6.57-6.41 6.91.5.43.95 1.29.95 2.6 0 1.88-.02 3.39-.02 3.85 0 .37.25.81.97.67C25.99 27.41 30 22.18 30 16c0-7.73-6.27-14-14-14z" />
              </svg>
              <span className="ct-social-label">GitHub</span>
            </a>

            {/* Instagram */}
            <a href="https://instagram.com/ruisnow" target="_blank" rel="noopener" className="ct-social" aria-label="Instagram">
              <svg className="ct-social-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4">
                <rect x="3.5" y="3.5" width="25" height="25" rx="6.5" />
                <circle cx="16" cy="16" r="5.5" />
                <circle cx="23" cy="9" r="1.25" fill="currentColor" stroke="none" />
              </svg>
              <span className="ct-social-label">Instagram</span>
            </a>

          </div>
        </div>
      </main>
    </div>
  );
}
