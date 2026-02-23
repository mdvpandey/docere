import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string) {
    return new Date(date).toLocaleDateString('en-IN', {
        year: 'numeric', month: 'short', day: 'numeric',
    });
}

export function formatRelativeDate(date: Date | string) {
    const now = new Date();
    const d = new Date(date);
    const diff = Math.floor((now.getTime() - d.getTime()) / 1000);
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
}

export function getStressColor(level: number) {
    if (level <= 3) return 'text-green-400';
    if (level <= 6) return 'text-yellow-400';
    return 'text-red-400';
}

export function getBurnoutLabel(score: number) {
    if (score < 30) return { label: 'Low Risk', color: 'green' };
    if (score < 60) return { label: 'Moderate Risk', color: 'yellow' };
    return { label: 'High Risk – Take a Break!', color: 'red' };
}

export function generateAvatarInitials(name: string) {
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
}
