// Reusable function to toggle password visibility
function setupPasswordToggle() {
    // Find all password wrapper elements on the page
    const passwordWrappers = document.querySelectorAll('.password-wrapper');

    passwordWrappers.forEach(wrapper => {
        const passwordInput = wrapper.querySelector('input[type="password"], input[type="text"]');
        const toggleIcon = wrapper.querySelector('.toggle-password');

        if (passwordInput && toggleIcon) {
            toggleIcon.addEventListener('click', function() {
                // Toggle the input type between 'password' and 'text'
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);

                // Toggle the icon SVG
                // This swaps the eye icon with the eye-off icon
                const currentIcon = this.innerHTML;
                if (type === 'password') {
                    // Show the 'eye' icon
                    this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
                } else {
                    // Show the 'eye-off' icon (with a slash)
                    this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';
                }
            });
        }
    });
}

// Run the function once the document is fully loaded
document.addEventListener('DOMContentLoaded', setupPasswordToggle);

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

    // Menonaktifkan Klik Kanan
    document.addEventListener("contextmenu", function(e){
        e.preventDefault();
    }, false);

    // Menonaktifkan kombinasi tombol keyboard
    document.addEventListener("keydown", function(e){
        // CTRL + S (Save)
        if(e.ctrlKey && e.which == 83){
            e.preventDefault();
            alert("Fungsi Simpan (Save) tidak diizinkan.");
            return false;
        }
        // CTRL + P (Print)
        if(e.ctrlKey && e.which == 80){
            e.preventDefault();
            alert("Fungsi Cetak (Print) tidak diizinkan.");
            return false;
        }
        // CTRL + U (View Source)
        if(e.ctrlKey && e.which == 85){
            e.preventDefault();
            alert("Fungsi Lihat Sumber Laman (View Source) tidak diizinkan.");
            return false;
        }
    }, false);

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


// --- LOGIKA UNTUK TOGGLE SEARCH BAR ---
document.addEventListener('DOMContentLoaded', function() {
    const searchIcon = document.getElementById('searchIcon');
    const searchBar = document.getElementById('searchBar');
    const closeSearch = document.getElementById('closeSearch');
    const searchInput = searchBar.querySelector('.search-input');

    if (searchIcon && searchBar && closeSearch) {
        // Tampilkan search bar saat ikon diklik
        searchIcon.addEventListener('click', function(event) {
            event.preventDefault();
            searchBar.classList.add('active');
            // Fokus otomatis ke kolom input agar pengguna bisa langsung mengetik
            searchInput.focus();
        });

        // Sembunyikan search bar saat tombol 'X' diklik
        closeSearch.addEventListener('click', function() {
            searchBar.classList.remove('active');
        });
    }
});

// --- LOGIKA UNTUK POPUP PROMO DI INDEX.PHP ---
document.addEventListener('DOMContentLoaded', function() {
    const promoModal = document.getElementById('promoModal');
    
    // Cek apakah elemen modal ada di halaman ini
    if (promoModal) {
        
        // Cek sessionStorage: apakah popup sudah pernah ditampilkan di sesi ini?
        const promoShown = sessionStorage.getItem('promoShownThisSession');

        // Jika BELUM pernah ditampilkan...
        if (!promoShown) {
            // Tampilkan popup setelah jeda singkat (agar tidak terlalu mendadak)
            setTimeout(function() {
                promoModal.style.display = 'flex';
            }, 500); // Jeda 0.5 detik

            // Tandai bahwa popup sudah ditampilkan untuk sesi ini
            sessionStorage.setItem('promoShownThisSession', 'true');
        }

        // Fungsi untuk menutup popup
        const closeModal = function() {
            promoModal.style.display = 'none';
        };

        // Tambahkan event listener ke tombol 'X' dan tombol 'Saya Mengerti'
        promoModal.querySelector('.close-button').addEventListener('click', closeModal);
        promoModal.querySelector('#closePromoBtn').addEventListener('click', closeModal);

        // Tambahkan event listener untuk menutup jika klik di luar area konten
        promoModal.addEventListener('click', function(event) {
            if (event.target === promoModal) {
                closeModal();
            }
        });
    }
});
