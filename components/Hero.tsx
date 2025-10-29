import AnimatedGuideButton from './AnimatedGuideButton';
import AnimatedStartButton from './AnimatedStartButton';

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white rounded-full border border-shark-300 mb-4 sm:mb-6 shadow-sm">
            <span className="w-2 h-2 bg-shark-700 rounded-full animate-pulse"></span>
            <span className="text-xs sm:text-sm text-shark-700">100% Privasi Terjamin</span>
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
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-shark-700" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Tanpa Login</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-shark-700" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Gratis Selamanya</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-shark-700" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Data Aman</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
