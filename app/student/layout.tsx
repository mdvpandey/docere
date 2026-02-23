import { Sidebar } from '@/components/layout/Sidebar';
import { ReactNode } from 'react';

export default function StudentLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen bg-[#0a0a0f]">
            <Sidebar />
            <main className="flex-1 ml-64 p-8 overflow-auto">
                {children}
            </main>
        </div>
    );
}
