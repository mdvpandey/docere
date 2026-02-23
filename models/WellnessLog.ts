import mongoose, { Schema, Document, models } from 'mongoose';

export interface IWellnessLog extends Document {
    userId: mongoose.Types.ObjectId;
    date: Date;
    mood: number;
    stress: number;
    sleepHours: number;
    studyHours: number;
    notes?: string;
    burnoutScore?: number;
    burnoutRisk?: 'low' | 'moderate' | 'high';
    createdAt: Date;
}

const WellnessLogSchema = new Schema<IWellnessLog>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        date: { type: Date, required: true, default: Date.now },
        mood: { type: Number, min: 1, max: 10, required: true },
        stress: { type: Number, min: 1, max: 10, required: true },
        sleepHours: { type: Number, min: 0, max: 24, required: true },
        studyHours: { type: Number, min: 0, max: 24, required: true },
        notes: { type: String, maxlength: 500 },
        burnoutScore: { type: Number, min: 0, max: 100 },
        burnoutRisk: { type: String, enum: ['low', 'moderate', 'high'] },
    },
    { timestamps: true },
);

WellnessLogSchema.index({ userId: 1, date: -1 });

export default models.WellnessLog || mongoose.model<IWellnessLog>('WellnessLog', WellnessLogSchema);
