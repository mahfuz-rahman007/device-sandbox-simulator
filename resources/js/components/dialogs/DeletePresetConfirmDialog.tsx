import React from 'react';
import { Dialog } from '../ui';
import { Button } from '../ui';

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
    return (
        <Dialog
            open={open}
            title="Delete Preset?"
            description="This action cannot be undone. Are you sure you want to delete this preset?"
        >
            <div className="flex flex-wrap gap-2 md:gap-3 justify-end">
                <Button type="info" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="danger" onClick={onConfirm}>
                    Delete
                </Button>
            </div>
        </Dialog>
    );
};
