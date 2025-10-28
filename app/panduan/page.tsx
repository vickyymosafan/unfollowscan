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
              <li>
                <strong>Extract file ZIP</strong> yang sudah didownload:
                <ul className="ml-6 mt-2 space-y-1 list-disc">
                  <li>Klik kanan file ZIP → Extract All atau Extract Here</li>
                  <li>Buka folder hasil extract</li>
                  <li>Cari dan buka folder <strong>"connections"</strong></li>
                  <li>Di dalam folder connections, buka folder <strong>"followers_and_following"</strong></li>
                </ul>
              </li>
              <li>
                Di dalam folder <strong>followers_and_following</strong>, Kamu akan melihat beberapa file. Pilih dan upload <strong>2 file ini saja</strong>:
                <ul className="ml-6 mt-2 space-y-1 list-disc">
                  <li><strong>followers_1.json</strong> (file data followers Kamu)</li>
                  <li><strong>following.json</strong> (file data following Kamu)</li>
                </ul>
              </li>
              <li>Upload kedua file tersebut ke website ini dan klik tombol "Proses" untuk melihat hasilnya</li>
            </ol>
            
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h2 className="text-lg font-semibold text-[#111315] mb-2">
                📌 Catatan Penting
              </h2>
              <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                <li>
                  <strong>Format JSON direkomendasikan</strong> karena lebih mudah diproses dan lebih akurat
                </li>
                <li>
                  <strong>Lokasi file yang benar:</strong> ZIP → connections → followers_and_following → pilih <code className="bg-gray-200 px-1 rounded">followers_1.json</code> dan <code className="bg-gray-200 px-1 rounded">following.json</code>
                </li>
                <li>
                  Jika ada file <code className="bg-gray-200 px-1 rounded">followers_2.json</code>, <code className="bg-gray-200 px-1 rounded">followers_3.json</code>, dll, Kamu bisa upload semuanya sekaligus. Sistem akan menggabungkannya otomatis
                </li>
                <li>
                  Proses download dari Instagram bisa memakan waktu 1-2 hari tergantung ukuran data Kamu
                </li>
                <li>
                  <strong>100% Privasi Terjamin:</strong> Semua data diproses di browser Kamu. Website ini tidak menyimpan atau mengirim data Kamu ke server manapun
                </li>
              </ul>
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h2 className="text-lg font-semibold text-[#111315] mb-2">
                ⚠️ Kesalahan Umum
              </h2>
              <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                <li>
                  <strong>Jangan upload file ZIP langsung</strong> - Extract dulu file ZIP-nya
                </li>
                <li>
                  <strong>Jangan upload semua file</strong> - Hanya upload <code className="bg-gray-200 px-1 rounded">followers_1.json</code> dan <code className="bg-gray-200 px-1 rounded">following.json</code>
                </li>
                <li>
                  <strong>Pastikan masuk ke folder yang benar</strong> - connections → followers_and_following
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
