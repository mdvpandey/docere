'use client';

import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';
import { Users, TrendingUp, AlertTriangle, Activity, BrainCog, BookOpen } from 'lucide-react';

const platformStress = [
    { month: 'Jul', avg: 7.2 }, { month: 'Aug', avg: 7.0 }, { month: 'Sep', avg: 6.5 },
    { month: 'Oct', avg: 6.1 }, { month: 'Nov', avg: 5.4 }, { month: 'Dec', avg: 4.8 }, { month: 'Jan', avg: 4.2 },
];

const nichePerf = [
    { niche: 'Software Eng.', score: 74 },
    { niche: 'Data Science', score: 71 },
    { niche: 'UI/UX Design', score: 82 },
    { niche: 'DevOps', score: 68 },
    { niche: 'Cybersecurity', score: 66 },
];

const riskPie = [
    { name: 'Low Risk', value: 60, color: '#10b981' },
    { name: 'Moderate', value: 30, color: '#f59e0b' },
    { name: 'High Risk', value: 10, color: '#ef4444' },
];

export default function AdminAnalyticsPage() {
    const [stats, setStats] = useState({ users: { total: 387, students: 342, mentors: 42, admins: 3 }, highBurnoutCount: 34, totalWellnessLogs: 8421, wellness: { avgStress: 5.4, avgMood: 6.1, avgSleep: 7.0 } });

    useEffect(() => {
        fetch('/api/admin/analytics').then((r) => r.json()).then((d) => { if (d.users) setStats(d); }).catch(() => { });
    }, []);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="page-header">Platform Analytics ⚡</h1>
                <p className="text-white/50">Platform-wide behavioral patterns, performance data, and wellness insights.</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Users', value: stats.users.total, icon: Users, color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20' },
                    { label: 'Students', value: stats.users.students, icon: BookOpen, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
                    { label: 'High Burnout', value: stats.highBurnoutCount, icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
                    { label: 'Wellness Logs', value: stats.totalWellnessLogs.toLocaleString(), icon: Activity, color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20' },
                ].map((s) => (
                    <div key={s.label} className={`glass-card border ${s.bg}`}>
                        <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
                        <p className="text-white/40 text-xs">{s.label}</p>
                        <p className={`text-3xl font-black ${s.color} mt-0.5`}>{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Secondary metrics */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: 'Platform Avg Stress', value: stats.wellness.avgStress?.toFixed(1) + '/10', color: 'text-red-400' },
                    { label: 'Platform Avg Mood', value: stats.wellness.avgMood?.toFixed(1) + '/10', color: 'text-indigo-400' },
                    { label: 'Platform Avg Sleep', value: stats.wellness.avgSleep?.toFixed(1) + ' hrs', color: 'text-blue-400' },
                ].map((s) => (
                    <div key={s.label} className="glass-card text-center">
                        <p className="text-white/40 text-xs">{s.label}</p>
                        <p className={`text-2xl font-black ${s.color} mt-1`}>{s.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Platform Stress Trend */}
                <div className="glass-card">
                    <h3 className="text-lg font-bold text-white mb-4">Platform-Wide Stress Trend</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <AreaChart data={platformStress}>
                            <defs><linearGradient id="psg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} /><stop offset="95%" stopColor="#ef4444" stopOpacity={0} /></linearGradient></defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} />
                            <YAxis domain={[0, 10]} stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} />
                            <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: 'white' }} />
                            <Area type="monotone" dataKey="avg" stroke="#ef4444" fill="url(#psg)" strokeWidth={2} name="Avg Stress" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Burnout Distribution Pie */}
                <div className="glass-card">
                    <h3 className="text-lg font-bold text-white mb-4">Burnout Risk Distribution</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie data={riskPie} dataKey="value" innerRadius={60} outerRadius={80} paddingAngle={3}>
                                {riskPie.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                            </Pie>
                            <Legend formatter={(value) => <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>{value}</span>} />
                            <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: 'white' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Niche Performance */}
            <div className="glass-card">
                <h3 className="text-lg font-bold text-white mb-4">Performance Heatmap by Niche</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={nichePerf}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="niche" stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} />
                        <YAxis domain={[0, 100]} stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} />
                        <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: 'white' }} />
                        <Bar dataKey="score" radius={[6, 6, 0, 0]} name="Avg Score">
                            {nichePerf.map((entry, i) => (
                                <Cell key={i} fill={entry.score >= 80 ? '#10b981' : entry.score >= 70 ? '#6366f1' : '#f59e0b'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Dropout Prediction */}
            <div className="glass-card border border-red-500/20">
                <h3 className="text-lg font-bold text-white mb-3">⚠️ Dropout Risk Prediction</h3>
                <div className="space-y-3">
                    {[
                        { name: 'Rahul Kumar', reason: 'High burnout (72%) + low satisfaction (3/10) + 3 missed sessions', risk: 88 },
                        { name: 'Ajay Verma', reason: 'Declining performance trend + increased stress levels', risk: 64 },
                        { name: 'Meena Rao', reason: 'Low engagement with platform (2 logins this week)', risk: 51 },
                    ].map((d) => (
                        <div key={d.name} className="p-3 rounded-xl border border-red-500/20 bg-red-500/5 flex items-center gap-4">
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-white">{d.name}</p>
                                <p className="text-white/50 text-xs truncate">{d.reason}</p>
                            </div>
                            <div className="text-right flex-shrink-0">
                                <p className={`text-xl font-black ${d.risk >= 75 ? 'text-red-400' : 'text-amber-400'}`}>{d.risk}%</p>
                                <p className="text-white/30 text-xs">dropout risk</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
