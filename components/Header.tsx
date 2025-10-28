import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#111315] text-[#F7F7F8] border-b border-[#DADDE1]">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="text-lg font-semibold">
            Cek Siapa yang Tidak Follow Balik
          </div>

          {/* Navigation */}
          <nav>
            <ul className="flex gap-6">
              <li>
                <Link 
                  href="/" 
                  className="hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#F7F7F8] focus:ring-offset-2 focus:ring-offset-[#111315] rounded px-2 py-1"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link 
                  href="/panduan" 
                  className="hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#F7F7F8] focus:ring-offset-2 focus:ring-offset-[#111315] rounded px-2 py-1"
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
