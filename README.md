# 🛒 MockMart - Mock Marketplace Simulator (Frontend)

MockMart adalah aplikasi simulator frontend *multi-marketplace* modern berbasis **React** dan **Vite**. Aplikasi ini dirancang khusus untuk mensimulasikan peran pembeli (customer) di tiga raksasa e-commerce Indonesia: **Shopee**, **Tokopedia**, dan **Lazada**. 

Proyek ini dibangun sebagai bagian dari praktikum Cloud Computing untuk mensimulasikan transaksi pembelian, memicu (*trigger*) pengiriman webhook secara real-time ke sistem integrator/aggregator, serta menguji sinkronisasi stok lintas platform.

---

## 🔗 Integrasi Backend Aggregator
Aplikasi frontend ini berpasangan dengan REST API backend aggregator berikut:
👉 **Repository Backend:** [mock-api-aggregator](https://github.com/rifqipakeq/mock-api-aggregator)

---

## ✨ Fitur Utama

1. **Multi-Marketplace Adapter (Single App, Dynamic Context)**
   *   **Shopee Theme**: Identitas visual bernuansa **Oranye**, tombol adaptif, dan tata letak khas Shopee.
   *   **Tokopedia Theme**: Identitas visual bernuansa **Hijau**, branding, dan tata letak khas Tokopedia.
   *   **Lazada Theme**: Identitas visual bernuansa **Biru Tua / Ungu**, branding, dan tata letak khas Lazada.

2. **Adaptor Skema Data Dinamis**
   Menerjemahkan data produk dari API backend yang memiliki skema field berbeda secara real-time sebelum ditampilkan di kartu produk atau halaman detail:
   *   **Shopee**: Membaca field `item_name`, `model_sku`, `stock`, `price`.
   *   **Tokopedia**: Membaca field `name`, `sku`, `stock`, `price`.
   *   **Lazada**: Membaca field `title`, `seller_sku`, `quantity` (sebagai stok), `price`.

3. **Dynamic Request Payload Builder**
   Mengirimkan payload request transaksi pembuatan order (`POST /:marketplace/orders`) dengan struktur data yang menyesuaikan ekspektasi masing-masing platform backend secara otomatis:
   *   **Shopee**: `{ "model_sku": "...", "qty": ... }`
   *   **Tokopedia**: `{ "sku": "...", "quantity": ... }`
   *   **Lazada**: `{ "seller_sku": "...", "quantity": ... }`

4. **Sistem Autentikasi JWT & Otorisasi Rute**
   *   Registrasi pelanggan baru (`POST /auth/register`).
   *   Masuk akun (`POST /auth/login`) dengan penyimpanan token JWT otomatis di `localStorage`.
   *   *Auth Route Guard* (`RequireAuth`) melindungi akses ke pembuatan pesanan, riwayat belanja, dan halaman profil.

5. **Axios Global Interceptors**
   *   **Request Interceptor**: Secara otomatis menyisipkan Bearer Token JWT ke header setiap request API yang terlindungi.
   *   **Response Interceptor**: Menangkap respon `401 Unauthorized` (sesi kedaluwarsa) secara global, otomatis menghapus session lokal, dan mengarahkan kembali ke halaman login.

---

## 🛠️ Teknologi yang Digunakan

*   **React.js (v18.2.0)**: Pustaka komponen antarmuka pengguna.
*   **Vite (v5.0.0)**: Build tool super cepat dengan sistem Hot Module Replacement (HMR).
*   **Tailwind CSS (v3.3.5)**: Desain antarmuka utilitas responsif.
*   **Zustand (v4.4.7)**: Manajemen state global yang ringan untuk sesi pengguna (`authStore`) dan UI (`uiStore`).
*   **Axios (v1.6.0)**: HTTP Client berfitur lengkap untuk interaksi REST API.
*   **React Router DOM (v6.20.0)**: Sistem routing dinamis (`/:marketplace`) dan nested layouting.

---

## 📂 Struktur Folder Proyek

```text
src/
├── api/             # Setup Axios client & global interceptors
├── components/      # Komponen modular reusable
│   ├── common/      # Komponen umum (Navbar, Header, Card, Button, Input, Modal, Toast)
│   ├── orders/      # Komponen transaksi (OrderTable, OrderDetailCard, StatusBadge)
│   └── products/    # Komponen katalog (PriceTag, StockBadge, QuantityInput, ProductDetail)
├── hooks/           # Custom react hooks (useMarketplace untuk melacak rute aktif)
├── layouts/         # RootLayout pembungkus Navbar dan Toast global
├── pages/           # View halaman utama aplikasi
│   ├── auth/        # Halaman LoginPage & RegisterPage
│   ├── marketplace/ # MarketplaceLayout dinamis
│   ├── products/    # ProductListPage & ProductDetailPage
│   ├── orders/      # MyOrdersPage & OrderDetailPage
│   └── profile/     # ProfilePage diri
├── routes/          # Definisi rute Router DOM & RequireAuth Guard
├── stores/          # Zustand global stores (authStore & uiStore)
├── services/        # Abstraksi endpoint API HTTP (auth, products, orders)
├── utils/           # Fungsi pembantu (helpers) & konfigurasi platform (marketplaceConfig)
├── App.jsx          # Komponen akar pemuat session
└── main.jsx         # Titik masuk rendering DOM React
```

---

## 🚀 Panduan Instalasi & Menjalankan Proyek

### Prasyarat
Pastikan komputer Anda sudah terinstal **Node.js** (versi 16 atau lebih tinggi).

### Langkah-Langkah

1.  **Clone atau unduh repository frontend ini:**
    ```bash
    git clone <url-repository-frontend>
    cd marketplace-app
    ```

2.  **Instalasi dependensi proyek:**
    ```bash
    npm install
    ```

3.  **Konfigurasi Environment Variable:**
    Salin berkas `.env.example` menjadi `.env` baru:
    ```bash
    cp .env.example .env
    ```
    Buka file `.env` dan sesuaikan URL API base backend Anda (arahkan ke server aggregator backend Anda):
    ```env
    VITE_API_BASE_URL=http://localhost:4000/api
    ```

4.  **Menjalankan Server Pengembangan Lokal:**
    ```bash
    npm run dev
    ```
    Aplikasi akan berjalan di alamat `http://localhost:5173`. Buka di browser Anda untuk mulai mensimulasikan!

---

## 🔄 Aliran Kerja Simulasi Sinkronisasi Stok

```text
Registrasi & Login Pelanggan
           ↓
Masuk ke salah satu rute Marketplace (Shopee/Tokopedia/Lazada)
           ↓
Pilih Produk ➔ Masukkan Kuantitas ➔ Klik "Buy Now"
           ↓
Frontend merakit API Request Payload sesuai platform
           ↓
Request dikirim ke Backend Aggregator (mock-api-aggregator)
           ↓
Backend memproses transaksi ➔ Memicu Webhook ke Aggregator System
           ↓
Stok diperbarui secara realtime di seluruh sistem & Admin Dashboard!
```

---

## 📝 Kontribusi
Proyek ini dikembangkan untuk kebutuhan akademik Praktikum Cloud Computing. Kritik, saran, maupun kontribusi kode melalui *Pull Request* sangat dipersilakan!
