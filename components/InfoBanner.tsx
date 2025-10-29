export default function InfoBanner() {
  return (
    <div className="bg-shark-100 border border-shark-300 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-shark-700 rounded-lg sm:rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-shark-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-xs sm:text-sm font-semibold text-shark-950 mb-1">Privasi Terjamin</h3>
          <p className="text-xs sm:text-sm text-shark-700 leading-relaxed">
            Data Kamu diproses 100% di perangkat Kamu. Situs ini tidak menyimpan, mengirim, atau mengakses data Kamu ke server manapun.
          </p>
        </div>
      </div>
    </div>
  );
}
