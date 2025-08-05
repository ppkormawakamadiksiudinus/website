AOS.init();

// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.toggle('active');
}

function closeMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.remove('active');
}

// Smooth scrolling for all anchor links, including mobile
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after a link is clicked
            closeMobileMenu(); 
        }
    });
});

// Close mobile menu when clicking outside of it
document.addEventListener('click', function(e) {
    const mobileNav = document.getElementById('mobileNav');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileNav.classList.contains('active') && !mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        closeMobileMenu();
    }
});

// Presensi Form Handling
const presensiForm = document.querySelector('form[name="presensi-form"]');
if (presensiForm) {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbz4ILz8bRbadkZbFJ4gNfZgujZJerntXq-HLR4TspW3vJKMLkiHppgBUyxpU5SLltVeDw/exec'; 

    presensiForm.addEventListener('submit', e => {
        e.preventDefault();
        const submitButton = presensiForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Mengirim...';

        fetch(scriptURL, { method: 'POST', body: new FormData(presensiForm) })
            .then(response => {
                console.log('Success!', response);
                alert('Terima kasih! Presensi Anda telah berhasil direkam.');
                submitButton.disabled = false;
                submitButton.textContent = 'Kirim Presensi';
                presensiForm.reset();
            })
            .catch(error => {
                console.error('Error!', error.message);
                alert('Maaf, terjadi kesalahan. Silakan coba lagi.');
                submitButton.disabled = false;
                submitButton.textContent = 'Kirim Presensi';
            });
    });
}