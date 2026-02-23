import { z } from 'zod';

// Auth
export const RegisterSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    role: z.enum(['student', 'mentor', 'admin']).default('student'),
});

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, 'Password required'),
});

// Wellness
export const WellnessLogSchema = z.object({
    mood: z.number().min(1).max(10),
    stress: z.number().min(1).max(10),
    sleepHours: z.number().min(0).max(24),
    studyHours: z.number().min(0).max(24),
    notes: z.string().max(500).optional(),
    date: z.string().optional(),
});

// Study Plan
export const GenerateStudyPlanSchema = z.object({
    niche: z.string().min(1),
});

export const UpdateTaskSchema = z.object({
    taskId: z.string(),
    completed: z.boolean(),
});

// Skills
export const SkillAnalysisSchema = z.object({
    niche: z.string().min(1),
    role: z.string().min(1),
    skills: z.array(z.string()),
});

// Career
export const CareerProfileSchema = z.object({
    preferredRole: z.string().min(1),
    targetSalary: z.number().optional(),
    experience: z.string().optional(),
    education: z.string().optional(),
    skills: z.array(z.string()).optional(),
    bio: z.string().max(500).optional(),
});

// Feedback
export const FeedbackSchema = z.object({
    difficultyRating: z.number().min(1).max(10),
    satisfactionScore: z.number().min(1).max(10),
    stressTriggers: z.array(z.string()).optional(),
    comments: z.string().max(1000).optional(),
    weekOf: z.string().optional(),
});

// Admin Config
export const AdminConfigSchema = z.object({
    key: z.string().min(1),
    value: z.any(),
    type: z.enum(['boolean', 'string', 'number', 'json', 'color']),
    module: z.string(),
    label: z.string(),
    isEnabled: z.boolean().optional(),
});

// Blog
export const BlogPostSchema = z.object({
    title: z.string().min(5),
    slug: z.string().min(3),
    content: z.string().min(50),
    category: z.enum(['wellness', 'study', 'career', 'research']),
    tags: z.array(z.string()).optional(),
    published: z.boolean().default(false),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type WellnessLogInput = z.infer<typeof WellnessLogSchema>;
export type SkillAnalysisInput = z.infer<typeof SkillAnalysisSchema>;
export type CareerProfileInput = z.infer<typeof CareerProfileSchema>;
export type FeedbackInput = z.infer<typeof FeedbackSchema>;
export type AdminConfigInput = z.infer<typeof AdminConfigSchema>;
