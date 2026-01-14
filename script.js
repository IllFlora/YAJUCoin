document.addEventListener('DOMContentLoaded', () => {

    // Loading Animation (Cyber Console)
    const loader = document.getElementById('loader');
    const consoleOutput = document.getElementById('console-output');

    // Check if visited in this session
    if (sessionStorage.getItem('visited')) {
        // Second visit: Hide immediately
        if (loader) {
            loader.style.display = 'none';
            loader.classList.add('loaded'); // Ensure state
        }
    } else {
        // First visit: Play Animation

        // Lock scroll during loading
        document.body.style.overflow = 'hidden';

        if (loader && consoleOutput) {
            const logs = [
                "CONNECTING TO YAJU NETWORK..."
            ];

            let delaySum = 0;

            logs.forEach((log, index) => {
                // Randomize delay slightly for realism
                const delay = Math.random() * 300 + 400; // 400-700ms
                delaySum += delay;

                setTimeout(() => {
                    const p = document.createElement('div');
                    p.textContent = `> ${log}`;
                    consoleOutput.appendChild(p);
                    window.scrollTo(0, 0);

                    // If last log, finish loading
                    if (index === logs.length - 1) {
                        // Extended wait time: 1500ms
                        setTimeout(() => {
                            loader.classList.add('loaded');
                            document.body.style.overflow = ''; // Unlock scroll
                            sessionStorage.setItem('visited', 'true'); // Mark as visited
                        }, 1500);
                    }
                }, delaySum);
            });
        } else {
            // Safe fallback if element missing
            document.body.style.overflow = '';
        }
    }

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
                el.innerHTML = el.getAttribute(`data-${currentLang}`);
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
    // Story Toggle
    window.toggleStory = function () {
        const storyDiv = document.getElementById('full-story');
        const noteBtn = document.getElementById('read-more-btn');

        if (storyDiv && noteBtn) {
            const isHidden = storyDiv.classList.contains('hidden');

            if (isHidden) {
                // Open
                storyDiv.classList.remove('hidden');
                storyDiv.classList.add('visible');

                // Update Button Metadata for "Close" state
                noteBtn.setAttribute('data-ja', noteBtn.getAttribute('data-ja-close'));
                noteBtn.setAttribute('data-en', noteBtn.getAttribute('data-en-close'));
            } else {
                // Close
                storyDiv.classList.remove('visible');
                storyDiv.classList.add('hidden');

                // Update Button Metadata for "Open" state
                noteBtn.setAttribute('data-ja', noteBtn.getAttribute('data-ja-open'));
                noteBtn.setAttribute('data-en', noteBtn.getAttribute('data-en-open'));
            }

            // Reflect text immediately based on current language
            // (Assuming currentLang is accessible here, effectively it is inside the closure or we check global)
            // Since currentLang is defined inside DOMContentLoaded but outside this function, it IS accessible.
            noteBtn.textContent = noteBtn.getAttribute(`data-${currentLang}`);
        }
    };



});
