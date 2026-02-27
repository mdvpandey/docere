import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'About – DOCERE', description: 'The story, vision, and values behind the DOCERE student success platform.' };

const coreValues = [
    { emoji: '💡', title: 'Evidence-First', desc: 'Every feature is grounded in behavioral science, cognitive psychology, and educational research.' },
    { emoji: '🤝', title: 'Student-Centric', desc: 'We build for students\' long-term wellbeing, not just short-term scores.' },
    { emoji: '🔒', title: 'Data Privacy', desc: 'Your personal wellness data is encrypted, never sold, and always under your control.' },
    { emoji: '♾️', title: 'Continuous Growth', desc: 'The platform evolves with every student interaction, improving daily.' },
    { emoji: '🌍', title: 'Inclusive Access', desc: 'Free tier available forever so no student is locked out due to finances.' },
    { emoji: '🎯', title: 'Outcome Focused', desc: 'Success means a great job in your niche, not just passing an exam.' },
];

const team = [
    { name: 'Dr. Arjun Sen', role: 'Founder & Chief Educator', specialty: 'PhD, Educational Psychology – IIT Delhi', avatar: 'AS' },
    { name: 'Kavita Nair', role: 'Chief Technology Officer', specialty: '12 years at Google, MIT Alumni', avatar: 'KN' },
    { name: 'Rahul Mehta', role: 'Head of AI Research', specialty: 'Ex-DeepMind, ML in EdTech', avatar: 'RM' },
    { name: 'Sanya Gupta', role: 'Head of Student Wellness', specialty: 'Clinical Psychologist, NLP Practitioner', avatar: 'SG' },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0f]">
            <Navbar />
            <div className="pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Hero */}
                    <div className="text-center mb-20 py-16">
                        <span className="badge badge-blue mb-4">Our Story</span>
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">We Built DOCERE Because<br /><span className="gradient-text">the System Failed Us Too</span></h1>
                        <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
                            After watching countless brilliant students burn out, lose direction, and give up — our team of educators, psychologists, and engineers came together to build what should have existed all along.
                        </p>
                    </div>

                    {/* Vision + Mission */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                        <div className="glass-card border border-indigo-500/20">
                            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-2xl mb-4">🔭</div>
                            <h2 className="text-2xl font-bold text-white mb-3">Our Vision</h2>
                            <p className="text-white/60 leading-relaxed">A world where every student has access to a personalized, intelligent support system that nurtures their mental health, accelerates their learning, and connects them to meaningful careers — regardless of their background or resources.</p>
                        </div>
                        <div className="glass-card border border-purple-500/20">
                            <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-2xl mb-4">🎯</div>
                            <h2 className="text-2xl font-bold text-white mb-3">Our Mission</h2>
                            <p className="text-white/60 leading-relaxed">To eliminate student burnout, reduce the skill-to-employment gap, and democratize career-aligned education through AI, behavioral science, and compassionate mentorship — making success measurable and achievable for every student.</p>
                        </div>
                    </div>

                    {/* Why we built this */}
                    <div className="glass-card border border-white/10 mb-20">
                        <h2 className="text-3xl font-bold text-white mb-6 text-center">Why We Built This Platform</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { stat: '72%', label: 'of students experience burnout during preparation', color: 'text-red-400' },
                                { stat: '58%', label: 'graduate without a clear career direction', color: 'text-amber-400' },
                                { stat: '3×', label: 'higher placement with mental wellness support', color: 'text-green-400' },
                            ].map((s) => (
                                <div key={s.label} className="text-center">
                                    <div className={`text-5xl font-black mb-2 ${s.color}`}>{s.stat}</div>
                                    <p className="text-white/50 text-sm">{s.label}</p>
                                </div>
                            ))}
                        </div>
                        <p className="text-white/60 text-center mt-8 max-w-2xl mx-auto">
                            These numbers drove us to action. DOCERE exists to flip these statistics — and every day we see it working.
                        </p>
                    </div>

                    {/* Core Values */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold text-white text-center mb-12">Core Values</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {coreValues.map((v) => (
                                <div key={v.title} className="glass-card hover:border-indigo-500/30 transition-all duration-300">
                                    <div className="text-3xl mb-3">{v.emoji}</div>
                                    <h3 className="text-lg font-bold text-white mb-2">{v.title}</h3>
                                    <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Research Philosophy */}
                    <div className="glass-card border border-indigo-500/20 mb-20">
                        <h2 className="text-3xl font-bold text-white mb-4">Research Philosophy</h2>
                        <p className="text-white/60 leading-relaxed mb-6">
                            DOCERE is not a content platform — it is a behavioral intelligence system. We measure what matters: stress patterns, sleep quality, study efficiency, and mood trajectories. Every algorithm we deploy is tested against real student outcomes before deployment.
                        </p>
                        <p className="text-white/60 leading-relaxed">
                            Our adaptive learning engine is inspired by Bloom&apos;s Taxonomy, Vygotsky&apos;s Zone of Proximal Development, and Self-Determination Theory. The burnout prediction model is validated on real student data with 87% accuracy at 2-week advance warning.
                        </p>
                    </div>

                    {/* Team */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold text-white text-center mb-12">The Team Behind DOCERE</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {team.map((t) => (
                                <div key={t.name} className="glass-card text-center hover:border-indigo-500/30 transition-all duration-300">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xl font-bold mx-auto mb-4">{t.avatar}</div>
                                    <h3 className="text-white font-bold mb-1">{t.name}</h3>
                                    <p className="text-indigo-400 text-sm mb-1">{t.role}</p>
                                    <p className="text-white/40 text-xs">{t.specialty}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Long-term impact */}
                    <div className="glass-card border border-green-500/20 text-center">
                        <div className="text-4xl mb-4">🌱</div>
                        <h2 className="text-2xl font-bold text-white mb-3">Long-Term Impact Goal</h2>
                        <p className="text-white/60 max-w-2xl mx-auto leading-relaxed">
                            By 2030, we aim to support 1 million students across India and Southeast Asia, reduce average graduate unemployment by 40%, and establish DOCERE as the global standard for holistic student development — where wellness and career success go hand in hand.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
