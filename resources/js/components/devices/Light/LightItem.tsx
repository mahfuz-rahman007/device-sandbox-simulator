import React from 'react';
import { Lightbulb } from 'lucide-react';

interface LightItemProps {
    label?: string;
}

export const LightItem: React.FC<LightItemProps> = ({ label = 'Light' }) => (
    <>
        <Lightbulb className="h-5 w-5 text-yellow-400" />
        <span className="text-sm font-medium text-slate-200">{label}</span>
    </>
);
