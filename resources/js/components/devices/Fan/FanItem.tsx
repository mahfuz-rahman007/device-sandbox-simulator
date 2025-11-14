import React from 'react';
import { Wind } from 'lucide-react';

interface FanItemProps {
    label?: string;
}

export const FanItem: React.FC<FanItemProps> = ({ label = 'Fan' }) => (
    <>
        <Wind className="h-5 w-5 text-blue-400" />
        <span className="text-sm font-medium text-slate-200">{label}</span>
    </>
);
