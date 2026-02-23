import mongoose, { Schema, Document, models } from 'mongoose';

export interface IStudyTask {
    id: string;
    subject: string;
    type: 'theory' | 'practice' | 'project' | 'revision' | 'mock-test';
    duration: number;
    day: string;
    priority: 'low' | 'medium' | 'high';
    completed: boolean;
}

export interface IStudyPlan extends Document {
    userId: mongoose.Types.ObjectId;
    weekStart: Date;
    tasks: IStudyTask[];
    aiGenerated: boolean;
    intensityLevel: 'light' | 'moderate' | 'intensive';
    focusTip: string;
    niche: string;
    weekLabel: string;
    createdAt: Date;
    updatedAt: Date;
}

const StudyTaskSchema = new Schema<IStudyTask>(
    {
        id: { type: String, required: true },
        subject: { type: String, required: true },
        type: { type: String, enum: ['theory', 'practice', 'project', 'revision', 'mock-test'] },
        duration: { type: Number, default: 60 },
        day: { type: String },
        priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
        completed: { type: Boolean, default: false },
    },
    { _id: false },
);

const StudyPlanSchema = new Schema<IStudyPlan>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        weekStart: { type: Date, required: true },
        tasks: [StudyTaskSchema],
        aiGenerated: { type: Boolean, default: true },
        intensityLevel: { type: String, enum: ['light', 'moderate', 'intensive'], default: 'moderate' },
        focusTip: { type: String },
        niche: { type: String, default: 'General' },
        weekLabel: { type: String },
    },
    { timestamps: true },
);

StudyPlanSchema.index({ userId: 1, weekStart: -1 });

export default models.StudyPlan || mongoose.model<IStudyPlan>('StudyPlan', StudyPlanSchema);
