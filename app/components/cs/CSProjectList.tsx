'use client';

import type { CSProject } from '@/app/data/cs-projects';

interface CSProjectListProps {
  projects: CSProject[];
  activeIdx: number;
  onSelect: (idx: number) => void;
}

export default function CSProjectList({ projects, activeIdx, onSelect }: CSProjectListProps) {
  return (
    <nav
      aria-label="CS project list"
      style={{
        position: 'fixed',
        left: 'clamp(20px, 2.5vw, 40px)',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'var(--font-inter, Inter, system-ui, sans-serif)',
      }}
    >
      {projects.map((project, idx) => (
        <button
          key={project.slug}
          type="button"
          onClick={() => onSelect(idx)}
          aria-current={idx === activeIdx ? 'true' : undefined}
          style={{
            background: 'none',
            border: 'none',
            padding: '0',
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontSize: '13px',
            lineHeight: 1.9,
            textAlign: 'left',
            color: idx === activeIdx ? '#F5F2EC' : '#555555',
            fontWeight: idx === activeIdx ? 600 : 400,
            transition: 'color 300ms ease',
            display: 'block',
          }}
          onMouseEnter={(e) => {
            if (idx !== activeIdx) {
              (e.currentTarget as HTMLButtonElement).style.color = '#aaaaaa';
            }
          }}
          onMouseLeave={(e) => {
            if (idx !== activeIdx) {
              (e.currentTarget as HTMLButtonElement).style.color = '#555555';
            }
          }}
        >
          {project.title}
        </button>
      ))}
    </nav>
  );
}
