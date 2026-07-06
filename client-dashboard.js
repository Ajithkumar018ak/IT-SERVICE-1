
document.addEventListener('DOMContentLoaded', () => {
    // 1. SESSION ACCESS LOCK GUARD
    const isLoggedIn = localStorage.getItem('isLoggedIn') || sessionStorage.getItem('isLoggedIn');
    const userRole = localStorage.getItem('userRole') || sessionStorage.getItem('userRole');
    const userEmail = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail');
    
    if (isLoggedIn !== 'true') {
        // Not logged in, redirect to gate
        window.location.href = 'index.html';
        return;
    }
    
    if (userRole && userRole.toLowerCase() === 'admin') {
        window.location.href = 'admin-dashboard.html';
        return;
    }

    // 2. RETRIEVE OR SEED CLIENT DATA
    let clientName = localStorage.getItem('userName') || 'John Client';
    let clientCompany = localStorage.getItem('userCompany') || 'Client Enterprise Corp';
    let clientPhone = localStorage.getItem('userPhone') || '+65 9123 4567';
    let clientAddress = localStorage.getItem('userAddress') || 'Marina Bay Financial Centre, Tower 1, Singapore';
    
    // Write dynamic values to UI elements on load
    document.querySelectorAll('.client-name-display').forEach(el => el.innerText = clientName);
    document.querySelectorAll('.client-email-display').forEach(el => el.innerText = userEmail);
    document.querySelectorAll('.client-company-display').forEach(el => el.innerText = clientCompany);
    
    // Set form fields in Profile Section
    const profileNameInput = document.getElementById('profileName');
    const profileEmailInput = document.getElementById('profileEmail');
    const profilePhoneInput = document.getElementById('profilePhone');
    const profileCompanyInput = document.getElementById('profileCompany');
    const profileAddressInput = document.getElementById('profileAddress');
    
    if (profileNameInput) profileNameInput.value = clientName;
    if (profileEmailInput) profileEmailInput.value = userEmail;
    if (profilePhoneInput) profilePhoneInput.value = clientPhone;
    if (profileCompanyInput) profileCompanyInput.value = clientCompany;
    if (profileAddressInput) profileAddressInput.value = clientAddress;

    // 3. PRELOADER DISMISSAL
    const preloader = document.getElementById('dashboardPreloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
            // Trigger Counter Animations on Load
            animateCounters();
            animateProgressBars();
        }, 800);
    }

    // 4. SPA TAB SWITCHING CONTROLLER
    const menuItems = document.querySelectorAll('.sidebar-menu .menu-item:not(.logout-item)');
    const tabSections = document.querySelectorAll('.tab-section');

    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetTabId = this.getAttribute('data-tab');
            
            // Toggle active menu item styling
            menuItems.forEach(mi => mi.classList.remove('active'));
            this.classList.add('active');
            
            // Switch tabs
            tabSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetTabId) {
                    section.classList.add('active');
                }
            });

            // Close mobile sidebar if open
            const sidebar = document.getElementById('sidebarPanel');
            if (sidebar && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }

            // Scroll main panel to top
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Re-trigger progress bar animations if entering Projects tab
            if (targetTabId === 'projectsSection') {
                animateProgressBars();
            }
        });
    });

    // 5. MOBILE SIDEBAR DRAWER TOGGLER
 // 5. MOBILE SIDEBAR
const hamburger = document.getElementById("hamburgerBtn");
const sidebar = document.getElementById("sidebarPanel");
const overlay = document.querySelector(".sidebar-overlay");

function openSidebar() {
    sidebar.classList.add("active");
    overlay.classList.add("active");

    document.body.classList.add("no-scroll");
    document.documentElement.classList.add("no-scroll");
}

function closeSidebar() {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");

    document.body.classList.remove("no-scroll");
    document.documentElement.classList.remove("no-scroll");
}

hamburger.onclick = function () {

    if (sidebar.classList.contains("active")) {
        closeSidebar();
    } else {
        openSidebar();
    }

};

overlay.onclick = closeSidebar;

document.querySelectorAll(".menu-item").forEach(item => {
    item.onclick = function () {
        closeSidebar();
    };
});
    // 6. STATS COUNTER ANIMATION ENGINE
    function animateCounters() {
        const counters = document.querySelectorAll('.counter-val');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            const duration = 1200; // milliseconds
            const startTime = performance.now();

            const step = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // easeOutCubic curve
                const ease = 1 - Math.pow(1 - progress, 3);
                counter.innerText = Math.floor(ease * target);

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    counter.innerText = target;
                }
            };
            requestAnimationFrame(step);
        });
    }

    // 7. PROGRESS BAR ANIME TRIGGERS
    function animateProgressBars() {
        const fills = document.querySelectorAll('.project-progress-fill');
        fills.forEach(fill => {
            const targetWidth = fill.getAttribute('data-progress');
            fill.style.width = '0%';
            setTimeout(() => {
                fill.style.width = targetWidth;
            }, 100);
        });
    }

    // 8. REAL-TIME SEARCH FILTER SYSTEM
    const searchInput = document.getElementById('dashboardSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const filterText = this.value.toLowerCase().trim();
            
            // Get active section
            const activeSection = document.querySelector('.tab-section.active');
            if (!activeSection) return;

            // 8a. If in Projects section
            if (activeSection.id === 'projectsSection' || activeSection.id === 'dashboardSection') {
                const projectCards = document.querySelectorAll('.project-card');
                projectCards.forEach(card => {
                    const title = card.querySelector('h3').innerText.toLowerCase();
                    const desc = card.querySelector('p').innerText.toLowerCase();
                    if (title.includes(filterText) || desc.includes(filterText)) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }

            // 8b. If in Requests section
            if (activeSection.id === 'requestsSection' || activeSection.id === 'dashboardSection') {
                const tableRows = document.querySelectorAll('.custom-table tbody tr');
                tableRows.forEach(row => {
                    const text = row.innerText.toLowerCase();
                    if (text.includes(filterText)) {
                        row.style.style.display = '';
                        row.style.display = 'table-row';
                    } else {
                        row.style.display = 'none';
                    }
                });
            }
        });
    }

    // 9. PROFILE DETAILS MANAGEMENT
    const profileForm = document.getElementById('profileEditForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const newName = profileNameInput.value.trim();
            const newPhone = profilePhoneInput.value.trim();
            const newCompany = profileCompanyInput.value.trim();
            const newAddress = profileAddressInput.value.trim();
            
            if (newName === "") {
                alert("Name cannot be empty!");
                return;
            }

            const nameRegex = /^[A-Za-z\s]+$/;
            if (!nameRegex.test(newName)) {
                alert("Full Name must contain letters and spaces only.");
                return;
            }

            if (newPhone !== "") {
                const phoneRegex = /^[0-9]+$/;
                if (!phoneRegex.test(newPhone)) {
                    alert("Phone Number must contain digits only.");
                    return;
                }
            }

            if (newCompany !== "") {
                const companyRegex = /^[A-Za-z0-9\s]+$/;
                if (!companyRegex.test(newCompany)) {
                    alert("Company Name must contain letters and numbers only.");
                    return;
                }
            }

            // Save details to Local Storage
            localStorage.setItem('userName', newName);
            localStorage.setItem('userPhone', newPhone);
            localStorage.setItem('userCompany', newCompany);
            localStorage.setItem('userAddress', newAddress);
            
            // Sync with sidebar/header display
            document.querySelectorAll('.client-name-display').forEach(el => el.innerText = newName);
            document.querySelectorAll('.client-company-display').forEach(el => el.innerText = newCompany);

            alert("Profile successfully updated in database gateway!");
        });
    }

    // PASSWORD UPDATE CONTROLLER
    const passwordForm = document.getElementById('profilePasswordForm');
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const currentPass = document.getElementById('currentPass').value;
            const newPass = document.getElementById('newPass').value;
            const confirmPass = document.getElementById('confirmPass').value;

            if (newPass === "" || confirmPass === "") {
                alert("Passphrases cannot be empty!");
                return;
            }

            const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
            if (!pwdRegex.test(newPass)) {
                alert("Password must contain: Minimum 8 characters, at least 1 Uppercase, 1 Lowercase, 1 Number, and 1 Special Character.");
                return;
            }

            if (newPass !== confirmPass) {
                alert("New Passphrase signatures do not match!");
                return;
            }

            // Emulate success
            alert("Passphrase registry credentials successfully re-hashed!");
            passwordForm.reset();
        });
    }

    // 10. NOTIFICATION SIDEBAR CONTROLLER
    const notifyTrigger = document.getElementById('notifyBtn');
    const notifyClose = document.getElementById('notifyCloseBtn');
    const notificationSlider = document.getElementById('notificationSlider');

    if (notifyTrigger && notificationSlider) {
        notifyTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            notificationSlider.classList.add('active');
            // Dismiss badge unread indicator
            const dot = notifyTrigger.querySelector('.badge-dot');
            if (dot) dot.style.display = 'none';
        });
    }

    if (notifyClose && notificationSlider) {
        notifyClose.addEventListener('click', () => {
            notificationSlider.classList.remove('active');
        });

        // Close when clicking outside notification drawer
        document.addEventListener('click', (e) => {
            if (notificationSlider.classList.contains('active') && !notificationSlider.contains(e.target) && !notifyTrigger.contains(e.target)) {
                notificationSlider.classList.remove('active');
            }
        });
    }

    // 11. PROFILE POPUP DETECTOR QUICK PANEL
    const headerProfile = document.getElementById('headerProfile');
    if (headerProfile) {
        headerProfile.addEventListener('click', () => {
            // Swaps view to Profile Tab
            const profileMenuBtn = document.querySelector('[data-tab="profileSection"]');
            if (profileMenuBtn) profileMenuBtn.click();
        });
    }

    // 12. LOGOUT & CONNECTION SHUTDOWN
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userRole');
            localStorage.removeItem('userName');
            localStorage.removeItem('loginTime');
            localStorage.removeItem('rememberMe');
            sessionStorage.removeItem('sessionActive');
            
            window.location.href = 'index.html';
        });
    }

    // Download/Preview emulation triggers
    const downloadBtns = document.querySelectorAll('.btn-download');
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const docName = this.closest('.document-card').querySelector('h4').innerText;
            alert(`Initializing secure download tunnel for: ${docName}`);
        });
    });

    const previewBtns = document.querySelectorAll('.btn-preview');
    previewBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const docName = this.closest('.document-card').querySelector('h4').innerText;
            alert(`Opening sandboxed preview window for: ${docName}`);
        });
    });

    // Chat triggers emulation
    const chatBtns = document.querySelectorAll('.btn-chat');
    chatBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const ticketNo = this.closest('.ticket-card').querySelector('.ticket-number').innerText;
            alert(`Connecting with support engineer node for ${ticketNo}...`);
        });
    });
});




