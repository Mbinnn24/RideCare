# RideCare — Frontend 1 (Customer)

Prototype UI/UX berbasis **HTML, CSS, JavaScript, dan Bootstrap 5** untuk sisi Customer RideCare.

## Halaman yang tersedia

- Landing page
- Login
- Register
- Dashboard Customer
- Katalog mobil
- Search, filter, dan pengurutan harga
- Detail mobil
- Form booking dan estimasi total
- Konfirmasi booking
- Riwayat booking
- Detail booking
- Profile Customer
- Live tracking (ilustrasi UI)

## Struktur file

```text
ridecare_frontend1/
├── index.html
├── styles.css
├── app.js
└── README.md
```

## Cara menjalankan

### Opsi 1 — buka langsung
1. Ekstrak folder.
2. Buka `index.html` di browser.
3. Koneksi internet diperlukan untuk memuat Bootstrap dan Bootstrap Icons dari CDN.

### Opsi 2 — gunakan VS Code Live Server
1. Buka folder `ridecare_frontend1` di VS Code.
2. Pasang ekstensi **Live Server** jika belum ada.
3. Klik kanan `index.html`.
4. Pilih **Open with Live Server**.

## Navigasi prototype

Aplikasi menggunakan hash navigation, misalnya:
- `#home`
- `#login`
- `#register`
- `#dashboard`
- `#cars`
- `#car/1`
- `#booking/1`
- `#confirmation`
- `#bookings`
- `#booking-detail/RC-1024`
- `#profile`
- `#tracking`

## Data dan fitur yang masih berupa demo

- Login/register belum menggunakan backend; validasi hanya sisi browser.
- Data mobil dan beberapa riwayat booking adalah data dummy.
- Booking baru disimpan di `sessionStorage`, bukan ke server/database.
- Profile disimpan di `localStorage` browser.
- Live tracking masih berupa ilustrasi peta, belum Google Maps asli.
- Firebase Realtime Database belum dikonfigurasi.
- Harga dan ketersediaan kendaraan perlu divalidasi oleh backend.
- Jangan memakai prototype ini untuk menyimpan data pribadi sungguhan.

## Integrasi berikutnya

Setelah backend tersedia, sepakati API contract dengan anggota Backend, kemudian ganti data dummy dan handler demo dengan `fetch()` ke API Laravel. Untuk live tracking, tambahkan Google Maps JavaScript API dan Firebase Realtime Database dengan security rules yang membatasi akses lokasi per booking.

## Catatan keamanan

Jangan commit `.env`, password, private credentials, atau service-account key ke GitHub. Google Maps browser API key harus dibatasi berdasarkan domain dan API yang diizinkan. Firebase rules harus membatasi akses baca/tulis berdasarkan identitas dan booking yang sah.
