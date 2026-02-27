import mongoose, { Schema, Document, models } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    passwordHash: string;
    role: 'student' | 'mentor' | 'admin';
    avatar?: string;
    mentorId?: mongoose.Types.ObjectId;
    niche?: string;
    bio?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        passwordHash: { type: String, required: true, select: false },
        role: { type: String, enum: ['student', 'mentor', 'admin'], default: 'student' },
        avatar: { type: String },
        mentorId: { type: Schema.Types.ObjectId, ref: 'User' },
        niche: { type: String, default: 'General' },
        bio: { type: String, maxlength: 500 },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true },
);

UserSchema.index({ role: 1 });

export default models.User || mongoose.model<IUser>('User', UserSchema);
