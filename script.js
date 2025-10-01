document.addEventListener('DOMContentLoaded', function() {

    // --- Логика для переключателя темы ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        body.classList.toggle('light-theme');
        themeToggle.textContent = body.classList.contains('dark-theme') ? '☀️' : '🌙';
    });

    // --- Логика для кнопки "Наверх" ---
    const scrollTopButton = document.getElementById('scrollTopButton');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { scrollTopButton.classList.add('show'); } 
        else { scrollTopButton.classList.remove('show'); }
    });
    scrollTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- Логика для модальных окон ---
    const openModalButtons = document.querySelectorAll('[data-modal-target]');
    const overlay = document.getElementById('overlay');
    function openModal(modal) {
        if (modal == null) return;
        modal.classList.add('active');
        overlay.classList.add('active');
    }
    function closeModal(modal) {
        if (modal == null) return;
        modal.classList.remove('active');
        overlay.classList.remove('active');
    }
    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = document.querySelector(button.dataset.modalTarget);
            openModal(modal);
        });
    });
    overlay.addEventListener('click', () => {
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => { closeModal(modal); });
    });
    document.querySelectorAll('.close-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    // --- Логика для FAQ-аккордеона ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.faq-item.active');
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
                currentlyActive.querySelector('.faq-answer').style.maxHeight = 0;
            }
            item.classList.toggle('active');
            const answer = item.querySelector('.faq-answer');
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = 0;
            }
        });
    });

    // --- Логика для кнопки "Поделиться" ---
    const shareButton = document.getElementById('share-button');
    if (shareButton) {
        shareButton.addEventListener('click', () => {
            if (navigator.share) {
                navigator.share({
                    title: document.title,
                    text: 'Поддержи Дмитрия Дейнеко на выборах президента школы!',
                    url: window.location.href
                }).catch(console.error);
            } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Ссылка на сайт скопирована в буфер обмена! Поделись ей с друзьями.');
            }
        });
    }

    // --- Логика для таймера обратного отсчёта ---
    const countdownElement = document.getElementById("countdown");
    if(countdownElement) {
        const electionDate = new Date("Oct 5, 2025 12:00:00").getTime();
        const countdownFunction = setInterval(function() {
            const now = new Date().getTime();
            const distance = electionDate - now;
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            document.getElementById("days").innerText = String(days).padStart(2, '0');
            document.getElementById("hours").innerText = String(hours).padStart(2, '0');
            document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
            document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
            if (distance < 0) {
                clearInterval(countdownFunction);
                countdownElement.innerHTML = "<h3>Выборы начались! Твой голос важен!</h3>";
            }
        }, 1000);
    }

    // --- Логика для эффекта печатания ---
    const typingElement = document.getElementById('typing-effect');
    if(typingElement) {
        const phrases = ["...слушает каждого.", "...действует смело.", "...создаёт будущее.", "Дмитрий Дейнеко."];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentPhrase = phrases[phraseIndex];
            if (isDeleting) {
                typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 100 : 200;

            if (!isDeleting && charIndex === currentPhrase.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500;
            }
            
            setTimeout(type, typeSpeed);
        }
        type();
    }
});

// --- Логика для Облака идей ---
window.onload = function() {
  try {
    const isDark = document.body.classList.contains('dark-theme');
    TagCanvas.Start('tagcanvas', 'tags', {
      textColour: isDark ? '#00A8FF' : '#007BFF',
      outlineColour: 'transparent',
      reverse: true,
      depth: 0.8,
      maxSpeed: 0.05,
      textFont: 'Inter, sans-serif',
      textHeight: 20,
      initial: [0.05, -0.05],
      shadow: isDark ? '#00A8FF' : 'transparent',
      shadowBlur: 5
    });
  } catch(e) {
    const tagcloudContainer = document.getElementById('tagcloud-container');
    if (tagcloudContainer) {
      tagcloudContainer.style.display = 'none';
    }
  }
};