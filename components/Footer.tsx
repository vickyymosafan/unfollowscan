export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111315] text-[#F7F7F8]">
      <div className="container mx-auto px-4 py-6">
        <p className="text-center text-sm">
          © {currentYear} Cek Siapa yang Tidak Follow Balik. Semua hak dilindungi.
        </p>
      </div>
    </footer>
  );
}
