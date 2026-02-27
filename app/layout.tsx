import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
    title: {
        default: 'DOCERE – AI-Powered Student Success Platform',
        template: '%s | DOCERE',
    },
    description: 'Empowering students with AI-driven mental wellness tracking, adaptive study plans, skill development, and career alignment for guaranteed success.',
    keywords: ['student wellness', 'study plan', 'career guidance', 'burnout prevention', 'AI education', 'EdTech'],
    authors: [{ name: 'DOCERE Team' }],
    openGraph: {
        title: 'DOCERE – AI-Powered Student Success Platform',
        description: 'Mental Wellness + Smart Learning + Career Clarity = Student Success',
        type: 'website',
        locale: 'en_IN',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={`${inter.variable} font-sans antialiased bg-[#0a0a0f] text-white`}>
                <Providers>
                    {children}
                    <Toaster richColors position="top-right" />
                </Providers>
            </body>
        </html>
    );
}
