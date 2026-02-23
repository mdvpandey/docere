'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Smile, Frown, Meh, Moon, BookOpen, Activity, Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const weeklyData = [
    { day: 'Mon', stress: 7, mood: 5, sleep: 5.5, study: 8 },
    { day: 'Tue', stress: 6.5, mood: 5.5, sleep: 6, study: 7 },
    { day: 'Wed', stress: 5.8, mood: 6.2, sleep: 7, study: 6 },
    { day: 'Thu', stress: 5.2, mood: 6.8, sleep: 7.5, study: 6.5 },
    { day: 'Fri', stress: 4.5, mood: 7.2, sleep: 8, study: 5 },
    { day: 'Sat', stress: 3.8, mood: 7.8, sleep: 8.5, study: 4 },
    { day: 'Today', stress: 3.2, mood: 8.0, sleep: 8, study: 3 },
];

export default function WellnessPage() {
    const [form, setForm] = useState({ mood: 7, stress: 4, sleep: 7.5, study: 5, notes: '' });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/wellness/log', {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            toast.success(`Logged! Burnout risk: ${data.burnout.risk} (${data.burnout.score}%)`);
            setSubmitted(true);
        } catch (err) {
            toast.error('Failed to save. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    function SliderInput({ label, icon: Icon, value, min, max, step = 0.5, field, color }:
        { label: string; icon: React.ElementType; value: number; min: number; max: number; step?: number; field: string; color: string }) {
        return (
            <div className="glass-card">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <Icon className={`w-5 h-5 ${color}`} />
                        <span className="font-semibold text-white">{label}</span>
                    </div>
                    <span className={`text-2xl font-black ${color}`}>{value}</span>
                </div>
                <input type="range" min={min} max={max} step={step} value={value}
                    onChange={(e) => setForm((p) => ({ ...p, [field]: parseFloat(e.target.value) }))}
                    className="w-full accent-indigo-500 h-2 rounded-full" />
                <div className="flex justify-between text-xs text-white/30 mt-1">
                    <span>{min}</span><span>{max}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="page-header">Wellness Tracker 💚</h1>
                <p className="text-white/50">Log your daily state and track how your wellness evolves over time.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Log Form */}
                <div>
                    <h2 className="text-xl font-bold text-white mb-4">Today&apos;s Log</h2>
                    {submitted ? (
                        <div className="glass-card text-center py-12">
                            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Wellness Logged!</h3>
                            <p className="text-white/60 mb-4">Your burnout risk has been updated.</p>
                            <button onClick={() => setSubmitted(false)} className="btn-secondary">Log Again</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <SliderInput label="Mood" icon={Smile} value={form.mood} min={1} max={10} field="mood" color="text-indigo-400" />
                            <SliderInput label="Stress Level" icon={Activity} value={form.stress} min={1} max={10} field="stress" color="text-red-400" />
                            <SliderInput label="Sleep Hours" icon={Moon} value={form.sleep} min={0} max={12} field="sleep" step={0.5} color="text-blue-400" />
                            <SliderInput label="Study Hours" icon={BookOpen} value={form.study} min={0} max={16} field="study" step={0.5} color="text-green-400" />
                            <div className="glass-card">
                                <label className="text-sm text-white/60 block mb-2">Notes (optional)</label>
                                <textarea rows={3} value={form.notes} onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                                    placeholder="How are you feeling today? Any specific stressors?" className="input-field resize-none" />
                            </div>
                            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
                                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                                {loading ? 'Saving...' : '💾 Save Today\'s Log'}
                            </button>
                        </form>
                    )}
                </div>

                {/* Weekly Summary Charts */}
                <div className="space-y-6">
                    <div className="glass-card">
                        <h3 className="text-lg font-bold text-white mb-4">7-Day Stress & Mood</h3>
                        <ResponsiveContainer width="100%" height={180}>
                            <AreaChart data={weeklyData}>
                                <defs>
                                    <linearGradient id="wStress" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} /><stop offset="95%" stopColor="#ef4444" stopOpacity={0} /></linearGradient>
                                    <linearGradient id="wMood" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} /><stop offset="95%" stopColor="#6366f1" stopOpacity={0} /></linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} />
                                <YAxis domain={[0, 10]} stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} />
                                <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: 'white' }} />
                                <Area type="monotone" dataKey="stress" stroke="#ef4444" strokeWidth={2} fill="url(#wStress)" name="Stress" />
                                <Area type="monotone" dataKey="mood" stroke="#6366f1" strokeWidth={2} fill="url(#wMood)" name="Mood" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: 'Avg Stress', value: '5.1', sub: '↓ from 7.2', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
                            { label: 'Avg Mood', value: '6.6', sub: '↑ from 4.8', color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20' },
                            { label: 'Avg Sleep', value: '7.2 hrs', sub: '↑ from 5.5', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
                            { label: 'Avg Study', value: '5.6 hrs', sub: '↓ from 7.8', color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20' },
                        ].map((s) => (
                            <div key={s.label} className={`glass-card border ${s.bg}`}>
                                <p className="text-white/40 text-xs">{s.label}</p>
                                <p className={`text-2xl font-bold ${s.color} mt-1`}>{s.value}</p>
                                <p className="text-white/30 text-xs">{s.sub}</p>
                            </div>
                        ))}
                    </div>

                    {/* Burnout Tips */}
                    <div className="glass-card border border-green-500/20 bg-green-500/5">
                        <h3 className="text-lg font-bold text-white mb-3">🌿 AI Wellness Tips</h3>
                        <ul className="space-y-2">
                            {[
                                'Your stress is decreasing — great progress! Keep it up.',
                                'Sleep improvement noted: 5.5 → 8 hrs. This is boosting your mood.',
                                'Take a 10-minute walk between study sessions.',
                            ].map((t, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                                    <span className="text-green-400 mt-0.5">✓</span> {t}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
