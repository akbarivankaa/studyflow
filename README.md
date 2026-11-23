# StudyFlow - Student Task Management

StudyFlow merupakan aplikasi manajemen tugas perkuliahan yang dibuat untuk membantu mahasiswa mengatur dan memantau tugas akademik. Melalui aplikasi ini, pengguna dapat menambahkan tugas, melihat daftar tugas, mengatur prioritas, memperbarui status pengerjaan, dan menghapus tugas.

Proyek ini dikembangkan sebagai kelanjutan aplikasi pribadi untuk memenuhi tugas perkuliahan **BAB 9 - NestJS Dasar + Struktur MVC**. Pada pengembangan kali ini, frontend React diintegrasikan dengan backend NestJS menggunakan REST API.

## Identitas Proyek

| Informasi | Keterangan |
|---|---|
| Nama Proyek | StudyFlow |
| Nama Mahasiswa | Muhammad Akbar Ivanka |
| NIM | 103122400069 |
| Materi | BAB 9 - NestJS Dasar + Struktur MVC |

## Teknologi yang Digunakan

**Frontend**
- React.js
- Vite
- JavaScript
- CSS

**Backend**
- NestJS
- TypeScript
- Node.js
- class-validator
- REST API

## Fitur Aplikasi

1. Menambahkan tugas perkuliahan.
2. Menampilkan seluruh daftar tugas.
3. Mengambil detail tugas berdasarkan ID.
4. Memperbarui data dan status pengerjaan tugas.
5. Menghapus tugas.
6. Memfilter tugas berdasarkan status pengerjaan.
7. Menampilkan deadline dan tingkat prioritas.
8. Menampilkan ringkasan jumlah tugas berdasarkan status.

## Struktur Backend

Backend StudyFlow menggunakan NestJS dengan resource utama `Tasks`. Kode backend dibagi menjadi beberapa bagian agar setiap komponen memiliki fungsi masing-masing.

- **Controller:** Menerima request HTTP dan meneruskannya ke Service.
- **Service:** Mengelola logika aplikasi dan operasi CRUD.
- **Entity:** Menentukan struktur data tugas.
- **DTO (Data Transfer Object):** Mengatur data yang diterima serta validasi input.
- **Module:** Mengelompokkan komponen Tasks dan mengatur dependency injection.

### Struktur Data Task

Data utama yang dikelola backend adalah `Task`, dengan tujuh field berikut:

| Field | Tipe Data | Deskripsi |
|---|---|---|
| `id` | number | Identitas unik tugas |
| `title` | string | Judul tugas |
| `course` | string | Nama mata kuliah |
| `deadline` | string | Tenggat pengerjaan |
| `priority` | TaskPriority | Tingkat prioritas |
| `status` | TaskStatus | Status pengerjaan |
| `createdAt` | string | Waktu pembuatan tugas |

Prioritas tugas terdiri dari `Rendah`, `Sedang`, dan `Tinggi`.

Status pengerjaan terdiri dari `Belum dikerjakan`, `Sedang dikerjakan`, dan `Selesai`.

## Implementasi CRUD

Pengelolaan data tugas dilakukan melalui `TasksService`. Data disimpan sementara menggunakan array di dalam memori (*in-memory storage*).

| Operasi | Method Service | Fungsi |
|---|---|---|
| Create | `create()` | Menambahkan tugas baru |
| Read All | `findAll()` | Mengambil seluruh data tugas |
| Read One | `findOne()` | Mengambil tugas berdasarkan ID |
| Update | `update()` | Memperbarui data tugas |
| Delete | `remove()` | Menghapus tugas berdasarkan ID |

## REST API Endpoints

Backend menyediakan lima endpoint untuk mengelola data tugas.

| HTTP Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/tasks` | Mengambil seluruh data tugas |
| GET | `/tasks/:id` | Mengambil tugas berdasarkan ID |
| POST | `/tasks` | Menambahkan tugas baru |
| PATCH | `/tasks/:id` | Memperbarui data tugas |
| DELETE | `/tasks/:id` | Menghapus tugas |

**Base URL:** `http://localhost:3000`

## Validasi Data dan Exception Handling

Validasi input menggunakan library `class-validator` yang diterapkan melalui `CreateTaskDto` dan `UpdateTaskDto`.

Beberapa aturan validasi yang digunakan:

- `@IsString()` untuk memastikan input berupa teks.
- `@IsNotEmpty()` untuk mencegah input kosong.
- `@MinLength()` untuk menentukan panjang minimum teks.
- `@IsDateString()` untuk memvalidasi format tanggal.
- `@IsIn()` untuk membatasi pilihan prioritas dan status.
- `@IsOptional()` untuk menentukan field yang boleh tidak diisi.

Seluruh validasi dijalankan secara global menggunakan `ValidationPipe` pada `main.ts`.

Untuk menangani kesalahan, backend menggunakan exception bawaan NestJS:

- `NotFoundException` ketika tugas yang dicari berdasarkan ID tidak ditemukan.
- `ConflictException` ketika terdapat tugas dengan judul dan mata kuliah yang sama.

## Pengujian REST API

Pengujian endpoint dilakukan menggunakan REST Client sebelum backend dihubungkan dengan frontend.

Pengujian meliputi:

1. POST untuk menambahkan tugas.
2. GET untuk mengambil seluruh data tugas.
3. GET berdasarkan ID untuk mengambil detail tugas.
4. PATCH untuk memperbarui data tugas.
5. DELETE untuk menghapus tugas.
6. Pengujian `NotFoundException` dengan respons HTTP 404.
7. Pengujian `ConflictException` dengan respons HTTP 409.
8. Pengujian validasi DTO dengan respons HTTP 400.

## Integrasi Frontend dan Backend

Frontend React terhubung dengan backend NestJS menggunakan fungsi `fetch()` untuk mengirim dan menerima data melalui REST API.

Integrasi ini digunakan pada beberapa proses pengelolaan tugas:

- Mengambil dan menampilkan data tugas dari backend.
- Menambahkan tugas melalui HTTP POST.
- Memperbarui status tugas melalui HTTP PATCH.
- Menghapus tugas melalui HTTP DELETE.

Frontend dan backend berjalan pada server yang berbeda. Konfigurasi CORS pada NestJS digunakan agar keduanya dapat saling berkomunikasi selama proses pengembangan.

## Cara Menjalankan Aplikasi

Pastikan Node.js dan npm sudah terpasang sebelum menjalankan aplikasi.

### 1. Menjalankan Backend

Buka terminal dan masuk ke folder backend:

```bash
cd studyflow-backend
```

Instal dependensi:

```bash
npm install
```

Jalankan server NestJS:

```bash
npm run start:dev
```

Backend dapat diakses melalui:

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

Jalankan aplikasi React:

```bash
npm run dev
```

Frontend dapat diakses melalui:

`http://localhost:5173`

Data tugas disimpan sementara menggunakan array di dalam memori. Oleh karena itu, data akan kembali kosong ketika server backend dihentikan atau dijalankan ulang.

## Dokumentasi dan Screenshot

Screenshot proses pengerjaan dan pengujian aplikasi disimpan pada folder [`docs/screenshots`](docs/screenshots/).

Dokumentasi tersebut mencakup proses pengembangan backend, pembuatan resource, pengujian endpoint REST API, operasi CRUD, validasi DTO, serta penanganan exception.

Seluruh screenshot tetap menggunakan nama file asli dan dapat dilihat langsung melalui folder tersebut pada repository GitHub.

## Struktur Repository

```text
StudyFlow/
│
├── StudyFlow-Frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── index.css
│   ├── package.json
│   └── package-lock.json
│
├── studyflow-backend/
│   ├── src/
│   │   ├── tasks/
│   │   │   ├── dto/
│   │   │   ├── entities/
│   │   │   ├── tasks.controller.ts
│   │   │   ├── tasks.service.ts
│   │   │   └── tasks.module.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── test/
│   ├── package.json
│   └── package-lock.json
│
├── docs/
│   └── screenshots/
│
├── .gitignore
└── README.md
```

## Repository GitHub

Source code frontend, backend, dan dokumentasi StudyFlow tersedia melalui repository berikut:

[https://github.com/akbarivankaa/studyflow](https://github.com/akbarivankaa/studyflow)

---