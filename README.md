# StudyFlow - Student Task Management

StudyFlow merupakan aplikasi manajemen tugas perkuliahan yang dikembangkan untuk membantu mahasiswa dalam mengelola, memantau, dan menyelesaikan tugas akademik secara lebih terorganisir. Aplikasi ini memungkinkan pengguna menambahkan tugas, melihat daftar tugas, memperbarui status pengerjaan, serta menghapus tugas.

Proyek ini dikembangkan sebagai bagian dari tugas perkuliahan **BAB 9 - NestJS Dasar + Struktur MVC** dengan mengintegrasikan frontend React dan backend NestJS melalui REST API.

## Identitas Proyek

| Informasi | Keterangan |
|---|---|
| Nama Proyek | StudyFlow |
| Nama Mahasiswa | Muhammad Akbar Ivanka |
| NIM | 103122400069 |
| Mata Kuliah | Pemrograman Web |
| Topik | NestJS Dasar + Struktur MVC |

## Teknologi yang Digunakan

### Frontend
- React.js
- Vite
- JavaScript
- CSS

### Backend
- NestJS
- TypeScript
- Node.js
- class-validator
- REST API

## Fitur Aplikasi

1. Menambahkan tugas perkuliahan.
2. Menampilkan seluruh daftar tugas.
3. Melihat informasi tugas berdasarkan ID.
4. Mengubah status pengerjaan tugas.
5. Menghapus tugas.
6. Memfilter tugas berdasarkan status pengerjaan.
7. Menampilkan informasi deadline dan tingkat prioritas tugas.

## Struktur Backend

Backend dikembangkan menggunakan NestJS dengan resource utama `Tasks` dan menerapkan pemisahan tanggung jawab melalui Controller, Service, DTO, dan Entity.

- **Entity:** Merepresentasikan struktur data tugas.
- **Controller:** Mengelola endpoint HTTP dan menerima request dari client.
- **Service:** Menangani logika bisnis dan operasi CRUD.
- **DTO:** Mengatur struktur input serta validasi data menggunakan class-validator.

Data tugas disimpan sementara menggunakan array di dalam memori (*in-memory storage*), sesuai dengan ketentuan praktikum.

## Struktur Data Task

| Field | Tipe Data | Deskripsi |
|---|---|---|
| id | number | Identitas unik tugas |
| title | string | Judul tugas |
| course | string | Nama mata kuliah |
| deadline | string | Tenggat pengerjaan |
| priority | TaskPriority | Tingkat prioritas |
| status | TaskStatus | Status pengerjaan |
| createdAt | string | Waktu pembuatan tugas |

## REST API Endpoints

Backend menyediakan endpoint berikut:

| HTTP Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/tasks` | Mengambil seluruh data tugas |
| GET | `/tasks/:id` | Mengambil tugas berdasarkan ID |
| POST | `/tasks` | Menambahkan tugas baru |
| PATCH | `/tasks/:id` | Memperbarui data tugas |
| DELETE | `/tasks/:id` | Menghapus tugas |

Base URL backend: `http://localhost:3000`

## Validasi dan Penanganan Error

Validasi input menggunakan `class-validator` dengan beberapa aturan, antara lain:

- `@IsString()` untuk memastikan input berupa teks.
- `@IsNotEmpty()` untuk mencegah input kosong.
- `@MinLength()` untuk menentukan panjang minimum teks.
- `@IsDateString()` untuk memvalidasi format tanggal.
- `@IsIn()` untuk membatasi pilihan prioritas dan status.

Validasi diterapkan secara global menggunakan `ValidationPipe`.

Penanganan error menggunakan exception bawaan NestJS, yaitu:

- `NotFoundException` untuk data tugas yang tidak ditemukan.
- `ConflictException` untuk mencegah duplikasi tugas.

## Cara Menjalankan Aplikasi

### 1. Menjalankan Backend

Masuk ke folder backend:

```bash
cd studyflow-backend
```

Instal dependensi:

```bash
npm install
```

Jalankan server:

```bash
npm run start:dev
```

Backend berjalan pada:

`http://localhost:3000`

### 2. Menjalankan Frontend

Buka terminal baru dan masuk ke folder frontend:

```bash
cd StudyFlow-Frontend
```

Instal dependensi:

```bash
npm install
```

Jalankan aplikasi:

```bash
npm run dev
```

Frontend dapat diakses melalui:

`http://localhost:5173`

**Catatan:** Backend menggunakan penyimpanan sementara di memori. Data tugas akan kembali kosong ketika server backend dihentikan atau dijalankan ulang.

## Dokumentasi dan Screenshot

Seluruh bukti pengerjaan dan pengujian aplikasi disimpan pada folder `docs/screenshots`.

Screenshot yang dilampirkan meliputi:

1. Pengujian POST - Menambahkan tugas.
2. Pengujian GET - Mengambil seluruh tugas.
3. Pengujian GET berdasarkan ID.
4. Pengujian PATCH - Memperbarui tugas.
5. Pengujian DELETE - Menghapus tugas.
6. Pengujian NotFoundException (404).
7. Pengujian ConflictException (409).
8. Pengujian validasi DTO (400).
9. Integrasi frontend dan backend.

## Repository

Source code frontend, backend, serta dokumentasi proyek tersedia dalam repository GitHub StudyFlow.
