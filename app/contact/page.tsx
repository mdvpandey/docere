'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const faqs = [
    { q: 'How quickly can I see results with DOCERE?', a: 'Most students report noticeable improvements in stress management within 2-3 weeks of consistent daily logging. Performance improvements are typically visible after 4-6 weeks.' },
    { q: 'What if I don\'t have a mentor assigned yet?', a: 'You can still use all student features independently. Mentor assignment happens within 48 hours of signing up for Pro or higher plans.' },
    { q: 'Can institutions use DOCERE for entire batches?', a: 'Yes! Our Enterprise plan supports unlimited students with centralized admin control. Contact us for a demo and custom pricing.' },
    { q: 'Is my wellness data visible to my mentor?', a: 'Mentors can see aggregate wellness indicators but not your personal notes or specific diary entries. You control your privacy settings.' },
    { q: 'Do you provide refunds?', a: 'Yes, we offer a 7-day money-back guarantee on Pro and Mentor plans, no questions asked.' },
];

export default function ContactPage() {
    const [sent, setSent] = useState(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        toast.success('Message sent! We\'ll respond within 24 hours.');
        setSent(true);
    }

    return (
        <div className="min-h-screen bg-[#0a0a0f]">
            <Navbar />
            <div className="pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center py-16 mb-8">
                        <span className="badge badge-blue mb-4">Get in Touch</span>
                        <h1 className="text-5xl font-bold text-white mb-4">We&apos;re Here to Help</h1>
                        <p className="text-xl text-white/60 max-w-xl mx-auto">Have a question, partnership inquiry, or just want to explore DOCERE for your institution? Reach out!</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                        {/* Form */}
                        <div className="glass-card">
                            <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>
                            {sent ? (
                                <div className="text-center py-12">
                                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                                    <p className="text-white/60">We&apos;ll get back to you within 24 hours.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm text-white/60 mb-1.5 block">First Name</label>
                                            <input type="text" required placeholder="Rahul" className="input-field" />
                                        </div>
                                        <div>
                                            <label className="text-sm text-white/60 mb-1.5 block">Last Name</label>
                                            <input type="text" required placeholder="Sharma" className="input-field" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm text-white/60 mb-1.5 block">Email</label>
                                        <input type="email" required placeholder="rahul@example.com" className="input-field" />
                                    </div>
                                    <div>
                                        <label className="text-sm text-white/60 mb-1.5 block">I am a...</label>
                                        <select className="input-field">
                                            <option>Student</option>
                                            <option>Educator / Mentor</option>
                                            <option>Institution / Coaching Center</option>
                                            <option>Researcher</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-sm text-white/60 mb-1.5 block">Message</label>
                                        <textarea required rows={5} placeholder="Tell us how we can help..." className="input-field resize-none" />
                                    </div>
                                    <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                                        <Send className="w-4 h-4" /> Send Message
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Contact info */}
                        <div className="flex flex-col gap-6">
                            {[
                                { icon: Mail, label: 'Email Us', value: 'hello@DOCERE.app', sub: 'Average reply time: 4 hours', href: 'mailto:hello@DOCERE.app' },
                                { icon: Phone, label: 'Call Us', value: '+91 98765 43210', sub: 'Mon–Fri, 9am–6pm IST', href: 'tel:+919876543210' },
                                { icon: MapPin, label: 'Visit Us', value: 'Koramangala, Bengaluru', sub: 'Karnataka, India – 560034', href: '#' },
                            ].map(({ icon: Icon, label, value, sub, href }) => (
                                <a key={label} href={href} className="glass-card hover:border-indigo-500/30 transition-all flex items-start gap-4 group">
                                    <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-500/30 transition-colors">
                                        <Icon className="w-5 h-5 text-indigo-400" />
                                    </div>
                                    <div>
                                        <p className="text-white/40 text-sm mb-0.5">{label}</p>
                                        <p className="text-white font-semibold">{value}</p>
                                        <p className="text-white/40 text-sm">{sub}</p>
                                    </div>
                                </a>
                            ))}

                            <div className="glass-card bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20">
                                <h3 className="text-lg font-bold text-white mb-2">For Institutions</h3>
                                <p className="text-white/60 text-sm leading-relaxed mb-4">Looking to integrate DOCERE across your coaching center or university? Schedule a personalized demo with our enterprise team.</p>
                                <a href="mailto:enterprise@DOCERE.app" className="btn-primary text-sm inline-flex items-center gap-2">
                                    <Mail className="w-4 h-4" /> Book Enterprise Demo
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
                        <div className="space-y-3">
                            {faqs.map((faq) => (
                                <div key={faq.q} className="glass-card">
                                    <h3 className="text-white font-semibold mb-2">❓ {faq.q}</h3>
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
