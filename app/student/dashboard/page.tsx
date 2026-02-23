'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    RadialBarChart, RadialBar, BarChart, Bar,
} from 'recharts';
import { AlertTriangle, BookOpen, Zap, Heart, TrendingUp, CheckCircle, Clock, BrainCog } from 'lucide-react';
import Link from 'next/link';

const stressData = [
    { day: 'Mon', stress: 7, mood: 5 }, { day: 'Tue', stress: 6.5, mood: 5.5 },
    { day: 'Wed', stress: 5.8, mood: 6.2 }, { day: 'Thu', stress: 5.2, mood: 6.8 },
    { day: 'Fri', stress: 4.5, mood: 7.2 }, { day: 'Sat', stress: 3.8, mood: 7.8 },
    { day: 'Sun', stress: 3.2, mood: 8.0 },
];

const performanceData = [
    { subject: 'DSA', score: 72 }, { subject: 'System Design', score: 58 },
    { subject: 'React', score: 85 }, { subject: 'Node.js', score: 66 }, { subject: 'SQL', score: 79 },
];

const tasks = [
    { id: 1, subject: 'Data Structures – Binary Trees', type: 'theory', time: '60 min', done: true },
    { id: 2, subject: 'LeetCode – Medium Problems', type: 'practice', time: '90 min', done: true },
    { id: 3, subject: 'System Design – Load Balancers', type: 'theory', time: '45 min', done: false },
    { id: 4, subject: 'React Hooks Practice', type: 'project', time: '90 min', done: false },
];

export default function StudentDashboard() {
    const { data: session } = useSession();
    const [burnoutScore] = useState(34);
    const burnoutRisk = burnoutScore < 35 ? 'low' : burnoutScore < 65 ? 'moderate' : 'high';

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="page-header">Good evening, {session?.user?.name?.split(' ')[0] || 'Student'} 👋</h1>
                <p className="text-white/50">Here&apos;s your performance and wellness snapshot for this week.</p>
            </div>

            {/* Burnout Alert */}
            {burnoutRisk === 'high' && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 p-4 rounded-xl border border-red-500/30 bg-red-500/10">
                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-red-400 font-semibold">High Burnout Risk Detected</p>
                        <p className="text-red-300/70 text-sm mt-0.5">Your stress and sleep patterns suggest high risk. Please reduce study hours today and contact your mentor.</p>
                    </div>
                </motion.div>
            )}

            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { icon: Heart, label: 'Stress Level', value: '4.5/10', sub: '↓ from 7.2 last week', color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20' },
                    { icon: BrainCog, label: 'Focus Score', value: '78%', sub: '↑ 12% this week', color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20' },
                    { icon: TrendingUp, label: 'Avg. Performance', value: '72/100', sub: '↑ 8 pts from last week', color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20' },
                    { icon: BookOpen, label: 'Study Hours', value: '6.2 hrs/day', sub: 'Goal: 6 hrs', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
                ].map((stat) => (
                    <div key={stat.label} className={`glass-card border ${stat.bg}`}>
                        <stat.icon className={`w-5 h-5 ${stat.color} mb-3`} />
                        <p className="text-white/50 text-xs">{stat.label}</p>
                        <p className={`text-2xl font-bold ${stat.color} mt-0.5`}>{stat.value}</p>
                        <p className="text-white/30 text-xs mt-1">{stat.sub}</p>
                    </div>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Stress/Mood Trend */}
                <div className="glass-card lg:col-span-2">
                    <h3 className="text-lg font-bold text-white mb-4">This Week – Stress vs Mood</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <AreaChart data={stressData}>
                            <defs>
                                <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} /><stop offset="95%" stopColor="#ef4444" stopOpacity={0} /></linearGradient>
                                <linearGradient id="mg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} /><stop offset="95%" stopColor="#6366f1" stopOpacity={0} /></linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} />
                            <YAxis domain={[0, 10]} stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} />
                            <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: 'white' }} />
                            <Area type="monotone" dataKey="stress" stroke="#ef4444" strokeWidth={2} fill="url(#sg)" name="Stress" />
                            <Area type="monotone" dataKey="mood" stroke="#6366f1" strokeWidth={2} fill="url(#mg)" name="Mood" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Burnout Ring */}
                <div className="glass-card flex flex-col items-center justify-center">
                    <p className="text-sm text-white/50 mb-2">Burnout Risk</p>
                    <RadialBarChart width={140} height={140} innerRadius={45} outerRadius={65}
                        data={[{ value: burnoutScore, fill: burnoutRisk === 'low' ? '#10b981' : burnoutRisk === 'moderate' ? '#f59e0b' : '#ef4444' }]}
                        startAngle={90} endAngle={-270}>
                        <RadialBar dataKey="value" cornerRadius={8} background={{ fill: 'rgba(255,255,255,0.05)' }} />
                    </RadialBarChart>
                    <div className="text-center -mt-2">
                        <p className={`text-3xl font-black ${burnoutRisk === 'low' ? 'text-green-400' : burnoutRisk === 'moderate' ? 'text-amber-400' : 'text-red-400'}`}>{burnoutScore}%</p>
                        <p className={`text-sm font-semibold capitalize ${burnoutRisk === 'low' ? 'text-green-400' : burnoutRisk === 'moderate' ? 'text-amber-400' : 'text-red-400'}`}>{burnoutRisk} Risk</p>
                    </div>
                </div>
            </div>

            {/* Performance by Subject */}
            <div className="glass-card">
                <h3 className="text-lg font-bold text-white mb-4">Performance by Subject</h3>
                <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={performanceData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis type="number" domain={[0, 100]} stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} />
                        <YAxis type="category" dataKey="subject" stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} width={110} />
                        <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: 'white' }} />
                        <Bar dataKey="score" radius={[0, 6, 6, 0]}
                            fill="url(#barGrad)"
                            label={{ position: 'right', fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} />
                        <defs>
                            <linearGradient id="barGrad" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#6366f1" />
                                <stop offset="100%" stopColor="#a855f7" />
                            </linearGradient>
                        </defs>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Today's Tasks */}
            <div className="glass-card">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">Today&apos;s Tasks</h3>
                    <Link href="/student/study-plan" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">View full plan →</Link>
                </div>
                <div className="space-y-2">
                    {tasks.map((task) => (
                        <div key={task.id} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${task.done ? 'border-green-500/20 bg-green-500/5 opacity-60' : 'border-white/10 hover:border-indigo-500/30'}`}>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${task.done ? 'border-green-500 bg-green-500' : 'border-white/30'}`}>
                                {task.done && <CheckCircle className="w-3 h-3 text-white" />}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className={`text-sm font-medium truncate ${task.done ? 'text-white/50 line-through' : 'text-white'}`}>{task.subject}</p>
                                <p className="text-xs text-white/30 mt-0.5">{task.type}</p>
                            </div>
                            <div className="flex items-center gap-1.5 text-white/30 flex-shrink-0">
                                <Clock className="w-3.5 h-3.5" />
                                <span className="text-xs">{task.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                    { label: 'Log Wellness', href: '/student/wellness', icon: Heart, color: 'border-rose-500/30 hover:bg-rose-500/10' },
                    { label: 'Generate Study Plan', href: '/student/study-plan', icon: Zap, color: 'border-indigo-500/30 hover:bg-indigo-500/10' },
                    { label: 'Skill Analysis', href: '/student/skills', icon: BrainCog, color: 'border-violet-500/30 hover:bg-violet-500/10' },
                    { label: 'Career Profile', href: '/student/career', icon: TrendingUp, color: 'border-green-500/30 hover:bg-green-500/10' },
                ].map((a) => (
                    <Link key={a.label} href={a.href}
                        className={`glass-card border text-center hover:-translate-y-1 transition-all duration-200 ${a.color}`}>
                        <a.icon className="w-6 h-6 text-white/60 mx-auto mb-2" />
                        <p className="text-sm font-medium text-white/70">{a.label}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
