import React from 'react';

interface SavePresetDialogProps {
    open: boolean;
    presetName: string;
    onPresetNameChange: (name: string) => void;
    onSave: () => void;
    onCancel: () => void;
}

export const SavePresetDialog: React.FC<SavePresetDialogProps> = ({
    open,
    presetName,
    onPresetNameChange,
    onSave,
    onCancel,
}) => {
    if (!open) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)' }}
        >
            <div className="rounded-lg border border-slate-600 bg-slate-800 p-6 shadow-lg max-w-md w-full mx-4">
                <h2 className="text-xl font-semibold text-slate-100 mb-4">
                    Save Preset Configuration
                </h2>

                <input
                    type="text"
                    placeholder="Enter preset name..."
                    value={presetName}
                    onChange={(e) => onPresetNameChange(e.target.value)}
                    autoFocus
                    className="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-2 text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none mb-6"
                />

                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onCancel}
                        className="rounded-lg border border-slate-600 px-4 py-2 text-slate-200 hover:bg-slate-700 transition-colors duration-200 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSave}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};
