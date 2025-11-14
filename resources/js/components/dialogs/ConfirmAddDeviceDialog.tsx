import React from 'react';

interface ConfirmAddDeviceDialogProps {
    open: boolean;
    title?: string;
    message?: string;
    confirmButtonText?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export const ConfirmAddDeviceDialog: React.FC<ConfirmAddDeviceDialogProps> = ({
    open,
    onConfirm,
    onCancel,
}) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)' }}>
            <div className="mx-4 w-full max-w-md rounded-lg border border-slate-600 bg-slate-800 p-6 shadow-lg">
                <h2 className="mb-4 text-xl font-semibold text-slate-100">⚠️ Discard Changes?</h2>

                <p className="mb-6 text-slate-300">
                    You will lose your unsaved changes if you proceed without saving or updating.
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="cursor-pointer rounded-lg border border-slate-600 px-4 py-2 text-slate-200 transition-colors duration-200 hover:bg-slate-700"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-red-700"
                    >
                        Discard
                    </button>
                </div>
            </div>
        </div>
    );
};
