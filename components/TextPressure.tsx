'use client';

import { useTextPressure } from '@/hooks/useTextPressure';

interface TextPressureProps {
    text?: string;
    fontFamily?: string;
    fontUrl?: string;
    width?: boolean;
    weight?: boolean;
    italic?: boolean;
    alpha?: boolean;
    flex?: boolean;
    stroke?: boolean;
    scale?: boolean;
    textColor?: string;
    strokeColor?: string;
    strokeWidth?: number;
    className?: string;
    minFontSize?: number;
}

const TextPressure: React.FC<TextPressureProps> = ({
    text = 'Compressa',
    fontFamily = 'Compressa VF',
    fontUrl = 'https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2',
    width = true,
    weight = true,
    italic = true,
    alpha = false,
    flex = true,
    stroke = false,
    scale = false,
    textColor = '#FFFFFF',
    strokeColor = '#FF0000',
    strokeWidth = 2,
    className = '',
    minFontSize = 24
}) => {
    const chars = text.split('');
    
    const {
        containerRef,
        titleRef,
        spansRef,
        fontSize,
        scaleY,
        lineHeight,
    } = useTextPressure({
        chars,
        width,
        weight,
        italic,
        alpha,
        scale,
        minFontSize,
    });

    return (
        <div ref={containerRef} className="relative w-full h-full overflow-hidden bg-transparent">
            <style>{`
        @font-face {
          font-family: '${fontFamily}';
          src: url('${fontUrl}');
          font-style: normal;
        }
        .stroke span {
          position: relative;
          color: ${textColor};
        }
        .stroke span::after {
          content: attr(data-char);
          position: absolute;
          left: 0;
          top: 0;
          color: transparent;
          z-index: -1;
          -webkit-text-stroke-width: ${strokeWidth}px;
          -webkit-text-stroke-color: ${strokeColor};
        }
      `}</style>
            <h1
                ref={titleRef}
                className={`text-pressure-title ${className} ${flex ? 'flex justify-between' : ''} ${stroke ? 'stroke' : ''} uppercase text-center`}
                style={{
                    fontFamily,
                    fontSize: fontSize,
                    lineHeight,
                    transform: `scale(1, ${scaleY})`,
                    transformOrigin: 'center top',
                    margin: 0,
                    fontWeight: 100,
                    color: stroke ? undefined : textColor,
                    whiteSpace: 'pre-wrap'
                }}
            >
                {chars.map((char, i) => {
                    const isSpace = char === ' ';
                    return (
                        <span
                            key={i}
                            ref={el => {
                                spansRef.current[i] = el;
                            }}
                            data-char={char}
                            className="inline-block"
                            style={isSpace ? { minWidth: '0.3em' } : undefined}
                        >
                            {isSpace ? '\u00A0' : char}
                        </span>
                    );
                })}
            </h1>
        </div>
    );
};

export default TextPressure;
