'use client';

import { useState } from 'react';
import { Briefcase, Loader2, Star, MapPin, ExternalLink, Calendar } from 'lucide-react';
import { toast } from 'sonner';

const ROLES = ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Data Scientist', 'DevOps Engineer', 'UX Designer', 'Product Manager', 'Cybersecurity Analyst'];

const jobRecommendations = [
    { company: 'Razorpay', role: 'Frontend Engineer', location: 'Bengaluru (Hybrid)', match: 94, tags: ['React', 'TypeScript', 'Node.js'] },
    { company: 'Swiggy', role: 'Full Stack Developer', location: 'Bengaluru (Remote)', match: 88, tags: ['React', 'Python', 'AWS'] },
    { company: 'Meesho', role: 'Software Engineer – II', location: 'Bengaluru', match: 82, tags: ['Node.js', 'MongoDB', 'Docker'] },
    { company: 'CRED', role: 'React Developer', location: 'Bengaluru (Hybrid)', match: 79, tags: ['React', 'Redux', 'REST APIs'] },
];

export default function CareerPage() {
    const [role, setRole] = useState('Full Stack Developer');
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tab, setTab] = useState<'profile' | 'resume' | 'interviews' | 'jobs'>('profile');

    const [resume, setResume] = useState({
        summary: 'Passionate full-stack developer with 2 years of experience building scalable web applications using React, Node.js, and MongoDB.',
        skills: 'React, TypeScript, Node.js, MongoDB, Docker, REST APIs, Git',
        education: 'B.Tech Computer Science – VIT Vellore (2021–2025)',
        project1: 'E-commerce Platform with real-time inventory using React, Node.js, Socket.io, MongoDB.',
        project2: 'AI-powered Resume Analyser using Python FastAPI, LangChain, and PostgreSQL.',
    });

    async function saveProfile() {
        setLoading(true);
        try {
            await fetch('/api/career', {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ preferredRole: role }),
            });
            toast.success('Career profile updated!');
            setSaved(true);
        } catch { toast.error('Failed to save'); }
        finally { setLoading(false); }
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="page-header">Career Center 🚀</h1>
                <p className="text-white/50">Build your profile, find skill gaps, prepare for interviews, and land your dream role.</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-white/5 border border-white/10 rounded-xl w-fit">
                {(['profile', 'resume', 'interviews', 'jobs'] as const).map((t) => (
                    <button key={t} onClick={() => setTab(t)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${tab === t ? 'bg-indigo-600 text-white shadow' : 'text-white/50 hover:text-white'}`}>
                        {t === 'interviews' ? '🎤 Interviews' : t === 'jobs' ? '🏢 Jobs' : t === 'resume' ? '📄 Resume' : '👤 Profile'}
                    </button>
                ))}
            </div>

            {tab === 'profile' && (
                <div className="glass-card">
                    <h2 className="text-xl font-bold text-white mb-6">Career Profile</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm text-white/60 block mb-1.5">Preferred Role</label>
                            <select value={role} onChange={(e) => setRole(e.target.value)} className="input-field">
                                {ROLES.map((r) => <option key={r}>{r}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="text-sm text-white/60 block mb-1.5">Target Salary Range (₹ LPA)</label>
                            <input type="text" defaultValue="8–15 LPA" className="input-field" placeholder="e.g. 10–20 LPA" />
                        </div>
                        <div>
                            <label className="text-sm text-white/60 block mb-1.5">Experience Level</label>
                            <select className="input-field"><option>Fresher (0–1 year)</option><option>Junior (1–3 years)</option><option>Mid-level (3–5 years)</option></select>
                        </div>
                        <div>
                            <label className="text-sm text-white/60 block mb-1.5">Bio / Summary</label>
                            <textarea rows={3} className="input-field resize-none" defaultValue="Full-stack enthusiast building products that solve real problems. Looking for roles in product-led startups." />
                        </div>
                        <button onClick={saveProfile} disabled={loading} className="btn-primary flex items-center gap-2">
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Briefcase className="w-4 h-4" />}
                            {loading ? 'Saving...' : (saved ? '✓ Saved!' : 'Save Profile')}
                        </button>
                    </div>
                </div>
            )}

            {tab === 'resume' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="glass-card">
                        <h2 className="text-xl font-bold text-white mb-4">Resume Builder</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-white/60 block mb-1.5">Professional Summary</label>
                                <textarea rows={3} value={resume.summary} onChange={(e) => setResume((p) => ({ ...p, summary: e.target.value }))} className="input-field resize-none" />
                            </div>
                            <div>
                                <label className="text-sm text-white/60 block mb-1.5">Core Skills</label>
                                <input type="text" value={resume.skills} onChange={(e) => setResume((p) => ({ ...p, skills: e.target.value }))} className="input-field" />
                            </div>
                            <div>
                                <label className="text-sm text-white/60 block mb-1.5">Education</label>
                                <input type="text" value={resume.education} onChange={(e) => setResume((p) => ({ ...p, education: e.target.value }))} className="input-field" />
                            </div>
                            <div>
                                <label className="text-sm text-white/60 block mb-1.5">Project 1</label>
                                <textarea rows={2} value={resume.project1} onChange={(e) => setResume((p) => ({ ...p, project1: e.target.value }))} className="input-field resize-none" />
                            </div>
                            <button className="btn-primary w-full">Download PDF Resume</button>
                        </div>
                    </div>
                    {/* Live Preview */}
                    <div className="glass-card bg-white/[0.02]">
                        <h3 className="text-sm font-semibold text-white/50 mb-4 uppercase tracking-wider">Live Preview</h3>
                        <div className="space-y-4 text-sm">
                            <div className="border-b border-white/10 pb-4">
                                <h2 className="text-xl font-bold text-white">Your Name</h2>
                                <p className="text-indigo-400">{role}</p>
                            </div>
                            <div>
                                <h4 className="text-white/60 uppercase text-xs tracking-wider mb-1">Summary</h4>
                                <p className="text-white/70 leading-relaxed">{resume.summary}</p>
                            </div>
                            <div>
                                <h4 className="text-white/60 uppercase text-xs tracking-wider mb-1">Skills</h4>
                                <div className="flex flex-wrap gap-1.5">
                                    {resume.skills.split(',').map((s) => (
                                        <span key={s} className="badge badge-blue !text-[10px]">{s.trim()}</span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="text-white/60 uppercase text-xs tracking-wider mb-1">Education</h4>
                                <p className="text-white/70">{resume.education}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {tab === 'interviews' && (
                <div className="space-y-6">
                    <div className="glass-card border border-indigo-500/20">
                        <h2 className="text-xl font-bold text-white mb-4">Book a Mock Interview</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-white/60 block mb-1.5">Topic</label>
                                <select className="input-field"><option>Data Structures & Algorithms</option><option>System Design</option><option>Frontend (React/TS)</option><option>Backend (Node/APIs)</option><option>HR Round</option></select>
                            </div>
                            <div>
                                <label className="text-sm text-white/60 block mb-1.5">Preferred Date</label>
                                <input type="date" className="input-field" />
                            </div>
                        </div>
                        <button onClick={() => toast.success('Mock interview scheduled! Your mentor will confirm shortly.')} className="btn-primary mt-4 flex items-center gap-2">
                            <Calendar className="w-4 h-4" /> Schedule Interview
                        </button>
                    </div>
                    <div className="glass-card">
                        <h3 className="text-lg font-bold text-white mb-4">Past Mock Interviews</h3>
                        <div className="space-y-3">
                            {[
                                { date: 'Jan 15, 2025', topic: 'DSA – Graphs & DP', score: 7.5, feedback: 'Good approach on trees, need to improve DP optimization.' },
                                { date: 'Dec 28, 2024', topic: 'System Design', score: 6.2, feedback: 'Good overall. Practice load balancing and caching patterns.' },
                            ].map((iv) => (
                                <div key={iv.date} className="p-4 rounded-xl border border-white/10 hover:border-indigo-500/30 transition-all">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <p className="font-semibold text-white">{iv.topic}</p>
                                            <p className="text-white/40 text-xs">{iv.date}</p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                            <span className="text-white font-bold">{iv.score}/10</span>
                                        </div>
                                    </div>
                                    <p className="text-white/50 text-sm">{iv.feedback}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {tab === 'jobs' && (
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-white">Recommended Opportunities</h2>
                    {jobRecommendations.map((job) => (
                        <div key={job.company} className="glass-card hover:border-indigo-500/30 transition-all group">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold flex-shrink-0">{job.company[0]}</div>
                                        <div>
                                            <p className="font-bold text-white">{job.role}</p>
                                            <p className="text-indigo-400 text-sm">{job.company}</p>
                                        </div>
                                    </div>
                                    <p className="text-white/40 text-sm flex items-center gap-1.5 mt-1"><MapPin className="w-3.5 h-3.5" />{job.location}</p>
                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                        {job.tags.map((t) => <span key={t} className="badge badge-blue !text-[10px]">{t}</span>)}
                                    </div>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <div className={`text-2xl font-black ${job.match >= 90 ? 'text-green-400' : job.match >= 80 ? 'text-amber-400' : 'text-white/60'}`}>{job.match}%</div>
                                    <p className="text-white/30 text-xs">match</p>
                                    <a href="#" className="btn-primary !py-1.5 !px-4 !text-xs mt-2 flex items-center gap-1"><ExternalLink className="w-3 h-3" />Apply</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
