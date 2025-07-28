// Mencegah klik kanan di seluruh halaman
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    // Opsional: Tampilkan pesan
    // alert('Maaf, klik kanan dinonaktifkan di situs ini.');
});

// Mencegah shortcut keyboard untuk developer tools
document.addEventListener('keydown', function(event) {
    // Mencegah F12
    if (event.keyCode == 123) {
        event.preventDefault();
    }
    // Mencegah Ctrl+Shift+I (Inspect)
    if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
        event.preventDefault();
    }
    // Mencegah Ctrl+U (View Source)
    if (event.ctrlKey && event.keyCode == 85) {
        event.preventDefault();
    }
    // --- KODE BARU UNTUK MEMATIKAN CTRL+S ---
    // Cek apakah tombol Ctrl (atau Cmd di Mac) dan tombol 'S' ditekan bersamaan
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        // Hentikan aksi default browser (yaitu membuka dialog 'Save As')
        event.preventDefault();
        // Opsional: beritahu pengguna
        // alert('Menyimpan halaman ini tidak diizinkan.');
    }
});

// --- PERLINDUNGAN: Anti-Debugging / Anti-Inspect Element ---
(function() {
    function detectDevTool() {
        const threshold = 160; // Ambang batas untuk mendeteksi
        const devtool = new Date();
        
        // Statement debugger akan berhenti di sini HANYA jika DevTools terbuka
        debugger; 
        
        // Jika DevTools terbuka, waktu eksekusi akan sangat lambat
        if (new Date() - devtool > threshold) {
            // Lakukan sesuatu jika DevTools terdeteksi
            console.log("Developer Tools terdeteksi!");
            // Anda bisa mengosongkan halaman atau redirect
            // document.body.innerHTML = "<h1>Akses Ditolak</h1>";
        }
    }

    // Jalankan deteksi secara berulang
    setInterval(detectDevTool, 1000);
})();