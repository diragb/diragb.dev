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
    id: 'why-we-create',
    title: 'Why We Create',
    excerpt: 'Why does anyone make anything new? On the joy of creation, beauty, and what it means to be human.',
    date: 'Mar 13, 2026',
    readTime: '3 min read',
    tags: ['Philosophy', 'Creativity', 'Culture'],
  },
  {
    id: 'optimizing-sleep',
    title: 'Optimizing Sleep',
    excerpt: 'A decade of sleep experiments, distilled into equations, heuristics, and hard-won habits.',
    date: 'Mar 15, 2026',
    readTime: '12 min read',
    tags: ['Health', 'Science', 'Habits'],
  },
]

export const publishedBlogs = blogs.filter(blog => !blog.workInProgress)
