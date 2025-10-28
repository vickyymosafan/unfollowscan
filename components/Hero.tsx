import Link from 'next/link';

export default function Hero() {
  return (
    <section className="text-center py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-[#111315] mb-4">
          Cek siapa yang tidak follow balik
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Unggah file followers dan following dari Instagram. Proses di perangkat Kamu.
        </p>
        <Link
          href="/panduan"
          className="inline-block bg-[#111315] text-[#F7F7F8] rounded-lg px-6 py-3 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#111315] focus:ring-offset-2"
        >
          Lihat panduan ekspor
        </Link>
      </div>
    </section>
  );
}
