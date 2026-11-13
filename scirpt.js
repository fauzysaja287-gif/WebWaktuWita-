// =================================
// 1. JAM DIGITAL WITA
// =================================

function updateClock() {

    const now = new Date();

    const waktu = new Intl.DateTimeFormat(
        "id-ID",
        {
            timeZone: "Asia/Makassar",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
        }
    ).format(now);

    const tanggal = new Intl.DateTimeFormat(
        "id-ID",
        {
            timeZone: "Asia/Makassar",
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    ).format(now);

    document.getElementById("clock").textContent = waktu;

    document.getElementById("date").textContent = tanggal;
}

// Memperbarui jam setiap 1 detik
setInterval(updateClock, 1000);

updateClock();


// =================================
// 2. STOPWATCH
// =================================

let waktuMulai = 0;
let waktuTersimpan = 0;
let berjalan = false;

let animationId;


// Fungsi menampilkan waktu stopwatch
function tampilkanStopwatch() {

    let totalWaktu = waktuTersimpan;

    if (berjalan) {
        totalWaktu += performance.now() - waktuMulai;
    }

    let milidetik = Math.floor(totalWaktu / 10) % 100;

    let detik = Math.floor(totalWaktu / 1000) % 60;

    let menit = Math.floor(totalWaktu / 60000) % 60;

    let jam = Math.floor(totalWaktu / 3600000);

    let hasil =
        String(jam).padStart(2, "0") + ":" +
        String(menit).padStart(2, "0") + ":" +
        String(detik).padStart(2, "0") + "." +
        String(milidetik).padStart(2, "0");

    document.getElementById("stopwatch").textContent = hasil;

    if (berjalan) {
        animationId = requestAnimationFrame(tampilkanStopwatch);
    }
}


// =================================
// 3. TOMBOL MULAI
// =================================

document.getElementById("startBtn").addEventListener("click", function() {

    if (!berjalan) {

        waktuMulai = performance.now();

        berjalan = true;

        tampilkanStopwatch();
    }

});


// =================================
// 4. TOMBOL JEDA
// =================================

document.getElementById("pauseBtn").addEventListener("click", function() {

    if (berjalan) {

        waktuTersimpan += performance.now() - waktuMulai;

        berjalan = false;

        cancelAnimationFrame(animationId);

        tampilkanStopwatch();
    }

});


// =================================
// 5. TOMBOL RESET
// =================================

document.getElementById("resetBtn").addEventListener("click", function() {

    berjalan = false;

    cancelAnimationFrame(animationId);

    waktuMulai = 0;

    waktuTersimpan = 0;

    document.getElementById("stopwatch").textContent = "00:00:00.00";

});