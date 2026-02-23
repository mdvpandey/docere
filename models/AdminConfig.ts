import mongoose, { Schema, Document, models } from 'mongoose';

export interface IAdminConfig extends Document {
    key: string;
    value: unknown;
    type: 'boolean' | 'string' | 'number' | 'json' | 'color';
    module: string;
    label: string;
    description?: string;
    isEnabled: boolean;
    order?: number;
    createdAt: Date;
    updatedAt: Date;
}

const AdminConfigSchema = new Schema<IAdminConfig>(
    {
        key: { type: String, required: true, unique: true },
        value: { type: Schema.Types.Mixed, required: true },
        type: { type: String, enum: ['boolean', 'string', 'number', 'json', 'color'], required: true },
        module: { type: String, required: true },
        label: { type: String, required: true },
        description: { type: String },
        isEnabled: { type: Boolean, default: true },
        order: { type: Number, default: 0 },
    },
    { timestamps: true },
);

AdminConfigSchema.index({ module: 1 });
AdminConfigSchema.index({ key: 1 });

export default models.AdminConfig || mongoose.model<IAdminConfig>('AdminConfig', AdminConfigSchema);
