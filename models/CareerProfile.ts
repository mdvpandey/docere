import mongoose, { Schema, Document, models } from 'mongoose';

export interface ICareerProfile extends Document {
    userId: mongoose.Types.ObjectId;
    preferredRole: string;
    targetSalary?: number;
    experience?: string;
    education?: string;
    bio?: string;
    skills: string[];
    resumeData: {
        summary?: string;
        workExperience?: Array<{ title: string; company: string; duration: string; description: string }>;
        projects?: Array<{ name: string; description: string; tech: string[]; url?: string }>;
        education?: Array<{ degree: string; institution: string; year: string }>;
    };
    mockInterviews: Array<{
        scheduledAt: Date;
        topic: string;
        status: 'scheduled' | 'completed' | 'cancelled';
        feedback?: string;
        score?: number;
    }>;
    jobApplications: Array<{
        company: string;
        role: string;
        status: 'applied' | 'interview' | 'offer' | 'rejected';
        appliedAt: Date;
        url?: string;
    }>;
    createdAt: Date;
    updatedAt: Date;
}

const CareerProfileSchema = new Schema<ICareerProfile>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
        preferredRole: { type: String, default: '' },
        targetSalary: { type: Number },
        experience: { type: String },
        education: { type: String },
        bio: { type: String, maxlength: 500 },
        skills: [{ type: String }],
        resumeData: {
            summary: String,
            workExperience: [{ title: String, company: String, duration: String, description: String }],
            projects: [{ name: String, description: String, tech: [String], url: String }],
            education: [{ degree: String, institution: String, year: String }],
        },
        mockInterviews: [
            {
                scheduledAt: Date,
                topic: String,
                status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' },
                feedback: String,
                score: { type: Number, min: 0, max: 10 },
            },
        ],
        jobApplications: [
            {
                company: String,
                role: String,
                status: { type: String, enum: ['applied', 'interview', 'offer', 'rejected'], default: 'applied' },
                appliedAt: { type: Date, default: Date.now },
                url: String,
            },
        ],
    },
    { timestamps: true },
);

export default models.CareerProfile || mongoose.model<ICareerProfile>('CareerProfile', CareerProfileSchema);
