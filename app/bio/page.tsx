'use client';

import { useEffect } from 'react';
import { usePageNavigate } from '@/app/components/PageTransition';

export default function BioPage() {
  const navigate = usePageNavigate();

  useEffect(() => {
    document.body.classList.add('bp-page');
    return () => document.body.classList.remove('bp-page');
  }, []);

  return (
    <div className="bp-wrap">

      {/* Nav */}
      <nav className="bp-nav">
        <a className="bp-nav-logo" href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
          snow<sup>®</sup>
        </a>
        <div className="bp-nav-links">
          <span className="bp-nav-active">Bio</span>
          <a href="/award" onClick={(e) => { e.preventDefault(); navigate('/award'); }}>Award</a>
          <a href="/contact" onClick={(e) => { e.preventDefault(); navigate('/contact'); }}>Contact ↗</a>
        </div>
      </nav>

      <main className="bp-main">
        <div className="bp-layout">

          {/* Left: name + bio */}
          <div className="bp-left">
            <h1 className="bp-hero-name">
              <span className="bp-hero-rui">Rui</span>
              {' '}
              <span className="bp-hero-snow">Snow</span>
              {' '}
              <span className="bp-hero-song">Song</span>
            </h1>
            <div className="bp-hero-roles">Engineer &nbsp;·&nbsp; Filmmaker &nbsp;·&nbsp; Choreographer</div>

            <div className="bp-col-text">
              <p>
                Hi, I&rsquo;m Rui Song — most people call me Snow. The name comes from a Chinese saying, 瑞雪兆丰年 (ruì xuě zhào fēng nián) — &ldquo;an auspicious snow promises a year of plenty.&rdquo; 瑞 means auspicious; 雪 means snow — the kind that arrives quietly and signals that something better is on the way. That&rsquo;s where snow® comes from.
              </p>
              <p>
                I&rsquo;m an engineer in the making, a filmmaker by training, and a choreographer at the
                core. Each one taught me a different way of paying attention.
              </p>
              <p>
                CS is teaching me systems — how invisible structures hold up what we see. Film taught me
                emotion — how a frame held a beat too long stays with someone for years. Choreography taught
                me rhythm, and how a pause changes everything that comes after it.
              </p>
              <p>
                I want to build tools that work <em>with</em> creators rather than in their place — tools that stay attentive to what
                someone is actually trying to make.
              </p>
              <p>
                That direction comes from somewhere. My MFA thesis film{' '}
                <a className="bp-inline-link" href="/work/film" onClick={(e) => { e.preventDefault(); navigate('/work/film'); }}><em>HEIRLOOM</em></a> was the work where I realized storytelling isn&rsquo;t bound to a
                medium. It just needs a container that can carry what matters. A film, sometimes.
                Code, eventually.
              </p>
              <p>
                I don&rsquo;t think of code, film, and choreography as separate disciplines. They&rsquo;re
                different ways of working toward the same thing: taking something invisible — memory,
                rhythm, emotion, connection — and giving it a form someone else can experience.
              </p>
              <p className="bp-closing">
                After years moving between rehearsal floors, film sets, and terminals, the through-line
                feels less like a transition and more like a practice.
              </p>
            </div>
          </div>

          {/* Right: photo + metadata */}
          <div className="bp-right">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/bio.jpg" alt="Rui Song" className="bp-photo" />
            <div className="bp-photo-caption">Photographed in Palo Alto, 2026</div>
            <div className="bp-col-label">
              <div className="bp-sidebar-block">
                <div className="bp-sidebar-key">BASED</div>
                <div className="bp-sidebar-val">San Jose, CA</div>
              </div>
              <div className="bp-sidebar-block">
                <div className="bp-sidebar-key">STUDY</div>
                <div className="bp-sidebar-val">MS · Computer Science<br />Northeastern · 2027</div>
              </div>
              <div className="bp-sidebar-block">
                <div className="bp-sidebar-key">PRIOR</div>
                <div className="bp-sidebar-val">MFA · Film Production<br />CCA · 2024</div>
              </div>
              <div className="bp-sidebar-block">
                <div className="bp-sidebar-key">TOWARD</div>
                <div className="bp-sidebar-val">AI Creative ML Engineer</div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <footer className="bp-footer">
        <span>Rui Song · snow®</span>
        <span>ruisong.studio@gmail.com</span>
      </footer>

    </div>
  );
}
