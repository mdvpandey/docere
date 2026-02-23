'use client';

import { useState } from 'react';
import { MessageSquare, Send, Bell } from 'lucide-react';

const students = [
    { id: '1', name: 'Rahul Kumar', niche: 'Software Engineering', lastMsg: 'I am feeling overwhelmed with the DSA topics...', time: '2h ago', unread: 2, risk: 'high' },
    { id: '2', name: 'Priya Sharma', niche: 'Data Science', lastMsg: 'Thanks for the feedback on my project!', time: '1d ago', unread: 0, risk: 'moderate' },
    { id: '3', name: 'Ananya Singh', niche: 'UI/UX Design', lastMsg: 'I booked the mock interview for Friday.', time: '2d ago', unread: 0, risk: 'low' },
    { id: '4', name: 'Vikram Patel', niche: 'DevOps', lastMsg: 'Can we review the CI/CD task together?', time: '3d ago', unread: 1, risk: 'moderate' },
];

type Message = { sender: 'mentor' | 'student'; text: string; time: string };
type Conversations = Record<string, Message[]>;

const initialConversations: Conversations = {
    '1': [
        { sender: 'student', text: 'Hi! I have been really struggling with dynamic programming concepts. I feel like giving up.', time: '2:30 PM' },
        { sender: 'mentor', text: 'I understand how you feel. DP is one of the hardest topics. Let\'s break it down step by step — can we schedule a session tomorrow?', time: '2:45 PM' },
        { sender: 'student', text: 'I am feeling overwhelmed with the DSA topics and the mock tests this week.', time: '3:10 PM' },
    ],
    '2': [
        { sender: 'student', text: 'Thanks for the feedback on my project! I made the changes you suggested.', time: 'Yesterday' },
    ],
};

export default function MentorMessagingPage() {
    const [active, setActive] = useState(students[0]);
    const [conversations, setConversations] = useState<Conversations>(initialConversations);
    const [input, setInput] = useState('');

    function sendMessage() {
        if (!input.trim()) return;
        setConversations((prev) => ({
            ...prev,
            [active.id]: [...(prev[active.id] || []), { sender: 'mentor', text: input.trim(), time: 'Just now' }],
        }));
        setInput('');
    }

    const messages = conversations[active.id] || [];

    return (
        <div className="space-y-4">
            <div>
                <h1 className="page-header">Messaging 💬</h1>
                <p className="text-white/50">Direct communication with your assigned students.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4" style={{ height: 'calc(100vh - 220px)' }}>
                {/* Student List */}
                <div className="glass-card flex flex-col overflow-hidden">
                    <div className="pb-3 border-b border-white/10 mb-3">
                        <p className="text-sm font-semibold text-white/50 uppercase tracking-wider">Conversations</p>
                    </div>
                    <div className="overflow-y-auto space-y-1 flex-1">
                        {students.map((s) => (
                            <button key={s.id} onClick={() => setActive(s)}
                                className={`w-full text-left p-3 rounded-xl transition-all ${active.id === s.id ? 'bg-indigo-500/20 border border-indigo-500/30' : 'hover:bg-white/5 border border-transparent'}`}>
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className={`w-9 h-9 rounded-full bg-gradient-to-br flex items-center justify-center font-bold text-sm ${s.risk === 'high' ? 'from-red-500 to-rose-600' : s.risk === 'moderate' ? 'from-amber-500 to-orange-600' : 'from-green-500 to-emerald-600'}`}>
                                            {s.name[0]}
                                        </div>
                                        {s.unread > 0 && (
                                            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-500 text-[10px] font-bold flex items-center justify-center">{s.unread}</span>
                                        )}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-white font-medium text-sm truncate">{s.name}</p>
                                        <p className="text-white/40 text-xs truncate">{s.lastMsg}</p>
                                    </div>
                                    <span className="text-white/20 text-xs flex-shrink-0">{s.time}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Chat Window */}
                <div className="lg:col-span-2 glass-card flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center gap-3 pb-3 border-b border-white/10 mb-3">
                        <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${active.risk === 'high' ? 'from-red-500 to-rose-600' : 'from-indigo-500 to-purple-600'} flex items-center justify-center font-bold`}>
                            {active.name[0]}
                        </div>
                        <div>
                            <p className="font-bold text-white">{active.name}</p>
                            <p className="text-white/40 text-xs">{active.niche}</p>
                        </div>
                        {active.risk === 'high' && (
                            <span className="ml-auto badge badge-red">High Burnout Risk</span>
                        )}
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto space-y-3 mb-3">
                        {messages.length === 0 && (
                            <div className="text-center py-12 text-white/30">
                                <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-30" />
                                <p>No messages yet. Start the conversation!</p>
                            </div>
                        )}
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.sender === 'mentor' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-sm px-4 py-2.5 rounded-2xl text-sm ${m.sender === 'mentor' ? 'bg-indigo-600 text-white rounded-br-sm' : 'bg-white/10 text-white/80 rounded-bl-sm'}`}>
                                    <p className="leading-relaxed">{m.text}</p>
                                    <p className={`text-[10px] mt-1 ${m.sender === 'mentor' ? 'text-indigo-200/60' : 'text-white/30'}`}>{m.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="flex gap-2 pt-3 border-t border-white/10">
                        <input value={input} onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                            placeholder={`Message ${active.name.split(' ')[0]}...`}
                            className="input-field flex-1 text-sm !py-2.5" />
                        <button onClick={sendMessage} className="btn-primary !px-4 !py-2.5 flex items-center gap-1.5">
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
