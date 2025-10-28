export default function InfoBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-5 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-900 mb-1">Privasi Terjamin</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Data Kamu diproses 100% di perangkat Kamu. Situs ini tidak menyimpan, mengirim, atau mengakses data Kamu ke server manapun.
          </p>
        </div>
      </div>
    </div>
  );
}
