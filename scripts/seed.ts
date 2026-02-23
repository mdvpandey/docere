import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';

config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ducere';

// ----- Schema stubs for seeding -----
const UserSchema = new mongoose.Schema({
    name: String, email: { type: String, unique: true }, password: String,
    role: { type: String, enum: ['student', 'mentor', 'admin'], default: 'student' },
    niche: String, bio: String, isActive: { type: Boolean, default: true },
});
const WellnessSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId, mood: Number, stressLevel: Number,
    sleepHours: Number, studyHours: Number, notes: String,
    burnoutScore: { type: Number, default: 0 }, burnoutRisk: { type: String, default: 'low' },
    logDate: { type: Date, default: Date.now },
});
const StudyPlanSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId, weekLabel: String, niche: String, intensityLevel: String,
    tasks: [{ subject: String, type: String, duration: Number, day: String, priority: String, completed: { type: Boolean, default: false } }],
    aiGenerated: { type: Boolean, default: true }, focusTip: String,
});
const SkillProfileSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId, niche: String, skills: [{ name: String, level: String }],
    gaps: [{ skill: String, priority: String }],
    roadmap: [{ week: Number, skill: String, resource: String, type: String }],
    certifications: [String],
});
const BlogPostSchema = new mongoose.Schema({
    title: String, slug: { type: String, unique: true }, excerpt: String,
    content: String, category: String, tags: [String],
    isPublished: { type: Boolean, default: true }, author: String, readTime: String,
    createdAt: { type: Date, default: Date.now },
});
const AdminConfigSchema = new mongoose.Schema({
    key: { type: String, unique: true }, value: String, category: String,
    description: String, isPublic: { type: Boolean, default: false },
    updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);
const WellnessLog = mongoose.models.WellnessLog || mongoose.model('WellnessLog', WellnessSchema);
const StudyPlan = mongoose.models.StudyPlan || mongoose.model('StudyPlan', StudyPlanSchema);
const SkillProfile = mongoose.models.SkillProfile || mongoose.model('SkillProfile', SkillProfileSchema);
const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema);
const AdminConfig = mongoose.models.AdminConfig || mongoose.model('AdminConfig', AdminConfigSchema);

async function seed() {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB:', MONGODB_URI);

    // Clear existing
    await Promise.all([
        User.deleteMany({}), WellnessLog.deleteMany({}), StudyPlan.deleteMany({}),
        SkillProfile.deleteMany({}), BlogPost.deleteMany({}), AdminConfig.deleteMany({}),
    ]);
    console.log('🧹 Cleared existing data');

    // Users
    const hashedPw = await bcrypt.hash('password123', 12);
    const [admin, mentor, ...students] = await User.insertMany([
        { name: 'Super Admin', email: 'admin@ducere.app', password: hashedPw, role: 'admin', niche: undefined, bio: 'Platform administrator' },
        { name: 'Kavita Nair', email: 'mentor@ducere.app', password: hashedPw, role: 'mentor', niche: 'Software Engineering', bio: 'Senior engineer and student mentor with 12 years experience.' },
        { name: 'Rahul Kumar', email: 'student@ducere.app', password: hashedPw, role: 'student', niche: 'Software Engineering', bio: 'Full-stack dev in training.' },
        { name: 'Priya Sharma', email: 'priya@ducere.app', password: hashedPw, role: 'student', niche: 'Data Science', bio: 'Aspiring data scientist.' },
        { name: 'Ananya Singh', email: 'ananya@ducere.app', password: hashedPw, role: 'student', niche: 'UI/UX Design', bio: 'Product design enthusiast.' },
    ]);
    console.log('👥 Created users:', [admin, mentor, ...students].map((u: any) => u.email));

    // Wellness Logs for student 1 (Rahul)
    const wellnessLogs = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const stress = Math.max(2, 7 - i * 0.6 + (Math.random() - 0.5));
        const mood = Math.min(9, 5 + i * 0.4 + (Math.random() - 0.5));
        const burnoutScore = Math.max(20, Math.round(72 - i * 7 + (Math.random() - 0.5) * 5));
        wellnessLogs.push({
            userId: students[0]._id, mood: parseFloat(mood.toFixed(1)),
            stressLevel: parseFloat(stress.toFixed(1)), sleepHours: 6 + i * 0.3,
            studyHours: 7 - i * 0.2, burnoutScore, burnoutRisk: burnoutScore > 65 ? 'high' : burnoutScore > 35 ? 'moderate' : 'low',
            logDate: date,
        });
    }
    await WellnessLog.insertMany(wellnessLogs);
    console.log('💚 Created wellness logs:', wellnessLogs.length);

    // Study Plan
    await StudyPlan.insertMany([{
        userId: students[0]._id,
        weekLabel: 'Week of Jan 13–19, 2025',
        niche: 'Software Engineering',
        intensityLevel: 'moderate',
        focusTip: 'Focus on DSA and one System Design concept daily. Take a full day off on Sunday.',
        aiGenerated: true,
        tasks: [
            { subject: 'Data Structures – Binary Trees', type: 'theory', duration: 60, day: 'Monday', priority: 'high', completed: true },
            { subject: 'LeetCode Medium Problems ×5', type: 'practice', duration: 90, day: 'Monday', priority: 'high', completed: true },
            { subject: 'System Design – Load Balancers', type: 'theory', duration: 75, day: 'Tuesday', priority: 'medium', completed: false },
            { subject: 'React Hooks Deep Dive', type: 'theory', duration: 60, day: 'Wednesday', priority: 'medium', completed: false },
            { subject: 'Portfolio Project Progress', type: 'project', duration: 120, day: 'Thursday', priority: 'high', completed: false },
            { subject: 'Full Mock Test', type: 'mock-test', duration: 180, day: 'Saturday', priority: 'high', completed: false },
        ],
    }]);
    console.log('📅 Created study plan');

    // Skill Profile
    await SkillProfile.insertMany([{
        userId: students[0]._id,
        niche: 'Software Engineering',
        skills: [
            { name: 'React', level: 'intermediate' }, { name: 'TypeScript', level: 'intermediate' },
            { name: 'Node.js', level: 'beginner' }, { name: 'Git', level: 'intermediate' }, { name: 'REST APIs', level: 'intermediate' },
        ],
        gaps: [
            { skill: 'System Design', priority: 'high' }, { skill: 'Docker', priority: 'medium' },
            { skill: 'AWS', priority: 'medium' }, { skill: 'Redis', priority: 'low' },
        ],
        roadmap: [
            { week: 1, skill: 'System Design Basics', resource: 'Designing Data-Intensive Applications – Chapter 1', type: 'course' },
            { week: 2, skill: 'Docker Fundamentals', resource: 'Docker Official Tutorial + build a containerized API', type: 'project' },
            { week: 3, skill: 'AWS Core Services', resource: 'AWS Cloud Practitioner Essentials (free tier)', type: 'certification' },
            { week: 4, skill: 'Redis Caching Patterns', resource: 'Redis University RU101 (free)', type: 'course' },
        ],
        certifications: ['AWS Cloud Practitioner', 'Meta React Developer'],
    }]);
    console.log('⚡ Created skill profile');

    // Blog Posts
    await BlogPost.insertMany([
        {
            title: 'How to Prevent Student Burnout Before It Derails Your Exam',
            slug: 'how-to-prevent-student-burnout',
            excerpt: 'Burnout isn\'t a willpower problem — it\'s a system problem. Here\'s the science-backed framework.',
            content: '# How to Prevent Student Burnout\n\nBurnout happens when chronic stress exceeds recovery...',
            category: 'wellness', tags: ['burnout', 'mental health', 'anxiety'],
            author: 'Dr. Arjun Sen', readTime: '7 min read', isPublished: true,
        },
        {
            title: 'The Science of Spaced Repetition: Study Less, Remember More',
            slug: 'spaced-repetition-study-guide',
            excerpt: 'Spaced repetition can increase long-term retention by 200%. Here\'s how to implement it.',
            content: '# The Science of Spaced Repetition\n\nHermann Ebbinghaus discovered the forgetting curve in 1885...',
            category: 'study', tags: ['study techniques', 'memory', 'efficiency'],
            author: 'Kavita Nair', readTime: '9 min read', isPublished: true,
        },
        {
            title: 'Why "Any Job" is the Worst Career Goal',
            slug: 'niche-career-alignment-guide',
            excerpt: 'Graduates who target a specific niche earn 34% more. Here\'s how to find yours.',
            content: '# Why Niche Matters\n\nWhen students say "I\'ll take any job", they\'re actually reducing their chances...',
            category: 'career', tags: ['career', 'job search', 'niche'],
            author: 'Dr. Arjun Sen', readTime: '11 min read', isPublished: true,
        },
    ]);
    console.log('📝 Created blog posts');

    // Admin Configs (Super Control Panel defaults)
    await AdminConfig.insertMany([
        { key: 'enable_burnout_prediction', value: 'true', category: 'feature', description: 'Enable AI burnout prediction for all students', isPublic: false },
        { key: 'blur_high_risk_names', value: 'true', category: 'security', description: 'Blur student names on high-risk reports', isPublic: false },
        { key: 'max_students_per_mentor', value: '30', category: 'limits', description: 'Maximum students a mentor can manage', isPublic: false },
        { key: 'ai_plan_intensity_cap', value: '0.7', category: 'ai', description: 'Max intensity multiplier for AI study plans (0–1)', isPublic: false },
        { key: 'free_plan_monthly_plans', value: '1', category: 'limits', description: 'Study plans per month for free users', isPublic: true },
        { key: 'platform_title', value: 'DUCERE', category: 'branding', description: 'Platform display name', isPublic: true },
        { key: 'enable_blog_comments', value: 'false', category: 'feature', description: 'Allow students to comment on blog posts', isPublic: false },
        { key: 'feedback_analysis_model', value: 'rule-based', category: 'ai', description: 'AI model: rule-based / openai / gemini', isPublic: false },
    ]);
    console.log('⚙️ Created admin configs');

    console.log('\n🎉 DUCERE database seeded successfully!\n');
    console.log('Demo accounts (password: password123):');
    console.log('  Admin:   admin@ducere.app');
    console.log('  Mentor:  mentor@ducere.app');
    console.log('  Student: student@ducere.app');

    await mongoose.disconnect();
}

seed().catch((err) => {
    console.error('❌ Seed failed:', err);
    process.exit(1);
});
