# 🔍 Cek Siapa yang Tidak Follow Balik

> Tool gratis untuk menganalisis followers dan following Instagram Anda dengan mudah, cepat, dan aman!

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

---

## ✨ Fitur Utama

- 🔒 **100% Privasi Terjamin** - Semua proses dilakukan di browser Anda, tidak ada data yang dikirim ke server
- 🚀 **Cepat & Efisien** - Analisis ribuan akun dalam hitungan detik
- 📊 **Analisis Lengkap** - Lihat siapa yang tidak follow balik, mutual friends, dan fans Anda
- 💾 **Export Data** - Unduh hasil analisis dalam format CSV
- 🎨 **UI Modern** - Desain yang clean, responsive, dan user-friendly
- 🆓 **Gratis Selamanya** - Tanpa biaya, tanpa login, tanpa batasan

---

## 📸 Screenshot

![Hero Section](docs/screenshot-hero.png)
![Hasil Analisis](docs/screenshot-results.png)

---

## 🚀 Cara Menggunakan

### 1️⃣ Ekspor Data Instagram

1. Buka aplikasi Instagram atau website Instagram.com
2. Masuk ke akun Anda
3. Klik ikon profil → **Settings and privacy** → **Account Center**
4. Pilih **Your information and permissions** → **Download your information**
5. Pilih **Request download** → Pilih akun Anda
6. Pilih **Some of your information** → Centang **Followers and following**
7. Pilih format **JSON** → Klik **Create files**
8. Tunggu email dari Instagram (biasanya 1-2 hari)
9. Download file ZIP dan extract

### 2️⃣ Upload & Analisis

1. Buka aplikasi ini di browser
2. Upload file `followers_1.json` dan `following.json`
3. Klik tombol **Proses**
4. Lihat hasil analisis Anda!

---

## 💻 Instalasi & Development

### Prasyarat

Pastikan Anda sudah menginstall:
- [Node.js](https://nodejs.org/) (versi 18 atau lebih baru)
- npm, yarn, pnpm, atau bun

### Clone Repository

```bash
git clone https://github.com/username/instagram-follower-analyzer.git
cd instagram-follower-analyzer
```

### Install Dependencies

```bash
npm install
# atau
yarn install
# atau
pnpm install
```

### Jalankan Development Server

```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

### Build untuk Production

```bash
npm run build
npm start
```

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) - React framework untuk production
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Font**: [Geist](https://vercel.com/font) - Modern font family dari Vercel

---

## 📁 Struktur Folder

```
├── app/                    # Next.js App Router
│   ├── page.tsx           # Halaman utama
│   ├── panduan/           # Halaman panduan
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── FileUploadCard.tsx
│   ├── StatsSummary.tsx
│   ├── ResultTabs.tsx
│   ├── ResultTable.tsx
│   └── Footer.tsx
├── lib/                   # Utilities & helpers
│   ├── parser/           # File parsers (JSON, HTML)
│   ├── analysis/         # Follower analysis logic
│   ├── utils/            # Helper functions
│   └── types/            # TypeScript types
└── public/               # Static assets
```

---

## 🎯 Roadmap

- [x] Analisis followers & following
- [x] Export ke CSV
- [x] UI/UX modern & responsive
- [x] Support format JSON & HTML
- [ ] Dark mode
- [ ] Multi-language support
- [ ] Analisis growth history
- [ ] Perbandingan antar periode

---

## 🤝 Kontribusi

Kontribusi sangat diterima! Jika Anda ingin berkontribusi:

1. Fork repository ini
2. Buat branch baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan Anda (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

---

## 📝 Lisensi

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 Dibuat Oleh

**Vicky Mosafan**

- LinkedIn: [@vickymosafan](https://www.linkedin.com/in/vickymosafan/)
- Instagram: [@viicsyy](https://www.instagram.com/viicsyy/)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - Amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) - Beautiful utility-first CSS
- [Vercel](https://vercel.com/) - Best deployment platform
- Instagram - For the data export feature

---

## 📞 Support

Jika Anda menemukan bug atau memiliki saran, silakan buat [issue](https://github.com/username/instagram-follower-analyzer/issues) di GitHub.

---

<div align="center">

**⭐ Jangan lupa beri star jika project ini membantu Anda! ⭐**

Made by [Vicky Mosafan](https://www.linkedin.com/in/vickymosafan/)

</div>
