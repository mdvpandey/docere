import mongoose, { Schema, Document, models } from 'mongoose';

export interface IFeedback extends Document {
    userId: mongoose.Types.ObjectId;
    weekOf: Date;
    difficultyRating: number;
    satisfactionScore: number;
    stressTriggers: string[];
    comments?: string;
    aiAnalysis?: {
        sentiment: 'positive' | 'neutral' | 'negative';
        keyThemes: string[];
        recommendations: string[];
        confidenceScore: number;
    };
    mentorComment?: string;
    createdAt: Date;
}

const FeedbackSchema = new Schema<IFeedback>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        weekOf: { type: Date, required: true, default: Date.now },
        difficultyRating: { type: Number, min: 1, max: 10, required: true },
        satisfactionScore: { type: Number, min: 1, max: 10, required: true },
        stressTriggers: [{ type: String }],
        comments: { type: String, maxlength: 1000 },
        aiAnalysis: {
            sentiment: { type: String, enum: ['positive', 'neutral', 'negative'] },
            keyThemes: [String],
            recommendations: [String],
            confidenceScore: Number,
        },
        mentorComment: { type: String, maxlength: 500 },
    },
    { timestamps: true },
);

FeedbackSchema.index({ userId: 1, weekOf: -1 });

export default models.Feedback || mongoose.model<IFeedback>('Feedback', FeedbackSchema);
