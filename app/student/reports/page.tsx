'use client';

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const performanceTrend = [
    { week: 'W1', score: 48 }, { week: 'W2', score: 55 }, { week: 'W3', score: 61 },
    { week: 'W4', score: 67 }, { week: 'W5', score: 73 }, { week: 'W6', score: 79 },
];

const stressTrend = [
    { week: 'W1', stress: 8.2 }, { week: 'W2', stress: 7.5 }, { week: 'W3', stress: 6.8 },
    { week: 'W4', stress: 5.9 }, { week: 'W5', stress: 4.5 }, { week: 'W6', stress: 3.8 },
];

const subjectData = [
    { subject: 'DSA', score: 79, prev: 68 },
    { subject: 'System Design', score: 64, prev: 52 },
    { subject: 'React', score: 88, prev: 82 },
    { subject: 'Node.js', score: 71, prev: 63 },
    { subject: 'SQL', score: 75, prev: 71 },
];

function Trend({ val, prev }: { val: number; prev: number }) {
    const diff = val - prev;
    if (diff > 0) return <span className="text-green-400 text-xs flex items-center gap-0.5"><TrendingUp className="w-3 h-3" />+{diff}</span>;
    if (diff < 0) return <span className="text-red-400 text-xs flex items-center gap-0.5"><TrendingDown className="w-3 h-3" />{diff}</span>;
    return <span className="text-white/30 text-xs flex items-center gap-0.5"><Minus className="w-3 h-3" />0</span>;
}

export default function ReportsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="page-header">Reports & Analytics 📊</h1>
                <p className="text-white/50">Your 6-week performance and wellness analysis — see how far you&apos;ve come.</p>
            </div>

            {/* Summary Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Avg Weekly Score', value: '65.5', change: '+31 pts over 6 weeks', positive: true },
                    { label: 'Stress Reduction', value: '54%', change: '8.2 → 3.8 average', positive: true },
                    { label: 'Tasks Completed', value: '87%', change: 'Above 80% goal ✓', positive: true },
                    { label: 'Study Consistency', value: '6/7 days', change: 'Great consistency!', positive: true },
                ].map((s) => (
                    <div key={s.label} className="glass-card border border-indigo-500/20">
                        <p className="text-white/40 text-xs mb-1">{s.label}</p>
                        <p className="text-3xl font-black gradient-text">{s.value}</p>
                        <p className="text-green-400 text-xs mt-1">{s.change}</p>
                    </div>
                ))}
            </div>

            {/* Performance Chart */}
            <div className="glass-card">
                <h3 className="text-lg font-bold text-white mb-4">6-Week Performance Trend</h3>
                <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={performanceTrend}>
                        <defs>
                            <linearGradient id="rp" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} /><stop offset="95%" stopColor="#6366f1" stopOpacity={0} /></linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="week" stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} />
                        <YAxis domain={[0, 100]} stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} />
                        <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: 'white' }} />
                        <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={3} fill="url(#rp)" name="Score" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Stress trend */}
                <div className="glass-card">
                    <h3 className="text-lg font-bold text-white mb-4">Stress Level Trend</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={stressTrend}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="week" stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} />
                            <YAxis domain={[0, 10]} stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} />
                            <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: 'white' }} />
                            <Line type="monotone" dataKey="stress" stroke="#ef4444" strokeWidth={2.5} dot={{ fill: '#ef4444', r: 4 }} name="Stress" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Strengths/Weaknesses */}
                <div className="glass-card">
                    <h3 className="text-lg font-bold text-white mb-4">Subject Breakdown</h3>
                    <div className="space-y-2.5">
                        {subjectData.map((s) => (
                            <div key={s.subject}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm text-white/70">{s.subject}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold text-white">{s.score}</span>
                                        <Trend val={s.score} prev={s.prev} />
                                    </div>
                                </div>
                                <div className="w-full bg-white/10 rounded-full h-2">
                                    <div className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all"
                                        style={{ width: `${s.score}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Improvement Suggestions + Mentor Comments */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-card border border-indigo-500/20">
                    <h3 className="text-lg font-bold text-white mb-4">💡 AI Improvement Suggestions</h3>
                    <ul className="space-y-3">
                        {[
                            { s: 'System Design is your weakest area. Spend 1 extra hour weekly + read Designing Data-Intensive Applications.', icon: '📐' },
                            { s: 'Your stress-performance correlation shows that you perform 23% better when stress is below 5. Maintain current wellness habits.', icon: '🧠' },
                            { s: 'Consider a mock test this Saturday to validate your DSA progress before applying.', icon: '🎯' },
                        ].map((tip, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                                <span className="text-lg flex-shrink-0">{tip.icon}</span> {tip.s}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="glass-card border border-teal-500/20">
                    <h3 className="text-lg font-bold text-white mb-4">🎓 Mentor Comments</h3>
                    <div className="space-y-4">
                        {[
                            { mentor: 'Kavita Nair', date: 'Jan 15, 2025', comment: 'Rahul, your progress has been excellent this month. The consistency in wellness logging is paying off — I can see the stress reduction in your performance data. Keep this momentum!' },
                            { mentor: 'Kavita Nair', date: 'Jan 8, 2025', comment: 'Work on System Design fundamentals — it\'s the most common interview differentiator for senior roles. I\'ll share some resources this week.' },
                        ].map((c, i) => (
                            <div key={i} className="p-3 rounded-xl border border-white/10">
                                <div className="flex justify-between mb-1.5">
                                    <span className="text-white font-medium text-sm">{c.mentor}</span>
                                    <span className="text-white/30 text-xs">{c.date}</span>
                                </div>
                                <p className="text-white/60 text-sm leading-relaxed">{c.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
