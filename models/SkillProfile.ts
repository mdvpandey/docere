import mongoose, { Schema, Document, models } from 'mongoose';

export interface ISkillProfile extends Document {
    userId: mongoose.Types.ObjectId;
    niche: string;
    preferredRole: string;
    skills: string[];
    gaps: string[];
    roadmap: Array<{
        week: number;
        skill: string;
        resource: string;
        type: string;
        completed: boolean;
    }>;
    certifications: Array<{ name: string; provider: string; completed: boolean; url?: string }>;
    lastAnalyzed: Date;
    createdAt: Date;
    updatedAt: Date;
}

const SkillProfileSchema = new Schema<ISkillProfile>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
        niche: { type: String, default: 'General' },
        preferredRole: { type: String, default: '' },
        skills: [{ type: String }],
        gaps: [{ type: String }],
        roadmap: [
            {
                week: Number,
                skill: String,
                resource: String,
                type: String,
                completed: { type: Boolean, default: false },
            },
        ],
        certifications: [
            {
                name: String,
                provider: String,
                completed: { type: Boolean, default: false },
                url: String,
            },
        ],
        lastAnalyzed: { type: Date, default: Date.now },
    },
    { timestamps: true },
);

export default models.SkillProfile || mongoose.model<ISkillProfile>('SkillProfile', SkillProfileSchema);
