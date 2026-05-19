export type Film = {
  slug: string;
  title: string;
  year: string;
  category: string;
  services: string;
  aspectRatio: string;
  cover: string;
  axis: 'width' | 'height';
};

export const films: Film[] = [
  {
    slug: 'heirloom',
    title: 'Heirloom',
    year: '2024',
    category: 'Drama, Short',
    services: 'Director, Cinematographer',
    aspectRatio: '3/4',
    axis: 'height',
    cover: '/films/Heirloom_Poster.png',
  },
  {
    slug: 'reflections',
    title: 'Reflections of Life',
    year: '2024',
    category: 'Documentary, Personal',
    services: 'Director, Editor',
    aspectRatio: '1/1',
    axis: 'width',
    cover: '/films/reflections.jpg',
  },
  {
    slug: 'let-me-out',
    title: 'Let Me Out',
    year: '2023',
    category: 'Experimental, Short',
    services: 'Director, Choreographer',
    aspectRatio: '16/9',
    axis: 'width',
    cover: '/films/let-me-out.jpg',
  },
  {
    slug: 'sanatorium',
    title: 'SANATORIUM',
    year: '2023',
    category: 'Horror, Short',
    services: 'Director, Production Design',
    aspectRatio: '4/5',
    axis: 'height',
    cover: '/films/sanatorium.jpg',
  },
  {
    slug: 'bulimia',
    title: 'Bulimia',
    year: '2022',
    category: 'Documentary, Personal',
    services: 'Director, Subject',
    aspectRatio: '1/1',
    axis: 'width',
    cover: '/films/bulimia.jpg',
  },
  {
    slug: 'commercial',
    title: 'Commercial Ads',
    year: '2022–2025',
    category: 'Commercial',
    services: 'Director, Editor',
    aspectRatio: '3/2',
    axis: 'width',
    cover: '/films/commercial.jpg',
  },
];
