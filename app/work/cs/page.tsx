'use client';

import { useEffect } from 'react';
import TopBarCS from '@/app/components/cs/TopBarCS';
import BottomBarCS from '@/app/components/cs/BottomBarCS';

const PROJECTS = [
  {
    name: 'SlateOne+',
    slug: 'slateone+',
    filename: 'main.swift',
    cap: 'ENGINEER · DESIGNER\nv2.1.0 · COMMITTED',
    meta: '~6.4K LINES · LAST EDIT 23:42',
    tag: 'A macOS launcher that turns every keystroke into a query.',
    modalMeta: { STACK: 'swift · xcode · v2.1.0', STATUS: 'shipped · proprietary', YEAR: '2025', LOC: '~6.4k' },
    desc: 'Built to replace Spotlight for power users. Triggers any action with a fuzzy keyboard shortcut, including custom user scripts. Indexes 40k files under 200ms. Native menubar app, single binary, no Electron.',
    links: [
      { label: 'github.com/snow/slate', url: '#' },
      { label: 'snowstudio.dev/slate',  url: '#' },
    ],
    code: [
      ['<span class="kw">import</span> SwiftUI', 80],
      ['', 100],
      ['<span class="kw">@main</span> <span class="kw">struct</span> <span class="fn">App</span> {', 70],
      ['  <span class="kw">var</span> body: <span class="fn">Scene</span> {', 70],
      ['    Window(<span class="str">"slate"</span>) { ContentView() }', 60],
      ['  }', 100],
      ['}', 300],
      ['<span class="cmt">// awaiting input...</span>', 80],
    ],
  },
  {
    name: 'OmniRAG',
    slug: 'omnirag',
    filename: 'rag.py',
    cap: 'NLP · INDEXING\nv0.4.2 · INFERENCE',
    meta: '~3.1K LINES · LAST EDIT 19:15',
    tag: 'Ask anything. From any document.',
    modalMeta: { STACK: 'python · chroma · llama · open', STATUS: 'beta · public', YEAR: '2025', LOC: '~3.1k' },
    desc: 'A retrieval-augmented generation pipeline. Drop a folder of PDFs, contracts, notes, anything, and ask in plain language. Cites sources inline and refuses confidently when it does not know. Runs fully local.',
    links: [
      { label: 'github.com/snow/omnirag', url: '#' },
      { label: 'demo.omnirag.app',        url: '#' },
    ],
    code: [
      ['<span class="kw">from</span> rag <span class="kw">import</span> embed, ask', 70],
      ['', 100],
      ['docs = <span class="fn">embed</span>(<span class="str">"./corpus"</span>)', 65],
      ['ans  = <span class="fn">ask</span>(docs, query)', 65],
      ['', 100],
      ['<span class="kw">print</span>(ans.<span class="fn">cite</span>())', 70],
      ['<span class="cmt"># 247 ms · 4 sources</span>', 80],
    ],
  },
  {
    name: 'CyberFishTank',
    slug: 'cyberfishtank',
    filename: 'ecosystem.cpp',
    cap: 'SIMULATION · ECOLOGY\nv1.0 · OPEN SOURCE',
    meta: '~8.2K LINES · LAST EDIT YESTERDAY',
    tag: 'An ecosystem simulator where every fish has an opinion.',
    modalMeta: { STACK: 'c++ · opengl · gamedev', STATUS: 'shipped · open source', YEAR: '2024', LOC: '~8.2k' },
    desc: 'A real-time predator-prey simulation. Each fish runs an independent state machine with hunger, fear, curiosity, and memory of recent predators. Holds 1,200+ fish at 60fps on integrated graphics.',
    links: [
      { label: 'github.com/snow/fishtank', url: '#' },
      { label: 'paper · pdf',              url: '#' },
    ],
    code: [
      ['<span class="kw">class</span> <span class="fn">Fish</span> {', 70],
      ['  <span class="kw">void</span> <span class="fn">swim</span>() { pos += vel; }', 65],
      ['  <span class="kw">bool</span> <span class="fn">hungry</span>() {', 70],
      ['    <span class="kw">return</span> energy &lt; 0.3;', 65],
      ['  }', 100],
      ['};', 200],
      ['<span class="cmt">// 4 fish swimming</span>', 80],
    ],
  },
  {
    name: 'Jive Compiler',
    slug: 'jive-compiler',
    filename: 'compile.rs',
    cap: 'COMPILER · TOY\nv0.1 · UNSTABLE',
    meta: '~2.7K LINES · LAST EDIT 03:11',
    tag: 'A toy compiler that emits WASM. Mostly jokes.',
    modalMeta: { STACK: 'rust · wasm · custom IR', STATUS: 'experimental · open', YEAR: '2026', LOC: '~2.7k' },
    desc: 'A self-imposed compilers class. Implements a small ML-flavored language with type inference, pattern matching, and WASM codegen. The error messages are written to be passive-aggressive on purpose.',
    links: [
      { label: 'github.com/snow/jive', url: '#' },
    ],
    code: [
      ['<span class="fn">lex</span>(src)    <span class="cmt">// -&gt; Tokens</span>', 70],
      ['<span class="fn">parse</span>(toks) <span class="cmt">// -&gt; AST</span>', 70],
      ['<span class="fn">check</span>(ast)  <span class="cmt">// -&gt; Typed</span>', 70],
      ['<span class="fn">emit</span>(typed) <span class="cmt">// -&gt; WASM</span>', 70],
      ['', 100],
      ['<span class="kw">println!</span>(<span class="str">"compiled in 4ms"</span>);', 80],
    ],
  },
];

const SECTION_LEN  = 160;
const SCROLL_SPEED = 0.7;
const TYPE_MIN     = 28;
const TYPE_MAX     = 52;

type Project = typeof PROJECTS[0];

export default function CSPage() {
  useEffect(() => {
    let current   = -1;
    let typingId  = 0;
    let phase     = 0;
    let rafQueued = false;

    const codeEl     = document.getElementById('cs-code')!;
    const screenEl   = document.getElementById('cs-screen')!;
    const items      = Array.from(document.querySelectorAll<HTMLElement>('.cs-item'));
    const slugEl     = document.getElementById('cs-slug')!;
    const metaEl     = document.getElementById('cs-meta')!;
    const filenameEl = document.getElementById('cs-filename')!;
    const capEl      = document.getElementById('cs-laptop-cap')!;
    const laptopWrap = document.getElementById('cs-laptop-wrap')!;

    function pad2(n: number) { return n < 10 ? '0' + n : '' + n; }

    function stripTags(html: string) {
      const d = document.createElement('div');
      d.innerHTML = html;
      return d.textContent || '';
    }

    function truncateHtml(html: string, n: number): string {
      const d = document.createElement('div');
      d.innerHTML = html;
      let out = '', count = 0;
      function walk(node: Node) {
        if (count >= n) return;
        if (node.nodeType === 3) {
          const t = node.textContent || '';
          const take = Math.min(t.length, n - count);
          out += t.slice(0, take);
          count += take;
        } else if (node.nodeType === 1) {
          const el = node as Element;
          let open = '<' + el.tagName.toLowerCase();
          if (el.className) open += ' class="' + el.className + '"';
          out += open + '>';
          for (let i = 0; i < el.childNodes.length && count < n; i++) walk(el.childNodes[i]);
          out += '</' + el.tagName.toLowerCase() + '>';
        }
      }
      for (let i = 0; i < d.childNodes.length && count < n; i++) walk(d.childNodes[i]);
      return out;
    }

    function typeProject(p: Project, myId: number) {
      codeEl.innerHTML = '';
      let lineIdx = 0;
      function nextLine() {
        if (myId !== typingId) return;
        if (lineIdx >= p.code.length) return;
        const div = document.createElement('div');
        div.className = 'ln';
        codeEl.appendChild(div);
        const html  = p.code[lineIdx][0] as string;
        const delay = p.code[lineIdx][1] as number;
        let displayLen = 0;
        function step() {
          if (myId !== typingId) return;
          displayLen++;
          const truncated = truncateHtml(html, displayLen);
          const isLast = lineIdx === p.code.length - 1;
          if (isLast && displayLen >= stripTags(html).length) {
            div.innerHTML = truncated + '<span class="cs-cursor"></span>';
            return;
          }
          div.innerHTML = truncated;
          if (displayLen < stripTags(html).length) {
            setTimeout(step, TYPE_MIN + Math.random() * (TYPE_MAX - TYPE_MIN));
          } else {
            lineIdx++;
            setTimeout(nextLine, delay);
          }
        }
        if (html === '') { lineIdx++; setTimeout(nextLine, delay); }
        else step();
      }
      nextLine();
    }

    function switchTo(idx: number, viaClick: boolean) {
      if (idx === current) return;
      current = idx; typingId++;
      const p = PROJECTS[idx];
      items.forEach((el, i) => el.classList.toggle('active', i === idx));
      slugEl.textContent     = p.slug;
      metaEl.textContent     = p.meta;
      filenameEl.textContent = p.filename;
      capEl.innerHTML        = p.cap.replace('\n', '<br/>');
      if (viaClick) {
        screenEl.classList.remove('flash');
        void screenEl.offsetWidth;
        screenEl.classList.add('flash');
      }
      typeProject(p, typingId);
    }

    function closeModal() {
      document.getElementById('cs-backdrop')?.remove();
    }

    function openModal(idx: number) {
      document.getElementById('cs-backdrop')?.remove();
      const p = PROJECTS[idx];
      const backdrop = document.createElement('div');
      backdrop.className = 'cs-backdrop';
      backdrop.id = 'cs-backdrop';
      const metaRows = Object.entries(p.modalMeta).map(([k, v]) =>
        `<div class="cs-modal-meta-k">${k}</div><div class="cs-modal-meta-v">${v}</div>`
      ).join('');
      const linkRows = p.links.map(l =>
        `<a class="cs-modal-link" href="${l.url}">→ ${l.label}</a>`
      ).join('');
      backdrop.innerHTML = `
        <div class="cs-modal">
          <div class="cs-modal-bar">
            <div class="cs-modal-close" id="cs-modal-close"></div>
            <div class="cs-modal-light" style="background:#febc2e"></div>
            <div class="cs-modal-light" style="background:#28c840"></div>
            <div class="cs-modal-title">${p.slug} — README.md</div>
          </div>
          <div class="cs-modal-body">
            <div class="cs-modal-label">PROJECT ${pad2(idx + 1)} / ${pad2(PROJECTS.length)}</div>
            <div class="cs-modal-name">${p.name}</div>
            <div class="cs-modal-tag">${p.tag}</div>
            <div class="cs-modal-meta">${metaRows}</div>
            <div class="cs-modal-desc">${p.desc}</div>
            <div class="cs-modal-links">${linkRows}</div>
            <div class="cs-modal-kbd"><kbd>esc</kbd> to close</div>
          </div>
        </div>`;
      document.body.appendChild(backdrop);
      backdrop.addEventListener('click', e => { if (e.target === backdrop) closeModal(); });
      document.getElementById('cs-modal-close')?.addEventListener('click', closeModal);
    }

    items.forEach((el, i) => el.addEventListener('click', () => switchTo(i, true)));
    laptopWrap.addEventListener('click', () => { if (current >= 0) openModal(current); });

    const onScroll = () => {
      if (document.getElementById('cs-backdrop')) return;
      phase = window.scrollY * SCROLL_SPEED;
      if (!rafQueued) {
        rafQueued = true;
        requestAnimationFrame(() => {
          rafQueued = false;
          const N   = PROJECTS.length;
          const idx = Math.floor(((phase / SECTION_LEN) % N + N) % N);
          switchTo(idx, false);
        });
      }
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('keydown', onKey);

    switchTo(0, false);

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('keydown', onKey);
      document.getElementById('cs-backdrop')?.remove();
    };
  }, []);

  return (
    <div style={{ minHeight: '400vh', background: '#0d0e10' }}>
      <TopBarCS />
      <BottomBarCS />

      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        <div className="cs-stage">
          <div className="cs-content">

            <div className="cs-row">
              {/* File list */}
              <div className="cs-files">
                <div className="cs-prompt">$ ls projects/</div>
                <div className="cs-hint">
                  {'// click '}<span className="k">name</span>{' to preview · click '}<span className="k">laptop</span>{' to read'}
                </div>
                {PROJECTS.map((p, i) => (
                  <div key={p.slug} className="cs-item" data-i={i}>
                    <span className="cs-arrow">▸</span>
                    <span className="cs-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="cs-item-name">{p.name.toLowerCase()}</span>
                  </div>
                ))}
                <div className="cs-openline">
                  <span className="cs-openline-prompt">$</span>
                  <span className="cs-openline-text">
                    {'open '}
                    <span className="slug" id="cs-slug">slateone+</span>
                  </span>
                  <span className="cs-cursor" />
                </div>
                <div className="cs-meta" id="cs-meta">~6.4K LINES · LAST EDIT 23:42</div>
              </div>

              {/* Laptop */}
              <div className="cs-laptop-wrap" id="cs-laptop-wrap">
                <div className="cs-laptop">
                  <div className="cs-screen" id="cs-screen">
                    <div className="cs-screen-bar">
                      <span className="cs-mini-dot" style={{ background: 'rgba(255,95,87,0.7)' }} />
                      <span className="cs-mini-dot" style={{ background: 'rgba(254,188,46,0.7)' }} />
                      <span className="cs-mini-dot" style={{ background: 'rgba(40,200,64,0.7)' }} />
                      <span className="cs-filename" id="cs-filename">main.swift</span>
                    </div>
                    <div className="cs-code" id="cs-code" />
                  </div>
                  <div className="cs-base" />
                </div>
                <div className="cs-laptop-cap" id="cs-laptop-cap">
                  ENGINEER · DESIGNER<br />v2.1.0 · COMMITTED
                </div>
                <div className="cs-laptop-cta">↳ CLICK TO READ</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
