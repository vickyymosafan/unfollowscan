import AnimatedGuideButton from './AnimatedGuideButton';
import AnimatedStartButton from './AnimatedStartButton';
import PrivacyBadge from './PrivacyBadge';
import { CheckmarkIcon } from '@/lib/icons';

export default function Hero() {
  const trustIndicators = [
    { label: 'Tanpa Login' },
    { label: 'Gratis Selamanya' },
    { label: 'Data Aman' },
  ];

  return (
    <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Privacy Badge */}
          <div className="mb-4 sm:mb-6">
            <PrivacyBadge />
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-shark-950 mb-4 sm:mb-6 leading-tight px-2">
            Cek siapa yang{' '}
            <span className="relative inline-block">
              <span className="relative z-10">tidak follow balik</span>
              <span className="absolute bottom-1 sm:bottom-2 left-0 w-full h-2 sm:h-3 bg-shark-300 -z-10"></span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-shark-700 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4">
            Unggah file followers dan following dari Instagram. Semua proses dilakukan di perangkat Kamu secara aman.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
            <AnimatedStartButton />
            <AnimatedGuideButton />
          </div>

          {/* Trust Indicators */}
          <div className="mt-6 sm:mt-8 lg:mt-10 flex flex-wrap justify-center items-center gap-3 sm:gap-4 lg:gap-6 text-xs sm:text-sm text-shark-600 px-4">
            {trustIndicators.map((indicator) => (
              <div key={indicator.label} className="flex items-center gap-2">
                <CheckmarkIcon className="w-5 h-5 text-shark-700" />
                <span>{indicator.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
