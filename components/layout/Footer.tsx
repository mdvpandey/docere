import Link from 'next/link';
import { Brain, Twitter, Linkedin, Github, Mail } from 'lucide-react';

const footerLinks = {
    Platform: [
        { label: 'Home', href: '/' },
        { label: 'Features', href: '/features' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Blog', href: '/blog' },
    ],
    Company: [
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
    ],
    Students: [
        { label: 'Dashboard', href: '/student/dashboard' },
        { label: 'Study Plan', href: '/student/study-plan' },
        { label: 'Wellness', href: '/student/wellness' },
        { label: 'Career', href: '/student/career' },
    ],
};

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-[#06060b] mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4 group">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                <Brain className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold gradient-text">DUCERE</span>
                        </Link>
                        <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-6">
                            Empowering students with AI-driven mental wellness, adaptive learning, and career alignment for guaranteed success.
                        </p>
                        <div className="flex items-center gap-3">
                            {[
                                { icon: Twitter, href: '#', label: 'Twitter' },
                                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                                { icon: Github, href: '#', label: 'GitHub' },
                                { icon: Mail, href: 'mailto:hello@ducere.app', label: 'Email' },
                            ].map(({ icon: Icon, href, label }) => (
                                <a key={label} href={href} aria-label={label}
                                    className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors border border-white/10 hover:border-white/30">
                                    <Icon className="w-4 h-4 text-white/60 hover:text-white" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">{title}</h4>
                            <ul className="space-y-2">
                                {links.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className="text-white/50 hover:text-white transition-colors text-sm">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-white/30 text-sm">© {new Date().getFullYear()} DUCERE. All rights reserved.</p>
                    <p className="text-white/20 text-xs">Built with ❤️ for student success · Powered by AI</p>
                </div>
            </div>
        </footer>
    );
}
