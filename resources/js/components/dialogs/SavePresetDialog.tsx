import React from 'react';
import { Dialog } from '../ui';
import { Button } from '../ui';

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
    return (
        <Dialog open={open} title="Save Preset Configuration">
            <input
                type="text"
                placeholder="Enter preset name..."
                value={presetName}
                onChange={(e) => onPresetNameChange(e.target.value)}
                autoFocus
                className="mb-6 w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-2 text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none"
            />

            <div className="flex justify-end gap-3">
                <Button type="info" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="primary" onClick={onSave}>
                    Save
                </Button>
            </div>
        </Dialog>
    );
};
