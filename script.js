document.addEventListener('DOMContentLoaded', () => {

    // Make copyAddress global so it can be called from HTML onclick
    window.copyAddress = function () {
        const address = "BRrc4qh3t1wpE97FETgea1DEefu8A95Cu3g9vcN5pump";
        navigator.clipboard.writeText(address).then(() => {
            alert("Contract Address Copied!\n" + address);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

    // Sticky Header Effect
    window.addEventListener('scroll', function () {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 50) {
                header.style.background = 'rgba(10, 10, 9, 0.95)';
            } else {
                header.style.background = 'rgba(10, 10, 9, 0.7)';
            }
        }
    });

    // Mobile Menu Logic
    const menuToggle = document.querySelector('.menu-toggle');
    const menuClose = document.querySelector('.menu-close');
    const nav = document.querySelector('nav');

    if (menuToggle && nav && menuClose) {
        menuToggle.addEventListener('click', () => {
            nav.classList.add('active');
        });

        menuClose.addEventListener('click', () => {
            nav.classList.remove('active');
        });

        // Close menu when clicking a link
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
            });
        });
    }

    // Language Switcher
    const langToggle = document.getElementById('langToggle');
    let currentLang = 'ja';

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'ja' ? 'en' : 'ja';
            updateLanguage();
        });

        function updateLanguage() {
            const elements = document.querySelectorAll('[data-ja]');
            elements.forEach(el => {
                el.textContent = el.getAttribute(`data-${currentLang}`);
            });
            langToggle.textContent = currentLang === 'ja' ? 'EN / JA' : 'JA / EN';
        }
    }

    // Music Player Logic
    const musicToggle = document.getElementById('musicToggle');
    const bgm = document.getElementById('bgm');

    if (musicToggle && bgm) {
        // Set initial volume low to not startle users
        bgm.volume = 0.3;

        musicToggle.addEventListener('click', () => {
            if (bgm.paused) {
                bgm.play().then(() => {
                    musicToggle.textContent = "🎵 ON";
                    musicToggle.classList.add('playing');
                }).catch(error => {
                    console.log("Playback failed:", error);
                    alert("Playback failed. Please interact with the document first.");
                });
            } else {
                bgm.pause();
                musicToggle.textContent = "🎵 OFF";
                musicToggle.classList.remove('playing');
            }
        });
    }

    // Matrix Rain Animation (810 Ver.)
    const canvas = document.getElementById('matrixCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = "810";
        const fontSize = 16;
        const columns = canvas.width / fontSize;
        const drops = [];

        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        function drawMatrix() {
            ctx.fillStyle = 'rgba(10, 10, 9, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0F0'; // Green text
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = chars.charAt(Math.floor(Math.random() * chars.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        setInterval(drawMatrix, 33);

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // Story Toggle
    // Needs to be global or attached to window if used inline? 
    // Actually, inline onclick="toggleStory()" looks for window.toggleStory.
    window.toggleStory = function () {
        const storyDiv = document.getElementById('full-story');
        const noteBtn = document.getElementById('read-more-btn');

        if (storyDiv && storyDiv.classList.contains('hidden')) {
            storyDiv.classList.remove('hidden');
            storyDiv.classList.add('visible');
            if (noteBtn) noteBtn.style.display = 'none';
        }
    };

    // Anniversary Logic
    // [TEST MODE] Set target date to past to show "114514 DAY"
    const TARGET_DATE = new Date().getTime() - 10000;
    // const TARGET_DATE = new Date("2026-01-14T05:14:00+09:00").getTime();
    const EXPIRATION_DATE = new Date("2026-01-15T00:00:00+09:00").getTime();

    function checkAnniversary() {
        const now = new Date().getTime();

        // 1. Hide Link if expired
        const navLink = document.getElementById('nav-countdown');
        if (navLink) {
            if (now >= EXPIRATION_DATE) {
                navLink.remove();
            }
        }

        // 2. Redirect/Countdown Logic (Only for countdown.html)
        const timerElement = document.getElementById('timer');
        if (timerElement) {
            // If expired, wipe content and redirect
            if (now >= EXPIRATION_DATE) {
                document.body.innerHTML = '';
                window.location.href = 'index.html';
                return;
            }

            // Countdown Update Logic
            function updateTimer() {
                const currentTime = new Date().getTime();
                const distance = TARGET_DATE - currentTime;

                if (distance < 0) {
                    timerElement.innerHTML = "114514 DAY";
                    timerElement.style.color = "var(--accent-green)";
                    timerElement.style.textShadow = "0 0 30px var(--accent-green)";
                } else {
                    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                    const d = days.toString().padStart(2, '0');
                    const h = hours.toString().padStart(2, '0');
                    const m = minutes.toString().padStart(2, '0');
                    const s = seconds.toString().padStart(2, '0');

                    timerElement.innerText = `${d}:${h}:${m}:${s}`;
                }
            }

            // Run immediately and set interval
            updateTimer();
            setInterval(updateTimer, 1000);
        }
    }

    // Run date check immediately
    checkAnniversary();

});
