import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PanduanPage() {
  return (
    <div className="min-h-screen bg-[#F7F7F8]">
      <Header />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-2xl p-8 border border-[#DADDE1]">
          <h1 className="text-3xl font-bold text-[#111315] mb-6">
            Cara ekspor data Instagram
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6">
              Ikuti langkah-langkah berikut untuk mengekspor data followers dan following dari Instagram:
            </p>
            
            <ol className="space-y-4 text-gray-700 list-decimal list-inside">
              <li>Buka aplikasi Instagram atau website Instagram.com dan masuk ke akun Kamu</li>
              <li>Klik ikon profil, lalu klik menu (☰) di pojok kanan atas</li>
              <li>Pilih "Pengaturan dan privasi" atau "Settings and privacy"</li>
              <li>Pilih "Pusat Akun" atau "Account Center"</li>
              <li>Pilih "Informasi dan izin Kamu" atau "Your information and permissions"</li>
              <li>Klik "Unduh informasi Kamu" atau "Download your information"</li>
              <li>Pilih akun Instagram yang ingin di-export, lalu klik "Minta unduhan" atau "Request download"</li>
              <li>Pilih format <strong>"JSON"</strong> (direkomendasikan) dan rentang tanggal "Sepanjang waktu" untuk data lengkap</li>
              <li>Klik "Buat file" dan tunggu email dari Instagram (biasanya membutuhkan waktu 1-2 hari)</li>
              <li>Buka email dari Instagram dan klik link untuk download file ZIP</li>
              <li>Extract file ZIP yang sudah didownload dan cari folder "connections" atau "followers_and_following"</li>
              <li>Upload file followers dan following dari folder tersebut ke website ini</li>
            </ol>
            
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h2 className="text-lg font-semibold text-[#111315] mb-2">
                Catatan Penting
              </h2>
              <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                <li>
                  <strong>Format JSON direkomendasikan</strong> karena lebih mudah diproses dan lebih akurat
                </li>
                <li>
                  Instagram kadang membagi file menjadi beberapa bagian (misalnya: followers_1.json, followers_2.json). 
                  Kamu bisa mengunggah semua file sekaligus, sistem akan menggabungkannya secara otomatis
                </li>
                <li>
                  Proses download dari Instagram bisa memakan waktu 1-2 hari tergantung ukuran data Kamu
                </li>
                <li>
                  Semua data diproses di perangkat Kamu. Website ini tidak menyimpan atau mengirim data Kamu ke server
                </li>
              </ul>
            </div>
            
            <div className="mt-6 text-center">
              <a
                href="/"
                className="inline-block bg-[#111315] text-[#F7F7F8] rounded-lg px-6 py-3 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#111315] focus:ring-offset-2"
              >
                Kembali ke Beranda
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
