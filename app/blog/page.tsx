import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Blog – DUCERE' };

const posts = [
    {
        slug: 'how-to-prevent-student-burnout',
        title: 'How to Prevent Student Burnout Before It Derails Your Exam',
        excerpt: 'Burnout isn\'t a willpower problem — it\'s a system problem. Here\'s the science-backed framework to detect and prevent it.',
        category: 'wellness', readTime: '7 min read', date: 'Dec 14, 2024',
        tags: ['burnout', 'mental health', 'anxiety'],
    },
    {
        slug: 'spaced-repetition-study-guide',
        title: 'The Science of Spaced Repetition: Study Less, Remember More',
        excerpt: 'Most students study wrong. Spaced repetition can increase long-term retention by 200%. Here\'s exactly how to implement it.',
        category: 'study', readTime: '9 min read', date: 'Dec 7, 2024',
        tags: ['study techniques', 'memory', 'efficiency'],
    },
    {
        slug: 'niche-career-alignment-guide',
        title: 'Why "Any Job" is the Worst Career Goal — and What to Do Instead',
        excerpt: 'Graduates who target a specific niche earn 34% more and report higher job satisfaction. Here\'s how to find yours.',
        category: 'career', readTime: '11 min read', date: 'Nov 28, 2024',
        tags: ['career', 'job search', 'niche'],
    },
    {
        slug: 'ai-adaptive-learning-research',
        title: 'What Research Says About AI-Adaptive Learning vs Traditional Study',
        excerpt: 'A review of 23 peer-reviewed studies on adaptive learning systems and their measurable impact on student outcomes.',
        category: 'research', readTime: '14 min read', date: 'Nov 20, 2024',
        tags: ['research', 'AI', 'adaptive learning'],
    },
    {
        slug: 'sleep-study-performance-link',
        title: 'The Hidden Connection Between Sleep and Exam Performance',
        excerpt: 'Cutting sleep to study more is the single most counterproductive thing a student can do. Here\'s the neurological reason why.',
        category: 'wellness', readTime: '6 min read', date: 'Nov 12, 2024',
        tags: ['sleep', 'neuroscience', 'performance'],
    },
    {
        slug: 'skill-gap-software-engineering',
        title: 'The Exact Skills You Need to Get Hired as a Software Engineer in 2025',
        excerpt: 'Analyzed 500+ job descriptions. Here are the 8 skills that appear in 80%+ of software engineering listings right now.',
        category: 'career', readTime: '8 min read', date: 'Nov 5, 2024',
        tags: ['software engineering', 'skills', '2025'],
    },
];

const categoryColors: Record<string, string> = {
    wellness: 'badge-red',
    study: 'badge-blue',
    career: 'badge-green',
    research: 'badge-purple',
};

const categoryLabels: Record<string, string> = {
    wellness: '❤️ Wellness', study: '📚 Study', career: '🎯 Career', research: '🔬 Research',
};

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0f]">
            <Navbar />
            <div className="pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center py-16 mb-8">
                        <span className="badge badge-yellow mb-4">DUCERE Blog</span>
                        <h1 className="text-5xl font-bold text-white mb-4">Insights for Student Success</h1>
                        <p className="text-xl text-white/60 max-w-2xl mx-auto">Research-backed articles on wellness, study strategies, and career growth.</p>
                    </div>

                    {/* Category filter */}
                    <div className="flex flex-wrap gap-2 justify-center mb-12">
                        {['All', 'Wellness', 'Study', 'Career', 'Research'].map((cat) => (
                            <button key={cat} className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${cat === 'All' ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-400' : 'border-white/20 text-white/50 hover:border-white/40 hover:text-white'}`}>
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post) => (
                            <Link key={post.slug} href={`/blog/${post.slug}`} className="glass-card hover:border-indigo-500/30 hover:-translate-y-1 transition-all duration-300 flex flex-col group">
                                <div className="flex items-center justify-between mb-4">
                                    <span className={`badge ${categoryColors[post.category]}`}>{categoryLabels[post.category]}</span>
                                    <span className="text-white/30 text-xs">{post.readTime}</span>
                                </div>
                                <h2 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors leading-snug">{post.title}</h2>
                                <p className="text-white/50 text-sm leading-relaxed flex-1 mb-4">{post.excerpt}</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {post.tags.slice(0, 3).map((t) => (
                                        <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/30 border border-white/10">{t}</span>
                                    ))}
                                </div>
                                <p className="text-white/30 text-xs mt-4 pt-3 border-t border-white/10">{post.date}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
