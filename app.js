// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initCountdown();
    initMobileNav();
    initScheduleTabs();
    initForms();
});

// 1. Countdown Timer
function initCountdown() {
    // Set target date (October 15, 2026, 09:00:00 UTC)
    const targetDate = new Date('October 15, 2026 09:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            document.querySelector('.countdown-timer').innerHTML = "<h3>The Symposium has Begun!</h3>";
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days.toString().padStart(2, '0');
        document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// 2. Mobile Navigation Toggle
function initMobileNav() {
    const toggleBtn = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link, .nav-btn');

    toggleBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = toggleBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    });

    // Close menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                toggleBtn.querySelector('i').setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        });
    });
}

// 3. Interactive Schedule Day Tabs
function initScheduleTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const dayPanes = document.querySelectorAll('.schedule-day-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetDay = btn.getAttribute('data-day');

            // Set active button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Set active pane
            dayPanes.forEach(pane => {
                if (pane.getAttribute('id') === targetDay) {
                    pane.classList.add('active');
                } else {
                    pane.classList.remove('active');
                }
            });
        });
    });
}

// 4. Form Submissions (Registration & Newsletter)
function initForms() {
    // Registration Form
    const regForm = document.getElementById('regForm');
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModal');
    const modalName = document.getElementById('modalName');
    const modalPass = document.getElementById('modalPass');

    regForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('fullName').value.trim();
        const ticketSelect = document.getElementById('ticketType');
        const selectedTicketText = ticketSelect.options[ticketSelect.selectedIndex].text;

        // Set details inside modal
        modalName.innerText = nameInput;
        modalPass.innerText = selectedTicketText;

        // Display success Modal
        successModal.classList.add('active');

        // Reset form
        regForm.reset();
    });

    closeModalBtn.addEventListener('click', () => {
        successModal.classList.remove('active');
    });

    // Close modal if user clicks outside of modal card
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
            successModal.classList.remove('active');
        }
    });

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterEmail = document.getElementById('newsletterEmail');
    const newsletterMsg = document.getElementById('newsletterMsg');

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = newsletterEmail.value.trim();
        if (email) {
            newsletterMsg.innerText = "Subscribed successfully!";
            newsletterMsg.className = "newsletter-status success";
            newsletterForm.reset();
            
            // Clear message after 3 seconds
            setTimeout(() => {
                newsletterMsg.innerText = "";
                newsletterMsg.className = "newsletter-status";
            }, 3000);
        }
    });
}
