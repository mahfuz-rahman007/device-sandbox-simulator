import React from 'react';

interface DeletePresetConfirmDialogProps {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export const DeletePresetConfirmDialog: React.FC<DeletePresetConfirmDialogProps> = ({
    open,
    onConfirm,
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
                    Delete Preset?
                </h2>

                <p className="text-slate-300 mb-6">
                    This action cannot be undone. Are you sure you want to delete this preset?
                </p>

                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onCancel}
                        className="rounded-lg border border-slate-600 px-4 py-2 text-slate-200 hover:bg-slate-700 transition-colors duration-200 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition-colors duration-200 cursor-pointer"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};
