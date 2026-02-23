'use client';

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FlaskConical, BookOpen, TrendingDown, Star } from 'lucide-react';

const feedbackData = [
    { week: 'W1', satisfaction: 5.2, difficulty: 8.1 },
    { week: 'W2', satisfaction: 5.8, difficulty: 7.6 },
    { week: 'W3', satisfaction: 6.3, difficulty: 7.0 },
    { week: 'W4', satisfaction: 6.9, difficulty: 6.4 },
    { week: 'W5', satisfaction: 7.4, difficulty: 5.8 },
    { week: 'W6', satisfaction: 7.9, difficulty: 5.1 },
];

const curriculumComparison = [
    { curriculum: 'Curriculum A\n(Standard)', completion: 72, retention: 58, satisfaction: 6.2 },
    { curriculum: 'Curriculum B\n(Adaptive)', completion: 91, retention: 79, satisfaction: 8.4 },
];

const feedbackThemes = [
    { theme: 'Content Too Difficult', count: 42, pct: 34 },
    { theme: 'Lack of Practical Examples', count: 31, pct: 25 },
    { theme: 'Need More Mentor Support', count: 28, pct: 23 },
    { theme: 'Study Plan Too Intensive', count: 22, pct: 18 },
];

export default function AdminResearchPage() {
    const [view, setView] = useState<'feedback' | 'curriculum' | 'stress'>('feedback');

    return (
        <div className="space-y-8">
            <div>
                <h1 className="page-header">Research Dashboard 🔬</h1>
                <p className="text-white/50">Anonymized data insights to drive curriculum and platform evolution.</p>
            </div>

            {/* View Toggle */}
            <div className="flex gap-1 p-1 bg-white/5 border border-white/10 rounded-xl w-fit">
                {(['feedback', 'curriculum', 'stress'] as const).map((v) => (
                    <button key={v} onClick={() => setView(v)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${view === v ? 'bg-indigo-600 text-white' : 'text-white/50 hover:text-white'}`}>
                        {v === 'feedback' ? '💬 Feedback' : v === 'curriculum' ? '📚 Curriculum' : '🧠 Stress Study'}
                    </button>
                ))}
            </div>

            {view === 'feedback' && (
                <div className="space-y-6">
                    {/* Feedback Trend */}
                    <div className="glass-card">
                        <h3 className="text-lg font-bold text-white mb-4">Satisfaction vs Difficulty — 6-Week Trend</h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={feedbackData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="week" stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} />
                                <YAxis domain={[0, 10]} stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} />
                                <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: 'white' }} />
                                <Bar dataKey="satisfaction" radius={[4, 4, 0, 0]} fill="#6366f1" name="Satisfaction" />
                                <Bar dataKey="difficulty" radius={[4, 4, 0, 0]} fill="#ef4444" name="Difficulty" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Top themes */}
                    <div className="glass-card">
                        <h3 className="text-lg font-bold text-white mb-4">Top Feedback Themes (Platform-Wide)</h3>
                        <div className="space-y-3">
                            {feedbackThemes.map((t) => (
                                <div key={t.theme}>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm text-white/70">{t.theme}</span>
                                        <span className="text-sm font-bold text-white">{t.count} responses ({t.pct}%)</span>
                                    </div>
                                    <div className="w-full bg-white/10 rounded-full h-2">
                                        <div className="h-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 transition-all" style={{ width: `${t.pct * 2}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {view === 'curriculum' && (
                <div className="space-y-6">
                    <div className="glass-card">
                        <h3 className="text-lg font-bold text-white mb-4">Curriculum Performance Comparison</h3>
                        <div className="grid grid-cols-2 gap-6">
                            {curriculumComparison.map((c) => (
                                <div key={c.curriculum} className="p-4 rounded-xl border border-white/10">
                                    <h4 className="text-white font-bold mb-4">{c.curriculum}</h4>
                                    <div className="space-y-3">
                                        {[
                                            { label: 'Plan Completion', value: c.completion + '%', bar: c.completion, color: 'from-indigo-500 to-purple-600' },
                                            { label: 'Knowledge Retention', value: c.retention + '%', bar: c.retention, color: 'from-green-500 to-emerald-600' },
                                            { label: 'Satisfaction Score', value: c.satisfaction + '/10', bar: c.satisfaction * 10, color: 'from-amber-500 to-orange-600' },
                                        ].map((m) => (
                                            <div key={m.label}>
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-xs text-white/50">{m.label}</span>
                                                    <span className="text-xs font-bold text-white">{m.value}</span>
                                                </div>
                                                <div className="w-full bg-white/10 rounded-full h-1.5">
                                                    <div className={`h-1.5 rounded-full bg-gradient-to-r ${m.color}`} style={{ width: `${m.bar}%` }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                            <p className="text-green-400 text-sm">✅ <strong>Finding:</strong> Adaptive Curriculum B outperforms Standard A on all 3 metrics. Recommend platform-wide transition.</p>
                        </div>
                    </div>
                </div>
            )}

            {view === 'stress' && (
                <div className="space-y-6">
                    <div className="glass-card">
                        <h3 className="text-lg font-bold text-white mb-4">Stress-Performance Correlation Study</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            {[
                                { label: 'Students with stress < 4', perf: '84 avg', delta: '+22% vs high stress' },
                                { label: 'Students with stress 4–7', perf: '71 avg', delta: '+6% vs high stress' },
                                { label: 'Students with stress > 7', perf: '58 avg', delta: 'Baseline' },
                            ].map((s) => (
                                <div key={s.label} className="p-4 rounded-xl border border-white/10 text-center">
                                    <p className="text-white/50 text-xs mb-2">{s.label}</p>
                                    <p className="text-2xl font-black text-indigo-400">{s.perf}</p>
                                    <p className="text-white/40 text-xs">{s.delta}</p>
                                </div>
                            ))}
                        </div>
                        <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                            <p className="text-indigo-400 text-sm">📊 <strong>Key Insight:</strong> Students with stress levels below 4 score 45% higher than those with stress above 7. Wellness intervention directly drives academic performance.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
