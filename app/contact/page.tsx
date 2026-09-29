'use client';

import { useEffect, useState } from 'react';
import SiteNav from '@/app/components/SiteNav';

const EMAIL = 'ruisong.studio@gmail.com';
// Web3Forms delivers the form to EMAIL. The access key is public by design (it can only send to the
// address it was issued for); set it in .env.local and in Vercel → Settings → Environment Variables.
const FORM_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactPage() {
  useEffect(() => {
    document.body.classList.add('ct-page');
    return () => document.body.classList.remove('ct-page');
  }, []);

  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const val = (n: string) => (f.elements.namedItem(n) as HTMLInputElement | HTMLTextAreaElement).value.trim();
    const name = val('name'), email = val('email'), subject = val('subject'), message = val('message');

    if (!FORM_KEY) { setStatus('error'); return; }
    setStatus('sending');
    try {
      // Plain FormData (no JSON Content-Type) so the browser skips the CORS preflight, which Web3Forms rejects
      const body = new FormData();
      body.append('access_key', FORM_KEY);
      body.append('subject', `[snow®] ${subject}`);
      body.append('from_name', name);
      body.append('name', name);
      body.append('email', email);
      body.append('message', message);
      body.append('replyto', email);           // "Reply" in your inbox goes straight to the visitor
      if ((f.elements.namedItem('botcheck') as HTMLInputElement).checked) body.append('botcheck', 'on');
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) { setStatus('sent'); f.reset(); }
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="ct-container">
      <SiteNav active="contact" />

      {/* Main */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px clamp(20px, 4vw, 56px) 40px', position: 'relative' }}>
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
            <label htmlFor="email" className="ct-label">Email</label>
            <input type="email" id="email" name="email" placeholder="So I can write back" required autoComplete="email" className="ct-input" />
          </div>

          <div className="ct-field">
            <label htmlFor="subject" className="ct-label">Subject</label>
            <input type="text" id="subject" name="subject" placeholder="What is this about?" required className="ct-input" />
          </div>

          <div className="ct-field">
            <label htmlFor="message" className="ct-label">Message</label>
            <textarea id="message" name="message" placeholder="Tell me a story..." required className="ct-input ct-textarea" />
          </div>

          {/* spam trap — hidden from people, bots tick it */}
          <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: 'none' }} />

          <div className="ct-submit-row">
            <button type="submit" className="ct-submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send message →'}
            </button>
            <span className="ct-submit-hint" role="status" aria-live="polite">
              {status === 'sent'  && <span className="ct-status-ok">Thank you — your message is on its way.</span>}
              {status === 'error' && <>Couldn&apos;t send. Please email <a href={`mailto:${EMAIL}`} className="ct-status-link">{EMAIL}</a></>}
              {(status === 'idle' || status === 'sending') && 'Or reach out below'}
            </span>
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
            <a href="https://www.linkedin.com/in/ruisong09/" target="_blank" rel="noopener" className="ct-social" aria-label="LinkedIn">
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
            <a href="https://www.instagram.com/eudemoniaruis/" target="_blank" rel="noopener" className="ct-social" aria-label="Instagram">
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
