export type CSProject = {
  slug: string;
  title: string;
  techStack: string;
  version: string;
  role: string;
  cover: string;
  aspectRatio: string;
  axis: 'width' | 'height';
  coverScale: number;
  github?: string;
};

export const csProjects: CSProject[] = [
  {
    slug: 'slateone-plus',
    title: 'SlateOne+',
    techStack: 'SWIFT · XCODE',
    version: 'v2.1.0 · PROPRIETARY',
    role: 'ENGINEER · DESIGNER',
    cover: '/cs/slateone-cover.png',
    aspectRatio: '3/4',
    axis: 'height',
    coverScale: 0.82,
  },
  {
    slug: 'omnirag',
    title: 'OmniRAG',
    techStack: 'PYTHON · OPENAI',
    version: 'v1.2.0 · MIT',
    role: 'ENGINEER · RESEARCHER',
    cover: '/cs/omnirag-cover.png',
    aspectRatio: '4/3',
    axis: 'width',
    coverScale: 1.35,
    github: 'github.com/ruisnow-e/OmniRAG',
  },
  {
    slug: 'cyberfshtank',
    title: 'CyberFishTank',
    techStack: 'PYTHON · PYGAME',
    version: 'v1.0.0 · MIT',
    role: 'ENGINEER · ANIMATOR',
    cover: '/cs/cyberfshtank-cover.png',
    aspectRatio: '1/1',
    axis: 'width',
    coverScale: 0.9,
    github: 'github.com/ruisnow-e/Cyber_Fish_Tank',
  },
  {
    slug: 'jive-compiler',
    title: 'Jive Compiler',
    techStack: 'JAVA · LLVM',
    version: 'v0.9.0 · GPL',
    role: 'COMPILER ENGINEER',
    cover: '/cs/jive-cover.png',
    aspectRatio: '16/9',
    axis: 'width',
    coverScale: 1.05,
  },
];
