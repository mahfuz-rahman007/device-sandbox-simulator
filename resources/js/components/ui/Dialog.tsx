import React from 'react';

interface DialogProps {
    open: boolean;
    title: string;
    description?: string;
    children?: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ open, title, description, children }) => {
    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)' }}
        >
            <div className="mx-4 w-full max-w-md rounded-lg border border-slate-600 bg-slate-800 p-6 shadow-lg">
                <h2 className="mb-4 text-xl font-semibold text-slate-100">
                    {title}
                </h2>

                {description && (
                    <p className="mb-6 text-slate-300">
                        {description}
                    </p>
                )}

                {children}
            </div>
        </div>
    );
};
