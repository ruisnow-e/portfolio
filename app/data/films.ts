export type ContentBlock =
  | { type: 'text';         text: string }
  | { type: 'section';      heading: string; text: string }
  | { type: 'still';        src: string; gap?: 'large' }
  | { type: 'still-pair';   srcs: [string, string]; gap?: 'large'; spacing?: 'compact'; aspectRatio?: string; positions?: [string, string] }
  | { type: 'still-triple'; srcs: [string, string, string] }
  | { type: 'image';        src: string; size?: 'small' }
  | { type: 'video' }
  | { type: 'awards' }
  | { type: 'screenings' };

export type Film = {
  slug: string;
  title: string;
  year: string;
  category: string;
  services: string;
  aspectRatio: string;
  cover: string;
  axis: 'width' | 'height';
  timecode: string;
  roles: string;
  // modal fields
  tagline:          string;
  genre:            string;
  runtime:          string;
  format:           string;
  synopsis:         string;
  videoUrl:         string;
  stills:           string[];
  location:         string;
  awards?:          string[];
  screenings?:      string[];
  directorStatement?: string;
  contentBlocks?:   ContentBlock[];
};

export const films: Film[] = [
  // 01 — Heirloom
  {
    slug: 'heirloom',
    title: 'Heirloom',
    year: '2024',
    category: 'Drama, Short',
    services: 'Director · Screenwriter · Co-producer · Editor',
    aspectRatio: '3/4',
    axis: 'height',
    cover: '/films/Heirloom_Poster.png',
    timecode: '00:00 / 18:24',
    roles: 'DIRECTOR · SCREENWRITER · CO-PRODUCER · EDITOR',
    tagline:  '"A secret buried inside the heirloom."',
    genre:    'Drama · Short',
    runtime:  '18:24',
    format:   '16mm · 24fps',
    synopsis: 'Following his coming out, a young man is astonished to discover his parents not only knew but accepted his homosexuality, contingent upon the condition that he must father a child to inherit the cherished family heirloom. Overwhelmed, he engages in a heated dispute with his parents, yet the accidental shattering of the heirloom unveils a long-buried secret.',
    videoUrl: '/films/heirloom.mov',
    stills: [
      '/stills/heirloom/1.jpg',
      '/stills/heirloom/2.jpg',
      '/stills/heirloom/3.jpg',
      '/stills/heirloom/4.jpg',
      '/stills/heirloom/5.jpg',
      '/stills/heirloom/6.jpg',
      '/stills/heirloom/7.jpg',
    ],
    location: 'SHOT 2024',
    awards: [
      'Award Winner · Berlin Shorts Award (July 2024)',
      'Award Winner · San Francisco Arthouse Short Film Festival (July 2024)',
      'Award Winner · Phoenix Shorts (August 2024)',
      'Award Winner · Chicago Filmmaker Awards (September 2024)',
      'Award Winner · Madrid Arthouse Film Festival (November 2024)',
      'Official Selection · San Antonio QFest Film Festival (August 2024)',
      'Official Selection · San Francisco Another Hole in the Head Film Festival (October 2024)',
      'Honorable Mention · New York Film & Male Actor Award (October 2024)',
      'Honorable Mention · Los Angeles Short Film Award (October 2024)',
      'Semi-Finalist · Atlanta Movie Awards (July 2024)',
      'Semi-Finalist · Brooklyn International Short Awards (July 2024)',
      'Semi-Finalist · Hong Kong Indie Film Festival (August 2024)',
      'Semi-Finalist · Paris International Short Festival (August 2024)',
      'Semi-Finalist · Tokyo ShortFest (November 2024)',
    ],
    screenings: [
      'World Premiere · Roxie Theater, San Francisco — May 7, 2024',
      'San Antonio QFest · City Base Cinemas, San Antonio — October 13, 2024',
      'Another Hole in the Head Film Festival · Balboa Theater, San Francisco — December 8, 2024',
      '27th Kyoto International Student Film Festival · Museum of Kyoto Film Theater — February 2025',
    ],
    directorStatement: 'The LGBTQ+ community has made remarkable strides toward achieving recognition, acceptance, and equal rights in many parts of the world. Legalization of same-sex marriage, anti-discrimination laws, and increased visibility of LGBTQ+ individuals in media and public life have contributed to greater societal understanding and acceptance. However, challenges such as discrimination, stigmatization, and lack of legal protections still persist in various contexts, underscoring the ongoing need for advocacy and education.\n\nSimultaneously, advancements in reproductive technology and changing attitudes toward family formation have reshaped traditional notions of parenthood and biological ties. Surrogacy, in particular, has emerged as a viable option for LGBTQ+ individuals and couples to realize their dreams of parenthood. While surrogacy offers newfound possibilities for family building, it also raises complex ethical, legal, and social questions regarding parental rights, commercialization of reproduction, and the well-being of surrogate mothers.\n\nHeirloom explores LGBTQ+ family dynamics through a comedic lens, blurring the lines of morality with surrogacy and family heirlooms. It aims to promote normalization and acceptance within the community.',
    contentBlocks: [
      { type: 'text', text: 'Following his coming out, a young man is astonished to discover his parents not only knew but accepted his homosexuality, contingent upon the condition that he must father a child to inherit the cherished family heirloom. Overwhelmed, he engages in a heated dispute with his parents, yet the accidental shattering of the heirloom unveils a long-buried secret.' },
      { type: 'video' },
      { type: 'text', text: 'The LGBTQ+ community has made remarkable strides toward achieving recognition, acceptance, and equal rights in many parts of the world. Legalization of same-sex marriage, anti-discrimination laws, and increased visibility of LGBTQ+ individuals in media and public life have contributed to greater societal understanding and acceptance. However, challenges such as discrimination, stigmatization, and lack of legal protections still persist in various contexts, underscoring the ongoing need for advocacy and education.' },
      { type: 'still-pair', srcs: ['/stills/heirloom/2.jpg', '/stills/heirloom/3.jpg'], positions: ['right center', 'right center'] },
      { type: 'text', text: 'Simultaneously, advancements in reproductive technology and changing attitudes toward family formation have reshaped traditional notions of parenthood and biological ties. Surrogacy, in particular, has emerged as a viable option for LGBTQ+ individuals and couples to realize their dreams of parenthood. While surrogacy offers newfound possibilities for family building, it also raises complex ethical, legal, and social questions regarding parental rights, commercialization of reproduction, and the well-being of surrogate mothers.' },
      { type: 'still', src: '/stills/heirloom/4.jpg' },
      { type: 'still-pair', srcs: ['/stills/heirloom/6.jpg', '/stills/heirloom/7.jpg'] },
      { type: 'text', text: 'Heirloom explores LGBTQ+ family dynamics through a comedic lens, blurring the lines of morality with surrogacy and family heirlooms. It aims to promote normalization and acceptance within the community.' },
      { type: 'still-pair', srcs: ['/stills/heirloom/1.jpg', '/stills/heirloom/5.jpg'], positions: ['right center', 'center'] },
      { type: 'awards' },
      { type: 'screenings' },
      { type: 'image', src: '/stills/heirloom/vip.png', size: 'small' },
    ],
  },
  // 02 — SANATORIUM
  {
    slug: 'sanatorium',
    title: 'SANATORIUM',
    year: '2023',
    category: 'Horror, Short',
    services: 'Director · Screenwriter',
    aspectRatio: '4/5',
    axis: 'height',
    cover: '/films/sanatorium.jpg',
    timecode: '00:00 / 12:33',
    roles: 'DIRECTOR · SCREENWRITER',
    tagline:  '"Something lives in the walls."',
    genre:    'Horror · Short',
    runtime:  '12:33',
    format:   'Digital · 24fps',
    synopsis: 'A woman checks herself into an old residential clinic seeking rest. By the second night, the silence begins to answer back. A slow-burn psychological horror shot entirely on location in an abandoned building, using only practical light and ambient sound.',
    videoUrl: '',
    stills: [
      '/stills/sanatorium/1-1.jpg',
      '/stills/sanatorium/1-2.jpg',
      '/stills/sanatorium/2.jpg',
      '/stills/sanatorium/3-1.jpg',
      '/stills/sanatorium/3-2.jpg',
      '/stills/sanatorium/4-1.jpg',
      '/stills/sanatorium/4-2.jpg',
      '/stills/sanatorium/5.jpg',
      '/stills/sanatorium/6-1.jpg',
      '/stills/sanatorium/6-2.jpg',
    ],
    location: 'SHOT CCA · 2023',
    contentBlocks: [
      { type: 'still-pair', srcs: ['/stills/sanatorium/1-1.jpg', '/stills/sanatorium/1-2.jpg'] },
      { type: 'text', text: 'A woman checks herself into an old residential clinic seeking rest. By the second night, the silence begins to answer back. A slow-burn psychological horror shot entirely on location in an abandoned building, using only practical light and ambient sound.' },
      { type: 'still', src: '/stills/sanatorium/2.jpg' },
      { type: 'still-pair', srcs: ['/stills/sanatorium/3-1.jpg', '/stills/sanatorium/3-2.jpg'] },
      { type: 'text', text: 'This film skillfully employs a dual narrative structure to intricately depict the girl\'s challenging choices between her career and family responsibilities in a subtle and authentic manner. Through the interweaving of plotlines, viewers gain profound insights into her internal conflicts and struggles, as well as her efforts to find balance between these two crucial domains.' },
      { type: 'still-pair', srcs: ['/stills/sanatorium/4-1.jpg', '/stills/sanatorium/4-2.jpg'] },
      { type: 'still', src: '/stills/sanatorium/5.jpg' },
      { type: 'still-pair', srcs: ['/stills/sanatorium/6-1.jpg', '/stills/sanatorium/6-2.jpg'] },
    ],
  },
  // 03 — Reflections of Life
  {
    slug: 'reflections',
    title: 'Reflections of Life',
    year: '2023',
    category: 'Photography',
    services: 'Photographer · Colorist',
    aspectRatio: '16/9',
    axis: 'width',
    cover: '/films/reflection.png',
    timecode: '— / —',
    roles: 'PHOTOGRAPHER · COLORIST',
    tagline: '"Light remembers what the eye forgets."',
    genre: 'Photography · Personal',
    runtime: '—',
    format: 'Digital',
    synopsis: 'A photography series drawing on the visual language of Kieslowski — colour as memory, refraction as emotion. Shot across San Francisco and Shanghai, the series explores how light bends around the lived body.',
    videoUrl: '',
    stills: [
      '/stills/reflections/1.png',
      '/stills/reflections/4.png',
      '/stills/reflections/5.png',
      '/stills/reflections/6.png',
      '/stills/reflections/7.png',
      '/stills/reflections/8.png',
    ],
    location: 'SHOT 2023',
    contentBlocks: [
      { type: 'still', src: '/stills/reflections/1.png' },
      { type: 'section', heading: 'INSPIRATION', text: 'In contemporary cinematic art, Polish director Krzysztof Kieslowski is renowned for his meticulous visual presentation and precise use of color and refraction. His cinematic trilogy "Blue, White, Red" is celebrated for its profound symbolism, emotional expression, and exploration of the human condition.' },
      { type: 'still', src: '/stills/reflections/8.png' },
      { type: 'still', src: '/stills/reflections/4.png' },
      { type: 'still', src: '/stills/reflections/5.png' },
      { type: 'still', src: '/stills/reflections/6.png', gap: 'large' },
      { type: 'still', src: '/stills/reflections/7.png' },
    ],
  },
  // 04 — Commercial Ads
  {
    slug: 'commercial',
    title: 'Commercial Ads',
    year: '2022–2025',
    category: 'Commercial',
    services: 'Editor',
    aspectRatio: '3/2',
    axis: 'width',
    cover: '/films/commercial.png',
    timecode: '00:00 / 04:22',
    roles: 'EDITOR',
    tagline:  '"Make them feel it in three seconds."',
    genre:    'Commercial',
    runtime:  '04:22',
    format:   'Digital · Various',
    synopsis: 'A commercial reel spanning 2022–2025. Brand films, product campaigns, and event coverage edited by Rui Song for PowerCircles and other clients across the US and China.',
    videoUrl: '/films/commercial.mov',
    stills:   [],
    location: 'VARIOUS LOCATIONS · 2022–2025',
  },
  // 05 — Let Me Out
  {
    slug: 'let-me-out',
    title: 'Let Me Out',
    year: '2023',
    category: 'Experimental, Short',
    services: 'Director · Screenwriter · Editor · Colorist',
    aspectRatio: '16/9',
    axis: 'width',
    cover: '/films/let-me-out.jpg',
    timecode: '00:00 / 08:47',
    roles: 'DIRECTOR · SCREENWRITER · EDITOR · COLORIST',
    tagline:  '"The body remembers what the mind refuses."',
    genre:    'Experimental · Short',
    runtime:  '08:47',
    format:   'Digital · 24fps',
    synopsis: '"Let Me Out" is a poignant exploration of mental illness through the story of a young girl trapped in a confined space.',
    videoUrl: '',
    stills: [
      '/stills/letmeout/1.jpg',
      '/stills/letmeout/3.jpg',
      '/stills/letmeout/4.jpg',
      '/stills/letmeout/5.jpg',
      '/stills/letmeout/6.jpg',
      '/stills/letmeout/7.jpg',
      '/stills/letmeout/8.jpg',
    ],
    location: 'SHOT CCA · 2023',
    contentBlocks: [
      { type: 'text', text: '"Let Me Out" is a poignant exploration of mental illness through the story of a young girl trapped in a confined space. As the narrative unfolds, she struggles to break free, only to realize that the true captor is herself.' },
      { type: 'still-pair', srcs: ['/stills/letmeout/1.jpg', '/stills/letmeout/3.jpg'] },
      { type: 'text', text: 'The film delves into the complexities of inner battles and self-imprisonment caused by mental health issues. With an open ending, it leaves viewers reflecting on the unresolved journey of self-discovery and recovery, emphasizing the ongoing nature of the struggle.' },
      { type: 'still-pair', srcs: ['/stills/letmeout/4.jpg', '/stills/letmeout/5.jpg'] },
      { type: 'still', src: '/stills/letmeout/7.jpg' },
      { type: 'still-pair', srcs: ['/stills/letmeout/6.jpg', '/stills/letmeout/8.jpg'] },
    ],
  },
  // 06 — Bulimia
  {
    slug: 'bulimia',
    title: 'Bulimia',
    year: '2022',
    category: 'Photography · Personal',
    services: 'Photographer · Production Designer · Colorist',
    aspectRatio: '1/1',
    axis: 'width',
    cover: '/films/bulimia.png',
    timecode: '— / —',
    roles: 'PHOTOGRAPHER · PRODUCTION DESIGNER · COLORIST',
    tagline:  '"A body I never chose to fight."',
    genre:    'Photography · Personal',
    runtime:  '—',
    format:   'Digital · 24fps',
    synopsis: 'A photography series in three parts — eat, measure, purge.',
    videoUrl: '',
    stills: [
      '/stills/bulimia/1.jpg',
      '/stills/bulimia/2.jpg',
      '/stills/bulimia/3.jpg',
      '/stills/bulimia/4.jpg',
      '/stills/bulimia/5.jpg',
      '/stills/bulimia/6.jpg',
      '/stills/bulimia/7.jpg',
      '/stills/bulimia/8.jpg',
      '/stills/bulimia/9.jpg',
      '/stills/bulimia/10.jpg',
    ],
    location: 'SHOT 2022',
    contentBlocks: [
      { type: 'still-pair', srcs: ['/stills/bulimia/1.jpg', '/stills/bulimia/2.jpg'] },
      { type: 'text', text: 'With the virtualization of social media and the low cost of receiving information, an increasing number of bloggers and internet celebrities have emerged in the public eye. The development of various photo-editing software on the internet has also led to a shift in people\'s aesthetics. The distorted aesthetic of thinning faces, elongating legs, and enlarging eyes through special effects exploits the authenticity of true beauty. This has resulted in a growing number of girls experiencing body image anxiety after browsing unrealistic "body" images on the internet. The retaliatory pursuit of weight loss often leads to a harmful cycle of binge eating and purging. This work is divided into three parts—eat, measure, purge—presenting the entire process of binge eating.' },
      { type: 'still-pair', srcs: ['/stills/bulimia/3.jpg', '/stills/bulimia/4.jpg'], spacing: 'compact' },
      { type: 'still-pair', srcs: ['/stills/bulimia/5.jpg', '/stills/bulimia/6.jpg'], spacing: 'compact' },
      { type: 'still-pair', srcs: ['/stills/bulimia/7.jpg', '/stills/bulimia/8.jpg'], spacing: 'compact' },
      { type: 'text', text: 'As a call to action, we should collectively strive to promote the recognition of authentic beauty, encouraging individuals to embrace their bodies rather than being influenced by unrealistic standards. Simultaneously, we should support and advocate for diverse beauty, making everyone feel accepted and appreciated, regardless of their appearance.' },
      { type: 'still-pair', srcs: ['/stills/bulimia/9.jpg', '/stills/bulimia/10.jpg'], aspectRatio: '2/3' },
    ],
  },
];
