'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { AlertTriangle, TrendingUp, Users, BrainCog } from 'lucide-react';

const cohortStress = [
    { week: 'W1', avg: 7.8 }, { week: 'W2', avg: 7.2 }, { week: 'W3', avg: 6.5 },
    { week: 'W4', avg: 6.1 }, { week: 'W5', avg: 5.4 }, { week: 'W6', avg: 4.8 },
];

const cohortPerf = [
    { subject: 'DSA', score: 68 }, { subject: 'System Design', score: 54 },
    { subject: 'React', score: 79 }, { subject: 'Node.js', score: 71 }, { subject: 'SQL', score: 65 },
];

const burnoutDistribution = [
    { name: 'Low Risk', count: 2, color: '#10b981' },
    { name: 'Moderate', count: 2, color: '#f59e0b' },
    { name: 'High Risk', count: 1, color: '#ef4444' },
];

export default function MentorAnalyticsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="page-header">Cohort Analytics 📈</h1>
                <p className="text-white/50">Track your student cohort&apos;s collective performance and wellness trends.</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Cohort Avg Score', value: '72.5', icon: TrendingUp, color: 'text-indigo-400' },
                    { label: 'Avg Burnout Risk', value: '38%', icon: BrainCog, color: 'text-amber-400' },
                    { label: 'At-Risk Students', value: '1', icon: AlertTriangle, color: 'text-red-400' },
                    { label: 'Avg Stress', value: '5.4/10', icon: Users, color: 'text-rose-400' },
                ].map((s) => (
                    <div key={s.label} className="glass-card">
                        <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
                        <p className="text-white/40 text-xs">{s.label}</p>
                        <p className={`text-2xl font-bold ${s.color} mt-0.5`}>{s.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-card">
                    <h3 className="text-lg font-bold text-white mb-4">Cohort Avg Stress Trend</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <AreaChart data={cohortStress}>
                            <defs><linearGradient id="csg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} /><stop offset="95%" stopColor="#ef4444" stopOpacity={0} /></linearGradient></defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="week" stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} />
                            <YAxis domain={[0, 10]} stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} />
                            <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: 'white' }} />
                            <Area type="monotone" dataKey="avg" stroke="#ef4444" fill="url(#csg)" strokeWidth={2} name="Avg Stress" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="glass-card">
                    <h3 className="text-lg font-bold text-white mb-4">Cohort Performance by Subject</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={cohortPerf}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="subject" stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} />
                            <YAxis domain={[0, 100]} stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} />
                            <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: 'white' }} />
                            <Bar dataKey="score" radius={[6, 6, 0, 0]} fill="#6366f1" name="Avg Score" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Burnout Distribution */}
            <div className="glass-card">
                <h3 className="text-lg font-bold text-white mb-4">Burnout Risk Distribution</h3>
                <div className="grid grid-cols-3 gap-4">
                    {burnoutDistribution.map((b) => (
                        <div key={b.name} className="text-center p-4 rounded-xl border border-white/10">
                            <p className="text-4xl font-black mb-1" style={{ color: b.color }}>{b.count}</p>
                            <p className="text-white/60 text-sm">{b.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Intervention Suggestions */}
            <div className="glass-card border border-amber-500/20">
                <h3 className="text-lg font-bold text-white mb-3">🤖 AI Intervention Suggestions</h3>
                <ul className="space-y-3">
                    {[
                        { student: 'Rahul Kumar', action: 'URGENT: Schedule a 1:1 immediately. Reduce workload, focus on recovery.', level: 'high' },
                        { student: 'Vikram Patel', action: 'Check in mid-week. Consider reducing mock test frequency this week.', level: 'moderate' },
                    ].map((s) => (
                        <li key={s.student} className={`p-3 rounded-xl border ${s.level === 'high' ? 'border-red-500/30 bg-red-500/5' : 'border-amber-500/30 bg-amber-500/5'}`}>
                            <p className="font-semibold text-white text-sm">{s.student}</p>
                            <p className={`text-sm ${s.level === 'high' ? 'text-red-300/80' : 'text-amber-300/80'}`}>{s.action}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
