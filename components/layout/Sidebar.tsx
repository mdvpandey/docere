'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import {
    Brain, LayoutDashboard, HeartPulse, BookOpen, Zap, Briefcase,
    BarChart2, MessageSquare, Users, Settings, FlaskConical, Download,
    LogOut, ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const studentLinks = [
    { href: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/student/wellness', label: 'Wellness', icon: HeartPulse },
    { href: '/student/study-plan', label: 'Study Plan', icon: BookOpen },
    { href: '/student/skills', label: 'Skills', icon: Zap },
    { href: '/student/career', label: 'Career', icon: Briefcase },
    { href: '/student/reports', label: 'Reports', icon: BarChart2 },
    { href: '/student/feedback', label: 'Feedback', icon: MessageSquare },
];

const mentorLinks = [
    { href: '/mentor/students', label: 'My Students', icon: Users },
    { href: '/mentor/analytics', label: 'Analytics', icon: BarChart2 },
    { href: '/mentor/messaging', label: 'Messaging', icon: MessageSquare },
];

const adminLinks = [
    { href: '/admin/analytics', label: 'Analytics', icon: BarChart2 },
    { href: '/admin/research', label: 'Research', icon: FlaskConical },
    { href: '/admin/data-export', label: 'Data Export', icon: Download },
    { href: '/admin/config', label: 'Super Control', icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const role = session?.user?.role;

    const links =
        role === 'mentor' ? mentorLinks :
            role === 'admin' ? adminLinks :
                studentLinks;

    const roleLabel =
        role === 'mentor' ? '🎓 Mentor Portal' :
            role === 'admin' ? '⚡ Admin Panel' :
                '📚 Student Portal';

    const roleColor =
        role === 'mentor' ? 'from-teal-500 to-cyan-600' :
            role === 'admin' ? 'from-orange-500 to-red-600' :
                'from-indigo-500 to-purple-600';

    return (
        <aside className="fixed left-0 top-0 bottom-0 w-64 flex flex-col bg-[#0d0d15] border-r border-white/10 z-40">
            {/* Logo */}
            <div className="p-5 border-b border-white/10">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className={cn('w-9 h-9 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg', roleColor)}>
                        <Brain className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold gradient-text">DOCERE</span>
                </Link>
                <p className="text-xs text-white/30 mt-1 ml-11">{roleLabel}</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                {links.map(({ href, label, icon: Icon }) => {
                    const active = pathname === href || pathname.startsWith(href + '/');
                    return (
                        <Link key={href} href={href}
                            className={cn('sidebar-link group', active && 'active')}>
                            <Icon className={cn('w-5 h-5 flex-shrink-0', active ? 'text-indigo-400' : 'text-white/40 group-hover:text-white/70')} />
                            <span>{label}</span>
                            {active && <ChevronRight className="w-4 h-4 ml-auto text-indigo-400" />}
                        </Link>
                    );
                })}

                {/* Admin also sees student links */}
                {role === 'admin' && (
                    <>
                        <div className="pt-4 pb-1 px-4">
                            <p className="text-xs font-semibold text-white/20 uppercase tracking-wider">Student Portal</p>
                        </div>
                        {studentLinks.slice(0, 3).map(({ href, label, icon: Icon }) => (
                            <Link key={href} href={href} className="sidebar-link group">
                                <Icon className="w-5 h-5 flex-shrink-0 text-white/30 group-hover:text-white/60" />
                                <span className="text-white/50">{label}</span>
                            </Link>
                        ))}
                    </>
                )}
            </nav>

            {/* User info */}
            <div className="p-3 border-t border-white/10">
                <div className="flex items-center gap-3 px-3 py-2 mb-2">
                    <div className={cn('w-8 h-8 rounded-full bg-gradient-to-br flex items-center justify-center text-sm font-bold flex-shrink-0', roleColor)}>
                        {session?.user?.name?.[0]?.toUpperCase() || '?'}
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-medium text-white truncate">{session?.user?.name || 'User'}</p>
                        <p className="text-xs text-white/40 capitalize">{role || 'student'}</p>
                    </div>
                </div>
                <button onClick={() => signOut({ callbackUrl: '/' })}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-all text-sm font-medium">
                    <LogOut className="w-4 h-4" /> Sign Out
                </button>
            </div>
        </aside>
    );
}
