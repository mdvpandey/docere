import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Features – DOCERE' };

const featureGroups = [
    {
        title: 'Wellness Tracking',
        icon: '❤️‍🔥',
        color: 'border-rose-500/30 bg-rose-500/5',
        features: [
            { name: 'Daily Mood & Stress Logging', desc: 'Log how you feel every day with intuitive sliders. Takes under 60 seconds.' },
            { name: 'Sleep & Study Tracking', desc: 'Track hours of sleep and study to see the direct correlation with performance.' },
            { name: 'Burnout Risk Prediction', desc: 'AI-powered model assesses burnout risk 2-3 weeks before it hits, giving you time to act.' },
            { name: 'Weekly Wellness Summary', desc: 'A beautiful visual summary of your wellness week, with trend lines and actionable tips.' },
        ],
    },
    {
        title: 'Adaptive Study Engine',
        icon: '🤖',
        color: 'border-indigo-500/30 bg-indigo-500/5',
        features: [
            { name: 'AI Weekly Plan Generation', desc: 'Personalized study plans generated every Monday based on your niche, stress score, and performance.' },
            { name: 'Intensity Auto-Adjustment', desc: 'If burnout risk rises, the plan automatically lightens. If you\'re thriving, intensity increases.' },
            { name: 'Task Tracker', desc: 'Kanban-style board to track daily, weekly tasks across subjects with completion analytics.' },
            { name: 'Practical Example Integration', desc: 'Every study task includes real-world examples and project links for deeper retention.' },
        ],
    },
    {
        title: 'Skill Development',
        icon: '⚡',
        color: 'border-violet-500/30 bg-violet-500/5',
        features: [
            { name: 'Niche Selection & Skill Mapping', desc: 'Choose your target field and see a precise map of required vs your current skills.' },
            { name: 'Skill Gap Analysis', desc: 'AI identifies exact missing skills for your dream role from a database of 50+ role profiles.' },
            { name: 'Learning Roadmap Generator', desc: 'Week-by-week skill-building roadmap with curated resources (courses, books, projects).' },
            { name: 'Certification Suggestions', desc: 'Get matched to the right certifications that HR managers actually look for.' },
        ],
    },
    {
        title: 'Career Mapping',
        icon: '🎯',
        color: 'border-green-500/30 bg-green-500/5',
        features: [
            { name: 'Role-Specific Career Profiles', desc: 'Choose your dream role and get a complete career blueprint tailored to it.' },
            { name: 'AI Resume Builder', desc: 'Generate a role-optimized resume from your experience, projects, and skill data.' },
            { name: 'Mock Interview Scheduling', desc: 'Book mock interview sessions with mentors focused on your target role.' },
            { name: 'Job & Internship Recommendations', desc: 'Curated opportunities matching your profile, skills, and target role from across the web.' },
        ],
    },
    {
        title: 'Mentor Assistance',
        icon: '🎓',
        color: 'border-teal-500/30 bg-teal-500/5',
        features: [
            { name: 'Assigned Mentor Dashboard', desc: 'Mentors can see all their students\' wellness scores, burnout risks, and performance trends in one view.' },
            { name: 'Real-Time Burnout Alerts', desc: 'Mentors are notified instantly when a student enters moderate or high burnout risk.' },
            { name: 'Direct Messaging', desc: 'Seamless chat between mentors and students with notification support.' },
            { name: 'Intervention Suggestions', desc: 'AI tells mentors exactly what kind of support each student needs right now.' },
        ],
    },
    {
        title: 'Admin Research Intelligence',
        icon: '🧬',
        color: 'border-orange-500/30 bg-orange-500/5',
        features: [
            { name: 'Platform-Wide Analytics', desc: 'Admins see cohort-level stress trends, dropout predictions, and performance heatmaps.' },
            { name: 'Feedback Aggregation', desc: 'Anonymized feedback data aggregated to improve curriculum and study plans over time.' },
            { name: 'Data Export (CSV/Excel)', desc: 'Export any analytics report for external research or institutional reporting.' },
            { name: 'Super-Control Config Panel', desc: 'Add/modify features, toggle modules, update content, and manage AI config — all without coding.' },
        ],
    },
];

export default function FeaturesPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0f]">
            <Navbar />
            <div className="pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center py-16 mb-8">
                        <span className="badge badge-purple mb-4">All Features</span>
                        <h1 className="text-5xl font-bold text-white mb-4">Built for Every Dimension<br />of Student Success</h1>
                        <p className="text-xl text-white/60 max-w-2xl mx-auto">6 intelligent systems, seamlessly integrated into one platform.</p>
                    </div>
                    <div className="space-y-12">
                        {featureGroups.map((group) => (
                            <div key={group.title} className={`glass-card border ${group.color}`}>
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="text-3xl">{group.icon}</span>
                                    <h2 className="text-2xl font-bold text-white">{group.title}</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {group.features.map((f) => (
                                        <div key={f.name} className="bg-white/[0.03] rounded-xl p-4 border border-white/5">
                                            <h3 className="text-white font-semibold mb-1.5">✓ {f.name}</h3>
                                            <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
