'use client';

import React from 'react';
import LiquidEther from './LiquidEther';

interface PageWithBackgroundProps {
    children: React.ReactNode;
}

export default function PageWithBackground({ children }: PageWithBackgroundProps) {
    return (
        <div className="min-h-screen bg-shark-50 relative">
            {/* Animated Background */}
            <div className="fixed inset-0 z-0">
                <LiquidEther
                    colors={['#5227FF', '#FF9FFC', '#B19EEF']}
                    mouseForce={20}
                    cursorSize={100}
                    isViscous={false}
                    viscous={30}
                    iterationsViscous={32}
                    iterationsPoisson={32}
                    dt={0.014}
                    BFECC={true}
                    resolution={0.5}
                    isBounce={false}
                    autoDemo={true}
                    autoSpeed={0.5}
                    autoIntensity={2.2}
                    takeoverDuration={0.25}
                    autoResumeDelay={3000}
                    autoRampDuration={0.6}
                />
            </div>

            {/* Content Layer */}
            <div className="relative z-10">{children}</div>
        </div>
    );
}
