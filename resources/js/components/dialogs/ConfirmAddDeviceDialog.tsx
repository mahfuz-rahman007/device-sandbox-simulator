import React from 'react';
import { Dialog } from '../ui';
import { Button } from '../ui';

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
    title = '⚠️ Discard Changes?',
    message = 'You will lose your unsaved changes if you proceed without saving or updating.',
    confirmButtonText = 'Discard',
    onConfirm,
    onCancel,
}) => {
    return (
        <Dialog open={open} title={title} description={message}>
            <div className="flex justify-end gap-3">
                <Button type="info" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="danger" onClick={onConfirm}>
                    {confirmButtonText}
                </Button>
            </div>
        </Dialog>
    );
};
