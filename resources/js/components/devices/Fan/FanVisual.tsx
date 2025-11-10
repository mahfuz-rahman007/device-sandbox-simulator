import React, { useEffect, useState } from 'react';
import { FanSettings } from '../../../types';

interface FanVisualProps {
    settings: FanSettings;
}

export const FanVisual: React.FC<FanVisualProps> = ({ settings }) => {
    const { power, speed } = settings;
    const [rotation, setRotation] = useState(0);

    // Calculate rotation speed: at 100% speed, complete rotation per second
    // at 50% speed, complete rotation per 2 seconds, etc.
    useEffect(() => {
        if (!power) {
            setRotation(0);
            return;
        }

        let animationFrameId: number;
        let lastTime = Date.now();

        const animate = () => {
            const now = Date.now();
            const deltaTime = (now - lastTime) / 1000; // Convert to seconds
            lastTime = now;

            // Rotation speed: (speed / 100) * 360 degrees per second
            // At 100% speed: 360 deg/sec = full rotation per second
            // At 50% speed: 180 deg/sec = full rotation per 2 seconds
            const rotationPerSecond = (speed / 100) * 360;
            setRotation((prev) => (prev + rotationPerSecond * deltaTime) % 360);

            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameId);
    }, [power, speed]);

    return (
        <div className="flex flex-col items-center gap-4">
            {/* Fan Visual */}
            <div className="relative w-56 h-56 flex items-center justify-center">
                {/* Fan SVG - rotating based on speed */}
                <img
                    src="/images/fan.svg"
                    alt="Fan"
                    className="w-56 h-56"
                    style={{
                        transform: `rotate(${rotation}deg)`,
                        transition: power ? 'none' : 'transform 0.5s ease-out',
                    }}
                />
            </div>
        </div>
    );
};
