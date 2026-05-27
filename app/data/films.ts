export type ContentBlock =
  | { type: 'text';         text: string }
  | { type: 'section';      heading: string; text: string }
  | { type: 'still';        src: string; gap?: 'large' }
  | { type: 'still-pair';   srcs: [string, string]; gap?: 'large'; spacing?: 'compact'; aspectRatio?: string; positions?: [string, string] }
  | { type: 'still-triple'; srcs: [string, string, string] }
  | { type: 'image';        src: string; size?: 'small' }
  | { type: 'press-quote'; quote: string; attribution: string; url?: string; hint?: string }
  | { type: 'download-link'; label: string; href: string }
  | { type: 'bts-grid';   srcs: string[]; positions?: string[]; aspects?: string[] }
  | { type: 'divider' }
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
  runtimeLabel?:    string;
  format:           string;
  formatLabel?:     string;
  synopsis:         string;
  videoUrl:         string;
  stills:           string[];
  location:         string;
  pressKitUrl?:     string;

  awards?:          { text: string; url?: string }[];
  screenings?:      string[];
  directorStatement?: string;
  contentBlocks?:   ContentBlock[];
};

export const films: Film[] = [
  // 01 — Heirloom
  {
    slug: 'heirloom',
    title: 'Heirloom',
    year: 'February 2024',
    category: 'Drama, Short',
    services: 'Director · Screenwriter · Co-producer · Editor',
    aspectRatio: '3/4',
    axis: 'height',
    cover: '/films/Heirloom_Poster.png',
    timecode: '00:00 / 13:17',
    roles: 'DIRECTOR · SCREENWRITER · CO-PRODUCER · EDITOR',
    tagline:  '"You don\'t know him."',
    genre:    'Comedy · Drama · LGBTQ+',
    runtime:  '13:17',
    format:   'RED Komodo 6K · 23.976fps',
    synopsis: 'Following his coming out, a young man is astonished to discover his parents not only knew but accepted his homosexuality, contingent upon the condition that he must father a child to inherit the cherished family heirloom. Overwhelmed, he engages in a heated dispute with his parents, yet the accidental shattering of the heirloom unveils a long-buried secret.',
    videoUrl: 'https://pub-214726c9759841f7aba115899adf9a7e.r2.dev/films/heirloom.mov',
    stills: [
      '/stills/heirloom/1.jpg',
      '/stills/heirloom/2.jpg',
      '/stills/heirloom/3.jpg',
      '/stills/heirloom/4.jpg',
      '/stills/heirloom/5.jpg',
      '/stills/heirloom/6.jpg',
      '/stills/heirloom/7.jpg',
    ],

    location: 'SHOT IN SAN FRANCISCO',
    pressKitUrl: '/films/heirloom-press-kit.pdf',
    awards: [
      { text: 'Official Selection · 27th Kyoto International Student Film & Video Festival (2025)', url: 'https://www.consortium.or.jp/en/project/kisfvf/details/2024-2' },
      { text: 'Official Selection · San Francisco Another Hole in the Head Film Festival — Strictly Local II, December 8, 2024', url: 'https://holehead2024.eventive.org/films/heirloom-671997f6f12b3b004193fb7e' },
      { text: 'Official Selection · San Antonio QFest-LGBT International Film Festival — October 12, 2024', url: '/films/san-antonio-qfest-2024.pdf' },
      { text: 'Award Winner · Best Editing — Chicago Filmmaker Awards (October 2024)',               url: 'https://cifawards.net/2024/10/23/winners-october-2024/' },
      { text: 'Award Winner · Best LGBTQ Short — San Francisco Arthouse Short Festival (July 2024)', url: 'https://sanfranciscoindieshort.com/winners-july-2024/' },
      { text: 'Award Winner · Best LGBTQ Short — Berlin Short Film Festival (July 2024)',            url: 'https://berlinshortsaward.com/winners-july-2024/' },
      { text: 'Award Winner · Best LGBTQ Short — Madrid Arthouse Film Festival (October 2024)',      url: 'https://maffestival.com/winners-october-2024/' },
      { text: 'Award Winner · Best LGBTQ Short — Phoenix Shorts (August 2024)',                      url: 'https://phoenixshortfestival.com/winners-august-2024/' },
      { text: 'Honorable Mention · Best LGBTQ Film — Los Angeles Short Film Awards (October 9, 2024)' },
      { text: 'Semi-Finalist · Atlanta Movie Awards (July 2024)' },
      { text: 'Semi-Finalist · Brooklyn International Short Awards (July 2024)' },
      { text: 'Semi-Finalist · Hong Kong Indie Film Festival (August 2024)' },
      { text: 'Semi-Finalist · Paris International Short Festival (August 2024)' },
      { text: 'Semi-Finalist · Tokyo ShortFest (November 2024)' },
    ],
    screenings: [
      '27th Kyoto International Student Film & Video Festival · Museum of Kyoto Film Theater, Kyoto — February 6–9, 2025',
      'Another Hole in the Head Film Festival · Balboa Theater, San Francisco — December 8, 2024',
      'San Antonio QFest · City Base Cinemas, San Antonio — October 12, 2024',
      'Theatrical Screening · The Roxie Theater, San Francisco — May 7, 2024',
    ],
    directorStatement: 'This film began with a wish I have held quietly for years. As a member of the LGBTQ+ community, I have never openly come out to my parents. They love me, and I have considered telling them. But I hesitate — to demand that they understand me through the lens of a society they did not grow up in feels selfish.\n\nThe story that finally pushed me to write Heirloom was not mine, but a friend\'s. He is gay, financially independent, living alone in the United States. To negotiate his freedom, he made an agreement with his parents back in China: he would father a child through surrogacy, and his parents would take the child to China to raise as grandparents. He could continue to live in the U.S. without marriage. The arrangement worked for him. But I could not stop thinking about the child — and the strange ways love bargains with itself across borders.\n\nI chose to make Heirloom a comedy because I do not believe LGBTQ+ family stories must arrive solemn to arrive serious. The film unfolds entirely at a dinner table. A son comes out. The parents already knew. A cat breaks an heirloom. A father confesses the heirloom was a fake all along. Nobody resolves the question of whether there will be a child. Everyone keeps eating dessert. This is, in my experience, how family negotiations actually feel — absurd, anticlimactic, and somehow tender anyway.\n\nI trained as a choreographer before I trained as a filmmaker, and Heirloom carries that training. I use music and rhythm to shape how the story moves; the protagonist drifts into his interior world through dance; jump cuts carry emotional weight that words cannot. I hope this lends the film a peculiar texture — something between a sitcom dinner scene and a quiet Sunday afternoon.\n\nIf Heirloom brings warmth, or recognition, or a bit of relief to LGBTQ+ families watching, that is the most I could ask.',
    contentBlocks: [
      { type: 'video' },
      { type: 'text', text: 'This film began with a wish I have held quietly for years. As a member of the LGBTQ+ community, I have never openly come out to my parents. They love me, and I have considered telling them. But I hesitate — to demand that they understand me through the lens of a society they did not grow up in feels selfish.' },
      { type: 'still-pair', srcs: ['/stills/heirloom/2.jpg', '/stills/heirloom/3.jpg'], positions: ['right center', 'right center'] },
      { type: 'text', text: 'The story that finally pushed me to write Heirloom was not mine, but a friend\'s. He is gay, financially independent, living alone in the United States. To negotiate his freedom, he made an agreement with his parents back in China: he would father a child through surrogacy, and his parents would take the child to China to raise as grandparents. He could continue to live in the U.S. without marriage. The arrangement worked for him. But I could not stop thinking about the child — and the strange ways love bargains with itself across borders.' },
      { type: 'still', src: '/stills/heirloom/4.jpg' },
      { type: 'text', text: 'I chose to make Heirloom a comedy because I do not believe LGBTQ+ family stories must arrive solemn to arrive serious. The film unfolds entirely at a dinner table. A son comes out. The parents already knew. A cat breaks an heirloom. A father confesses the heirloom was a fake all along. Nobody resolves the question of whether there will be a child. Everyone keeps eating dessert. This is, in my experience, how family negotiations actually feel — absurd, anticlimactic, and somehow tender anyway.' },
      { type: 'still-pair', srcs: ['/stills/heirloom/6.jpg', '/stills/heirloom/7.jpg'] },
      { type: 'text', text: 'I trained as a choreographer before I trained as a filmmaker, and Heirloom carries that training. I use music and rhythm to shape how the story moves; the protagonist drifts into his interior world through dance; jump cuts carry emotional weight that words cannot. I hope this lends the film a peculiar texture — something between a sitcom dinner scene and a quiet Sunday afternoon.' },
      { type: 'still-pair', srcs: ['/stills/heirloom/1.jpg', '/stills/heirloom/5.jpg'], positions: ['right center', 'center'] },
      { type: 'text', text: 'If Heirloom brings warmth, or recognition, or a bit of relief to LGBTQ+ families watching, that is the most I could ask.' },
      { type: 'press-quote', quote: 'In Heirloom, the filmmaker delves into the complexities of family, identity, and the evolving dynamics of LGBTQ+ relationships.', attribution: '— Patrick Roy, UniversalCinema Magazine', url: 'https://universalcinema.net/heirloom-navigating-family-identity-and-surrogacy-in-lgbtq-narratives/' },
      { type: 'divider' },
      { type: 'press-quote', quote: 'Heirloom is listed on Filmarks, Japan\'s largest film review platform, following its Japan premiere at the 27th Kyoto International Student Film & Video Festival — one of 16 films selected from 511 international submissions worldwide.', attribution: 'Filmarks · Japan\'s Largest Film Review Platform', url: 'https://filmarks.com/movies/121171', hint: 'VIEW ON FILMARKS ↗' },
      { type: 'awards' },
      { type: 'screenings' },
      { type: 'image', src: '/stills/heirloom/vip.png', size: 'small' },
      {
        type: 'bts-grid',
        srcs: [
          '/stills/heirloom/bts/bts-8.jpg',   // full set wide
          '/stills/heirloom/bts/bts-7.jpg',   // monitor hero
          '/stills/heirloom/bts/bts-4.jpg',   // cast gallery portrait
          '/stills/heirloom/bts/bts-9.jpg',   // clapperboard
          '/stills/heirloom/bts/bts-3.jpg',   // crew on set portrait
          '/stills/heirloom/bts/bts-12.jpg',  // production gimbal
          '/stills/heirloom/bts/bts-5.jpg',   // actor with food portrait
          '/stills/heirloom/bts/bts-2.jpg',   // crew around camera
          '/stills/heirloom/bts/bts-11.jpg',  // mirror portrait
          '/stills/heirloom/bts/bts-10.jpg',  // kitchen set portrait
          '/stills/heirloom/bts/bts-1.jpg',   // editing screen portrait
          '/stills/heirloom/bts/bts-6.jpg',   // theater portrait
        ],
        positions: ['center', 'center', 'center 25%', 'center 35%', 'center', 'center', 'center', 'center', 'center', 'center top', 'center', 'center'],
        aspects:   ['4/3',   '16/9',  '3/4',         '4/3',        '4/3',    '4/3',    '4/3',    '4/3',   '4/3',   '4/3',         '4/3',   '4/3'  ],
      },
    ],
  },
  // 02 — SANATORIUM
  {
    slug: 'sanatorium',
    title: 'SANATORIUM',
    year: 'November 2021',
    category: 'Drama, Short',
    services: 'Director · Screenwriter',
    aspectRatio: '4/5',
    axis: 'height',
    cover: '/films/sanatorium.jpg',
    timecode: '00:00 / 07:36',
    roles: 'DIRECTOR · SCREENWRITER',
    tagline:  '"Family is not always a story of arrival."',
    genre:    'Drama · Family · Short',
    runtime:  '07:36',
    format:   'Sony A7S III · 24fps',
    synopsis: 'A young dancer\'s rising career and her father\'s quiet decline in a distant nursing home unfold side by side — a dual portrait of love, ambition, and the limits of care, both given and received.',
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

    location: 'SHOT IN BEIJING',
    contentBlocks: [
      { type: 'still-pair', srcs: ['/stills/sanatorium/1-1.jpg', '/stills/sanatorium/1-2.jpg'] },
      { type: 'text', text: 'This film began with a question I couldn\'t put down: when we chase the work we love, what — and who — do we leave behind?' },
      { type: 'text', text: 'As a dancer and a filmmaker, I know intimately the kind of devotion that swallows a life whole. Rehearsal rooms, film sets, deadline after deadline — they become the architecture of who we are, and they quietly turn "home" into something distant. The daughter in this film is me, and she is many of us. She loves to dance. Dance is the proof of her being. And her father, meanwhile, is moving through days she will never witness, in a nursing home she rarely visits.' },
      { type: 'still', src: '/stills/sanatorium/2.jpg' },
      { type: 'text', text: 'I chose a dual narrative because this story lives in two places at once.\n\nOne thread unfolds inside the nursing home. Her father and his close friend practice Tai Chi together — a quiet language shared by a generation of Chinese elders, a way of holding the body steady against time and loneliness. When the friend hurts his back, his family lives nearby and arrives immediately, voicing the outrage he is too proud to voice himself. Her father has no such voice. His daughter is too busy, too far. So when the nurse, exhausted, snaps at him over a meal, he absorbs it alone.' },
      { type: 'still', src: '/stills/sanatorium/5.jpg' },
      { type: 'still-pair', srcs: ['/stills/sanatorium/4-1.jpg', '/stills/sanatorium/4-2.jpg'] },
      { type: 'text', text: 'Research suggests elders whose children visit often are cared for better. It is not a surprising finding, but on a single face, it becomes a dull, particular ache.\n\nStill, I refuse to make the nurse a villain. Patience is a finite resource in all of us. We cannot always fully care for our own parents — how can we demand it of a stranger? This film does not want to judge. It wants to look — at people caught inside a structural bind, each doing what they can with what they have.' },
      { type: 'still-pair', srcs: ['/stills/sanatorium/6-1.jpg', '/stills/sanatorium/6-2.jpg'] },
      { type: 'text', text: 'The other thread is on her set. She rehearses, films, dances — and in nearly every frame, a faint second figure moves with her. It is her father\'s shadow. It is the worry she cannot set down. It is the unspoken hesitation that lives between every turn and every landing. Dance is the signature I want to leave on this film, and the proof that cinema can reach the places words can\'t.' },
      { type: 'still-pair', srcs: ['/stills/sanatorium/3-1.jpg', '/stills/sanatorium/3-2.jpg'] },
      { type: 'text', text: 'The film offers no answer. It only asks: when was the last time you called home?' },
    ],
  },
  // 03 — Reflections of Life
  {
    slug: 'reflections',
    title: 'Reflections of Life',
    year: 'October 2023',
    category: 'Photography',
    services: 'Photographer · Colorist',
    aspectRatio: '16/9',
    axis: 'width',
    cover: '/films/reflection.png',
    timecode: 'CCA PROJECT',
    roles: 'PHOTOGRAPHER · COLORIST',
    tagline: '"Light remembers what the eye forgets."',
    genre: 'Color Study · Personal',
    runtime: 'CCA PROJECT',
    runtimeLabel: 'CONTEXT',
    format: 'Canon G7X II',
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
    location: 'SHOT IN SAN FRANCISCO',
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
    year: 'October 2022',
    category: 'Commercial',
    services: 'Editor',
    aspectRatio: '3/2',
    axis: 'width',
    cover: '/films/commercial.png',
    timecode: '00:00 / 00:40',
    roles: 'EDITOR',
    tagline:  '"Make them feel it in three seconds."',
    genre:    'Commercial Advertisement',
    runtime:  '0:40',
    format:   'Premiere Pro · DaVinci Resolve',
    formatLabel: 'TOOLS',
    synopsis: 'A commercial reel spanning 2022–2025. Brand films, product campaigns, and event coverage edited by Rui Song for PowerCircles.',
    videoUrl: 'https://pub-214726c9759841f7aba115899adf9a7e.r2.dev/films/commercial.mov',
    stills:   [],
    location: 'SHOT IN BEIJING',
    contentBlocks: [
      { type: 'video' },
      { type: 'text', text: 'A commercial reel spanning 2022–2025. Brand films, product campaigns, and event coverage edited by Rui Song for PowerCircles.' },
    ],
  },
  // 05 — Let Me Out
  {
    slug: 'let-me-out',
    title: 'Let Me Out',
    year: 'April 2023',
    category: 'Experimental, Short',
    services: 'Director · Screenwriter · Editor · Colorist',
    aspectRatio: '16/9',
    axis: 'width',
    cover: '/films/let-me-out.jpg',
    timecode: '00:00 / 04:30',
    roles: 'DIRECTOR · SCREENWRITER · EDITOR · COLORIST',
    tagline:  '"She is the lock."',
    genre:    'Experimental · Short',
    runtime:  '04:30',
    format:   'BMPCC 4K · 24FPS',
    synopsis: 'A young woman claws at the walls of a small room she cannot remember entering — until she recognizes the architecture as her own.',
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
    location: 'SHOT IN SAN FRANCISCO',
    contentBlocks: [
      { type: 'still-pair', srcs: ['/stills/letmeout/1.jpg', '/stills/letmeout/3.jpg'] },
      { type: 'text', text: '"Let Me Out" stages the claustrophobia of mental illness through a young woman trapped in a confined space. As she fights to break free, she comes to realize the true captor is herself.' },
      { type: 'still-pair', srcs: ['/stills/letmeout/4.jpg', '/stills/letmeout/5.jpg'] },
      { type: 'text', text: 'The film traces the architecture of self-imprisonment: the walls we build, the doors we refuse to find. With an open ending, it leaves the viewer inside the unresolved work of recovery — because the struggle is not the obstacle. The struggle is the form.' },
      { type: 'still', src: '/stills/letmeout/7.jpg' },
      { type: 'still-pair', srcs: ['/stills/letmeout/6.jpg', '/stills/letmeout/8.jpg'] },
    ],
  },
  // 06 — Bulimia
  {
    slug: 'bulimia',
    title: 'Bulimia',
    year: 'May 2020',
    category: 'Photography · Personal',
    services: 'Photographer · Production Designer · Colorist',
    aspectRatio: '1/1',
    axis: 'width',
    cover: '/films/bulimia.png',
    timecode: 'PERSONAL PROJECT',
    roles: 'PHOTOGRAPHER · PRODUCTION DESIGNER · COLORIST',
    tagline:  '"Before the mirror, before me."',
    genre:    'Conceptual · Personal',
    runtime:  'PERSONAL PROJECT',
    runtimeLabel: 'CONTEXT',
    format:   'Canon G7X II',
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
    location: 'SHOT IN QINGHAI',
    contentBlocks: [
      { type: 'still-pair', srcs: ['/stills/bulimia/1.jpg', '/stills/bulimia/2.jpg'] },
      { type: 'text', text: '"Bulimia" is a three-part photographic work — eat, measure, purge — tracing the closed loop of a body trying to meet an image. Each chapter holds one phase of the cycle: the meal that begins as comfort, the scale that translates the body into a number, the body\'s revolt against itself.' },
      { type: 'still-pair', srcs: ['/stills/bulimia/3.jpg', '/stills/bulimia/4.jpg'], spacing: 'compact' },
      { type: 'still-pair', srcs: ['/stills/bulimia/5.jpg', '/stills/bulimia/6.jpg'], spacing: 'compact' },
      { type: 'still-pair', srcs: ['/stills/bulimia/7.jpg', '/stills/bulimia/8.jpg'], spacing: 'compact' },
      { type: 'text', text: 'Made in 2020, the series sits at the intersection of self-portrait and social critique. It records what happens when the algorithm-thinned face and the impossible silhouette migrate from the screen into the mirror — and refuses the wellness-language of "self-love" and "diverse beauty" that has emerged to dress the wound without naming it.' },
      { type: 'still-pair', srcs: ['/stills/bulimia/9.jpg', '/stills/bulimia/10.jpg'], aspectRatio: '2/3' },
      { type: 'text', text: 'Content note: depictions of disordered eating.' },
    ],
  },
];
