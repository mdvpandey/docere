'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Brain, TrendingUp, Target, Zap, HeartPulse, BookOpen, AlertTriangle, CheckCircle, ArrowRight, Star, Users, Award, BarChart2 } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
    LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar,
} from 'recharts';

// ── Data ─────────────────────────────────────────────────────────────────────
const stressData = [
    { week: 'W1', stress: 8.2, mood: 4.0 },
    { week: 'W2', stress: 7.5, mood: 4.8 },
    { week: 'W3', stress: 6.8, mood: 5.5 },
    { week: 'W4', stress: 5.9, mood: 6.2 },
    { week: 'W5', stress: 4.5, mood: 7.0 },
    { week: 'W6', stress: 3.8, mood: 7.8 },
];

const performanceData = [
    { week: 'W1', score: 45 }, { week: 'W2', score: 52 },
    { week: 'W3', score: 61 }, { week: 'W4', score: 68 },
    { week: 'W5', score: 76 }, { week: 'W6', score: 84 },
];

const features = [
    { icon: HeartPulse, title: 'Behavioral Tracking', desc: 'Daily mood, stress, sleep, and study hour logging with intelligent pattern recognition.', color: 'from-rose-500 to-pink-600' },
    { icon: AlertTriangle, title: 'Burnout Prediction', desc: 'AI-powered burnout risk scoring 3 weeks in advance before it derails your progress.', color: 'from-amber-500 to-orange-600' },
    { icon: TrendingUp, title: 'Performance Forecasting', desc: 'Predict your exam scores based on study patterns and wellness indicators.', color: 'from-blue-500 to-cyan-600' },
    { icon: Zap, title: 'Skill Gap Analysis', desc: 'Know exactly what skills you are missing for your dream role and how to get them.', color: 'from-violet-500 to-purple-600' },
    { icon: Target, title: 'Career Roadmap Generator', desc: 'Personalized step-by-step roadmap from where you are to where you want to be.', color: 'from-green-500 to-emerald-600' },
    { icon: BookOpen, title: 'Adaptive Study Engine', desc: 'Weekly study plans that adjust in real-time based on your stress level and performance.', color: 'from-indigo-500 to-blue-600' },
];

const problems = [
    { icon: '🔥', title: 'Student Burnout', desc: '72% of students experience burnout during exam preparation, affecting results and mental health.' },
    { icon: '😰', title: 'Stress Overload', desc: 'Unmanaged stress reduces retention by 40% and increases dropout likelihood by 3×.' },
    { icon: '🎯', title: 'Career Confusion', desc: 'Most coaching systems never address career alignment — students graduate without direction.' },
    { icon: '🧠', title: 'Mental Health Ignored', desc: 'Traditional coaching focuses on scores, completely ignoring the mental state of students.' },
];

const steps = [
    { step: '01', icon: HeartPulse, title: 'Track Mind + Performance', desc: 'Log your daily mood, stress, sleep & study hours. DOCERE builds your behavioral profile.', color: 'text-rose-400 border-rose-500/30 bg-rose-500/10' },
    { step: '02', icon: Brain, title: 'AI Personalizes Your Curriculum', desc: 'Our engine adapts your study plan weekly based on burnout risk and performance trends.', color: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10' },
    { step: '03', icon: Briefcase, title: 'Career & Job Alignment', desc: 'Get matched to roles, build skills, and land interviews in your niche — not just any job.', color: 'text-green-400 border-green-500/30 bg-green-500/10' },
];

const outcomes = [
    { value: '64%', label: 'Stress Reduction', desc: 'Average stress drop in 6 weeks', color: 'from-rose-500 to-pink-600' },
    { value: '2.3×', label: 'Performance Growth', desc: 'Average score improvement', color: 'from-indigo-500 to-purple-600' },
    { value: '89%', label: 'Job Placement', desc: 'Students land roles in their niche', color: 'from-emerald-500 to-green-600' },
    { value: '47%', label: 'Burnout Prevention', desc: 'Burnout episodes prevented', color: 'from-amber-500 to-orange-600' },
];

const testimonials = [
    { name: 'Priya Sharma', role: 'Software Engineer at Flipkart', avatar: 'PS', text: 'DOCERE predicted my burnout 2 weeks before my GATE exam. The adaptive plan helped me reduce stress from 9 to 4 while actually improving my score by 23 points.', rating: 5 },
    { name: 'Rohit Kumar', role: 'Data Scientist at Zomato', avatar: 'RK', text: 'The skill gap analysis showed me exactly what I was missing for a DS role. The roadmap was so specific — I got my first offer within 4 months of following it.', rating: 5 },
    { name: 'Ananya Patel', role: 'UX Designer at Razorpay', avatar: 'AP', text: 'I was completely lost about my career after college. DOCERE\'s career mapping literally changed my life. Now I\'m doing exactly what I love and getting paid well for it.', rating: 5 },
];

const quizQuestions = [
    { q: 'How often do you feel overwhelmed with your study schedule?', options: ['Rarely', 'Sometimes', 'Often', 'Always'] },
    { q: 'How clear are you about your target career role?', options: ['Very Clear', 'Somewhat Clear', 'Unsure', 'No Idea'] },
    { q: 'How many hours do you sleep on average?', options: ['8+ hours', '6-7 hours', '4-5 hours', '<4 hours'] },
];

// ── Animation helpers ─────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    return (
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay, ease: 'easeOut' }}>
            {children}
        </motion.div>
    );
}

// Imported Briefcase for steps
import { Briefcase } from 'lucide-react';

export default function HomePage() {
    return (
        <div className="min-h-screen bg-[#0a0a0f]">
            <Navbar />

            {/* ── HERO ─────────────────────────────────────────────────────────────── */}
            <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
                {/* Background orbs */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600 rounded-full blur-[120px] opacity-20 animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600 rounded-full blur-[100px] opacity-15 animate-pulse" style={{ animationDelay: '1s' }} />
                    <div className="absolute top-1/2 right-1/3 w-60 h-60 bg-pink-600 rounded-full blur-[80px] opacity-10 animate-pulse" style={{ animationDelay: '2s' }} />
                </div>
                {/* Grid */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M0%200h60v60H0z%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M60%200v60M0%200h60%22%20stroke%3D%22rgba(255%2C255%2C255%2C0.03)%22%20stroke-width%3D%221%22%2F%3E%3C%2Fsvg%3E')] opacity-50" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 mb-6">
                            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                            AI-Powered Student Success Platform
                        </span>
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                        <span className="text-white">Perform Better.</span>
                        <br />
                        <span className="gradient-text">Stress Less.</span>
                        <br />
                        <span className="text-white">Get Hired.</span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed">
                        DOCERE combines AI-driven mental wellness tracking, adaptive study planning, and precision career alignment so students achieve peak performance without burning out.
                    </motion.p>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                        <Link href="/register" className="btn-primary text-base px-8 py-4 flex items-center gap-2">
                            Start Free — No Credit Card <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link href="#demo" className="btn-secondary text-base px-8 py-4">Watch Demo</Link>
                    </motion.div>

                    {/* Trust badges */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.5 }}
                        className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/40">
                        {[
                            { icon: Users, text: '10,000+ Students' },
                            { icon: Star, text: '4.9/5 Rating' },
                            { icon: Award, text: 'Research-Backed' },
                            { icon: CheckCircle, text: 'HIPAA Compliant' },
                        ].map(({ icon: Icon, text }) => (
                            <div key={text} className="flex items-center gap-2">
                                <Icon className="w-4 h-4 text-indigo-400" />
                                <span>{text}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── PROBLEM ──────────────────────────────────────────────────────────── */}
            <section className="py-24 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeUp>
                        <div className="text-center mb-16">
                            <span className="badge badge-red mb-4">The Problem</span>
                            <h2 className="section-title text-white mb-4">The System is Failing Students</h2>
                            <p className="section-subtitle">Coaching institutions optimise for scores. Nobody is optimising for you.</p>
                        </div>
                    </FadeUp>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {problems.map((p, i) => (
                            <FadeUp key={p.title} delay={i * 0.1}>
                                <div className="glass-card hover:border-red-500/30 hover:bg-red-500/5 transition-all duration-300 group">
                                    <div className="text-4xl mb-4">{p.icon}</div>
                                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-300 transition-colors">{p.title}</h3>
                                    <p className="text-white/50 text-sm leading-relaxed">{p.desc}</p>
                                </div>
                            </FadeUp>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SOLUTION ─────────────────────────────────────────────────────────── */}
            <section className="py-24 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/30 to-transparent" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeUp>
                        <div className="text-center mb-16">
                            <span className="badge badge-blue mb-4">Our Solution</span>
                            <h2 className="section-title mb-4">
                                <span className="gradient-text">3-Step Framework</span> for Student Success
                            </h2>
                            <p className="section-subtitle">A holistic system that connects your mental health, learning efficiency, and career goals.</p>
                        </div>
                    </FadeUp>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {steps.map((s, i) => (
                            <FadeUp key={s.step} delay={i * 0.15}>
                                <div className={`glass-card border ${s.color.split(' ')[1]} ${s.color.split(' ')[2]} relative overflow-hidden group hover:-translate-y-1 transition-all duration-300`}>
                                    <span className="absolute top-4 right-4 text-5xl font-black text-white/5">{s.step}</span>
                                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${s.color}`}>
                                        <s.icon className={`w-6 h-6 ${s.color.split(' ')[0]}`} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                                    <p className="text-white/60 leading-relaxed">{s.desc}</p>
                                </div>
                            </FadeUp>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── LIVE DASHBOARD PREVIEW ────────────────────────────────────────────── */}
            <section id="demo" className="py-24 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeUp>
                        <div className="text-center mb-16">
                            <span className="badge badge-purple mb-4">Live Preview</span>
                            <h2 className="section-title mb-4">Your Dashboard at a Glance</h2>
                            <p className="section-subtitle">See how DOCERE displays your wellness, performance, and skill growth in one place.</p>
                        </div>
                    </FadeUp>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Stress chart */}
                        <FadeUp><div className="glass-card lg:col-span-2">
                            <p className="text-sm text-white/50 mb-1">6-Week Wellness Trend</p>
                            <h3 className="text-lg font-bold text-white mb-4">Stress vs Mood Recovery</h3>
                            <ResponsiveContainer width="100%" height={200}>
                                <AreaChart data={stressData}>
                                    <defs>
                                        <linearGradient id="stressGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} /><stop offset="95%" stopColor="#ef4444" stopOpacity={0} /></linearGradient>
                                        <linearGradient id="moodGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} /><stop offset="95%" stopColor="#6366f1" stopOpacity={0} /></linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                    <XAxis dataKey="week" stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} />
                                    <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} />
                                    <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: 'white' }} />
                                    <Area type="monotone" dataKey="stress" stroke="#ef4444" strokeWidth={2} fill="url(#stressGrad)" name="Stress" />
                                    <Area type="monotone" dataKey="mood" stroke="#6366f1" strokeWidth={2} fill="url(#moodGrad)" name="Mood" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div></FadeUp>

                        {/* Burnout ring */}
                        <FadeUp delay={0.1}><div className="glass-card flex flex-col items-center justify-center">
                            <p className="text-sm text-white/50 mb-3">Current Burnout Risk</p>
                            <RadialBarChart width={160} height={160} innerRadius={50} outerRadius={70}
                                data={[{ name: 'risk', value: 28, fill: '#10b981' }]} startAngle={90} endAngle={-270}>
                                <RadialBar dataKey="value" cornerRadius={8} background={{ fill: 'rgba(255,255,255,0.05)' }} />
                            </RadialBarChart>
                            <div className="text-center -mt-2">
                                <p className="text-3xl font-black text-green-400">28%</p>
                                <p className="text-sm text-green-400 font-medium">Low Risk ✓</p>
                                <p className="text-xs text-white/30 mt-1">Down 44% from Week 1</p>
                            </div>
                        </div></FadeUp>

                        {/* Performance chart */}
                        <FadeUp delay={0.1}><div className="glass-card lg:col-span-3">
                            <p className="text-sm text-white/50 mb-1">Performance Trend</p>
                            <h3 className="text-lg font-bold text-white mb-4">Weekly Score Progression</h3>
                            <ResponsiveContainer width="100%" height={180}>
                                <LineChart data={performanceData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                    <XAxis dataKey="week" stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} />
                                    <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} />
                                    <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: 'white' }} />
                                    <Line type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={3} dot={{ fill: '#6366f1', r: 5 }} name="Score" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div></FadeUp>
                    </div>
                </div>
            </section>

            {/* ── FEATURES ─────────────────────────────────────────────────────────── */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeUp>
                        <div className="text-center mb-16">
                            <span className="badge badge-blue mb-4">Key Features</span>
                            <h2 className="section-title mb-4">Everything You Need to Succeed</h2>
                            <p className="section-subtitle">Six powerful AI systems working together to transform your academic journey.</p>
                        </div>
                    </FadeUp>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((f, i) => (
                            <FadeUp key={f.title} delay={i * 0.08}>
                                <div className="glass-card group hover:-translate-y-1 hover:border-indigo-500/30 transition-all duration-300">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                                        <f.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                                    <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
                                </div>
                            </FadeUp>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── OUTCOMES ─────────────────────────────────────────────────────────── */}
            <section className="py-24 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 to-transparent" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeUp>
                        <div className="text-center mb-16">
                            <span className="badge badge-green mb-4">Proven Results</span>
                            <h2 className="section-title mb-4">Real Outcomes. Measurable Impact.</h2>
                            <p className="section-subtitle">Data from 10,000+ students who completed the DOCERE program.</p>
                        </div>
                    </FadeUp>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {outcomes.map((o, i) => (
                            <FadeUp key={o.label} delay={i * 0.1}>
                                <div className="glass-card text-center group hover:-translate-y-1 transition-all duration-300">
                                    <div className={`text-5xl font-black bg-gradient-to-br ${o.color} bg-clip-text text-transparent mb-2`}>{o.value}</div>
                                    <p className="text-white font-semibold mb-1">{o.label}</p>
                                    <p className="text-white/40 text-xs">{o.desc}</p>
                                </div>
                            </FadeUp>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── QUICK QUIZ ───────────────────────────────────────────────────────── */}
            <section className="py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeUp>
                        <div className="glass-card border border-indigo-500/20">
                            <div className="text-center mb-8">
                                <span className="badge badge-purple mb-3">Free Assessment</span>
                                <h2 className="text-3xl font-bold text-white mb-2">What&apos;s Your Burnout Risk?</h2>
                                <p className="text-white/50">Answer 3 quick questions to get your personalised report.</p>
                            </div>
                            <div className="space-y-6">
                                {quizQuestions.map((quiz, qi) => (
                                    <div key={qi}>
                                        <p className="text-white font-medium mb-3">{qi + 1}. {quiz.q}</p>
                                        <div className="grid grid-cols-2 gap-2">
                                            {quiz.options.map((opt) => (
                                                <label key={opt} className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-indigo-500/50 hover:bg-indigo-500/5 cursor-pointer transition-all">
                                                    <input type="radio" name={`q${qi}`} className="accent-indigo-500" />
                                                    <span className="text-white/70 text-sm">{opt}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                <Link href="/register" className="btn-primary w-full text-center flex items-center justify-center gap-2 mt-4">
                                    Get My Free Burnout Report <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </FadeUp>
                </div>
            </section>

            {/* ── TESTIMONIALS ─────────────────────────────────────────────────────── */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeUp>
                        <div className="text-center mb-16">
                            <span className="badge badge-yellow mb-4">Success Stories</span>
                            <h2 className="section-title mb-4">Students Who Changed Their Trajectory</h2>
                        </div>
                    </FadeUp>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((t, i) => (
                            <FadeUp key={t.name} delay={i * 0.1}>
                                <div className="glass-card h-full flex flex-col hover:border-indigo-500/30 transition-all duration-300">
                                    <div className="flex items-center gap-1 mb-4">
                                        {Array.from({ length: t.rating }).map((_, j) => (
                                            <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                                        ))}
                                    </div>
                                    <p className="text-white/70 text-sm leading-relaxed flex-1 italic">&quot;{t.text}&quot;</p>
                                    <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/10">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold">
                                            {t.avatar}
                                        </div>
                                        <div>
                                            <p className="text-white font-semibold text-sm">{t.name}</p>
                                            <p className="text-white/40 text-xs">{t.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </FadeUp>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── RESEARCH ─────────────────────────────────────────────────────────── */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="glass-card border border-indigo-500/20">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            {[
                                { icon: '🧬', title: 'Behavioral Science', desc: 'Built on proven behavioral psychology principles including Kahneman\'s System 2 thinking and habit loops.' },
                                { icon: '🤖', title: 'Adaptive Learning', desc: 'Spaced repetition, interleaving, and retrieval practice baked into every study plan we generate.' },
                                { icon: '📈', title: 'Feedback-Driven Evolution', desc: 'The curriculum improves weekly using aggregated anonymized student performance data.' },
                            ].map((r, i) => (
                                <FadeUp key={r.title} delay={i * 0.1}>
                                    <div className="text-4xl mb-3">{r.icon}</div>
                                    <h3 className="text-lg font-bold text-white mb-2">{r.title}</h3>
                                    <p className="text-white/50 text-sm leading-relaxed">{r.desc}</p>
                                </FadeUp>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA ──────────────────────────────────────────────────────────────── */}
            <section className="py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <FadeUp>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-3xl blur-2xl" />
                            <div className="relative glass-card border border-indigo-500/30 py-16">
                                <span className="badge badge-purple mb-6">Start Today</span>
                                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                    Your Best Performance<br />
                                    <span className="gradient-text">Starts With Your Mind</span>
                                </h2>
                                <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
                                    Join 10,000+ students who are studying smarter, stressing less, and landing jobs they actually want.
                                </p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <Link href="/register" className="btn-primary text-lg px-10 py-4 flex items-center gap-2">
                                        Start Free Today <ArrowRight className="w-5 h-5" />
                                    </Link>
                                    <Link href="/contact" className="btn-secondary text-lg px-10 py-4">Talk to Us</Link>
                                </div>
                                <p className="text-white/30 text-sm mt-6">No credit card required · Free plan forever · Cancel anytime</p>
                            </div>
                        </div>
                    </FadeUp>
                </div>
            </section>

            <Footer />
        </div>
    );
}
