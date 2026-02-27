'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Brain, Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        const result = await signIn('credentials', { email, password, redirect: false });
        setLoading(false);
        if (result?.error) {
            toast.error('Invalid email or password. Please try again.');
        } else {
            toast.success('Welcome back! Redirecting...');
            router.push('/student/dashboard');
        }
    }

    return (
        <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-indigo-600 rounded-full blur-[120px] opacity-15" />
                <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-purple-600 rounded-full blur-[100px] opacity-10" />
            </div>

            <div className="relative w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            <Brain className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold gradient-text">DOCERE</span>
                    </Link>
                </div>

                {/* Card */}
                <div className="glass-card border border-white/10">
                    <h1 className="text-2xl font-bold text-white mb-1">Welcome back</h1>
                    <p className="text-white/50 text-sm mb-8">Sign in to continue your journey</p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="text-sm text-white/60 block mb-1.5">Email address</label>
                            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com" className="input-field" />
                        </div>
                        <div>
                            <label className="text-sm text-white/60 block mb-1.5">Password</label>
                            <div className="relative">
                                <input type={showPw ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••" className="input-field pr-10" />
                                <button type="button" onClick={() => setShowPw(!showPw)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Link href="/forgot-password" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">Forgot password?</Link>
                        </div>
                        <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-white/10 text-center">
                        <p className="text-white/50 text-sm">
                            Don&apos;t have an account?{' '}
                            <Link href="/register" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">Create one free</Link>
                        </p>
                    </div>

                    {/* Demo logins */}
                    <div className="mt-4 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                        <p className="text-white/30 text-xs text-center mb-2">Demo Accounts</p>
                        <div className="grid grid-cols-3 gap-2">
                            {[
                                { label: 'Student', email: 'student@DOCERE.app', role: 'student' },
                                { label: 'Mentor', email: 'mentor@DOCERE.app', role: 'mentor' },
                                { label: 'Admin', email: 'admin@DOCERE.app', role: 'admin' },
                            ].map((d) => (
                                <button key={d.role} onClick={() => { setEmail(d.email); setPassword('password123'); }}
                                    className="text-xs px-2 py-1.5 rounded-lg bg-white/5 text-white/40 hover:text-white/70 hover:bg-white/10 transition-all">
                                    {d.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
