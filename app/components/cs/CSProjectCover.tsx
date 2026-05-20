'use client';

import type { CSProject } from '@/app/data/cs-projects';

interface CSProjectCoverProps {
  project: CSProject;
  projectIdx: number;
  copyIdx: number;
  isLocked: boolean;
}

export default function CSProjectCover({
  project,
  projectIdx,
  copyIdx,
  isLocked,
}: CSProjectCoverProps) {
  const base = 20 * project.coverScale;
  const minPx = Math.round(180 * project.coverScale);
  const maxPx = Math.round(290 * project.coverScale);

  return (
    <article
      className={`cs-work${isLocked ? ' locked' : ''}`}
      data-proj-idx={projectIdx}
      data-copy-idx={copyIdx}
      role="img"
      aria-label={`${project.title}, ${project.techStack}`}
      style={{
        width: `clamp(${minPx}px, ${base.toFixed(1)}vw, ${maxPx}px)`,
        height: `clamp(${minPx}px, ${base.toFixed(1)}vw, ${maxPx}px)`,
        margin: '0 auto 2px',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <div
        className="cs-cover"
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
          backgroundImage: `url('${project.cover}')`,
          backgroundSize: project.slug === 'jive-compiler' ? '70%' : 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          borderRadius: '0',
          filter: isLocked ? 'none' : 'grayscale(1) contrast(0.95)',
          opacity: isLocked ? 1 : 0.18,
          transition:
            'filter 600ms cubic-bezier(0.22,1,0.36,1), opacity 600ms cubic-bezier(0.22,1,0.36,1)',
        }}
      />
    </article>
  );
}
