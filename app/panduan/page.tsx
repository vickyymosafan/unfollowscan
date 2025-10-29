import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function PanduanPage() {
  return (
    <div className="min-h-screen bg-[#F7F7F8]">
      <Header />

      <main className="container mx-auto px-4 py-8 sm:py-12 max-w-4xl">
        <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 border border-[#DADDE1]">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111315] mb-4 sm:mb-6">
            Cara ekspor data Instagram
          </h1>

          <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
            <p className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base">
              Ikuti langkah-langkah berikut untuk mengekspor data followers dan following dari Instagram:
            </p>

            <div className="space-y-6 sm:space-y-8">
              {/* Step 1 */}
              <div className="space-y-3">
                <p className="text-gray-700 font-semibold text-sm sm:text-base">1. Buka aplikasi Instagram atau website Instagram.com dan masuk ke akun Kamu</p>
              </div>

              {/* Step 2 */}
              <div className="space-y-3">
                <p className="text-gray-700 font-semibold text-sm sm:text-base">2. Klik ikon profil, lalu klik menu (☰) di pojok kanan atas, pilih "Pengaturan dan privasi" atau "Settings and privacy"</p>
                <div className="flex justify-center">
                  <div className="border border-gray-200 rounded-lg overflow-hidden max-w-xs sm:max-w-sm lg:max-w-md">
                    <Image
                      src="/[2] Setting and Privacy.webp"
                      alt="Settings and Privacy"
                      width={400}
                      height={800}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="space-y-3">
                <p className="text-gray-700 font-semibold">3. Pilih "Pusat Akun" atau "See More in Account Center"</p>
                <div className="flex justify-center">
                  <div className="border border-gray-200 rounded-lg overflow-hidden max-w-xs sm:max-w-sm">
                    <Image
                      src="/[1] Account Center.webp"
                      alt="Account Center"
                      width={400}
                      height={800}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="space-y-3">
                <p className="text-gray-700 font-semibold">4. Pilih "Informasi dan izin Kamu" atau "Your information and permissions"</p>
                <div className="flex justify-center">
                  <div className="border border-gray-200 rounded-lg overflow-hidden max-w-xs sm:max-w-sm">
                    <Image
                      src="/[3] Your Information And Permissions.webp"
                      alt="Your Information And Permissions"
                      width={400}
                      height={800}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>

              {/* Step 5 */}
              <div className="space-y-3">
                <p className="text-gray-700 font-semibold">5. Klik "Unduh informasi Kamu" atau "Export your information"</p>
                <div className="flex justify-center">
                  <div className="border border-gray-200 rounded-lg overflow-hidden max-w-xs sm:max-w-sm">
                    <Image
                      src="/[4] Export your information.webp"
                      alt="Export your information"
                      width={400}
                      height={800}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>

              {/* Step 6 */}
              <div className="space-y-3">
                <p className="text-gray-700 font-semibold">6. Klik "Create Export" atau "Buat ekspor", lalu pilih akun Instagram yang ingin di-export</p>
                <div className="flex justify-center">
                  <div className="border border-gray-200 rounded-lg overflow-hidden max-w-xs sm:max-w-sm">
                    <Image
                      src="/[5] Choose a Profile.webp"
                      alt="Choose a Profile"
                      width={400}
                      height={800}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>

              {/* Step 7 */}
              <div className="space-y-3">
                <p className="text-gray-700 font-semibold">7. Pilih "Export to device" atau "Ekspor ke perangkat"</p>
                <div className="flex justify-center">
                  <div className="border border-gray-200 rounded-lg overflow-hidden max-w-xs sm:max-w-sm">
                    <Image
                      src="/[6] Choose where to export.webp"
                      alt="Choose where to export"
                      width={400}
                      height={800}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>

              {/* Step 7.1 */}
              <div className="space-y-3">
                <p className="text-gray-700 font-semibold">7.1. Pada halaman "Confirm your export", pilih "Customize Information" atau "Sesuaikan informasi"</p>
                <div className="flex justify-center">
                  <div className="border border-gray-200 rounded-lg overflow-hidden max-w-xs sm:max-w-sm">
                    <Image
                      src="/[7] Confirm your export.webp"
                      alt="Confirm your export"
                      width={400}
                      height={800}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>

              {/* Step 7.1.2 */}
              <div className="space-y-3">
                <p className="text-gray-700 font-semibold">7.1.2. Klik "Clear All" atau hapus semua pilihan, lalu hanya centang <strong>"Followers and Following"</strong> pada bagian Connections, setelah itu klik "Save"</p>
                <div className="flex justify-center">
                  <div className="border border-gray-200 rounded-lg overflow-hidden max-w-xs sm:max-w-sm">
                    <Image
                      src="/[8] Choose specific info to export.webp"
                      alt="Choose specific info to export"
                      width={400}
                      height={800}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                <div className="flex justify-center mt-3">
                  <div className="border border-gray-200 rounded-lg overflow-hidden max-w-xs sm:max-w-sm">
                    <Image
                      src="/[9] Connections.webp"
                      alt="Connections - Followers and Following"
                      width={400}
                      height={800}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>

              {/* Step 8 */}
              <div className="space-y-3">
                <p className="text-gray-700 font-semibold">8. Pilih "Date Range", lalu pilih <strong>"All Time"</strong> atau "Sepanjang waktu" untuk mendapatkan data lengkap, kemudian klik "Save"</p>
                <div className="flex justify-center">
                  <div className="border border-gray-200 rounded-lg overflow-hidden max-w-xs sm:max-w-sm">
                    <Image
                      src="/[10] Date Range All Time.webp"
                      alt="Date Range All Time"
                      width={400}
                      height={800}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>

              {/* Step 9 */}
              <div className="space-y-3">
                <p className="text-gray-700 font-semibold">9. Pilih "Format", lalu ubah ke format <strong>"JSON"</strong> (direkomendasikan), kemudian klik "Save"</p>
                <div className="flex justify-center">
                  <div className="border border-gray-200 rounded-lg overflow-hidden max-w-xs sm:max-w-sm">
                    <Image
                      src="/[11] Format JSON.webp"
                      alt="Format JSON"
                      width={400}
                      height={800}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>

              {/* Step 10 */}
              <div className="space-y-3">
                <p className="text-gray-700 font-semibold">10. Setelah semua pengaturan selesai, klik "Start Export" atau "Mulai ekspor"</p>
              </div>

              {/* Step 11 */}
              <div className="space-y-3">
                <p className="text-gray-700 font-semibold">11. Tunggu sekitar 30 menit hingga beberapa jam (tergantung ukuran data). Kamu akan menerima notifikasi dari Instagram melalui email</p>
                <div className="flex justify-center">
                  <div className="border border-gray-200 rounded-lg overflow-hidden max-w-xs sm:max-w-sm">
                    <Image
                      src="/[12] Notifikasi Sukses.webp"
                      alt="Notifikasi Sukses"
                      width={400}
                      height={800}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>

              {/* Step 12 */}
              <div className="space-y-3">
                <p className="text-gray-700 font-semibold">12. Jika sudah ada notifikasi dan ingin download informasi yang sudah di-export, kembali ke Pusat Akun → Your information and permissions → Export your information (seperti langkah 3-5)</p>
              </div>

              {/* Step 13 */}
              <div className="space-y-3">
                <p className="text-gray-700 font-semibold">13. Pada halaman "Export your information", jika sudah ada "Download" pada bagian "Current Activity", klik tombol "Download"</p>
                <div className="flex justify-center">
                  <div className="border border-gray-200 rounded-lg overflow-hidden max-w-xs sm:max-w-sm">
                    <Image
                      src="/[13] Download Information.webp"
                      alt="Download Information"
                      width={400}
                      height={800}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>

              {/* Step 14 */}
              <div className="space-y-3">
                <p className="text-gray-700 font-semibold text-sm sm:text-base">14. <strong>Extract file ZIP</strong> yang sudah didownload:</p>
                <ul className="ml-4 sm:ml-6 mt-2 space-y-1 list-disc text-gray-700 text-sm sm:text-base">
                  <li>Klik kanan file ZIP → Extract All atau Extract Here</li>
                  <li>Buka folder hasil extract</li>
                  <li>Cari dan buka folder <strong>"connections"</strong></li>
                  <li>Di dalam folder connections, buka folder <strong>"followers_and_following"</strong></li>
                </ul>
              </div>

              {/* Step 15 */}
              <div className="space-y-3">
                <p className="text-gray-700 font-semibold text-sm sm:text-base">15. Di dalam folder <strong>followers_and_following</strong>, Kamu akan melihat beberapa file. Pilih dan upload <strong>2 file ini saja</strong>:</p>
                <ul className="ml-4 sm:ml-6 mt-2 space-y-1 list-disc text-gray-700 text-sm sm:text-base">
                  <li><strong>followers_1.json</strong> (file data followers Kamu)</li>
                  <li><strong>following.json</strong> (file data following Kamu)</li>
                </ul>
              </div>

              {/* Step 16 */}
              <div className="space-y-3">
                <p className="text-gray-700 font-semibold text-sm sm:text-base">16. Upload kedua file tersebut ke website ini dan klik tombol "Proses" untuk melihat hasilnya</p>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h2 className="text-base sm:text-lg font-semibold text-[#111315] mb-2">
                📌 Catatan Penting
              </h2>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-700 list-disc list-inside">
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

            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h2 className="text-base sm:text-lg font-semibold text-[#111315] mb-2">
                ⚠️ Kesalahan Umum
              </h2>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-700 list-disc list-inside">
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

            <div className="mt-6 sm:mt-8 text-center">
              <a
                href="/"
                className="inline-block bg-[#111315] text-[#F7F7F8] rounded-lg px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#111315] focus:ring-offset-2 transition-opacity"
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
