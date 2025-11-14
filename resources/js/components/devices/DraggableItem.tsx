import React from 'react';
import { useDraggable } from '@dnd-kit/core';

interface DraggableItemProps {
    deviceType: 'light' | 'fan';
    children: React.ReactNode;
}

export const DraggableItem: React.FC<DraggableItemProps> = ({ deviceType, children }) => {
    const { attributes, listeners, setNodeRef } = useDraggable({
        id: `device-${deviceType}`,
        data: { type: 'device', deviceType },
    });

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            className="flex items-center gap-2 rounded-lg border-2 border-slate-600 bg-slate-800 px-4 py-3 cursor-grab active:cursor-grabbing transition-all duration-200 hover:border-slate-500 hover:bg-slate-700"
        >
            {children}
        </div>
    );
};
