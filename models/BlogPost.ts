import mongoose, { Schema, Document, models } from 'mongoose';

export interface IBlogPost extends Document {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    author: string;
    category: 'wellness' | 'study' | 'career' | 'research';
    tags: string[];
    imageUrl?: string;
    published: boolean;
    readMinutes: number;
    views: number;
    publishedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
    {
        title: { type: String, required: true, trim: true },
        slug: { type: String, required: true, unique: true, lowercase: true },
        excerpt: { type: String, required: true, maxlength: 300 },
        content: { type: String, required: true },
        author: { type: String, required: true },
        category: { type: String, enum: ['wellness', 'study', 'career', 'research'], required: true },
        tags: [{ type: String }],
        imageUrl: { type: String },
        published: { type: Boolean, default: false },
        readMinutes: { type: Number, default: 5 },
        views: { type: Number, default: 0 },
        publishedAt: { type: Date },
    },
    { timestamps: true },
);

BlogPostSchema.index({ slug: 1 });
BlogPostSchema.index({ category: 1, published: 1 });

export default models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
