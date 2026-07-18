import { Router } from 'express'
import { PrismaClient, BlogCategory } from '@prisma/client'

const prisma = new PrismaClient()
export const blogsRouter = Router()

// GET /api/blogs
blogsRouter.get('/', async (req, res) => {
  const { category } = req.query
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        isPublished: true,
        ...(category ? { category: category as BlogCategory } : {})
      },
      orderBy: { publishedAt: 'desc' }
    })
    return res.json(blogs)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch blogs' })
  }
})

// GET /api/blogs/category/:category
blogsRouter.get('/category/:category', async (req, res) => {
  const { category } = req.params
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        isPublished: true,
        category: category.toUpperCase() as BlogCategory
      },
      orderBy: { publishedAt: 'desc' }
    })
    return res.json(blogs)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch blogs by category' })
  }
})

// GET /api/blogs/:slug
blogsRouter.get('/:slug', async (req, res) => {
  const { slug } = req.params
  try {
    const blog = await prisma.blog.findUnique({
      where: { slug }
    })

    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found' })
    }

    // Increment view count asynchronously
    prisma.blog.update({
      where: { id: blog.id },
      data: { viewCount: { increment: 1 } }
    }).catch(err => console.error('Failed to increment view count:', err))

    return res.json(blog)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch blog post' })
  }
})
