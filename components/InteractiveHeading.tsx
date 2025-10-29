'use client';

import TextPressure from './TextPressure';

export default function InteractiveHeading() {
  return (
    <div className="w-full min-h-[80px] sm:min-h-[90px] lg:min-h-[100px] xl:min-h-[110px] flex items-center justify-center px-2">
      <TextPressure
        text="Cek siapa yang tidak follow balik"
        textColor="#111315"
        width={true}
        weight={true}
        italic={false}
        alpha={false}
        flex={false}
        stroke={false}
        scale={false}
        minFontSize={24}
        className="font-bold"
      />
    </div>
  );
}
