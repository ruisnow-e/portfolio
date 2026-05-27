'use client';

import { useEffect, useRef } from 'react';
import TopBarCS from '@/app/components/cs/TopBarCS';
import BottomBarCS from '@/app/components/cs/BottomBarCS';

const PROJECTS = [
  {
    name: 'SlateOne+',
    slug: 'slateone+',
    filename: 'SlateApp.swift',
    cap: 'FILM TOOLS · PLATFORM\nSWIFT · SWIFTUI',
    meta: 'IN DEVELOPMENT · 2026',
    tag: 'Film helps me see what\'s broken. CS lets me fix it.',
    modalMeta: { STATUS: 'building · 2026', STAGE: 'spec · repo · interface design', STACK: 'swift · swiftui (planned)', TARGET: 'indie filmmakers · film students · small crews', YEAR: '2026' },
    desc: 'An all-in-one film production platform — from script to delivery — built around the way information actually flows on a real set. Five modules: industry-formatted screenwriting, auto-generated storyboard scaffolding, cost-optimized shooting schedules (group actor scenes, minimize hold days), digital slate sheets that auto-distribute to editorial, and a role-aware permission system — the core differentiator.<br><br>Existing tools (StudioBinder, Celtx) treat crew access as an afterthought. On-set tools (MovieSlate, SyncOnSet) sit outside pre-production entirely. Indie crews stitch four apps together. slateone+ collapses them into one space where each role — director, DP, actor, script supervisor, editor — sees only what their job requires.<br><br>I\'ve worked both sides of the slate. The tools never matched the workflow.',
    links: [
      { label: 'github.com/ruisnow-e/slateone', url: 'https://github.com/ruisnow-e/slateone' },
    ],
    code: [
      ['<span class="kw">import</span> SwiftUI', 80],
      ['', 40],
      ['<span class="kw">enum</span> <span class="fn">Role</span> {', 70],
      ['    <span class="kw">case</span> director, dp, actor, editor', 60],
      ['}', 60],
      ['', 40],
      ['<span class="kw">struct</span> <span class="fn">ProjectView</span>: <span class="fn">View</span> {', 70],
      ['    <span class="kw">let</span> user: <span class="fn">Role</span>', 55],
      ['    <span class="kw">var</span> body: <span class="kw">some</span> <span class="fn">View</span> {', 55],
      ['        <span class="kw">switch</span> user {', 55],
      ['        <span class="kw">case</span> .director: <span class="fn">FullView</span>()', 50],
      ['        <span class="kw">case</span> .dp:       <span class="fn">ShotList</span>()', 50],
      ['        <span class="kw">case</span> .actor:    <span class="fn">Script</span>()', 50],
      ['        <span class="kw">case</span> .editor:   <span class="fn">Slate</span>()', 50],
      ['        }', 80],
      ['<span class="cmt">// every role sees what their job requires</span>', 80],
    ],
  },
  {
    name: 'OmniRAG',
    slug: 'omnirag',
    filename: 'RagOrchestrator.java',
    cap: 'RAG · DOMAIN-AWARE\nJAVA · SPRING-BOOT · OPENAI',
    meta: '~2.1K LINES · LAST EDIT 19:15',
    tag: 'A domain-aware RAG engine that knows the difference between a screenplay and a statute.',
    modalMeta: { STACK: 'java · spring boot · openai · sqlite · sse', STATUS: 'coursework · team (3) · OSS', YEAR: '2026', LOC: '~7.9k total · ~2.1k mine', ROLE: 'architecture · film adapters · frontend' },
    desc: 'A domain-aware RAG pipeline in Java 21 + Spring Boot. Documents ingest through pluggable adapters — screenplays, subtitles, storyboards, legal, general — and queries run through two-stage retrieval: cosine search narrows to top-10, GPT re-ranks to top-5, and the answer persona is chosen by majority vote over the retrieved chunks. I owned the orchestrator, the film adapter suite, and the SSE-streaming frontend.',
    team: [
      { name: 'Rui Song',     role: 'architecture · film adapters · frontend' },
      { name: 'Nguyen Ha',    role: 'ingestion · format adapters · evaluation' },
      { name: 'Siyuan Liang', role: 'storage · legal adapter · retrieval' },
    ],
    links: [
      { label: 'github.com/ruisnow-e/OmniRAG', url: 'https://github.com/ruisnow-e/OmniRAG' },
    ],
    code: [
      ['<span class="cmt">// RagOrchestrator.java</span>', 60],
      ['<span class="fn">embed</span>(question);       <span class="cmt">// → vector</span>', 70],
      ['<span class="fn">search</span>(vec, k=10);    <span class="cmt">// → top-10</span>', 70],
      ['<span class="fn">rerank</span>(top10);        <span class="cmt">// → top-5</span>', 70],
      ['<span class="fn">inferDomain</span>(top5);    <span class="cmt">// → majority vote</span>', 70],
      ['<span class="fn">ask</span>(question, top5);  <span class="cmt">// → streamed answer</span>', 70],
      ['', 100],
      ['<span class="cmt">// 5 domains · SSE streaming</span>', 80],
    ],
  },
  {
    name: 'Jive Compiler',
    slug: 'jive-compiler',
    filename: 'codegen.c',
    cap: 'COMPILER · TOY\nC · NASM · LINUX-X64',
    meta: '~2.5K LINES · LAST EDIT 03:11',
    tag: 'Lexer → Parser → IR → x86-64. The whole pipeline, by hand, in C.',
    modalMeta: { STACK: 'C · x86-64 NASM · stack-machine IR', STATUS: 'coursework · OSS · archived', YEAR: '2026', LOC: '~2.5k' },
    desc: 'Jive is a small typed language I made up — int, bool, str, arrays, functions, if/while. The compiler is written in C as a unity build, lowers the AST through a stack-machine IR, and emits x86-64 NASM. The demo program runs Conway\'s Game of Life on an 8×8 grid.',
    links: [
      { label: 'github.com/ruisnow-e/jive_compiler', url: 'https://github.com/ruisnow-e/jive_compiler' },
    ],
    code: [
      ['<span class="fn">lex</span>(src);        <span class="cmt">// -&gt; Tokens</span>', 70],
      ['<span class="fn">parse</span>(tokens);   <span class="cmt">// -&gt; AST</span>', 70],
      ['<span class="fn">lower</span>(ast);      <span class="cmt">// -&gt; IR (stack machine)</span>', 70],
      ['<span class="fn">emit</span>(ir);        <span class="cmt">// -&gt; x86-64 NASM</span>', 70],
      ['', 100],
      ['<span class="fn">printf</span>(<span class="str">"game of life, gen 12\\n"</span>);', 80],
    ],
  },
  {
    name: 'CyberFishTank',
    slug: 'cyberfishtank',
    filename: 'fishtank.py',
    cap: 'AQUARIUM · ML\nPYTHON · PYGAME · TENSORFLOW',
    meta: '~310 LINES · LAST EDIT YESTERDAY',
    tag: 'Three engineers, three domains, one aquarium.',
    modalMeta: { STACK: 'python · pygame · tensorflow · tkinter', STATUS: 'coursework · team (3) · OSS', YEAR: '2025', LOC: '~700 total · ~310 mine', ROLE: 'pygame engine · fish behavior · animation' },
    desc: 'A three-stage pipeline built with two collaborators for CS5001 at Northeastern. Tkinter canvas → TensorFlow classifier → Pygame aquarium. I owned the engine: fish swimming, food-chasing, bubble animation, background switching.',
    team: [
      { name: 'Rui Song',      role: 'pygame aquarium engine' },
      { name: 'Zhuoying Xue',  role: 'tkinter drawing interface' },
      { name: 'Lai Jiang',     role: 'tensorflow classifier' },
    ],
    links: [
      { label: 'github.com/ruisnow-e/Cyber_Fish_Tank', url: 'https://github.com/ruisnow-e/Cyber_Fish_Tank' },
    ],
    code: [
      ['<span class="kw">class</span> <span class="fn">Fish</span>:', 70],
      ['    <span class="kw">def</span> <span class="fn">swim</span>(self):', 65],
      ['        self.pos += self.vel', 65],
      ['', 120],
      ['    <span class="kw">def</span> <span class="fn">chase</span>(self, food):', 70],
      ['        self.target = nearest(food, self.pos)', 65],
      ['<span class="cmt"># 4 fish swimming</span>', 80],
    ],
  },
];

const TYPE_MIN = 28;
const TYPE_MAX = 52;

type Project = typeof PROJECTS[0];

export default function CSPage() {
  const hasRun = useRef(false);
  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    let current  = -1;
    let typingId = 0;
    let wheelAcc = 0;

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
        codeEl.scrollTop = codeEl.scrollHeight;
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

    function switchTo(idx: number, viaClick: boolean, dir: number = 0) {
      if (idx === current) return;
      current = idx; typingId++;
      const p = PROJECTS[idx];
      items.forEach((el, i) => el.classList.toggle('active', i === idx));
      slugEl.textContent     = p.slug;
      metaEl.textContent     = p.meta;
      filenameEl.textContent = p.filename;
      capEl.innerHTML        = p.cap.replace('\n', '<br/>');
      screenEl.classList.remove('flash', 'cs-slide-next', 'cs-slide-prev');
      void screenEl.offsetWidth;
      if (viaClick) {
        screenEl.classList.add('flash');
      } else if (dir !== 0) {
        screenEl.classList.add(dir > 0 ? 'cs-slide-next' : 'cs-slide-prev');
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
      const teamBlock = (p as {team?: {name:string;role:string}[]}).team?.length
        ? `<div class="cs-modal-team">
            <div class="cs-modal-team-h">TEAM</div>
            ${(p as {team:{name:string;role:string}[]}).team.map(m =>
              `<div class="cs-modal-team-row"><span class="cs-modal-team-name">${m.name}</span><span class="cs-modal-team-arrow">→</span><span class="cs-modal-team-role">${m.role}</span></div>`
            ).join('')}
          </div>`
        : '';
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
            ${teamBlock}
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

    const onWheel = (e: WheelEvent) => {
      if (document.getElementById('cs-backdrop')) return;
      e.preventDefault();
      wheelAcc += e.deltaY;
      if (Math.abs(wheelAcc) >= 180) {
        const dir = wheelAcc > 0 ? 1 : -1;
        wheelAcc = 0;
        const N = PROJECTS.length;
        switchTo(((current + dir) % N + N) % N, false, dir);
      }
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
    window.addEventListener('wheel', onWheel, { passive: false });
    document.addEventListener('keydown', onKey);

    switchTo(0, false);

    return () => {
      typingId++;
      hasRun.current = false;
      window.removeEventListener('wheel', onWheel);
      document.removeEventListener('keydown', onKey);
      document.getElementById('cs-backdrop')?.remove();
    };
  }, []);

  return (
    <div style={{ height: '100vh', background: '#0d0e10', overflow: 'hidden' }}>
      <TopBarCS />
      <BottomBarCS />

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
                <div className="cs-meta" id="cs-meta">IN DEVELOPMENT · 2026</div>
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
                  FILM TOOLS · PLATFORM<br />SWIFT · SWIFTUI
                </div>
                <div className="cs-laptop-cta">↳ CLICK TO READ</div>
              </div>
          </div>

        </div>
      </div>
    </div>
  );
}
