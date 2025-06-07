document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const resetBtn = document.getElementById('resetBtn');
    const responseMessage = document.querySelector('.response-message');
    const mainMessage = document.getElementById('mainMessage');
    const successMessage = document.getElementById('successMessage');
    const soundEffect = document.getElementById('soundEffect');
    const heartSound = document.getElementById('heartSound');
    const floatingHearts = document.querySelector('.floating-hearts');
    const floatingSparkles = document.querySelector('.floating-sparkles');
    const floatingBalloons = document.querySelector('.floating-balloons');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const playMusicBtn = document.getElementById('playMusicBtn');
    const stopMusicBtn = document.getElementById('stopMusicBtn');
    const profileImage = document.querySelector('.profile-image');
    
    // Enhanced sweet messages
    const sweetMessages = [
        "I'll make you breakfast in bed every weekend! 🍳",
        "Unlimited hugs and cuddles included! 🤗",
        "Movie nights with your favorite snacks! 🍿",
        "I'll sing for you (even if I'm off-key)! 🎤",
        "We'll have sunset picnics every month! 🌅",
        "You'll always be my favorite hello! 👋",
        "I'll learn to dance just for you! 💃",
        "We'll build a blanket fort together! 🏕️",
        "I'll write you poems every week! ✍️",
        "You're my favorite notification! 📱",
        "We'll stargaze on cozy nights! 🌠",
        "I'll always be your biggest fan! 📣"
    ];
    
    // Balloon configurations
    const balloonColors = ['❤️', '🧡', '💛', '💚', '💙', '💜'];
    
    // Configuration
    const config = {
        maxHearts: 50,
        heartSymbols: ['💖', '💗', '💓', '💘', '💝', '💟', '❤️‍🔥', '💞'],
        sparkleSymbols: ['✨', '🌟', '⭐', '⚡', '❄️', '💫', '☄️', '🌠']
    };
    
    let messageIndex = 0;
    let isMusicPlaying = false;
    
    // Event Listeners
    yesBtn.addEventListener('click', showSuccessMessage);
    noBtn.addEventListener('mouseover', playPersuasion);
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        playPersuasion();
    });
    resetBtn.addEventListener('click', resetApp);
    playMusicBtn.addEventListener('click', toggleBackgroundMusic);
    stopMusicBtn.addEventListener('click', toggleBackgroundMusic);
    profileImage.addEventListener('click', createHeartExplosion);
    
    // Di bagian inisialisasi event listeners
    document.getElementById('tryAgainBtn').addEventListener('click', resetApp);
    document.getElementById('resetBtn').addEventListener('click', resetApp); // Jika ada tombol reset di success message

    // Initialize
    createFloatingElements();
    startBackgroundEffects();
    
    // Auto-play music with user interaction
    document.addEventListener('click', tryAutoPlayMusic, { once: true });
    
    // Functions
    function tryAutoPlayMusic() {
        backgroundMusic.volume = 0.3;
        backgroundMusic.play()
            .then(() => {
                isMusicPlaying = true;
                updateMusicButtons();
            })
            .catch(e => console.log("Autoplay prevented:", e));
    }
    
    function toggleBackgroundMusic() {
        if (isMusicPlaying) {
            backgroundMusic.pause();
        } else {
            backgroundMusic.play()
                .then(() => {
                    backgroundMusic.volume = 0.3;
                })
                .catch(e => console.error("Playback failed:", e));
        }
        isMusicPlaying = !isMusicPlaying;
        updateMusicButtons();
    }
    
    function updateMusicButtons() {
        if (isMusicPlaying) {
            playMusicBtn.style.display = 'none';
            stopMusicBtn.style.display = 'block';
        } else {
            playMusicBtn.style.display = 'block';
            stopMusicBtn.style.display = 'none';
        }
    }
    
    function showSuccessMessage() {
        convinceMusic.pause(); // Hentikan lagu convince
    heartSound.play(); // Mainkan efek suara hati
        playSound();
        heartSound.play();
        mainMessage.classList.add('animate__fadeOut');
        
        setTimeout(() => {
            mainMessage.classList.add('hidden');
            mainMessage.classList.remove('animate__fadeOut');
            successMessage.classList.remove('hidden');
            successMessage.classList.add('animate__fadeIn');
            
            // Create celebration effects
            createHearts(30);
            createSparkles(30);
            createBalloons(20);
            createHeartExplosion();
            
            // Add confetti effect
            createConfetti(100);
        }, 500);
    }

    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showConvinceMessage(); // Fungsi ini harus ada
    });

    const convinceMusic = document.getElementById('convinceMusic');
    
    function playPersuasion() {
        // Enhanced button movement
        moveButtonRandomly(noBtn);
        
        // Show sweet message with animation
        showSweetMessage();
        
        // Create effects
        createHearts(5);
        createSparkles(5);
        
        // Change background color
        changeBackgroundColor();
        
        // Play heartbeat sound
        heartSound.currentTime = 0;
        heartSound.play();

        backgroundMusic.pause();
    
    // Mainkan lagu convince
        convinceMusic.currentTime = 0;
        convinceMusic.volume = 0.3; // Atur volume
        convinceMusic.play().catch(e => console.log("Audio error:", e));
        
        // Efek visual dan pesan
        showSweetMessage();
        createHearts(5);
        changeBackgroundColor();
        
        // Animasi tombol
        noBtn.classList.add('animate__animated', 'animate__pulse');
        setTimeout(() => noBtn.classList.remove('animate__pulse'), 1000);
    }
    
    function moveButtonRandomly(button) {
    // Simpan posisi asli
        if (!button.dataset.originalPosition) {
            button.dataset.originalPosition = 'true';
            button.style.position = 'relative';
            button.style.left = '0';
            button.style.top = '0';
        }
        
        const x = Math.random() * 100 - 50;
        const y = Math.random() * 100 - 50;
        
        button.classList.add('animate__animated', 'animate__wobble');
        button.style.transform = `translate(${x}px, ${y}px)`;
        
        setTimeout(() => {
            button.style.transform = '';
            button.classList.remove('animate__wobble');
        }, 1000);
    }
    
    function showSweetMessage() {
        responseMessage.textContent = sweetMessages[messageIndex];
        responseMessage.style.opacity = '0';
        responseMessage.style.display = 'block';
        
        // Trigger reflow untuk memastikan animasi berjalan
        void responseMessage.offsetWidth;
        
        responseMessage.style.animation = 'none';
        responseMessage.style.animation = 'fadeInOut 3s ease-in-out forwards';
        
        messageIndex = (messageIndex + 1) % sweetMessages.length;
        responseMessage.addEventListener('animationend', () => {
            responseMessage.style.display = 'none';
            responseMessage.style.opacity = '1';
        });
    }

    function showConvinceMessage() {
    // Sembunyikan pesan utama
        mainMessage.classList.add('hidden');
        
        // Tampilkan pesan convince
        const convinceMessage = document.getElementById('convinceMessage');
        convinceMessage.classList.remove('hidden');
        convinceMessage.classList.add('animate__fadeIn');
        
        // Efek visual
        createHearts(10);
        createSparkles(10);
        playSound();
    }
    
    function createFloatingElements() {
        // Create initial floating elements
        for (let i = 0; i < 8; i++) {
            setTimeout(() => createHeart(true), i * 600);
            setTimeout(() => createSparkle(true), i * 800);
            setTimeout(() => createBalloon(true), i * 1200);
        }
    }
    
    function startBackgroundEffects() {
        // Continuous floating elements
        setInterval(() => {
            if (Math.random() > 0.7) createHeart(true);
            if (Math.random() > 0.8) createSparkle(true);
            if (Math.random() > 0.9) createBalloon(true);
        }, 2000);
    }
    
    function createHearts(count) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => createHeart(), i * 50);
        }
    }
    
    function createSparkles(count) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => createSparkle(), i * 50);
        }
    }
    
    function createBalloons(count) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => createBalloon(), i * 75);
        }
    }
    
    function createHeart(isPersistent = false) {
        const heart = document.createElement('div');
        heart.textContent = config.heartSymbols[
            Math.floor(Math.random() * config.heartSymbols.length)
        ];
        heart.style.position = 'absolute';
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.fontSize = `${Math.random() * 20 + 10}px`;
        heart.style.animation = `float ${Math.random() * 3 + 2}s linear forwards`;
        heart.style.opacity = '0';
        heart.style.zIndex = '1';
        heart.style.filter = `hue-rotate(${Math.random() * 60 - 30}deg)`;
        
        floatingHearts.appendChild(heart);
        
        if (!isPersistent) {
            setTimeout(() => {
                heart.remove();
            }, 5000);
        }
    }
    
    function createSparkle(isPersistent = false) {
        const sparkle = document.createElement('div');
        sparkle.textContent = config.sparkleSymbols[
            Math.floor(Math.random() * config.sparkleSymbols.length)
        ];
        sparkle.style.position = 'absolute';
        sparkle.style.left = `${Math.random() * 100}vw`;
        sparkle.style.fontSize = `${Math.random() * 15 + 8}px`;
        sparkle.style.animation = `sparkle-float ${Math.random() * 4 + 2}s linear forwards`;
        sparkle.style.opacity = '0';
        sparkle.style.zIndex = '1';
        
        floatingSparkles.appendChild(sparkle);
        
        if (!isPersistent) {
            setTimeout(() => {
                sparkle.remove();
            }, 6000);
        }
    }
    
    function createBalloon(isPersistent = false) {
        const balloon = document.createElement('div');
        balloon.textContent = balloonColors[
            Math.floor(Math.random() * balloonColors.length)
        ];
        balloon.style.position = 'absolute';
        balloon.style.left = `${Math.random() * 100}vw`;
        balloon.style.fontSize = `${Math.random() * 30 + 20}px`;
        balloon.style.animation = `float-balloon ${Math.random() * 8 + 6}s linear forwards`;
        balloon.style.opacity = '0';
        balloon.style.zIndex = '1';
        balloon.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;
        
        floatingBalloons.appendChild(balloon);
        
        if (!isPersistent) {
            setTimeout(() => {
                balloon.remove();
            }, 8000);
        }
    }
    
    function createHeartExplosion() {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.textContent = config.heartSymbols[
                    Math.floor(Math.random() * config.heartSymbols.length)
                ];
                heart.style.position = 'absolute';
                heart.style.left = `calc(50% + ${Math.random() * 100 - 50}px)`;
                heart.style.top = `calc(50% + ${Math.random() * 100 - 50}px)`;
                heart.style.fontSize = `${Math.random() * 30 + 15}px`;
                heart.style.animation = `heart-explode ${Math.random() * 1 + 0.5}s ease-out forwards`;
                heart.style.opacity = '1';
                heart.style.zIndex = '100';
                heart.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;
                
                document.body.appendChild(heart);
                
                setTimeout(() => {
                    heart.remove();
                }, 2000);
            }, i * 50);
        }
    }
    
    function createConfetti(count) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.textContent = ['🎊', '🎉', '✨', '🌟', '💖', '💝'][Math.floor(Math.random() * 6)];
                confetti.style.position = 'fixed';
                confetti.style.left = `${Math.random() * 100}vw`;
                confetti.style.fontSize = `${Math.random() * 20 + 10}px`;
                confetti.style.animation = `confetti-fall ${Math.random() * 3 + 2}s linear forwards`;
                confetti.style.opacity = '0';
                confetti.style.zIndex = '100';
                confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
                
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    confetti.remove();
                }, 5000);
            }, i * 30);
        }
    }
    
    function changeBackgroundColor() {
        const hue = Math.floor(Math.random() * 20 + 340);
        document.body.style.background = `linear-gradient(135deg, hsl(${hue}, 100%, 98%) 0%, hsl(${hue}, 100%, 95%) 100%)`;
        
        setTimeout(() => {
            document.body.style.background = '';
        }, 1000);
    }
    
    function playSound() {
        soundEffect.currentTime = 0;
        soundEffect.volume = 0.3;
        soundEffect.play().catch(e => console.log("Audio play failed:", e));
    }
    
    function resetApp() {
    // Audio control
    convinceMusic.pause();
    convinceMusic.currentTime = 0;
    
    // Mainkan lagu utama jika sebelumnya aktif
    if (isMusicPlaying) {
        backgroundMusic.currentTime = 0;
        backgroundMusic.play();
    }
    
    // Animasi transisi
    const currentActive = document.querySelector('.message-container:not(.hidden)');
    currentActive.classList.add('animate__fadeOut');
    
    setTimeout(() => {
        // Sembunyikan semua pesan kecuali utama
        document.querySelectorAll('.message-container').forEach(el => {
            el.classList.add('hidden');
            el.classList.remove('animate__fadeIn', 'animate__fadeOut');
        });
        
        // Tampilkan pesan utama
        mainMessage.classList.remove('hidden');
        mainMessage.classList.add('animate__fadeIn');
        
        // Reset efek tambahan
        document.body.style.background = '';
        responseMessage.textContent = '';
        
        // Efek visual
        createBalloons(5);
        createHearts(8);
    }, 500);
}
    
    // Add new CSS animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes heart-explode {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
            50% { opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(3) translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px); opacity: 0; }
        }
        
        @keyframes confetti-fall {
            0% { transform: translateY(-20vh) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Add CSS for floating elements
    const floatingStyle = document.createElement('style');
    floatingStyle.textContent = `
        .floating-hearts div, .floating-sparkles div, .floating-balloons div {
            position: absolute;
            opacity: 0;
            animation: float 5s linear forwards;
        }
        @keyframes float {
            0% { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(-100vh); opacity: 0; }
        }
        @keyframes sparkle-float {
            0% { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(-100vh); opacity: 0; }
        }
        @keyframes float-balloon {
            0% { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(-100vh); opacity: 0; }
        }
        .animate__heart-explode {
            animation: heart-explode 0.5s ease-out forwards;
        }
        .animate__confetti-fall {
            animation: confetti-fall 2s linear forwards;
        }
    `;
    document.head.appendChild(floatingStyle);
    // Add CSS for button animations
    const buttonStyle = document.createElement('style');
    buttonStyle.textContent = `
        #yesBtn, #noBtn, #resetBtn, #playMusicBtn, #stopMusicBtn {
            transition: transform 0.3s ease;
        }
        #yesBtn:hover, #noBtn:hover, #resetBtn:hover, #playMusicBtn:hover, #stopMusicBtn:hover {
            transform: scale(1.1);
        }
    `;
    document.head.appendChild(buttonStyle);
    // Add CSS for profile image hover effect
    const profileStyle = document.createElement('style');

    profileStyle.textContent = `
        .profile-image {
            transition: transform 0.3s ease;
        }
        .profile-image:hover {
            transform: scale(1.1) rotate(10deg);
        }
    `;

});