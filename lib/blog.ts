import { prisma } from './db'

export type PostMeta = {
  slug: string
  title: string
  cat: string
  date: string
  read: string
  img: string
  excerpt: string
}

export type Article = PostMeta & { content: string }

function fmtDate(d: Date): string {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

// Listing metadata for all published AI-generated posts (newest first).
export async function getDbPosts(): Promise<PostMeta[]> {
  try {
    const rows = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    })
    return rows.map((r) => ({
      slug: r.slug,
      title: r.title,
      cat: r.category,
      date: fmtDate(r.createdAt),
      read: r.readTime,
      img: r.image,
      excerpt: r.excerpt,
    }))
  } catch {
    return [] // DB unavailable — fall back to static articles only
  }
}

// Full article for a single AI-generated post.
export async function getDbPost(slug: string): Promise<Article | null> {
  try {
    const r = await prisma.blogPost.findUnique({ where: { slug } })
    if (!r || !r.published) return null
    return {
      slug: r.slug,
      title: r.title,
      cat: r.category,
      date: fmtDate(r.createdAt),
      read: r.readTime,
      img: r.image,
      excerpt: r.excerpt,
      content: r.content,
    }
  } catch {
    return null
  }
}
