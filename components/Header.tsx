import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#111315]/95 backdrop-blur-sm text-[#F7F7F8] border-b border-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <div className="text-base font-bold leading-tight">Cek Follow Balik</div>
              <div className="text-xs text-gray-400">Instagram Analyzer</div>
            </div>
          </Link>

          {/* Navigation */}
          <nav>
            <ul className="flex gap-2">
              <li>
                <Link 
                  href="/" 
                  className="px-4 py-2 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#F7F7F8] focus:ring-offset-2 focus:ring-offset-[#111315] text-sm font-medium"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link 
                  href="/panduan" 
                  className="px-4 py-2 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#F7F7F8] focus:ring-offset-2 focus:ring-offset-[#111315] text-sm font-medium"
                >
                  Panduan
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
