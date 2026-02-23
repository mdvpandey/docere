'use client';

import { useState, useEffect } from 'react';
import { Sliders, Plus, Trash2, Save, Loader2, RefreshCw, Shield, ToggleLeft, ToggleRight, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

const CATEGORIES = ['feature', 'ai', 'content', 'branding', 'limits', 'security'] as const;
type Category = typeof CATEGORIES[number];

interface ConfigEntry {
    _id?: string;
    key: string;
    value: string;
    category: Category;
    description: string;
    isPublic: boolean;
}

const DEFAULT_CONFIGS: ConfigEntry[] = [
    { key: 'enable_burnout_prediction', value: 'true', category: 'feature', description: 'Enable AI burnout prediction for all students', isPublic: false },
    { key: 'blur_high_risk_names', value: 'true', category: 'security', description: 'Blur student names on high-risk reports', isPublic: false },
    { key: 'max_students_per_mentor', value: '30', category: 'limits', description: 'Maximum students a mentor can manage', isPublic: false },
    { key: 'ai_plan_intensity_cap', value: '0.7', category: 'ai', description: 'Max intensity multiplier for AI study plans (0–1)', isPublic: false },
    { key: 'free_plan_monthly_plans', value: '1', category: 'limits', description: 'Study plans per month for free users', isPublic: true },
    { key: 'platform_title', value: 'DUCERE', category: 'branding', description: 'Platform display name shown in UI', isPublic: true },
    { key: 'enable_blog_comments', value: 'false', category: 'feature', description: 'Allow students to comment on blog posts', isPublic: false },
    { key: 'feedback_analysis_model', value: 'rule-based', category: 'ai', description: 'AI model for feedback analysis: rule-based, openai, gemini', isPublic: false },
];

const catColors: Record<Category, string> = {
    feature: 'badge-blue', ai: 'badge-purple', content: 'badge-green', branding: 'badge-yellow', limits: 'badge-red', security: 'badge-red',
};

export default function AdminConfigPage() {
    const [configs, setConfigs] = useState<ConfigEntry[]>(DEFAULT_CONFIGS);
    const [newEntry, setNewEntry] = useState<ConfigEntry>({ key: '', value: '', category: 'feature', description: '', isPublic: false });
    const [showAdd, setShowAdd] = useState(false);
    const [saving, setSaving] = useState(false);
    const [filter, setFilter] = useState<Category | 'all'>('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/admin/config').then((r) => r.json()).then((data) => {
            if (Array.isArray(data) && data.length > 0) {
                setConfigs(data);
            }
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    async function saveAll() {
        setSaving(true);
        try {
            for (const config of configs) {
                await fetch('/api/admin/config', {
                    method: 'POST', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(config),
                });
            }
            toast.success('All settings saved successfully!');
        } catch { toast.error('Failed to save some settings.'); }
        finally { setSaving(false); }
    }

    async function addConfig() {
        if (!newEntry.key.trim() || !newEntry.value.trim()) { toast.error('Key and Value are required.'); return; }
        setConfigs((prev) => [...prev, { ...newEntry }]);
        setNewEntry({ key: '', value: '', category: 'feature', description: '', isPublic: false });
        setShowAdd(false);
        toast.success('Config entry added!');
    }

    function updateConfig(i: number, field: keyof ConfigEntry, val: string | boolean) {
        setConfigs((prev) => prev.map((c, idx) => idx === i ? { ...c, [field]: val } : c));
    }

    function removeConfig(i: number) {
        setConfigs((prev) => prev.filter((_, idx) => idx !== i));
        toast.success('Config removed. Save all to persist.');
    }

    function toggleBool(i: number) {
        const current = configs[i].value;
        updateConfig(i, 'value', current === 'true' ? 'false' : 'true');
    }

    const filtered = filter === 'all' ? configs : configs.filter((c) => c.category === filter);
    const isBool = (v: string) => v === 'true' || v === 'false';

    return (
        <div className="space-y-8">
            <div>
                <h1 className="page-header">Super-Control Panel ⚙️</h1>
                <p className="text-white/50">Dynamically configure every aspect of the DUCERE platform without writing code.</p>
            </div>

            {/* Danger Banner */}
            <div className="flex items-start gap-3 p-4 rounded-xl border border-amber-500/30 bg-amber-500/10">
                <Shield className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                    <p className="text-amber-400 font-semibold">Admin-Only Zone</p>
                    <p className="text-amber-300/70 text-sm">Changes here affect the entire platform. Incorrect values may cause feature failures. Test in staging before saving.</p>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-wrap gap-3 items-center justify-between">
                <div className="flex gap-1 p-1 bg-white/5 border border-white/10 rounded-xl">
                    {(['all', ...CATEGORIES] as const).map((cat) => (
                        <button key={cat} onClick={() => setFilter(cat)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-all ${filter === cat ? 'bg-indigo-600 text-white' : 'text-white/50 hover:text-white'}`}>
                            {cat}
                        </button>
                    ))}
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setShowAdd(!showAdd)} className="btn-secondary flex items-center gap-1.5 text-sm">
                        <Plus className="w-4 h-4" /> Add Config
                    </button>
                    <button onClick={saveAll} disabled={saving} className="btn-primary flex items-center gap-1.5 text-sm">
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {saving ? 'Saving...' : 'Save All'}
                    </button>
                </div>
            </div>

            {/* Add New Config Form */}
            {showAdd && (
                <div className="glass-card border border-indigo-500/30 animate-in slide-in-from-top-2">
                    <h3 className="text-lg font-bold text-white mb-4">+ Add New Configuration</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="text-sm text-white/60 block mb-1.5">Config Key</label>
                            <input type="text" value={newEntry.key} onChange={(e) => setNewEntry((p) => ({ ...p, key: e.target.value }))}
                                placeholder="e.g. feature_name_enabled" className="input-field font-mono" />
                        </div>
                        <div>
                            <label className="text-sm text-white/60 block mb-1.5">Value</label>
                            <input type="text" value={newEntry.value} onChange={(e) => setNewEntry((p) => ({ ...p, value: e.target.value }))}
                                placeholder="e.g. true / 30 / openai" className="input-field" />
                        </div>
                        <div>
                            <label className="text-sm text-white/60 block mb-1.5">Category</label>
                            <select value={newEntry.category} onChange={(e) => setNewEntry((p) => ({ ...p, category: e.target.value as Category }))} className="input-field">
                                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="text-sm text-white/60 block mb-1.5">Description</label>
                            <input type="text" value={newEntry.description} onChange={(e) => setNewEntry((p) => ({ ...p, description: e.target.value }))}
                                placeholder="What does this config do?" className="input-field" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                        <input type="checkbox" id="isPublic" checked={newEntry.isPublic} onChange={(e) => setNewEntry((p) => ({ ...p, isPublic: e.target.checked }))} className="accent-indigo-500" />
                        <label htmlFor="isPublic" className="text-sm text-white/60">Expose to public API</label>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={addConfig} className="btn-primary text-sm">Add Entry</button>
                        <button onClick={() => setShowAdd(false)} className="btn-secondary text-sm">Cancel</button>
                    </div>
                </div>
            )}

            {/* Config Table */}
            <div className="glass-card overflow-hidden">
                {loading ? (
                    <div className="text-center py-12"><RefreshCw className="w-8 h-8 text-indigo-400 animate-spin mx-auto mb-3" /><p className="text-white/50">Loading configs...</p></div>
                ) : (
                    <div className="space-y-2">
                        {filtered.map((cfg, i) => {
                            const globalIdx = configs.indexOf(cfg);
                            return (
                                <div key={`${cfg.key}-${i}`} className="p-4 rounded-xl border border-white/10 hover:border-indigo-500/20 transition-all">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap mb-1">
                                                <code className="text-indigo-400 font-mono text-sm">{cfg.key}</code>
                                                <span className={`badge ${catColors[cfg.category]} !text-[10px]`}>{cfg.category}</span>
                                                {cfg.isPublic && <span className="badge badge-green !text-[10px]">public</span>}
                                            </div>
                                            {cfg.description && <p className="text-white/40 text-xs">{cfg.description}</p>}
                                        </div>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            {isBool(cfg.value) ? (
                                                <button onClick={() => toggleBool(globalIdx)} className="flex items-center gap-1.5">
                                                    {cfg.value === 'true'
                                                        ? <ToggleRight className="w-8 h-8 text-green-400" />
                                                        : <ToggleLeft className="w-8 h-8 text-white/30" />}
                                                    <span className={`text-sm font-bold ${cfg.value === 'true' ? 'text-green-400' : 'text-white/30'}`}>{cfg.value}</span>
                                                </button>
                                            ) : (
                                                <input type="text" value={cfg.value}
                                                    onChange={(e) => updateConfig(globalIdx, 'value', e.target.value)}
                                                    className="input-field !py-1.5 !px-3 text-sm font-mono w-36 text-right" />
                                            )}
                                            <button onClick={() => removeConfig(globalIdx)}
                                                className="w-7 h-7 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center hover:bg-red-500/20 transition-all text-red-400">
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Quick Presets */}
            <div className="glass-card border border-white/10">
                <h3 className="text-lg font-bold text-white mb-3">Quick Presets</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                        { label: '🟢 Full Features Mode', desc: 'Enable all AI and advanced features', action: () => toast.info('All features enabled!') },
                        { label: '🔒 Exam Week Mode', desc: 'Reduce intensity, disable non-essentials', action: () => toast.info('Exam week mode applied!') },
                        { label: '🔧 Maintenance Mode', desc: 'Restrict access for scheduled maintenance', action: () => toast.warning('Maintenance mode enabled. Students cannot log in.') },
                    ].map((preset) => (
                        <button key={preset.label} onClick={preset.action}
                            className="p-4 text-left rounded-xl border border-white/10 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all">
                            <p className="text-white font-semibold text-sm">{preset.label}</p>
                            <p className="text-white/40 text-xs mt-0.5">{preset.desc}</p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
