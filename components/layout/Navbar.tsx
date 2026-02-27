'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { signOut, useSession } from 'next-auth/react';
import { Menu, X, Brain, ChevronDown, LogOut, User, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/features', label: 'Features' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
];

export function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [userMenu, setUserMenu] = useState(false);
    const pathname = usePathname();
    const { data: session } = useSession();

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handler);
        return () => window.removeEventListener('scroll', handler);
    }, []);

    const dashboardHref =
        session?.user?.role === 'admin' ? '/admin/analytics' :
            session?.user?.role === 'mentor' ? '/mentor/students' :
                '/student/dashboard';

    return (
        <nav className={cn(
            'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
            scrolled ? 'bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl' : 'bg-transparent',
        )}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-indigo-500/30">
                            <Brain className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold gradient-text">DOCERE</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href}
                                className={cn('nav-link px-4 py-2 rounded-lg hover:bg-white/5',
                                    pathname === link.href && 'text-white bg-white/10')}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Auth */}
                    <div className="hidden md:flex items-center gap-3">
                        {session ? (
                            <div className="relative">
                                <button onClick={() => setUserMenu(!userMenu)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all border border-white/20">
                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold">
                                        {session.user?.name?.[0]?.toUpperCase() || 'U'}
                                    </div>
                                    <span className="text-sm font-medium text-white/90">{session.user?.name?.split(' ')[0]}</span>
                                    <ChevronDown className="w-4 h-4 text-white/50" />
                                </button>
                                <AnimatePresence>
                                    {userMenu && (
                                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                                            className="absolute right-0 mt-2 w-52 glass rounded-xl overflow-hidden shadow-2xl">
                                            <Link href={dashboardHref} onClick={() => setUserMenu(false)}
                                                className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors text-sm text-white/80 hover:text-white">
                                                <LayoutDashboard className="w-4 h-4" /> Dashboard
                                            </Link>
                                            <Link href="/student/feedback" onClick={() => setUserMenu(false)}
                                                className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors text-sm text-white/80 hover:text-white">
                                                <User className="w-4 h-4" /> Profile
                                            </Link>
                                            <div className="border-t border-white/10" />
                                            <button onClick={() => signOut({ callbackUrl: '/' })}
                                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-500/10 transition-colors text-sm text-red-400 hover:text-red-300">
                                                <LogOut className="w-4 h-4" /> Sign Out
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <>
                                <Link href="/login" className="btn-secondary !py-2 !px-5 !text-sm">Login</Link>
                                <Link href="/register" className="btn-primary !py-2 !px-5 !text-sm">Get Started Free</Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors">
                        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {open && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-white/10">
                        <div className="px-4 py-4 flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
                                    className={cn('px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all font-medium',
                                        pathname === link.href && 'text-white bg-white/10')}>
                                    {link.label}
                                </Link>
                            ))}
                            <div className="mt-3 flex flex-col gap-2">
                                {session ? (
                                    <>
                                        <Link href={dashboardHref} className="btn-primary text-center">Dashboard</Link>
                                        <button onClick={() => signOut({ callbackUrl: '/' })} className="btn-secondary text-center text-red-400">Sign Out</button>
                                    </>
                                ) : (
                                    <>
                                        <Link href="/login" className="btn-secondary text-center">Login</Link>
                                        <Link href="/register" className="btn-primary text-center">Get Started Free</Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
