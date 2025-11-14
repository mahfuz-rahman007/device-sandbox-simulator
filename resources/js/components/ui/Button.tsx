import React from 'react';

type ButtonType = 'primary' | 'success' | 'danger' | 'info';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    type?: ButtonType;
    size?: ButtonSize;
    children: React.ReactNode;
    disabled?: boolean;
    onClick?: () => void;
}

const typeStyles: Record<ButtonType, { enabled: string; disabled: string }> = {
    primary: {
        enabled: 'bg-blue-600 hover:bg-blue-700 text-white',
        disabled: 'bg-blue-700 opacity-50 cursor-not-allowed text-white',
    },
    success: {
        enabled: 'bg-green-600 hover:bg-green-700 text-white',
        disabled: 'bg-green-700 opacity-50 cursor-not-allowed text-white',
    },
    danger: {
        enabled: 'bg-red-600 hover:bg-red-700 text-white',
        disabled: 'bg-red-700 opacity-50 cursor-not-allowed text-white',
    },
    info: {
        enabled: 'bg-slate-700 hover:bg-slate-600 text-slate-200',
        disabled: 'bg-slate-700 opacity-50 cursor-not-allowed text-slate-200',
    },
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
};

export const Button: React.FC<ButtonProps> = ({
    type = 'primary',
    size = 'md',
    disabled = false,
    children,
    className = '',
    onClick,
    ...rest
}) => {
    const typeStyle = typeStyles[type];
    const sizeStyle = sizeStyles[size];
    const baseStyle = 'rounded-lg font-medium transition-all duration-200 cursor-pointer';
    const currentStyle = disabled ? typeStyle.disabled : typeStyle.enabled;

    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`${baseStyle} ${currentStyle} ${sizeStyle} ${className}`}
            {...rest}
        >
            {children}
        </button>
    );
};
