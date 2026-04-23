# Restaurant Reservation System

Project ini adalah aplikasi reservasi restoran sederhana menggunakan Next.js (App Router).  
Flow utamanya:
- user login
- mencari rekomendasi meja
- membuat reservasi
- melihat reservasi sendiri
- join waitlist kalau meja lagi penuh

## Cara Menjalankan Project

### 1) Requirement
- Node.js (disarankan v20+)
- npm

### 2) Install dependency
```bash
npm install
```

### 3) Menjalankan mode development
```bash
npm run dev
```

Lalu buka:
`http://localhost:3000`

### 4) Build production
```bash
npm run build
```

### 5) Jalankan hasil build
```bash
npm run start
```

### 6) Cek lint
```bash
npm run lint
```

## Arsitektur

Strukturnya sekarang kurang lebih begini:

- `app/`
  - route UI (misalnya `/login`, `/reserve`, `/my-reservations`, `/waitlist`)
  - API routes di `app/api/*`
  - route group `(main)` buat halaman utama setelah login
- `components/`
  - komponen UI reusable
- `store/`
  - state auth pakai Zustand + persist (`auth-store.ts`)
- `lib/`
  - logic helper, misalnya:
    - `table-algorithm.ts` (algoritma untuk rekomendasi meja) 
    - `waitlist.ts` (proses antrian saat meja kosong)
    - `server-store.ts` (store dari JSON seed)
    - `api.ts` (wrapper fetch)
- `app/api/data/*.json`
  - data awal user, table, restaurant, reservations


## Kalau Punya Waktu Lebih, Mau Ditingkatin Ini

1. **Ganti in-memory store ke database**
   - Contoh: PostgreSQL + Prisma

2. **Auth dibikin lebih baik**
   - Password di hash, tambah session/JWT yang lebih aman, dan middleware proteksi route.

3. **Tambah validasi**
   - Pakai skema validator seperti zod dan RHF agar lebih ketat dan rapih


6. **UX improvement**
   - Loading state yang lebih halus, toast notif, dan feedback error yang lebih jelas.
s