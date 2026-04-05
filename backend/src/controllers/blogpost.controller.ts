import { Response, Request } from "express";
import prisma from "../db/prisma";
import { createBlogPostSchema } from "../schemas/blogpost.schema";

export const getAllBlogPosts = async (req: Request, res: Response) => {
    try {
        const posts = await prisma.blogPost.findMany();
        res.json({ success: true, data: posts.map(formatBlogPost) });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const getBlogPostById = async (req: Request, res: Response) => {
    try {
        const post = await prisma.blogPost.findFirst({
            where: { id: req.params.id },
        });
        if (!post) {
            return res.status(404).json({ success: false, message: "Blog post not found" });
        }
        res.json({ success: true, data: formatBlogPost(post) });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const createBlogPost = async (req: Request, res: Response) => {
    try {
        const validation = createBlogPostSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({ success: false, message: "Invalid data", errors: validation.error.issues });
        }
        const data = validation.data;
        const newProject = await prisma.blogPost.create({
            data: {
                title: data.title,
                slug: data.slug,
                content: data.content,
                description: data.description,
                coverImage: data.coverImage,
                readTime: data.readTime,
                authorId: data.authorId,
                isPublished: data.isPublished,
                category: data.category,
                tags: data.tags.join(','),
            },
        });
        res.json({ success: true, data: formatBlogPost(newProject) });
    } catch (error: any) {
        if (error === 'P2002') {
            res.status(400).json({ success: false, message: "Slug must be unique" });
        }
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const updateBlogPost = async (req: Request, res: Response) => {
    try {
        const validation = createBlogPostSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({ success: false, message: "Invalid data", errors: validation.error.issues });
        }
        const data = validation.data;
        const updatedPost = await prisma.blogPost.update({
            where: { id: req.params.id },
            data: {
                title: data.title,
                slug: data.slug,
                content: data.content,
                description: data.description,
                coverImage: data.coverImage,
                readTime: data.readTime,
                authorId: data.authorId,
                isPublished: data.isPublished,
                category: data.category,
                tags: data.tags.join(','),
            },
        });
        res.json({ success: true, data: formatBlogPost(updatedPost) });
    } catch (error: any ) {
        if (error.code === 'P2002') {
            res.status(400).json({ success: false, message: "Slug must be unique" });
        }
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const deleteBlogPost = async (req: Request, res: Response) => {
    try {
        await prisma.blogPost.delete({
            where: { id: req.params.id },
        });
        res.json({ success: true, message: "Blog post deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const formatBlogPost = (post: any) => {
    return {
        ...post,
        tags: typeof post.tags === 'string' ? post.tags.split(',') : post.tags
    };
};