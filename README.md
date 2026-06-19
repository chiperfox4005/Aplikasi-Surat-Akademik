# Sistem Pengajuan Surat Akademik (SPSA)

Sistem Pengajuan Surat Akademik (SPSA) merupakan aplikasi berbasis web yang dikembangkan untuk mendigitalisasi proses pengajuan, verifikasi, persetujuan, serta pengarsipan surat akademik di lingkungan perguruan tinggi.

Platform ini dirancang untuk meningkatkan efisiensi layanan administrasi akademik melalui proses yang terstruktur, transparan, terdokumentasi, dan dapat dipantau secara real-time.

---

## Deskripsi Sistem

SPSA mendukung alur pengelolaan surat akademik dari tahap pengajuan oleh mahasiswa hingga proses persetujuan dan pengarsipan oleh pihak terkait.

Sistem menerapkan mekanisme Role Based Access Control (RBAC) sehingga setiap pengguna hanya dapat mengakses fitur sesuai kewenangannya.

---

## Fitur Utama

### Autentikasi dan Otorisasi

* Login pengguna
* Manajemen sesi
* Role Based Access Control (RBAC)

### Mahasiswa

* Mengajukan surat akademik
* Mengunggah dokumen pendukung
* Melihat status pengajuan
* Mengakses riwayat pengajuan
* Menerima notifikasi proses

### Admin Akademik

* Memvalidasi kelengkapan dokumen
* Mengelola antrean pengajuan
* Mengajukan revisi dokumen

### Program Studi / Fakultas

* Melakukan verifikasi akademik
* Menyetujui atau menolak pengajuan

### Ketua Jurusan

* Memberikan persetujuan akhir
* Menjalankan proses tanda tangan

### Pimpinan

* Monitoring layanan akademik
* Analisis data pengajuan
* Pelaporan dan evaluasi

### Arsip Digital

* Penyimpanan dokumen
* Pencarian dan filter arsip
* Pelacakan riwayat surat

---

## Alur Proses

```text
Baru
↓
Diperiksa
↓
Diverifikasi
↓
Diproses
↓
Ditandatangani
↓
Diterima
↓
Diarsipkan
```

---

## Teknologi

### Frontend

* Next.js
* TypeScript
* Tailwind CSS

### Backend

* REST API
* Next.js Server Actions

### Database

* MySQL
* Prisma ORM

### Authentication

* NextAuth

---

## Struktur Proyek

```text
src/
├── app/
│   ├── login/
│   ├── mahasiswa/
│   ├── admin/
│   ├── prodi/
│   ├── kajur/
│   ├── pimpinan/
│   └── api/
│
├── components/
├── lib/
├── services/
├── hooks/
├── types/

prisma/
public/
```

---

## Instalasi

Clone repository:

```bash
git clone https://github.com/chiperfox4005/Aplikasi-Surat-Akademik.git
```

Masuk ke folder proyek:

```bash
cd aplikasi-surat-akademik
```

Install dependency:

```bash
npm install
```

Jalankan migrasi database:

```bash
npx prisma migrate dev
```

Jalankan aplikasi:

```bash
npm run dev
```

Buka browser:

```text
http://localhost:3000
```

---

## Tujuan Pengembangan

* Mempercepat layanan administrasi akademik
* Mengurangi proses manual
* Meningkatkan transparansi status pengajuan
* Mempermudah pengarsipan dokumen
* Mendukung transformasi layanan akademik berbasis digital

---

## Lisensi

Proyek ini dikembangkan untuk kebutuhan akademik dan pengembangan sistem informasi.
