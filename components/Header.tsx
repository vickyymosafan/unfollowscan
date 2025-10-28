import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-shark-950 backdrop-blur-sm text-shark-50 border-b border-shark-800 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <img src="/Logo.svg" alt="Logo" className="w-10 h-10" />
            </div>
            <div className="hidden sm:block">
              <div className="text-base font-bold leading-tight">Cek Follow Balik</div>
              <div className="text-xs text-shark-400">Instagram Analyzer</div>
            </div>
          </Link>

          {/* Navigation */}
          <nav>
            <ul className="flex gap-2">
              <li>
                <Link
                  href="/"
                  className="px-4 py-2 rounded-lg hover:bg-shark-800 transition-colors focus:outline-none focus:ring-2 focus:ring-shark-400 focus:ring-offset-2 focus:ring-offset-shark-950 text-sm font-medium"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/panduan"
                  className="px-4 py-2 rounded-lg hover:bg-shark-800 transition-colors focus:outline-none focus:ring-2 focus:ring-shark-400 focus:ring-offset-2 focus:ring-offset-shark-950 text-sm font-medium"
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
