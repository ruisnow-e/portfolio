'use client';

import { Film, ContentBlock } from '@/app/data/films';
import { useEffect, useRef, useState } from 'react';

interface FilmModalProps {
  film: Film | null;
  filmIdx: number;
  total: number;
  onClose: () => void;
}

function pad2(n: number) { return n < 10 ? '0' + n : '' + n; }

function renderBlock(block: ContentBlock, i: number, f: Film) {
  switch (block.type) {
    case 'download-link':
      return (
        <a key={i} href={block.href} target="_blank" rel="noopener noreferrer" className="fp-dl-link">
          <span className="fp-dl-label">{block.label}</span>
          <span className="fp-dl-arrow">↓</span>
        </a>
      );
    case 'video':
      return (
        <div key={i} className="fp-video" style={{ marginTop: 24 }}>
          {f.videoUrl ? (
            f.videoUrl.startsWith('/') ? (
              <video src={f.videoUrl} controls style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#000' }} />
            ) : (
              <iframe src={f.videoUrl} allow="autoplay; fullscreen" allowFullScreen />
            )
          ) : (
            <div style={{
              width: '100%', height: '100%',
              backgroundImage: `url('${f.cover}')`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: 0.35,
            }} />
          )}
          <div className="fp-video-tc">00:00 / {f.runtime}</div>
          <div className="fp-video-fmt">{f.format.toUpperCase()}</div>
        </div>
      );
    case 'text':
      return (
        <p key={i} className="fp-syn fp-block-text">{block.text}</p>
      );
    case 'section':
      return (
        <div key={i} className="fp-block-section">
          <div className="fp-stills-h">{block.heading}</div>
          <p className="fp-syn fp-block-text">{block.text}</p>
        </div>
      );
    case 'still':
      return (
        <div key={i} className="fp-block-still-single" style={block.gap === 'large' ? { marginTop: 120 } : undefined}>
          <div className="fp-block-still-img" style={{ backgroundImage: `url('${block.src}')` }} />
        </div>
      );
    case 'still-pair': {
      const pairMargin = block.gap === 'large' ? 80 : block.spacing === 'compact' ? 10 : undefined;
      const imgAspect = block.aspectRatio ?? '3/2';
      return (
        <div key={i} className="fp-block-still-pair" style={pairMargin !== undefined ? { marginTop: pairMargin } : undefined}>
          <div className="fp-block-still-img" style={{ backgroundImage: `url('${block.srcs[0]}')`, aspectRatio: imgAspect, backgroundPosition: block.positions?.[0] ?? 'center' }} />
          <div className="fp-block-still-img" style={{ backgroundImage: `url('${block.srcs[1]}')`, aspectRatio: imgAspect, backgroundPosition: block.positions?.[1] ?? 'center' }} />
        </div>
      );
    }
    case 'still-triple':
      return (
        <div key={i} className="fp-block-still-triple">
          <div className="fp-block-still-img" style={{ backgroundImage: `url('${block.srcs[0]}')` }} />
          <div className="fp-block-still-img" style={{ backgroundImage: `url('${block.srcs[1]}')` }} />
          <div className="fp-block-still-img" style={{ backgroundImage: `url('${block.srcs[2]}')` }} />
        </div>
      );
    case 'image':
      return (
        <div key={i} className="fp-block-image" style={block.size === 'small' ? { display: 'flex', justifyContent: 'center' } : undefined}>
          <img src={block.src} alt="" style={{ width: block.size === 'small' ? '55%' : '100%', display: 'block', borderRadius: 2 }} />
        </div>
      );
    case 'press-quote':
      return (
        <div key={i} className={`fp-press-quote${block.url ? ' fp-press-quote--link' : ''}`}
          onClick={() => block.url && window.open(block.url, '_blank', 'noopener')}>
          <div className="fp-pq-text">&ldquo;{block.quote}&rdquo;</div>
          <div className="fp-pq-attr">{block.attribution}</div>
          {block.url && <div className="fp-pq-hint">{block.hint ?? 'READ ARTICLE ↗'}</div>}
        </div>
      );
    case 'bts-grid': {
      const srcs = block.srcs;
      const pos = block.positions ?? [];
      return (
        <div key={i} className="fp-bts-section">
          <div className="fp-stills-h" style={{ marginTop: 48 }}>BEHIND THE LENS</div>
          <div className="fp-bts-grid">
            <div className="fp-bts-hero" style={{ backgroundImage: `url('${srcs[0]}')`, backgroundPosition: pos[0] ?? 'center' }} />
            <div className="fp-bts-row">
              <div className="fp-bts-cell" style={{ backgroundImage: `url('${srcs[1]}')`, backgroundPosition: pos[1] ?? 'center' }} />
              <div className="fp-bts-cell" style={{ backgroundImage: `url('${srcs[2]}')`, backgroundPosition: pos[2] ?? 'center' }} />
            </div>
            <div className="fp-bts-wide" style={{ backgroundImage: `url('${srcs[3]}')`, backgroundPosition: pos[3] ?? 'center' }} />
            <div className="fp-bts-row">
              <div className="fp-bts-cell" style={{ backgroundImage: `url('${srcs[4]}')`, backgroundPosition: pos[4] ?? 'center' }} />
              <div className="fp-bts-cell" style={{ backgroundImage: `url('${srcs[5]}')`, backgroundPosition: pos[5] ?? 'center' }} />
            </div>
          </div>
        </div>
      );
    }
    case 'awards': {
      if (!f.awards || f.awards.length === 0) return null;
      const t1 = f.awards.filter(a => a.text.startsWith('Official Selection'));
      const t2 = f.awards.filter(a => a.text.startsWith('Award Winner'));
      const t3 = f.awards.filter(a => !a.text.startsWith('Official Selection') && !a.text.startsWith('Award Winner'));
      return (
        <div key={i}>
          <div className="fp-stills-h" style={{ marginTop: 32 }}>AWARDS & RECOGNITION · {pad2(f.awards.length)}</div>

          {t1.length > 0 && (
            <div className="fp-tier-section">
              <div className="fp-tier-head"><span>OFFICIAL SELECTION</span><span>{pad2(t1.length)}</span></div>
              {t1.map((a, j) => (
                <div key={j} className={`fp-tier-row${a.url ? ' fp-tier-row--link' : ''}`}
                  onClick={() => a.url && window.open(a.url, '_blank', 'noopener')}>
                  <span className="fp-tier-text">{a.text.replace(/^Official Selection · /, '')}</span>
                  {a.url && <span className="fp-tier-arrow">↗</span>}
                </div>
              ))}
            </div>
          )}

          {t2.length > 0 && (
            <div className="fp-tier-section">
              <div className="fp-tier-head"><span>AWARD WINNER</span><span>{pad2(t2.length)}</span></div>
              {t2.map((a, j) => {
                const rest = a.text.replace(/^Award Winner · /, '');
                const dash = rest.indexOf(' — ');
                const award = dash !== -1 ? rest.slice(0, dash) : rest;
                const fest  = dash !== -1 ? rest.slice(dash + 3) : '';
                return (
                  <div key={j} className={`fp-tier-row${a.url ? ' fp-tier-row--link' : ''}`}
                    onClick={() => a.url && window.open(a.url, '_blank', 'noopener')}>
                    <span className="fp-tier-award">{award}</span>
                    {fest && <><span className="fp-tier-sep">·</span><span className="fp-tier-fest">{fest}</span></>}
                    {a.url && <span className="fp-tier-arrow">↗</span>}
                  </div>
                );
              })}
            </div>
          )}

          {t3.length > 0 && (
            <div className="fp-tier-section">
              <div className="fp-tier-head"><span>SEMI-FINALIST · HONORABLE MENTION</span><span>{pad2(t3.length)}</span></div>
              {t3.map((a, j) => {
                const text = a.text.replace(/^(Semi-Finalist|Honorable Mention) · /, '');
                return (
                  <div key={j} className={`fp-tier-row fp-tier-row--sm${a.url ? ' fp-tier-row--link' : ''}`}
                    onClick={() => a.url && window.open(a.url, '_blank', 'noopener')}>
                    <span className="fp-tier-text">{text}</span>
                    {a.url && <span className="fp-tier-arrow">↗</span>}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
    }
    case 'screenings':
      return f.screenings && f.screenings.length > 0 ? (
        <div key={i}>
          <div className="fp-stills-h" style={{ marginTop: 24 }}>SCREENINGS</div>
          <div className="fp-award-list">
            {f.screenings.map((s, j) => <div key={j} className="fp-award-item">{s}</div>)}
          </div>
        </div>
      ) : null;
    default:
      return null;
  }
}

export default function FilmModal({ film, filmIdx, total, onClose }: FilmModalProps) {
  const [irisState, setIrisState]   = useState<'idle' | 'opening' | 'closing'>('idle');
  const [modalVisible, setModalVisible] = useState(false);
  // keep last film in DOM during closing so content doesn't vanish mid-animation
  const lastFilm = useRef<Film | null>(null);
  if (film) lastFilm.current = film;

  useEffect(() => {
    if (film) {
      setIrisState('opening');
      const t = setTimeout(() => setModalVisible(true), 180);
      return () => clearTimeout(t);
    } else {
      setModalVisible(false);
      setIrisState('closing');
      const t = setTimeout(() => setIrisState('idle'), 320);
      return () => clearTimeout(t);
    }
  }, [film]);

  useEffect(() => {
    if (!modalVisible) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [modalVisible, onClose]);

  if (irisState === 'idle' && !modalVisible) return null;

  const f = lastFilm.current;

  return (
    <>
      {/* Iris */}
      <div
        className={`fp-iris${irisState === 'opening' ? ' fp-opening' : irisState === 'closing' ? ' fp-closing' : ''}`}
      />

      {/* Backdrop + modal */}
      {modalVisible && f && (
        <div
          className="fp-modal-wrap fp-visible"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <div className="fp-modal">

            <div className="fp-modal-head">
              <span>{f.title.toUpperCase()} — README</span>
              <span className="fp-close" role="button" tabIndex={0} onClick={onClose}
                onKeyDown={(e) => e.key === 'Enter' && onClose()}>×</span>
            </div>

            <div className="fp-modal-body">
              <div className="fp-label">FILM {pad2(filmIdx + 1)} / {pad2(total)} · {f.year}</div>
              <div className="fp-title">{f.title}</div>
              <div className="fp-tagline">{f.tagline}</div>
              {f.pressKitUrl && (
                <div className="fp-pk-wrap">
                  <a href={f.pressKitUrl} target="_blank" rel="noopener noreferrer" className="fp-dl-link">
                    <span className="fp-dl-label">PRESS KIT</span>
                    <span className="fp-dl-arrow">↓</span>
                  </a>
                </div>
              )}

              <div className="fp-meta">
                <div className="fp-meta-role"><span className="fp-k">ROLE</span><span className="fp-v">{f.services}</span></div>
                <div><span className="fp-k">GENRE</span><span className="fp-v">{f.genre}</span></div>
                <div><span className="fp-k">RUNTIME</span><span className="fp-v">{f.runtime}</span></div>
                <div><span className="fp-k">FORMAT</span><span className="fp-v">{f.format}</span></div>
              </div>

              {f.contentBlocks ? (
                <>
                  {f.contentBlocks.map((block, i) => renderBlock(block, i, f))}
                  <div className="fp-foot-modal">
                    <span>{f.location}</span>
                    <span><kbd>esc</kbd> to close</span>
                  </div>
                </>
              ) : (
                <>
                  <p className="fp-syn">{f.synopsis}</p>

                  {f.awards && f.awards.length > 0 && (
                    <>
                      <div className="fp-stills-h" style={{ marginTop: 20 }}>AWARDS & RECOGNITION · {pad2(f.awards.length)}</div>
                      <div className="fp-award-list">
                        {f.awards.map((a, i) => (
                          <div key={i}
                            className={`fp-award-item${a.url ? ' fp-award-item--link' : ''}`}
                            onClick={() => a.url && window.open(a.url, '_blank', 'noopener')}
                          >{a.text}{a.url && <span className="fp-award-link-hint"> ↗</span>}</div>
                        ))}
                      </div>
                    </>
                  )}

                  {f.screenings && f.screenings.length > 0 && (
                    <>
                      <div className="fp-stills-h" style={{ marginTop: 16 }}>SCREENINGS</div>
                      <div className="fp-award-list">
                        {f.screenings.map((s, i) => <div key={i} className="fp-award-item">{s}</div>)}
                      </div>
                    </>
                  )}

                  {f.directorStatement && (
                    <>
                      <div className="fp-stills-h" style={{ marginTop: 20 }}>DIRECTOR&apos;S STATEMENT</div>
                      {f.directorStatement.split('\n\n').map((para, i) => (
                        <p key={i} className="fp-syn" style={{ marginTop: i === 0 ? 8 : 12, paddingTop: 0, borderTop: 'none' }}>{para}</p>
                      ))}
                    </>
                  )}

                  <div className="fp-video">
                    {f.videoUrl ? (
                      f.videoUrl.startsWith('/') ? (
                        <video src={f.videoUrl} controls style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#000' }} />
                      ) : (
                        <iframe src={f.videoUrl} allow="autoplay; fullscreen" allowFullScreen />
                      )
                    ) : (
                      <div style={{
                        width: '100%', height: '100%',
                        backgroundImage: `url('${f.cover}')`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        opacity: 0.35,
                      }} />
                    )}
                    <div className="fp-video-tc">00:00 / {f.runtime}</div>
                    <div className="fp-video-fmt">{f.format.toUpperCase()}</div>
                  </div>

                  {f.stills.length > 0 && (
                    <>
                      <div className="fp-stills-h">STILLS · {pad2(f.stills.length)}</div>
                      <div className="fp-stills">
                        {f.stills.map((src, i) => (
                          <div key={i} className="fp-still" style={{ backgroundImage: `url('${src}')` }} />
                        ))}
                      </div>
                    </>
                  )}

                  <div className="fp-foot-modal">
                    <span>{f.location}</span>
                    <span><kbd>esc</kbd> to close</span>
                  </div>
                </>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
}
