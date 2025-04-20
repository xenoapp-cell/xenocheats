// Oczekiwanie na załadowanie DOM
document.addEventListener('DOMContentLoaded', () => {
    console.log('Strona załadowana!');

    // Przełączanie menu burger
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            navLinks.classList.toggle('active');
            console.log('Menu burger przełączone');
        });
    }

    // Płynne przewijanie dla linków nawigacyjnych
    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href.includes('#')) {
                const targetId = href.substring(href.indexOf('#') + 1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    console.log(`Przewinięto do sekcji: ${targetId}`);
                    // Zamknij menu mobilne
                    if (burger && navLinks) {
                        burger.classList.remove('active');
                        navLinks.classList.remove('active');
                    }
                    // Ustaw aktywny link
                    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });

    // Animacja reveal dla kart instalacji i opinii
    const cards = document.querySelectorAll('.step, .testimonial-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                console.log(`Karta widoczna: ${entry.target.tagName}`);
            }
        });
    }, { threshold: 0.2 });

    cards.forEach(card => observer.observe(card));

    // Animacja pobierania na download.html
    if (window.location.pathname.includes('download.html')) {
        const progress = document.querySelector('.progress');
        const downloadLink = document.querySelector('#download-link');
        const downloadMessage = document.querySelector('.download-message');
        const downloadStatus = document.querySelector('.download-status');
        if (progress && downloadLink && downloadMessage && downloadStatus) {
            console.log('Rozpoczęto animację pobierania');
            // Rozpocznij animację paska
            setTimeout(() => {
                progress.classList.add('active');
                console.log('Pasek postępu aktywowany');
            }, 100);
            // Zmień wiadomości dynamicznie
            setTimeout(() => {
                downloadMessage.textContent = 'Ładowanie pliku... 🚀';
            }, 1000);
            setTimeout(() => {
                downloadMessage.textContent = 'Prawie gotowe! 📥';
            }, 2000);
            // Uruchom pobieranie po 3 sekundach
            setTimeout(() => {
                downloadLink.click();
                downloadMessage.textContent = 'Pobieranie rozpoczęte! 🎉';
                downloadStatus.textContent = 'Sprawdź folder pobrań! 🚀';
                console.log('Pobieranie rozpoczęte: Xeno-v1.1.8.rar');
            }, 3000);
        } else {
            console.error('Brak elementów pobierania na download.html');
        }
    }
});