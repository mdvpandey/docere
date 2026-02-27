'use client';

import { useState, useEffect } from 'react';
import { Users, AlertTriangle, TrendingUp, Heart, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

const sampleStudents = [
    { id: '1', name: 'Rahul Kumar', email: 'rahul@DOCERE.app', niche: 'Software Engineering', burnout: { score: 72, risk: 'high' as const }, wellnessSummary: { stress: 8.1, mood: 4.2, sleep: 5.5 }, performance: 62 },
    { id: '2', name: 'Priya Sharma', email: 'priya@DOCERE.app', niche: 'Data Science', burnout: { score: 38, risk: 'moderate' as const }, wellnessSummary: { stress: 5.8, mood: 6.3, sleep: 7.1 }, performance: 75 },
    { id: '3', name: 'Ananya Singh', email: 'ananya@DOCERE.app', niche: 'UI/UX Design', burnout: { score: 21, risk: 'low' as const }, wellnessSummary: { stress: 3.4, mood: 7.8, sleep: 8.2 }, performance: 88 },
    { id: '4', name: 'Vikram Patel', email: 'vikram@DOCERE.app', niche: 'DevOps', burnout: { score: 55, risk: 'moderate' as const }, wellnessSummary: { stress: 6.2, mood: 5.9, sleep: 6.8 }, performance: 69 },
];

const riskColor = { low: 'badge-green', moderate: 'badge-yellow', high: 'badge-red' };
const riskText = { low: 'text-green-400', moderate: 'text-amber-400', high: 'text-red-400' };

export default function MentorStudentsPage() {
    const [students] = useState(sampleStudents);
    const [selected, setSelected] = useState<typeof sampleStudents[0] | null>(null);
    const [message, setMessage] = useState('');

    async function sendMessage() {
        if (!message.trim() || !selected) return;
        toast.success(`Message sent to ${selected.name}!`);
        setMessage('');
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="page-header">My Students 👩‍🎓</h1>
                <p className="text-white/50">Monitor wellness, performance, and burnout risk for all your assigned students.</p>
            </div>

            {/* Alert for high-risk students */}
            {students.filter((s) => s.burnout.risk === 'high').length > 0 && (
                <div className="flex items-start gap-3 p-4 rounded-xl border border-red-500/30 bg-red-500/10">
                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-red-400 font-semibold">⚠️ {students.filter((s) => s.burnout.risk === 'high').length} student(s) at High Burnout Risk</p>
                        <p className="text-red-300/70 text-sm">Immediate intervention recommended. Click on the student to message them.</p>
                    </div>
                </div>
            )}

            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Students', value: students.length, icon: Users, color: 'text-indigo-400' },
                    { label: 'High Burnout Risk', value: students.filter((s) => s.burnout.risk === 'high').length, icon: AlertTriangle, color: 'text-red-400' },
                    { label: 'Avg Performance', value: Math.round(students.reduce((a, s) => a + s.performance, 0) / students.length) + '%', icon: TrendingUp, color: 'text-green-400' },
                    { label: 'Avg Stress', value: (students.reduce((a, s) => a + s.wellnessSummary.stress, 0) / students.length).toFixed(1) + '/10', icon: Heart, color: 'text-rose-400' },
                ].map((stat) => (
                    <div key={stat.label} className="glass-card">
                        <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
                        <p className="text-white/40 text-xs">{stat.label}</p>
                        <p className={`text-2xl font-bold ${stat.color} mt-0.5`}>{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Student Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {students.map((student) => (
                    <div key={student.id}
                        className={`glass-card cursor-pointer transition-all duration-200 hover:-translate-y-0.5 ${selected?.id === student.id ? 'border-indigo-500/50 bg-indigo-500/5' : 'hover:border-indigo-500/30'}`}
                        onClick={() => setSelected(selected?.id === student.id ? null : student)}>
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold">{student.name[0]}</div>
                                <div>
                                    <p className="font-bold text-white">{student.name}</p>
                                    <p className="text-white/40 text-sm">{student.niche}</p>
                                </div>
                            </div>
                            <span className={`badge ${riskColor[student.burnout.risk]}`}>{student.burnout.risk} risk</span>
                        </div>

                        {/* Mini stats */}
                        <div className="grid grid-cols-3 gap-2 mb-3">
                            {[
                                { label: 'Stress', value: student.wellnessSummary.stress.toFixed(1) },
                                { label: 'Mood', value: student.wellnessSummary.mood.toFixed(1) },
                                { label: 'Sleep', value: student.wellnessSummary.sleep.toFixed(1) + 'h' },
                            ].map((s) => (
                                <div key={s.label} className="bg-white/5 rounded-lg p-2 text-center">
                                    <p className="text-xs text-white/40">{s.label}</p>
                                    <p className="text-white font-bold text-sm">{s.value}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex-1 mr-4">
                                <div className="flex justify-between text-xs mb-1"><span className="text-white/40">Performance</span><span className="text-white">{student.performance}%</span></div>
                                <div className="w-full bg-white/10 rounded-full h-1.5">
                                    <div className="h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600" style={{ width: `${student.performance}%` }} />
                                </div>
                            </div>
                            <p className={`text-xl font-black ${riskText[student.burnout.risk]}`}>{student.burnout.score}%</p>
                        </div>

                        {/* Expanded message panel */}
                        {selected?.id === student.id && (
                            <div className="mt-4 pt-4 border-t border-white/10" onClick={(e) => e.stopPropagation()}>
                                <p className="text-sm text-white/60 mb-2">Send a quick message:</p>
                                <div className="flex gap-2">
                                    <input value={message} onChange={(e) => setMessage(e.target.value)}
                                        placeholder={`Message ${student.name.split(' ')[0]}...`} className="input-field flex-1 !py-2 text-sm" />
                                    <button onClick={sendMessage} className="btn-primary !py-2 !px-4 flex items-center gap-1.5 text-sm">
                                        <MessageSquare className="w-4 h-4" /> Send
                                    </button>
                                </div>
                                {student.burnout.risk === 'high' && (
                                    <div className="mt-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                                        <p className="text-red-400 text-sm font-semibold mb-1">🤖 AI Intervention Suggested:</p>
                                        <p className="text-red-300/70 text-xs">Schedule an urgent 1:1 session. Suggest reducing study hours by 30% this week and focus on wellness recovery.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
