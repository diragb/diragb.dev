// Typescript:
export interface BlogMeta {
  id: string
  title: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
  workInProgress?: boolean
}

export interface BlogPost extends BlogMeta {
  content: string
}

// Constants:
export const blogs: BlogMeta[] = [
  {
    id: 'bosdac',
    title: 'Building BOSDAC',
    excerpt: 'ISRO broadcasts free live satellite imagery. The website it\'s on is terrible. So I built a better one.',
    date: 'Mar 31, 2026',
    readTime: '8 min read',
    tags: ['Engineering', 'ISRO', 'Open Source'],
  },
  {
    id: 'optimizing-sleep',
    title: 'Optimizing Sleep',
    excerpt: 'A decade of sleep experiments, distilled into equations, heuristics, and hard-won habits.',
    date: 'Mar 15, 2026',
    readTime: '12 min read',
    tags: ['Health', 'Science', 'Habits'],
  },
  {
    id: 'why-we-create',
    title: 'Why We Create',
    excerpt: 'Why does anyone make anything new? On the joy of creation, beauty, and what it means to be human.',
    date: 'Mar 13, 2026',
    readTime: '3 min read',
    tags: ['Philosophy', 'Creativity', 'Culture'],
  },
]

export const publishedBlogs = blogs.filter(blog => !blog.workInProgress)
