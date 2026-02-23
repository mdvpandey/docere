'use client';

import { useState } from 'react';
import { Download, FileSpreadsheet, Calendar, Filter, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const EXPORT_CONFIGS = [
    { id: 'wellness', label: 'Wellness Logs', desc: 'Daily mood, stress, sleep, and study hour data for all students', count: '8,421 records', fields: ['Date', 'Student ID', 'Mood', 'Stress', 'Sleep Hours', 'Study Hours', 'Burnout Score'] },
    { id: 'performance', label: 'Performance Reports', desc: 'Weekly score data per student per subject', count: '2,184 records', fields: ['Week', 'Student ID', 'Subject', 'Score', 'Tasks Completed', 'Improvement %'] },
    { id: 'feedback', label: 'Feedback Responses', desc: 'Weekly feedback with AI analysis results', count: '1,056 records', fields: ['Week', 'Student ID', 'Satisfaction', 'Difficulty', 'Stress Triggers', 'AI Sentiment'] },
    { id: 'users', label: 'User Roster', desc: 'All registered users with roles and activity', count: '387 records', fields: ['Name', 'Email', 'Role', 'Niche', 'Join Date', 'Last Active'] },
    { id: 'skills', label: 'Skill Profiles', desc: 'Skill assessments and gap analysis results', count: '342 records', fields: ['Student ID', 'Niche', 'Role', 'Skills', 'Gaps', 'Roadmap Progress'] },
    { id: 'burnout', label: 'Burnout Risk Report', desc: 'High-risk student flags with contributing factors', count: '34 alerts', fields: ['Student ID', 'Risk Level', 'Burnout Score', 'Primary Factors', 'Date Flagged'] },
];

export default function AdminDataExportPage() {
    const [selected, setSelected] = useState<string[]>([]);
    const [format, setFormat] = useState<'csv' | 'xlsx'>('csv');
    const [dateRange, setDateRange] = useState({ from: '2024-12-01', to: '2025-01-31' });
    const [exporting, setExporting] = useState(false);

    function toggleSelect(id: string) {
        setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
    }

    function selectAll() {
        setSelected(selected.length === EXPORT_CONFIGS.length ? [] : EXPORT_CONFIGS.map((c) => c.id));
    }

    async function handleExport() {
        if (selected.length === 0) { toast.error('Select at least one dataset to export.'); return; }
        setExporting(true);
        await new Promise((r) => setTimeout(r, 1500)); // simulate export
        toast.success(`Exported ${selected.length} dataset(s) as ${format.toUpperCase()}!`);
        setExporting(false);
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="page-header">Data Export 📥</h1>
                <p className="text-white/50">Export platform data for external analysis, research, or reporting.</p>
            </div>

            {/* Export Controls */}
            <div className="glass-card border border-indigo-500/20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                        <label className="text-sm text-white/60 block mb-1.5">Export Format</label>
                        <div className="flex gap-2">
                            {(['csv', 'xlsx'] as const).map((f) => (
                                <button key={f} onClick={() => setFormat(f)}
                                    className={`flex-1 py-2 rounded-xl border text-sm font-semibold uppercase transition-all ${format === f ? 'border-indigo-500/60 bg-indigo-500/20 text-indigo-400' : 'border-white/20 text-white/50 hover:border-white/40'}`}>
                                    <FileSpreadsheet className="w-4 h-4 inline mr-1.5" />{f}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="text-sm text-white/60 block mb-1.5">Date From</label>
                        <input type="date" value={dateRange.from} onChange={(e) => setDateRange((p) => ({ ...p, from: e.target.value }))} className="input-field" />
                    </div>
                    <div>
                        <label className="text-sm text-white/60 block mb-1.5">Date To</label>
                        <input type="date" value={dateRange.to} onChange={(e) => setDateRange((p) => ({ ...p, to: e.target.value }))} className="input-field" />
                    </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                    <p className="text-white/60 text-sm">{selected.length} of {EXPORT_CONFIGS.length} datasets selected</p>
                    <button onClick={selectAll} className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                        {selected.length === EXPORT_CONFIGS.length ? 'Deselect All' : 'Select All'}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    {EXPORT_CONFIGS.map((cfg) => (
                        <div key={cfg.id} onClick={() => toggleSelect(cfg.id)}
                            className={`p-4 rounded-xl border cursor-pointer transition-all ${selected.includes(cfg.id) ? 'border-indigo-500/60 bg-indigo-500/10' : 'border-white/10 hover:border-white/30'}`}>
                            <div className="flex items-start gap-3">
                                <div className={`mt-0.5 w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center ${selected.includes(cfg.id) ? 'border-indigo-500 bg-indigo-500' : 'border-white/30'}`}>
                                    {selected.includes(cfg.id) && <CheckCircle className="w-3 h-3 text-white" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <p className="font-semibold text-white">{cfg.label}</p>
                                        <span className="text-xs text-white/30 flex-shrink-0 ml-2">{cfg.count}</span>
                                    </div>
                                    <p className="text-white/50 text-xs mt-0.5">{cfg.desc}</p>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {cfg.fields.slice(0, 4).map((f) => (
                                            <span key={f} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-white/30 border border-white/10">{f}</span>
                                        ))}
                                        {cfg.fields.length > 4 && <span className="text-[10px] text-white/20">+{cfg.fields.length - 4} more</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button onClick={handleExport} disabled={exporting}
                    className="btn-primary w-full flex items-center justify-center gap-2">
                    {exporting ? (
                        <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Preparing Export...</>
                    ) : (
                        <><Download className="w-4 h-4" />Export {selected.length > 0 ? `${selected.length} Dataset${selected.length > 1 ? 's' : ''}` : 'Selected Datasets'} as {format.toUpperCase()}</>
                    )}
                </button>
            </div>

            {/* Download History */}
            <div className="glass-card">
                <h3 className="text-lg font-bold text-white mb-4">Recent Exports</h3>
                <div className="space-y-2">
                    {[
                        { name: 'Wellness_Logs_Dec2024.csv', size: '2.4 MB', date: 'Jan 15, 2025', by: 'Admin' },
                        { name: 'Burnout_Risk_Report_Q4.xlsx', size: '890 KB', date: 'Jan 8, 2025', by: 'Admin' },
                        { name: 'User_Roster_January.csv', size: '124 KB', date: 'Jan 3, 2025', by: 'Admin' },
                    ].map((exp) => (
                        <div key={exp.name} className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-white/30 transition-all">
                            <FileSpreadsheet className="w-5 h-5 text-green-400 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="text-white text-sm font-medium truncate">{exp.name}</p>
                                <p className="text-white/30 text-xs">{exp.size} · {exp.date} · by {exp.by}</p>
                            </div>
                            <button className="btn-secondary !py-1.5 !px-3 !text-xs flex items-center gap-1 flex-shrink-0">
                                <Download className="w-3 h-3" /> Re-download
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
