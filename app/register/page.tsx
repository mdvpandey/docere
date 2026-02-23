'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Brain, Eye, EyeOff, Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const roles = [
    { value: 'student', label: '📚 Student', desc: 'I want to learn and grow' },
    { value: 'mentor', label: '🎓 Mentor', desc: 'I want to guide students' },
];

export default function RegisterPage() {
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const router = useRouter();

    function update(field: string, val: string) {
        setForm((prev) => ({ ...prev, [field]: val }));
    }

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault();
        if (form.password.length < 8) { toast.error('Password must be at least 8 characters'); return; }
        setLoading(true);
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) { toast.error(data.error || 'Registration failed'); setLoading(false); return; }
            // Auto-login
            await signIn('credentials', { email: form.email, password: form.password, redirect: false });
            setDone(true);
            setTimeout(() => {
                router.push(form.role === 'mentor' ? '/mentor/students' : '/student/dashboard');
            }, 1500);
        } catch {
            toast.error('Something went wrong. Please try again.');
            setLoading(false);
        }
    }

    if (done) {
        return (
            <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
                <div className="text-center">
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-2">Account Created!</h2>
                    <p className="text-white/60">Redirecting to your dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4 py-12">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-purple-600 rounded-full blur-[120px] opacity-15" />
                <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-indigo-600 rounded-full blur-[100px] opacity-10" />
            </div>

            <div className="relative w-full max-w-md">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            <Brain className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold gradient-text">DUCERE</span>
                    </Link>
                </div>

                <div className="glass-card border border-white/10">
                    <h1 className="text-2xl font-bold text-white mb-1">Create your account</h1>
                    <p className="text-white/50 text-sm mb-6">Start your success journey for free</p>

                    {/* Role selection */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        {roles.map((r) => (
                            <button key={r.value} type="button" onClick={() => update('role', r.value)}
                                className={`p-3 rounded-xl border text-left transition-all ${form.role === r.value ? 'border-indigo-500/60 bg-indigo-500/10' : 'border-white/10 hover:border-white/30'}`}>
                                <p className="text-sm font-semibold text-white">{r.label}</p>
                                <p className="text-xs text-white/40 mt-0.5">{r.desc}</p>
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            <label className="text-sm text-white/60 block mb-1.5">Full Name</label>
                            <input type="text" required value={form.name} onChange={(e) => update('name', e.target.value)}
                                placeholder="Rahul Sharma" className="input-field" />
                        </div>
                        <div>
                            <label className="text-sm text-white/60 block mb-1.5">Email address</label>
                            <input type="email" required value={form.email} onChange={(e) => update('email', e.target.value)}
                                placeholder="you@example.com" className="input-field" />
                        </div>
                        <div>
                            <label className="text-sm text-white/60 block mb-1.5">Password</label>
                            <div className="relative">
                                <input type={showPw ? 'text' : 'password'} required value={form.password} onChange={(e) => update('password', e.target.value)}
                                    placeholder="Minimum 8 characters" className="input-field pr-10" />
                                <button type="button" onClick={() => setShowPw(!showPw)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                        <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
                            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                            {loading ? 'Creating Account...' : 'Create Free Account'}
                        </button>
                    </form>

                    <p className="text-white/30 text-xs text-center mt-4">
                        By signing up, you agree to our <Link href="/terms" className="text-indigo-400 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-indigo-400 hover:underline">Privacy Policy</Link>.
                    </p>

                    <div className="mt-6 pt-6 border-t border-white/10 text-center">
                        <p className="text-white/50 text-sm">
                            Already have an account?{' '}
                            <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">Sign in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
