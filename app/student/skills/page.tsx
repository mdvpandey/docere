'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Zap, CheckCircle, Loader2, ExternalLink } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';

const NICHES = ['Software Engineering', 'Data Science', 'UI/UX Design', 'DevOps', 'Cybersecurity', 'Product Management'];
const ROLES: Record<string, string[]> = {
    'Software Engineering': ['Full Stack Developer', 'Frontend Developer', 'Backend Developer'],
    'Data Science': ['Data Scientist', 'ML Engineer', 'Data Analyst'],
    'UI/UX Design': ['UX Designer', 'Product Designer', 'UI Developer'],
    'DevOps': ['DevOps Engineer', 'Site Reliability Engineer', 'Cloud Architect'],
    'Cybersecurity': ['Cybersecurity Analyst', 'Penetration Tester', 'Security Engineer'],
    'Product Management': ['Product Manager', 'APM', 'Growth Manager'],
};

const COMMON_SKILLS = ['React', 'TypeScript', 'Node.js', 'Python', 'SQL', 'Git', 'Docker', 'AWS', 'Figma', 'Machine Learning', 'System Design', 'REST APIs', 'MongoDB', 'Linux', 'CI/CD'];

export default function SkillsPage() {
    const [niche, setNiche] = useState('Software Engineering');
    const [role, setRole] = useState('Full Stack Developer');
    const [selectedSkills, setSelectedSkills] = useState<string[]>(['React', 'TypeScript', 'Node.js', 'Git', 'REST APIs']);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{
        missingSkills: string[];
        presentSkills: string[];
        recommendations: string[];
        roadmap: Array<{ week: number; skill: string; resource: string; type: string }>;
    } | null>(null);

    function toggleSkill(s: string) {
        setSelectedSkills((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
    }

    async function runAnalysis() {
        setLoading(true);
        try {
            const res = await fetch('/api/skills', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ niche, role, skills: selectedSkills }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setResult(data.analysis);
            toast.success('Skill gap analysis complete!');
        } catch {
            toast.error('Analysis failed. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    const radarData = result
        ? [
            ...result.presentSkills.slice(0, 5).map((s) => ({ skill: s.length > 10 ? s.slice(0, 10) + '…' : s, score: 80 + Math.random() * 20 })),
            ...result.missingSkills.slice(0, 3).map((s) => ({ skill: s.length > 10 ? s.slice(0, 10) + '…' : s, score: 10 + Math.random() * 20 })),
        ]
        : [{ skill: 'React', score: 85 }, { skill: 'Node.js', score: 75 }, { skill: 'System Design', score: 45 }, { skill: 'Docker', score: 30 }, { skill: 'TypeScript', score: 80 }];

    const typeColors: Record<string, string> = { course: 'badge-blue', project: 'badge-purple', practice: 'badge-green', certification: 'badge-yellow' };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="page-header">Skills & Roadmap ⚡</h1>
                <p className="text-white/50">Identify skill gaps and get a precise week-by-week roadmap to close them.</p>
            </div>

            {/* Config */}
            <div className="glass-card border border-indigo-500/20">
                <h2 className="text-lg font-bold text-white mb-4">Configure Your Profile</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="text-sm text-white/60 block mb-1.5">Your Niche</label>
                        <select value={niche} onChange={(e) => { setNiche(e.target.value); setRole(ROLES[e.target.value]?.[0] || ''); }} className="input-field">
                            {NICHES.map((n) => <option key={n}>{n}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="text-sm text-white/60 block mb-1.5">Target Role</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)} className="input-field">
                            {(ROLES[niche] || []).map((r) => <option key={r}>{r}</option>)}
                        </select>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="text-sm text-white/60 block mb-2">Select skills you already have:</label>
                    <div className="flex flex-wrap gap-2">
                        {COMMON_SKILLS.map((s) => (
                            <button key={s} onClick={() => toggleSkill(s)}
                                className={`px-3 py-1.5 rounded-full text-sm border transition-all ${selectedSkills.includes(s) ? 'bg-indigo-500/20 border-indigo-500/60 text-indigo-300' : 'border-white/20 text-white/50 hover:border-white/40'}`}>
                                {selectedSkills.includes(s) && <CheckCircle className="w-3 h-3 inline mr-1.5" />}{s}
                            </button>
                        ))}
                    </div>
                </div>
                <button onClick={runAnalysis} disabled={loading} className="btn-primary flex items-center gap-2">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                    {loading ? 'Analyzing...' : 'Run Skill Gap Analysis'}
                </button>
            </div>

            {/* Radar Chart */}
            <div className="glass-card">
                <h3 className="text-lg font-bold text-white mb-4">Skill Competency Radar</h3>
                <ResponsiveContainer width="100%" height={260}>
                    <RadarChart data={radarData}>
                        <PolarGrid stroke="rgba(255,255,255,0.1)" />
                        <PolarAngleAxis dataKey="skill" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} />
                        <Radar dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} strokeWidth={2} />
                    </RadarChart>
                </ResponsiveContainer>
            </div>

            {result && (
                <>
                    {/* Gap Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="glass-card border border-green-500/20">
                            <h3 className="text-lg font-bold text-white mb-3">✅ You Have ({result.presentSkills.length})</h3>
                            <div className="flex flex-wrap gap-2">
                                {result.presentSkills.map((s) => (
                                    <span key={s} className="badge badge-green">{s}</span>
                                ))}
                            </div>
                        </div>
                        <div className="glass-card border border-red-500/20">
                            <h3 className="text-lg font-bold text-white mb-3">❌ You Need ({result.missingSkills.length})</h3>
                            <div className="flex flex-wrap gap-2">
                                {result.missingSkills.map((s) => (
                                    <span key={s} className="badge badge-red">{s}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Recommendations */}
                    <div className="glass-card border border-indigo-500/20">
                        <h3 className="text-lg font-bold text-white mb-3">🧠 AI Recommendations</h3>
                        <ul className="space-y-2">
                            {result.recommendations.map((r, i) => (
                                <li key={i} className="flex items-start gap-2 text-white/70 text-sm">
                                    <span className="text-indigo-400 font-bold mt-0.5">{i + 1}.</span> {r}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Roadmap */}
                    <div className="glass-card">
                        <h3 className="text-lg font-bold text-white mb-4">📍 Week-by-Week Roadmap</h3>
                        <div className="relative">
                            <div className="absolute left-6 top-2 bottom-2 w-px bg-indigo-500/30" />
                            <div className="space-y-4 pl-14">
                                {result.roadmap.map((step) => (
                                    <div key={step.week} className="relative">
                                        <div className="absolute -left-8 w-6 h-6 rounded-full bg-indigo-500/20 border-2 border-indigo-500 flex items-center justify-center text-xs font-bold text-indigo-400">{step.week}</div>
                                        <div className="glass-card !p-4 hover:border-indigo-500/30 transition-all">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-semibold text-white">{step.skill}</span>
                                                <span className={`badge ${typeColors[step.type] || 'badge-blue'} ml-auto`}>{step.type}</span>
                                            </div>
                                            <p className="text-white/50 text-sm flex items-center gap-1.5">
                                                <ExternalLink className="w-3.5 h-3.5" /> {step.resource}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
