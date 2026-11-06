const cars = [
  {id:1,name:"Toyota Avanza",type:"MPV",transmission:"Manual",seats:7,price:450000,year:2023,color:"",badge:"Paling diminati",desc:"Pilihan keluarga yang nyaman untuk perjalanan dalam dan luar kota."},
  {id:2,name:"Honda Brio",type:"City Car",transmission:"Automatic",seats:5,price:350000,year:2024,color:"orange",badge:"Irit & praktis",desc:"Mobil compact yang lincah untuk aktivitas harian dan perjalanan di perkotaan."},
  {id:3,name:"Mitsubishi Xpander",type:"MPV",transmission:"Automatic",seats:7,price:550000,year:2023,color:"green",badge:"Nyaman",desc:"Kabin luas dan nyaman untuk liburan bersama keluarga."},
  {id:4,name:"Toyota Innova Zenix",type:"Premium MPV",transmission:"Automatic",seats:7,price:850000,year:2024,color:"purple",badge:"Premium",desc:"Pilihan premium dengan kabin lega untuk perjalanan lebih berkelas."},
  {id:5,name:"Suzuki XL7",type:"SUV",transmission:"Automatic",seats:7,price:500000,year:2023,color:"green",badge:"Serbaguna",desc:"SUV keluarga yang siap menemani perjalanan akhir pekan."},
  {id:6,name:"Honda HR-V",type:"SUV",transmission:"Automatic",seats:5,price:700000,year:2024,color:"orange",badge:"Favorit",desc:"Desain modern dengan kenyamanan untuk kebutuhan perjalananmu."}
];

const demoBookings = [
  {id:"RC-1024",car:"Toyota Avanza",dates:"18 Okt 2026 – 20 Okt 2026",price:900000,status:"Menunggu konfirmasi",cls:"warning"},
  {id:"RC-0981",car:"Honda Brio",dates:"02 Okt 2026 – 03 Okt 2026",price:350000,status:"Selesai",cls:"success"}
];

const state = { search:"", type:"Semua tipe", sort:"recommended", selectedCar:1, selectedBooking:"RC-1024" };
const rupiah = n => new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(n);
const iconCar = '<i class="bi bi-car-front-fill" aria-hidden="true"></i>';
const view = document.getElementById("view");

function toast(message) {
  document.getElementById("toastMessage").textContent = message;
  bootstrap.Toast.getOrCreateInstance(document.getElementById("appToast")).show();
}
function carVisual(car, extra="") { return `<div class="car-visual ${car.color} ${extra}">${iconCar}<span class="visually-hidden">${car.name}</span></div>`; }
function carCard(car) {
  return `<div class="col-sm-6 col-xl-4"><article class="car-card">
    ${carVisual(car)}
    <div class="car-body">
      <div class="d-flex justify-content-between align-items-center gap-2 mb-2"><span class="pill">${car.badge}</span><span class="small muted"><i class="bi bi-star-fill text-warning me-1"></i>4.9</span></div>
      <h3 class="car-name mb-2">${car.name}</h3>
      <div class="car-meta mb-3"><span><i class="bi bi-people"></i>${car.seats} kursi</span><span><i class="bi bi-gear"></i>${car.transmission}</span><span><i class="bi bi-calendar3"></i>${car.year}</span></div>
      <div class="d-flex align-items-center justify-content-between border-top pt-3"><div class="price">${rupiah(car.price)} <small>/ hari</small></div><a href="#car/${car.id}" class="btn btn-blue btn-sm">Detail <i class="bi bi-arrow-up-right ms-1"></i></a></div>
    </div></article></div>`;
}
function pageHead(eyebrow,title,desc) {
  return `<section class="page-head"><div class="container"><div class="mini-label mb-2">${eyebrow}</div><h1 class="section-title mb-2">${title}</h1><p class="section-subtitle mb-0">${desc}</p></div></section>`;
}
function homePage() {
  return `<section class="hero"><div class="container hero-inner"><div class="row align-items-center gy-4">
    <div class="col-lg-7"><div class="eyebrow mb-3">Perjalanan jadi lebih mudah</div><h1>Temukan mobil yang tepat untuk <span style="color:#ff9a83">setiap perjalanan.</span></h1><p class="mt-4 mb-4">Pilih mobil favoritmu, atur jadwal perjalanan, dan nikmati pengalaman rental yang praktis bersama RideCare.</p><div class="d-flex flex-wrap gap-3"><a href="#cars" class="btn btn-coral">Cari Mobil <i class="bi bi-arrow-right ms-2"></i></a><a href="#register" class="btn btn-outline-light">Buat Akun</a></div><div class="d-flex gap-4 mt-4 small text-white-50"><span><i class="bi bi-check-circle-fill text-info me-2"></i>Proses praktis</span><span><i class="bi bi-shield-check text-info me-2"></i>Informasi transparan</span></div></div>
    <div class="col-lg-5"><div class="hero-art"><div class="hero-orbit"></div><div class="hero-car">${iconCar}</div><div class="position-absolute bottom-0 start-0 bg-white text-dark rounded-4 p-3 shadow-sm"><div class="d-flex align-items-center gap-2"><span class="feature-icon" style="width:40px;height:40px"><i class="bi bi-geo-alt"></i></span><div><strong class="d-block small">Live Tracking</strong><span class="muted small">Pantau perjalananmu</span></div></div></div></div></div>
  </div></div></section>
  <div class="container"><div class="search-panel"><form id="homeSearch" class="row align-items-end g-3"><div class="col-md-5"><label class="form-label" for="homeKeyword">Mobil yang kamu cari</label><input class="form-control" id="homeKeyword" placeholder="Contoh: Toyota Avanza"></div><div class="col-md-4"><label class="form-label" for="homeType">Tipe mobil</label><select class="form-select" id="homeType"><option>Semua tipe</option><option>MPV</option><option>City Car</option><option>SUV</option><option>Premium MPV</option></select></div><div class="col-md-3"><button class="btn btn-blue w-100" type="submit"><i class="bi bi-search me-2"></i>Cari Mobil</button></div></form></div></div>
  <section class="section-pad"><div class="container"><div class="d-flex justify-content-between align-items-end flex-wrap gap-3 mb-4"><div><div class="mini-label mb-2">Pilihan untukmu</div><h2 class="section-title mb-2">Mobil pilihan pelanggan</h2><p class="section-subtitle mb-0">Temukan kendaraan sesuai kebutuhan dan rencana perjalananmu.</p></div><a href="#cars" class="btn btn-outline-navy">Lihat semua mobil <i class="bi bi-arrow-right ms-2"></i></a></div><div class="row g-4">${cars.slice(0,3).map(carCard).join("")}</div></div></section>
  <section class="section-pad section-soft"><div class="container"><div class="text-center mb-5"><div class="mini-label mb-2">Kenapa RideCare?</div><h2 class="section-title">Rental mobil tanpa ribet</h2><p class="section-subtitle mx-auto">Semua yang kamu butuhkan untuk merencanakan perjalanan dalam satu tempat.</p></div><div class="row g-4"><div class="col-md-4"><div class="feature-card"><div class="feature-icon mb-3"><i class="bi bi-car-front"></i></div><h3 class="h5 fw-bold">Pilihan beragam</h3><p>Temukan mobil untuk perjalanan sendiri, bersama teman, atau keluarga.</p></div></div><div class="col-md-4"><div class="feature-card"><div class="feature-icon mb-3"><i class="bi bi-calendar-check"></i></div><h3 class="h5 fw-bold">Booking praktis</h3><p>Lihat detail kendaraan dan kelola pesananmu melalui halaman customer.</p></div></div><div class="col-md-4"><div class="feature-card"><div class="feature-icon mb-3"><i class="bi bi-geo-alt"></i></div><h3 class="h5 fw-bold">Live tracking</h3><p>Pantau lokasi kendaraan saat fitur tracking aktif untuk booking-mu.</p></div></div></div></div></section>
  <section class="section-pad"><div class="container"><div class="rounded-4 p-4 p-md-5 text-white" style="background:linear-gradient(120deg,#17264b,#315ee7)"><div class="row align-items-center gy-3"><div class="col-md-8"><h2 class="section-title text-white mb-2">Siap memulai perjalanan?</h2><p class="mb-0 text-white-50">Cari kendaraan yang sesuai dan rencanakan perjalananmu hari ini.</p></div><div class="col-md-4 text-md-end"><a href="#cars" class="btn btn-coral">Jelajahi mobil <i class="bi bi-arrow-right ms-2"></i></a></div></div></div></div></section>`;
}
function carsPage() {
  const filtered = cars.filter(c => (state.type==="Semua tipe"||c.type===state.type) && c.name.toLowerCase().includes(state.search.toLowerCase()));
  if(state.sort==="low") filtered.sort((a,b)=>a.price-b.price);
  if(state.sort==="high") filtered.sort((a,b)=>b.price-a.price);
  return `${pageHead("Katalog kendaraan","Temukan mobil pilihanmu","Gunakan pencarian dan filter untuk menemukan kendaraan yang sesuai kebutuhan.")}
  <section class="section-pad section-soft"><div class="container"><div class="panel-card mb-4"><form id="carFilters" class="row g-3 align-items-end"><div class="col-lg-5"><label class="form-label" for="carSearch">Cari nama mobil</label><div class="input-group"><span class="input-group-text bg-white"><i class="bi bi-search"></i></span><input class="form-control" id="carSearch" value="${state.search}" placeholder="Cari mobil..."></div></div><div class="col-lg-3"><label class="form-label" for="carType">Tipe mobil</label><select class="form-select" id="carType">${["Semua tipe","MPV","City Car","SUV","Premium MPV"].map(t=>`<option ${state.type===t?"selected":""}>${t}</option>`).join("")}</select></div><div class="col-lg-3"><label class="form-label" for="carSort">Urutkan harga</label><select class="form-select" id="carSort"><option value="recommended" ${state.sort==="recommended"?"selected":""}>Rekomendasi</option><option value="low" ${state.sort==="low"?"selected":""}>Termurah</option><option value="high" ${state.sort==="high"?"selected":""}>Termahal</option></select></div><div class="col-lg-1"><button class="btn btn-blue w-100" type="submit" aria-label="Terapkan filter"><i class="bi bi-funnel"></i></button></div></form></div><div class="d-flex justify-content-between align-items-center mb-3"><span class="muted small">${filtered.length} mobil ditemukan</span><span class="muted small">Harga ditampilkan per hari</span></div><div class="row g-4">${filtered.length?filtered.map(carCard).join(""):`<div class="col-12"><div class="panel-card empty-state"><i class="bi bi-search d-block mb-3"></i><h3 class="h5 fw-bold text-dark">Mobil tidak ditemukan</h3><p>Coba kata kunci atau tipe mobil yang berbeda.</p><button class="btn btn-outline-navy" onclick="resetFilters()">Reset filter</button></div></div>`}</div></div></section>`;
}
function authPage(register=false) {
  return `<section class="auth-wrap"><div class="container"><div class="auth-card"><div class="auth-icon mb-4"><i class="bi bi-${register?"person-plus":"person-lock"}"></i></div><div class="mini-label mb-2">${register?"Mulai bersama RideCare":"Selamat datang kembali"}</div><h1 class="h2 fw-bold mb-2">${register?"Buat akun customer":"Masuk ke akunmu"}</h1><p class="muted mb-4">${register?"Daftar untuk mulai mencari mobil dan mengelola booking.":"Masuk untuk melihat pesanan dan melanjutkan perjalananmu."}</p><form id="${register?"registerForm":"loginForm"}" class="vstack gap-3">${register?`<div><label class="form-label" for="fullName">Nama lengkap</label><input class="form-control" id="fullName" required placeholder="Nama sesuai identitas"></div>`:""}<div><label class="form-label" for="email">Email</label><input type="email" class="form-control" id="email" required placeholder="nama@email.com"></div>${register?`<div><label class="form-label" for="phone">Nomor telepon</label><input type="tel" class="form-control" id="phone" required placeholder="08xxxxxxxxxx"></div>`:""}<div><label class="form-label" for="password">Password</label><input type="password" class="form-control" id="password" required minlength="6" placeholder="Minimal 6 karakter"></div>${register?`<div><label class="form-label" for="passwordConfirm">Konfirmasi password</label><input type="password" class="form-control" id="passwordConfirm" required minlength="6" placeholder="Ulangi password"></div>`:`<div class="d-flex justify-content-between small"><label class="d-flex gap-2 align-items-center"><input type="checkbox" class="form-check-input mt-0"> Ingat saya</label><a href="#" onclick="event.preventDefault();toast('Hubungkan fitur ini ke backend untuk reset password.')" class="text-primary">Lupa password?</a></div>`}<button class="btn btn-blue w-100 mt-2" type="submit">${register?"Buat Akun":"Masuk"} <i class="bi bi-arrow-right ms-2"></i></button><p class="text-center muted small mb-0 mt-2">${register?"Sudah punya akun?":"Belum punya akun?"} <a class="fw-bold" href="#${register?"login":"register"}">${register?"Masuk":"Daftar sekarang"}</a></p></form><div class="alert alert-info small mt-4 mb-0"><i class="bi bi-info-circle me-1"></i> Prototype UI: autentikasi belum terhubung ke backend.</div></div></div></section>`;
}
function dashboardPage() {
  return `${pageHead("Area customer","Halo, selamat datang!","Kelola booking dan temukan kendaraan untuk perjalanan berikutnya.")}
  <section class="section-pad section-soft"><div class="container"><div class="row g-3 mb-4"><div class="col-sm-6 col-xl-3"><div class="stat-card"><div class="d-flex justify-content-between"><div><div class="stat-label">Total booking</div><div class="stat-value">02</div></div><span class="stat-icon"><i class="bi bi-receipt"></i></span></div></div></div><div class="col-sm-6 col-xl-3"><div class="stat-card"><div class="d-flex justify-content-between"><div><div class="stat-label">Menunggu konfirmasi</div><div class="stat-value">01</div></div><span class="stat-icon"><i class="bi bi-clock-history"></i></span></div></div></div><div class="col-sm-6 col-xl-3"><div class="stat-card"><div class="d-flex justify-content-between"><div><div class="stat-label">Booking selesai</div><div class="stat-value">01</div></div><span class="stat-icon"><i class="bi bi-check-circle"></i></span></div></div></div><div class="col-sm-6 col-xl-3"><div class="stat-card"><div class="d-flex justify-content-between"><div><div class="stat-label">Status akun</div><div class="stat-value fs-4 mt-2">Aktif</div></div><span class="stat-icon"><i class="bi bi-person-check"></i></span></div></div></div></div>
  <div class="row g-4"><div class="col-lg-8"><div class="panel-card"><div class="d-flex justify-content-between align-items-center mb-3"><div><h2 class="h5 fw-bold mb-1">Booking terbaru</h2><p class="muted small mb-0">Ringkasan pesananmu</p></div><a href="#bookings" class="small fw-bold">Lihat semua</a></div>${demoBookings.map(b=>`<div class="d-flex flex-wrap justify-content-between align-items-center gap-3 py-3 border-top"><div><div class="fw-bold">${b.car}</div><div class="muted small mt-1">${b.id} · ${b.dates}</div></div><div class="text-md-end"><span class="pill pill-${b.cls}">${b.status}</span><div class="fw-bold mt-2">${rupiah(b.price)}</div></div></div>`).join("")}</div></div><div class="col-lg-4"><div class="panel-card h-100"><div class="feature-icon mb-3"><i class="bi bi-compass"></i></div><h2 class="h5 fw-bold">Rencanakan perjalanan</h2><p class="muted small lh-lg">Pilih mobil yang sesuai dengan kebutuhan perjalananmu.</p><a href="#cars" class="btn btn-blue w-100">Cari mobil</a><hr class="my-4"><div class="feature-icon mb-3"><i class="bi bi-geo-alt"></i></div><h3 class="h6 fw-bold">Pantau kendaraan</h3><p class="muted small lh-lg">Buka live tracking ketika booking memenuhi syarat dan driver mengaktifkan tracking.</p><a href="#tracking" class="btn btn-outline-navy w-100">Buka live tracking</a></div></div></div></div></section>`;
}
function carDetailPage(id) {
  const car=cars.find(c=>c.id===Number(id));
  if(!car) return notFoundPage();
  state.selectedCar=car.id;
  return `${pageHead("Detail kendaraan",car.name,"Lihat informasi kendaraan sebelum melanjutkan booking.")}
  <section class="section-pad"><div class="container"><div class="row g-4"><div class="col-lg-7"><div class="detail-visual ${car.color}">${iconCar}</div><div class="row g-3 mt-1"><div class="col-6"><div class="spec-item"><small><i class="bi bi-people me-2"></i>Kapasitas</small><strong>${car.seats} penumpang</strong></div></div><div class="col-6"><div class="spec-item"><small><i class="bi bi-gear me-2"></i>Transmisi</small><strong>${car.transmission}</strong></div></div><div class="col-6"><div class="spec-item"><small><i class="bi bi-calendar3 me-2"></i>Tahun</small><strong>${car.year}</strong></div></div><div class="col-6"><div class="spec-item"><small><i class="bi bi-tag me-2"></i>Tipe</small><strong>${car.type}</strong></div></div></div></div><div class="col-lg-5"><div class="panel-card"><span class="pill mb-3">${car.badge}</span><h2 class="h3 fw-bold">${car.name}</h2><div class="d-flex align-items-center gap-2 small muted mb-4"><i class="bi bi-star-fill text-warning"></i>4.9 <span>·</span> Ulasan contoh</div><p class="muted lh-lg">${car.desc}</p><hr><div class="d-flex justify-content-between align-items-end mb-4"><div><div class="muted small">Harga sewa</div><div class="price fs-3">${rupiah(car.price)} <small>/ hari</small></div></div><span class="pill pill-success"><i class="bi bi-check-circle"></i>Tersedia*</span></div><a href="#booking/${car.id}" class="btn btn-blue w-100 mb-2">Booking mobil ini <i class="bi bi-arrow-right ms-2"></i></a><a href="#cars" class="btn btn-outline-navy w-100">Kembali ke katalog</a><p class="muted small mt-3 mb-0">*Status ketersediaan pada prototype menggunakan data contoh dan perlu divalidasi melalui backend.</p></div></div></div></section>`;
}
function bookingPage(id) {
  const car=cars.find(c=>c.id===Number(id))||cars.find(c=>c.id===state.selectedCar)||cars[0];
  return `${pageHead("Pemesanan","Booking ${car.name}","Lengkapi detail sewa untuk melihat ringkasan pemesanan.")}
  <section class="section-pad section-soft"><div class="container"><form id="bookingForm" data-car="${car.id}"><div class="row g-4"><div class="col-lg-7"><div class="panel-card"><h2 class="h5 fw-bold mb-4">Detail perjalanan</h2><div class="row g-3"><div class="col-md-6"><label class="form-label" for="startDate">Tanggal mulai</label><input class="form-control" type="date" id="startDate" required></div><div class="col-md-6"><label class="form-label" for="endDate">Tanggal selesai</label><input class="form-control" type="date" id="endDate" required></div><div class="col-12"><label class="form-label" for="pickup">Lokasi penjemputan</label><input class="form-control" id="pickup" required placeholder="Masukkan lokasi penjemputan"></div><div class="col-12"><label class="form-label" for="notes">Catatan (opsional)</label><textarea class="form-control" id="notes" rows="3" placeholder="Tambahkan catatan untuk pesananmu"></textarea></div></div><div class="alert alert-warning small mt-4 mb-0"><i class="bi bi-info-circle me-1"></i>Jadwal dan ketersediaan akhir harus dikonfirmasi oleh sistem/backend.</div></div></div><div class="col-lg-5"><div class="panel-card"><h2 class="h5 fw-bold mb-3">Ringkasan booking</h2><div class="d-flex gap-3 align-items-center mb-3">${carVisual(car,"rounded-3").replace('class="car-visual','class="car-visual').replace('style=""','')}<div><strong>${car.name}</strong><div class="muted small mt-1">${car.type} · ${car.transmission}</div></div></div><div class="d-flex justify-content-between py-2 border-top"><span class="muted">Harga per hari</span><strong>${rupiah(car.price)}</strong></div><div class="d-flex justify-content-between py-2"><span class="muted">Durasi</span><strong id="duration">Pilih tanggal</strong></div><div class="d-flex justify-content-between py-3 border-top"><span class="fw-bold">Estimasi total</span><strong class="price" id="totalPrice">${rupiah(0)}</strong></div><button class="btn btn-blue w-100" type="submit">Lanjutkan booking <i class="bi bi-arrow-right ms-2"></i></button><p class="muted small mt-3 mb-0">Belum ada pembayaran yang diproses pada prototype ini.</p></div></div></div></form></div></section>`;
}
function confirmationPage() {
  const booking=JSON.parse(sessionStorage.getItem("ridecareLatestBooking")||"null");
  if(!booking) return `${pageHead("Konfirmasi","Belum ada booking terbaru","Buat booking terlebih dahulu untuk melihat konfirmasinya.")}<section class="section-pad"><div class="container text-center"><div class="auth-icon mx-auto mb-3"><i class="bi bi-receipt"></i></div><a href="#cars" class="btn btn-blue">Cari mobil</a></div></section>`;
  return `${pageHead("Konfirmasi booking","Booking berhasil dibuat","Berikut ringkasan booking demo yang baru saja kamu buat.")}
  <section class="section-pad section-soft"><div class="container"><div class="panel-card mx-auto" style="max-width:720px"><div class="text-center py-3"><div class="auth-icon mx-auto mb-3" style="background:#e8f8f1;color:#159a73"><i class="bi bi-check-lg"></i></div><h2 class="h3 fw-bold">Permintaan booking tersimpan</h2><p class="muted">Ini konfirmasi lokal untuk prototype. Belum tersimpan ke server.</p><span class="pill pill-warning">Menunggu konfirmasi</span></div><hr><div class="row g-3"><div class="col-sm-6"><div class="muted small">Nomor booking</div><strong>${booking.id}</strong></div><div class="col-sm-6"><div class="muted small">Kendaraan</div><strong>${booking.car}</strong></div><div class="col-sm-6"><div class="muted small">Tanggal sewa</div><strong>${booking.dates}</strong></div><div class="col-sm-6"><div class="muted small">Estimasi total</div><strong class="price">${rupiah(booking.price)}</strong></div><div class="col-12"><div class="muted small">Lokasi penjemputan</div><strong>${booking.pickup}</strong></div></div><div class="d-flex flex-wrap gap-2 mt-4"><a class="btn btn-blue flex-grow-1" href="#bookings">Lihat riwayat booking</a><a class="btn btn-outline-navy" href="#cars">Cari mobil lain</a></div></div></div></section>`;
}
function bookingsPage() {
  let list=[...demoBookings];
  const latest=JSON.parse(sessionStorage.getItem("ridecareLatestBooking")||"null");
  if(latest) list.unshift({id:latest.id,car:latest.car,dates:latest.dates,price:latest.price,status:"Menunggu konfirmasi",cls:"warning"});
  return `${pageHead("Pesanan customer","Riwayat booking","Pantau status dan detail pesanan rental mobilmu.")}
  <section class="section-pad section-soft"><div class="container"><div class="panel-card"><div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3"><h2 class="h5 fw-bold mb-0">Semua pesanan</h2><span class="muted small">${list.length} booking</span></div><div class="table-responsive"><table class="table mb-0"><thead><tr><th>No. Booking</th><th>Kendaraan</th><th>Tanggal</th><th>Total</th><th>Status</th><th>Aksi</th></tr></thead><tbody>${list.map(b=>`<tr><td class="fw-bold">${b.id}</td><td>${b.car}</td><td class="small">${b.dates}</td><td class="fw-bold">${rupiah(b.price)}</td><td><span class="pill pill-${b.cls}">${b.status}</span></td><td><a class="btn btn-outline-navy btn-sm" href="#booking-detail/${encodeURIComponent(b.id)}">Detail</a></td></tr>`).join("")}</tbody></table></div></div><div class="mt-4 text-end"><a href="#cars" class="btn btn-blue">+ Booking mobil</a></div></div></section>`;
}
function bookingDetailPage(id) {
  let b=demoBookings.find(x=>x.id===decodeURIComponent(id));
  const latest=JSON.parse(sessionStorage.getItem("ridecareLatestBooking")||"null");
  if(latest&&latest.id===decodeURIComponent(id)) b={...latest,status:"Menunggu konfirmasi",cls:"warning"};
  if(!b) return notFoundPage();
  return `${pageHead("Detail pesanan",b.id,"Informasi booking yang kamu pilih.")}
  <section class="section-pad section-soft"><div class="container"><div class="row g-4"><div class="col-lg-8"><div class="panel-card"><div class="d-flex justify-content-between flex-wrap gap-3 align-items-start"><div><div class="muted small mb-1">Nomor booking</div><h2 class="h4 fw-bold">${b.id}</h2></div><span class="pill pill-${b.cls}">${b.status}</span></div><hr><div class="booking-step"><span class="step-number">1</span><div><strong>Permintaan booking</strong><div class="muted small mt-1">Data pesanan diterima oleh prototype.</div></div></div><div class="booking-step"><span class="step-number">2</span><div><strong>Konfirmasi admin</strong><div class="muted small mt-1">Status aktual harus berasal dari backend.</div></div></div><div class="booking-step"><span class="step-number">3</span><div><strong>Perjalanan dan tracking</strong><div class="muted small mt-1">Tracking tersedia saat booking memenuhi syarat dan driver mengaktifkannya.</div></div></div></div></div><div class="col-lg-4"><div class="panel-card"><h3 class="h6 fw-bold mb-3">Ringkasan biaya</h3><div class="muted small">Kendaraan</div><div class="fw-bold mb-3">${b.car}</div><div class="muted small">Jadwal</div><div class="fw-bold mb-3">${b.dates}</div><div class="muted small">Estimasi total</div><div class="price fs-4 mb-4">${rupiah(b.price)}</div><a href="#tracking" class="btn btn-blue w-100">Buka live tracking</a><p class="muted small mt-3 mb-0">Live tracking dapat belum tersedia untuk booking yang belum aktif.</p></div></div></div></div></section>`;
}
function profilePage() {
  const profile=JSON.parse(localStorage.getItem("ridecareProfile")||'{"name":"Customer RideCare","email":"customer@example.com","phone":"081234567890"}');
  return `${pageHead("Akun customer","Profile saya","Kelola informasi dasar akunmu.")}
  <section class="section-pad section-soft"><div class="container"><div class="row g-4"><div class="col-lg-4"><div class="panel-card text-center"><div class="auth-icon mx-auto mb-3"><i class="bi bi-person"></i></div><h2 class="h5 fw-bold mb-1">${profile.name}</h2><p class="muted small">${profile.email}</p><span class="pill pill-success">Customer</span></div></div><div class="col-lg-8"><div class="panel-card"><h2 class="h5 fw-bold mb-4">Informasi pribadi</h2><form id="profileForm" class="row g-3"><div class="col-md-6"><label class="form-label" for="profileName">Nama lengkap</label><input class="form-control" id="profileName" required value="${profile.name}"></div><div class="col-md-6"><label class="form-label" for="profileEmail">Email</label><input type="email" class="form-control" id="profileEmail" required value="${profile.email}"></div><div class="col-md-6"><label class="form-label" for="profilePhone">Nomor telepon</label><input type="tel" class="form-control" id="profilePhone" value="${profile.phone||""}"></div><div class="col-12"><button class="btn btn-blue" type="submit">Simpan perubahan</button></div></form><div class="alert alert-info small mt-4 mb-0">Prototype menyimpan perubahan di browser ini saja. Versi produksi harus menggunakan API dan autentikasi backend.</div></div></div></div></div></section>`;
}
function trackingPage() {
  return `${pageHead("Lokasi kendaraan","Live tracking","Pantau lokasi kendaraan untuk booking yang memenuhi syarat.")}
  <section class="section-pad section-soft"><div class="container"><div class="row g-4"><div class="col-lg-8"><div class="tracking-map" role="img" aria-label="Ilustrasi peta demo, bukan peta Google Maps langsung"><div class="map-grid"></div><div class="map-road"></div><div class="map-road two"></div><div class="map-road three"></div><div class="map-pin"><i class="bi bi-car-front-fill"></i></div><div class="map-label"><i class="bi bi-geo-alt-fill text-primary me-1"></i>Lokasi kendaraan (demo)</div><div class="map-note"><i class="bi bi-info-circle me-2"></i>Ini ilustrasi peta untuk UI prototype. Integrasi Google Maps dan koordinat Firebase belum diaktifkan.</div></div></div><div class="col-lg-4"><div class="panel-card mb-3"><div class="d-flex justify-content-between align-items-center mb-3"><h2 class="h5 fw-bold mb-0">Status tracking</h2><span class="pill pill-warning">Demo</span></div><div class="feature-icon mb-3"><i class="bi bi-broadcast-pin"></i></div><h3 class="h6 fw-bold">Menunggu lokasi driver</h3><p class="muted small lh-lg">Lokasi akan tersedia saat driver mengaktifkan tracking untuk booking aktif milikmu.</p><hr><div class="muted small">Booking terkait</div><select class="form-select mt-2 mb-3" id="trackingBooking"><option>RC-1024 — Toyota Avanza</option><option>RC-0981 — Honda Brio</option></select><div class="muted small">Pembaruan terakhir</div><strong class="d-block mt-1">Belum ada data</strong><button class="btn btn-blue w-100 mt-4" onclick="toast('Tracking demo. Hubungkan ke Firebase untuk menerima lokasi realtime.')">Perbarui status</button></div><div class="small muted"><i class="bi bi-shield-check me-1"></i>Lokasi seharusnya hanya dapat dilihat oleh customer yang memiliki akses ke booking terkait.</div></div></div></div></section>`;
}
function notFoundPage() {
  return `${pageHead("Halaman tidak ditemukan","Halaman tidak tersedia","Alamat halaman tidak dikenali.")}
  <section class="section-pad"><div class="container text-center"><div class="auth-icon mx-auto mb-3"><i class="bi bi-compass"></i></div><a class="btn btn-blue" href="#home">Kembali ke beranda</a></div></section>`;
}
function render() {
  const hash=location.hash.slice(1)||"home";
  const [route,param]=hash.split("/");
  const pages={home:homePage,cars:carsPage,login:()=>authPage(false),register:()=>authPage(true),dashboard:dashboardPage,booking:()=>bookingPage(param),confirmation:confirmationPage,bookings:bookingsPage,profile:profilePage,tracking:trackingPage};
  if(route==="car") view.innerHTML=carDetailPage(param);
  else if(route==="booking-detail") view.innerHTML=bookingDetailPage(param||"");
  else view.innerHTML=(pages[route]||notFoundPage)();
  document.querySelectorAll(".navbar .nav-link").forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+route));
  document.getElementById("year").textContent=new Date().getFullYear();
  if(route==="cars") bindCarFilters();
  if(route==="home") bindHomeSearch();
  if(route==="login") bindLogin();
  if(route==="register") bindRegister();
  if(route==="booking") bindBooking();
  if(route==="profile") bindProfile();
  if(route==="confirmation") bindConfirmation();
  view.focus({preventScroll:true});
}
function bindHomeSearch() {
  document.getElementById("homeSearch")?.addEventListener("submit",e=>{
    e.preventDefault();state.search=document.getElementById("homeKeyword").value.trim();state.type=document.getElementById("homeType").value;location.hash="#cars";
  });
}
function bindCarFilters() {
  document.getElementById("carFilters")?.addEventListener("submit",e=>{
    e.preventDefault();state.search=document.getElementById("carSearch").value.trim();state.type=document.getElementById("carType").value;state.sort=document.getElementById("carSort").value;render();
  });
}
function bindLogin() {
  document.getElementById("loginForm")?.addEventListener("submit",e=>{e.preventDefault();toast("Login demo berhasil. Sambungkan autentikasi ke Backend.");location.hash="#dashboard";});
}
function bindRegister() {
  document.getElementById("registerForm")?.addEventListener("submit",e=>{
    e.preventDefault();
    if(document.getElementById("password").value!==document.getElementById("passwordConfirm").value){toast("Password dan konfirmasi password belum sama.");return;}
    const profile={name:document.getElementById("fullName").value,email:document.getElementById("email").value,phone:document.getElementById("phone").value};
    localStorage.setItem("ridecareProfile",JSON.stringify(profile));toast("Pendaftaran demo berhasil.");location.hash="#dashboard";
  });
}
function bindBooking() {
  const form=document.getElementById("bookingForm");if(!form)return;
  const start=document.getElementById("startDate"),end=document.getElementById("endDate");
  const car=cars.find(c=>c.id===Number(form.dataset.car))||cars[0];
  const today=new Date();today.setMinutes(today.getMinutes()-today.getTimezoneOffset());const min=today.toISOString().slice(0,10);start.min=min;end.min=min;
  function updateTotal(){
    if(!start.value||!end.value){document.getElementById("duration").textContent="Pilih tanggal";document.getElementById("totalPrice").textContent=rupiah(0);return;}
    const days=Math.ceil((new Date(end.value)-new Date(start.value))/86400000);
    if(days<=0){document.getElementById("duration").textContent="Tanggal tidak valid";document.getElementById("totalPrice").textContent=rupiah(0);return;}
    document.getElementById("duration").textContent=`${days} hari`;document.getElementById("totalPrice").textContent=rupiah(days*car.price);
  }
  start.addEventListener("change",()=>{end.min=start.value||min;if(end.value&&end.value<=start.value)end.value="";updateTotal();});end.addEventListener("change",updateTotal);
  form.addEventListener("submit",e=>{
    e.preventDefault();
    if(new Date(end.value)<=new Date(start.value)){toast("Tanggal selesai harus setelah tanggal mulai.");return;}
    const days=Math.ceil((new Date(end.value)-new Date(start.value))/86400000);
    const booking={id:"RC-"+Math.floor(1000+Math.random()*9000),car:car.name,dates:`${new Date(start.value+"T00:00:00").toLocaleDateString("id-ID",{day:"2-digit",month:"short",year:"numeric"})} – ${new Date(end.value+"T00:00:00").toLocaleDateString("id-ID",{day:"2-digit",month:"short",year:"numeric"})}`,price:days*car.price,pickup:document.getElementById("pickup").value};
    sessionStorage.setItem("ridecareLatestBooking",JSON.stringify(booking));location.hash="#confirmation";
  });
}
function bindConfirmation() {
  // Confirmation data is intentionally read from sessionStorage in this frontend-only prototype.
}
function bindProfile() {
  document.getElementById("profileForm")?.addEventListener("submit",e=>{
    e.preventDefault();localStorage.setItem("ridecareProfile",JSON.stringify({name:document.getElementById("profileName").value,email:document.getElementById("profileEmail").value,phone:document.getElementById("profilePhone").value}));toast("Profile tersimpan di browser ini.");
    render();
  });
}
function resetFilters(){state.search="";state.type="Semua tipe";state.sort="recommended";render();}
window.resetFilters=resetFilters;
window.addEventListener("hashchange",render);
document.addEventListener("click",e=>{
  const link=e.target.closest('a[href^="#"]');
  if(link && link.getAttribute("href")==="#"){e.preventDefault();}
});
render();
