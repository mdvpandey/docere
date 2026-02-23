'use client';

import { useState } from 'react';
import { Loader2, Brain, Star, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const STRESS_TRIGGERS = ['Heavy workload', 'Exam pressure', 'Time management', 'Content difficulty', 'Family pressure', 'Financial stress', 'Social isolation', 'Sleep deprivation'];

export default function FeedbackPage() {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({ difficultyRating: 6, satisfactionScore: 7, stressTriggers: [] as string[], comments: '' });
    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState<{ sentiment: string; keyThemes: string[]; recommendations: string[] } | null>(null);

    function toggleTrigger(t: string) {
        setForm((p) => ({
            ...p,
            stressTriggers: p.stressTriggers.includes(t) ? p.stressTriggers.filter((x) => x !== t) : [...p.stressTriggers, t],
        }));
    }

    async function handleSubmit() {
        setLoading(true);
        try {
            const res = await fetch('/api/feedback', {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setAnalysis(data.feedback.aiAnalysis);
            setStep(4);
            toast.success('Feedback submitted and analyzed!');
        } catch { toast.error('Submission failed. Please try again.'); }
        finally { setLoading(false); }
    }

    const sentimentColor = analysis?.sentiment === 'positive' ? 'text-green-400' : analysis?.sentiment === 'negative' ? 'text-red-400' : 'text-amber-400';
    const sentimentEmoji = analysis?.sentiment === 'positive' ? '😊' : analysis?.sentiment === 'negative' ? '😟' : '😐';

    return (
        <div className="space-y-8 max-w-3xl">
            <div>
                <h1 className="page-header">Weekly Feedback 💬</h1>
                <p className="text-white/50">Share how your week went. Our AI analyzes your feedback and provides personalized guidance.</p>
            </div>

            {/* Progress Steps */}
            {step < 4 && (
                <div className="flex items-center gap-2">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= s ? 'bg-indigo-600 text-white' : 'bg-white/10 text-white/30'}`}>{s}</div>
                            {s < 3 && <div className={`flex-1 h-px w-12 ${step > s ? 'bg-indigo-500' : 'bg-white/10'}`} />}
                        </div>
                    ))}
                    <p className="text-white/40 text-sm ml-3">
                        {step === 1 ? 'Difficulty & Satisfaction' : step === 2 ? 'Stress Triggers' : 'Comments & Submit'}
                    </p>
                </div>
            )}

            {/* Step 1: Ratings */}
            {step === 1 && (
                <div className="glass-card space-y-6">
                    <div>
                        <label className="text-white font-semibold block mb-1">How difficult was this week&apos;s content? <span className="text-indigo-400 font-black">{form.difficultyRating}/10</span></label>
                        <p className="text-white/40 text-sm mb-3">1 = Very Easy, 10 = Extremely Difficult</p>
                        <input type="range" min={1} max={10} value={form.difficultyRating}
                            onChange={(e) => setForm((p) => ({ ...p, difficultyRating: +e.target.value }))}
                            className="w-full accent-indigo-500 h-2" />
                        <div className="flex justify-between text-xs text-white/30 mt-1"><span>Easy</span><span>Difficult</span></div>
                    </div>
                    <div>
                        <label className="text-white font-semibold block mb-1">How satisfied are you with your progress? <span className="text-indigo-400 font-black">{form.satisfactionScore}/10</span></label>
                        <p className="text-white/40 text-sm mb-3">1 = Very Dissatisfied, 10 = Very Satisfied</p>
                        <input type="range" min={1} max={10} value={form.satisfactionScore}
                            onChange={(e) => setForm((p) => ({ ...p, satisfactionScore: +e.target.value }))}
                            className="w-full accent-indigo-500 h-2" />
                        <div className="flex justify-between text-xs text-white/30 mt-1"><span>Dissatisfied</span><span>Satisfied</span></div>
                    </div>
                    <button onClick={() => setStep(2)} className="btn-primary">Next Step →</button>
                </div>
            )}

            {/* Step 2: Stress Triggers */}
            {step === 2 && (
                <div className="glass-card space-y-6">
                    <div>
                        <h3 className="text-white font-semibold mb-2">What caused stress this week? <span className="text-white/40 text-sm">(select all that apply)</span></h3>
                        <div className="flex flex-wrap gap-2">
                            {STRESS_TRIGGERS.map((t) => (
                                <button key={t} onClick={() => toggleTrigger(t)}
                                    className={`px-3 py-2 rounded-xl border text-sm transition-all ${form.stressTriggers.includes(t) ? 'border-red-500/60 bg-red-500/10 text-red-300' : 'border-white/20 text-white/50 hover:border-white/40'}`}>
                                    {form.stressTriggers.includes(t) && '✓ '}{t}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => setStep(1)} className="btn-secondary">← Back</button>
                        <button onClick={() => setStep(3)} className="btn-primary">Next Step →</button>
                    </div>
                </div>
            )}

            {/* Step 3: Comments */}
            {step === 3 && (
                <div className="glass-card space-y-4">
                    <h3 className="text-white font-semibold">Any additional comments or thoughts?</h3>
                    <textarea rows={6} value={form.comments}
                        onChange={(e) => setForm((p) => ({ ...p, comments: e.target.value }))}
                        placeholder="Share what went well, what was challenging, how you felt this week..." className="input-field resize-none"
                    />
                    <div className="flex gap-3">
                        <button onClick={() => setStep(2)} className="btn-secondary">← Back</button>
                        <button onClick={handleSubmit} disabled={loading} className="btn-primary flex items-center gap-2">
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Brain className="w-4 h-4" />}
                            {loading ? 'Analyzing...' : 'Submit & Analyze'}
                        </button>
                    </div>
                </div>
            )}

            {/* Step 4: AI Analysis Result */}
            {step === 4 && analysis && (
                <div className="space-y-4">
                    <div className="glass-card border border-indigo-500/20 text-center py-8">
                        <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                        <h2 className="text-2xl font-bold text-white mb-2">Feedback Submitted!</h2>
                        <p className={`text-4xl mb-1`}>{sentimentEmoji}</p>
                        <p className={`text-lg font-bold capitalize ${sentimentColor}`}>
                            {analysis.sentiment} Outlook This Week
                        </p>
                    </div>
                    <div className="glass-card">
                        <h3 className="text-lg font-bold text-white mb-3">🧠 AI Analysis</h3>
                        <div className="mb-4">
                            <p className="text-white/50 text-sm mb-2">Key Themes Detected:</p>
                            <div className="flex flex-wrap gap-2">
                                {analysis.keyThemes.map((t) => (
                                    <span key={t} className="badge badge-purple">{t}</span>
                                ))}
                            </div>
                        </div>
                        <h4 className="text-white/70 font-semibold mb-2">Recommendations:</h4>
                        <ul className="space-y-2">
                            {analysis.recommendations.map((r, i) => (
                                <li key={i} className="flex items-start gap-2 text-white/60 text-sm">
                                    <span className="text-indigo-400 font-bold">→</span> {r}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button onClick={() => { setStep(1); setAnalysis(null); setForm({ difficultyRating: 6, satisfactionScore: 7, stressTriggers: [], comments: '' }); }}
                        className="btn-secondary w-full">Submit Another Week&apos;s Feedback</button>
                </div>
            )}
        </div>
    );
}
