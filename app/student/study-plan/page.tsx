'use client';

import { useState } from 'react';
import { Zap, CheckCircle, Clock, Loader2, Sun, BookOpen, Wrench, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const NICHES = ['Software Engineering', 'Data Science', 'UI/UX Design', 'DevOps', 'Cybersecurity', 'Product Management', 'Finance', 'General'];

const taskTypeIcon: Record<string, React.ElementType> = {
    theory: BookOpen, practice: Zap, project: Wrench, revision: RefreshCw, 'mock-test': Sun,
};

const typeColors: Record<string, string> = {
    theory: 'badge-blue', practice: 'badge-purple', project: 'badge-green', revision: 'badge-yellow', 'mock-test': 'badge-red',
};

type Task = { id: string; subject: string; type: string; duration: number; day: string; priority: string; completed: boolean };

export default function StudyPlanPage() {
    const [niche, setNiche] = useState('Software Engineering');
    const [loading, setLoading] = useState(false);
    const [plan, setPlan] = useState<{ weekLabel: string; tasks: Task[]; intensityLevel: string; focusTip: string } | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);

    async function generatePlan() {
        setLoading(true);
        try {
            const res = await fetch('/api/study-plan/generate', {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ niche }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setPlan(data.plan);
            setTasks(data.plan.tasks || []);
            toast.success('AI study plan generated!');
        } catch {
            toast.error('Failed to generate plan. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    async function toggleTask(taskId: string, completed: boolean) {
        setTasks((prev) => prev.map((t) => t.id === taskId ? { ...t, completed } : t));
        await fetch('/api/study-plan', {
            method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ taskId, completed }),
        });
    }

    // Sample plan for display before generation
    const displayTasks = tasks.length > 0 ? tasks : [
        { id: 's1', subject: 'Data Structures – Graphs', type: 'theory', duration: 60, day: 'Monday', priority: 'high', completed: false },
        { id: 's2', subject: 'LeetCode Medium – Arrays', type: 'practice', duration: 90, day: 'Monday', priority: 'high', completed: true },
        { id: 's3', subject: 'System Design – Microservices', type: 'theory', duration: 75, day: 'Tuesday', priority: 'medium', completed: false },
        { id: 's4', subject: 'Portfolio Project – API Build', type: 'project', duration: 120, day: 'Tuesday', priority: 'medium', completed: false },
        { id: 's5', subject: 'Dynamic Programming', type: 'revision', duration: 60, day: 'Wednesday', priority: 'high', completed: false },
        { id: 's6', subject: 'Mock Test – Full Stack', type: 'mock-test', duration: 180, day: 'Saturday', priority: 'high', completed: false },
    ];

    const completedCount = displayTasks.filter((t) => t.completed).length;
    const pct = displayTasks.length > 0 ? Math.round((completedCount / displayTasks.length) * 100) : 0;

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="page-header">Study Plan 📅</h1>
                    <p className="text-white/50">AI-generated and adapted to your current stress and performance.</p>
                </div>
            </div>

            {/* Generator */}
            <div className="glass-card border border-indigo-500/20">
                <h2 className="text-lg font-bold text-white mb-4">🤖 AI Plan Generator</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <label className="text-sm text-white/60 block mb-1.5">Your Niche / Focus Area</label>
                        <select value={niche} onChange={(e) => setNiche(e.target.value)} className="input-field">
                            {NICHES.map((n) => <option key={n}>{n}</option>)}
                        </select>
                    </div>
                    <div className="flex items-end">
                        <button onClick={generatePlan} disabled={loading} className="btn-primary flex items-center gap-2 whitespace-nowrap">
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                            {loading ? 'Generating...' : 'Generate AI Plan'}
                        </button>
                    </div>
                </div>
                {plan && (
                    <div className="mt-4 p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                        <p className="text-indigo-400 text-sm">📌 {plan.focusTip}</p>
                        <p className="text-white/40 text-xs mt-1">Intensity: <span className="text-white/60 capitalize">{plan.intensityLevel}</span> · {plan.weekLabel}</p>
                    </div>
                )}
            </div>

            {/* Progress */}
            <div className="glass-card">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-white">Weekly Progress</h3>
                    <span className="text-2xl font-black gradient-text">{pct}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3 mb-2">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-700"
                        style={{ width: `${pct}%` }} />
                </div>
                <p className="text-white/40 text-sm">{completedCount} of {displayTasks.length} tasks completed</p>
            </div>

            {/* Kanban Board */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {DAYS.filter((day) => displayTasks.some((t) => t.day === day)).map((day) => {
                    const dayTasks = displayTasks.filter((t) => t.day === day);
                    return (
                        <div key={day} className="glass-card">
                            <div className="flex items-center gap-2 mb-4">
                                <Sun className="w-4 h-4 text-amber-400" />
                                <h3 className="font-bold text-white">{day}</h3>
                                <span className="text-xs text-white/30 ml-auto">{dayTasks.filter((t) => t.completed).length}/{dayTasks.length}</span>
                            </div>
                            <div className="space-y-2">
                                {dayTasks.map((task) => {
                                    const Icon = taskTypeIcon[task.type] || BookOpen;
                                    return (
                                        <div key={task.id}
                                            className={`p-3 rounded-xl border transition-all ${task.completed ? 'border-green-500/20 bg-green-500/5 opacity-60' : 'border-white/10 hover:border-indigo-500/30'}`}>
                                            <div className="flex items-start gap-2">
                                                <button onClick={() => toggleTask(task.id, !task.completed)}
                                                    className={`mt-0.5 w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all ${task.completed ? 'border-green-500 bg-green-500' : 'border-white/30 hover:border-indigo-500'}`}>
                                                    {task.completed && <CheckCircle className="w-3 h-3 text-white" />}
                                                </button>
                                                <div className="min-w-0 flex-1">
                                                    <p className={`text-sm font-medium ${task.completed ? 'line-through text-white/40' : 'text-white'}`}>{task.subject}</p>
                                                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                                                        <span className={`badge ${typeColors[task.type]} !py-0 !text-[10px]`}>{task.type}</span>
                                                        <span className="flex items-center gap-1 text-white/30 text-[10px]">
                                                            <Clock className="w-3 h-3" />{task.duration}m
                                                        </span>
                                                        {task.priority === 'high' && <span className="badge badge-red !py-0 !text-[10px]">High</span>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
