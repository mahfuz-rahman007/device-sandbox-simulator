import React from 'react';
import { LightSettings } from '../../../types';

interface LightVisualProps {
    settings: LightSettings;
}

export const LightVisual: React.FC<LightVisualProps> = ({ settings }) => {
    const { power, brightness, colorTemp } = settings;

    // Color temperature mapping - exact colors matching controller
    const colorMap = {
        warm: '#FBBF24',
        neutral: '#FEF3C7',
        cool: '#93C5FD',
        pink: '#F472B6',
    };

    const currentColor = colorMap[colorTemp];
    const offColor = '#4B5563';

    const bulbColor = power ? currentColor : offColor;
    const bulbOpacity = power ? 1 : 0.5; // Always full color when on, not affected by brightness
    const glowOpacity = power ? (brightness / 100) * 0.8 : 0; // Brightness controls glow only

    return (
        <div className="flex flex-col items-center gap-4">
            {/* Light Bulb Visual */}
            <div className="relative w-56 h-56 flex items-center justify-center">
                {/* Glow effect - appears when light is on */}
                {power && (
                    <div
                        className="absolute inset-0 rounded-full blur-3xl transition-all duration-300"
                        style={{
                            backgroundColor: currentColor,
                            opacity: glowOpacity,
                        }}
                    />
                )}

                {/* Main bulb SVG */}
                <svg
                    viewBox="0 0 100 140"
                    className="w-56 h-56 relative z-10 transition-all duration-300"
                    style={{
                        transform: 'scaleY(-1)',
                    }}
                >
                    {/* Glass bulb */}
                    <ellipse
                        cx="50"
                        cy="45"
                        rx="28"
                        ry="32"
                        fill={bulbColor}
                        opacity={bulbOpacity}
                        className="transition-all duration-300"
                    />

                    {/* Bulb base */}
                    <rect
                        x="42"
                        y="75"
                        width="16"
                        height="20"
                        rx="2"
                        fill="#2D3748"
                        className="transition-all duration-300"
                    />

                    {/* Threads on base */}
                    <line x1="40" y1="80" x2="60" y2="80" stroke="#1A202C" strokeWidth="1" />
                    <line x1="40" y1="85" x2="60" y2="85" stroke="#1A202C" strokeWidth="1" />
                    <line x1="40" y1="90" x2="60" y2="90" stroke="#1A202C" strokeWidth="1" />
                </svg>

                {/* Shine rays - brightness controls intensity */}
                {power && brightness > 30 && (
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `radial-gradient(circle, ${currentColor}20 0%, transparent 70%)`,
                            opacity: brightness / 100 * 0.6,
                        }}
                    />
                )}
            </div>
        </div>
    );
};
