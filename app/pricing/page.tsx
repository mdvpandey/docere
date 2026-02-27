import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Check } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Pricing – DOCERE', description: 'Flexible plans for students, mentors, and institutions.' };

const plans = [
    {
        name: 'Free',
        price: { monthly: 0, yearly: 0 },
        subtitle: 'Perfect to get started',
        color: 'border-white/20',
        badge: null,
        features: [
            'Daily wellness logging (mood, stress, sleep)',
            'Basic burnout risk indicator',
            '1 AI-generated study plan/month',
            'Basic skill gap overview',
            'Blog & resource access',
            'Community support',
        ],
        cta: 'Start for Free',
        ctaClass: 'btn-secondary w-full',
        href: '/register',
    },
    {
        name: 'Pro',
        price: { monthly: 499, yearly: 399 },
        subtitle: 'For serious students',
        color: 'border-indigo-500/50',
        badge: 'Most Popular',
        badgeClass: 'badge-blue',
        features: [
            'Everything in Free',
            'Unlimited AI study plans',
            'Full burnout prediction model',
            'Complete skill gap + roadmap',
            'Career profile + resume builder',
            'Mock interview scheduling',
            'Weekly performance reports',
            'Mentor session (2/month)',
            'AI feedback analysis',
            'Priority support',
        ],
        cta: 'Start Pro',
        ctaClass: 'btn-primary w-full',
        href: '/register?plan=pro',
    },
    {
        name: 'Mentor',
        price: { monthly: 1499, yearly: 1199 },
        subtitle: 'For educators & coaches',
        color: 'border-teal-500/40',
        badge: 'For Educators',
        badgeClass: 'badge-green',
        features: [
            'Mentor dashboard',
            'Up to 30 student assignments',
            'Student wellness analytics',
            'Burnout risk alerts',
            'Direct messaging with students',
            'Performance heatmaps',
            'Intervention suggestion engine',
            'Curriculum customization',
            'Analytics export (CSV/Excel)',
        ],
        cta: 'Become a Mentor',
        ctaClass: 'btn-secondary w-full',
        href: '/register?plan=mentor',
    },
    {
        name: 'Enterprise',
        price: { monthly: null, yearly: null },
        subtitle: 'For institutions & coaching centers',
        color: 'border-orange-500/40',
        badge: 'Custom',
        badgeClass: 'badge-yellow',
        features: [
            'Everything in Mentor',
            'Unlimited students',
            'Admin super-control panel',
            'Platform-wide analytics',
            'Custom AI configuration',
            'White-label option',
            'API access',
            'Dedicated account manager',
            'SLA agreement',
            'Custom integrations',
        ],
        cta: 'Contact Sales',
        ctaClass: 'btn-secondary w-full',
        href: '/contact',
    },
];

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0f]">
            <Navbar />
            <div className="pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 py-12">
                        <span className="badge badge-purple mb-4">Pricing</span>
                        <h1 className="text-5xl font-bold text-white mb-4">Simple, Transparent Pricing</h1>
                        <p className="text-xl text-white/60 max-w-2xl mx-auto">Start free. Upgrade only when you see results. No hidden fees.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        {plans.map((plan) => (
                            <div key={plan.name} className={`glass-card flex flex-col border ${plan.color} relative ${plan.badge === 'Most Popular' ? 'ring-2 ring-indigo-500/50' : ''}`}>
                                {plan.badge && (
                                    <span className={`badge ${plan.badgeClass} absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap`}>{plan.badge}</span>
                                )}
                                <div className="mb-6 pt-2">
                                    <h2 className="text-2xl font-bold text-white mb-1">{plan.name}</h2>
                                    <p className="text-white/40 text-sm">{plan.subtitle}</p>
                                </div>
                                <div className="mb-6">
                                    {plan.price.monthly === null ? (
                                        <p className="text-3xl font-black text-white">Custom</p>
                                    ) : plan.price.monthly === 0 ? (
                                        <p className="text-3xl font-black text-white">Free</p>
                                    ) : (
                                        <>
                                            <p className="text-4xl font-black text-white">₹{plan.price.monthly}<span className="text-white/40 text-base font-normal">/mo</span></p>
                                            <p className="text-sm text-white/40 mt-1">or ₹{plan.price.yearly}/mo billed annually</p>
                                        </>
                                    )}
                                </div>
                                <ul className="space-y-2.5 flex-1 mb-8">
                                    {plan.features.map((f) => (
                                        <li key={f} className="flex items-start gap-2.5 text-sm text-white/70">
                                            <Check className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <Link href={plan.href} className={plan.ctaClass}>{plan.cta}</Link>
                            </div>
                        ))}
                    </div>

                    {/* FAQ quick */}
                    <div className="mt-20 max-w-3xl mx-auto">
                        <h2 className="text-2xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {[
                                { q: 'Can I switch plans anytime?', a: 'Yes! Upgrade or downgrade at any time. If you upgrade mid-month, we prorate the difference.' },
                                { q: 'Is the Free plan really free forever?', a: 'Absolutely. Our free plan has no time limit. We want every student to benefit from DOCERE.' },
                                { q: 'What payment methods do you accept?', a: 'UPI, debit/credit cards, net banking, and EMI through Razorpay.' },
                                { q: 'Is student wellness data secure?', a: 'Yes — all data is encrypted at rest and in transit. We are HIPAA-compliant and never sell your data.' },
                            ].map((faq) => (
                                <div key={faq.q} className="glass-card">
                                    <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
                                    <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
