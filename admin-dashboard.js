/* ==========================================================================
   STACKLY IT SERVICE - ADMIN DASHBOARD LOGIC SUITE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. SESSION PROTECTION CHECK
    const isLoggedIn = localStorage.getItem('isLoggedIn') || sessionStorage.getItem('isLoggedIn');
    const userRole = localStorage.getItem('userRole') || sessionStorage.getItem('userRole');
    const userEmail = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail');
    
    if (isLoggedIn !== 'true' || !userRole || userRole.toLowerCase() !== 'admin') {
        alert('Access Denied. Admin credentials signature required.');
        window.location.href = 'index.html';
        return;
    }

    // Populate metadata
    const name = localStorage.getItem('userName') || 'System Administrator';
    document.querySelectorAll('.admin-name-display').forEach(el => el.innerText = name);
    document.querySelectorAll('.admin-email-display').forEach(el => el.innerText = userEmail);

    // 2. DISMISS PRELOADER
    const preloader = document.getElementById('dashboardPreloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
            animateCounters();
            animateInfraHealth();
        }, 800);
    }

    // 3. SPA TAB SWITCHING CONTROLLER
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

            // Re-trigger animate infrastructure if entering Infrastructure tab
            if (targetTabId === 'infraSection') {
                animateInfraHealth();
            }
        });
    });

    // 4. MOBILE HAMBURGER
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const sidebarPanel = document.getElementById('sidebarPanel');

    if (hamburgerBtn && sidebarPanel) {
        hamburgerBtn.addEventListener('click', () => {
            sidebarPanel.classList.toggle('active');
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (!sidebarPanel.contains(e.target) && !hamburgerBtn.contains(e.target) && sidebarPanel.classList.contains('active')) {
                sidebarPanel.classList.remove('active');
            }
        });
    }

    // 5. STATS ANIMATED COUNTERS
    function animateCounters() {
        const counters = document.querySelectorAll('.counter-val');
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const duration = 1200; // milliseconds
            const startTime = performance.now();
            const isFloat = counter.getAttribute('data-float') === 'true';

            const step = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // easeOutCubic curve
                const ease = 1 - Math.pow(1 - progress, 3);
                
                if (isFloat) {
                    counter.innerText = (ease * target).toFixed(1) + '%';
                } else {
                    counter.innerText = Math.floor(ease * target).toLocaleString();
                }

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    if (isFloat) {
                        counter.innerText = target.toFixed(1) + '%';
                    } else {
                        counter.innerText = target.toLocaleString();
                    }
                }
            };
            requestAnimationFrame(step);
        });
    }

    // 6. INFRASTRUCTURE HEALTH PROGRESS FILL ANIMATIONS
    function animateInfraHealth() {
        const fills = document.querySelectorAll('.infra-fill');
        fills.forEach(fill => {
            const targetWidth = fill.getAttribute('data-width');
            fill.style.width = '0%';
            setTimeout(() => {
                fill.style.width = targetWidth;
            }, 100);
        });
    }

    // 7. REAL-TIME SEARCH FILTER SYSTEM
    const searchInput = document.getElementById('dashboardSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const filterText = this.value.toLowerCase().trim();
            
            // Get active section
            const activeSection = document.querySelector('.tab-section.active');
            if (!activeSection) return;

            // Search tables
            const tables = activeSection.querySelectorAll('.custom-table');
            tables.forEach(table => {
                const rows = table.querySelectorAll('tbody tr');
                rows.forEach(row => {
                    const text = row.innerText.toLowerCase();
                    if (text.includes(filterText)) {
                        row.style.display = 'table-row';
                    } else {
                        row.style.display = 'none';
                    }
                });
            });

            // Search ticket cards
            const tickets = activeSection.querySelectorAll('.ticket-card');
            tickets.forEach(ticket => {
                const text = ticket.innerText.toLowerCase();
                if (text.includes(filterText)) {
                    ticket.style.display = 'flex';
                } else {
                    ticket.style.display = 'none';
                }
            });
        });
    }

    // 8. ADMINISTRATIVE ACTION DIALOGS (MODALS)
    const modalOverlay = document.getElementById('adminModalOverlay');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalTitle = document.getElementById('modalTitle');
    const modalFormContainer = document.getElementById('modalFormContainer');

    function openAdminModal(type) {
        if (!modalOverlay || !modalFormContainer) return;
        
        modalFormContainer.innerHTML = '';
        
        if (type === 'create-project') {
            modalTitle.innerText = 'Launch Enterprise Project';
            modalFormContainer.innerHTML = `
                <div class="form-group">
                    <label>Project Title</label>
                    <input type="text" id="mProjTitle" placeholder="E.g. AI Enclave Router" required>
                </div>
                <div class="form-group">
                    <label>Client Entity</label>
                    <input type="text" id="mProjClient" placeholder="Company Name" required>
                </div>
                <div class="form-group">
                    <label>Team Allocation</label>
                    <select id="mProjTeam">
                        <option value="AI Solutions Team">AI Solutions Team</option>
                        <option value="Cloud Architect Group">Cloud Architect Group</option>
                        <option value="Cyber Ingress Unit">Cyber Ingress Unit</option>
                    </select>
                </div>
                <button type="submit" class="btn-quick primary" style="width: 100%; justify-content: center; height: 48px; margin-top: 1rem;">INITIALIZE DEPLOYMENT</button>
            `;
        } else if (type === 'add-client') {
            modalTitle.innerText = 'Register Partner Client';
            modalFormContainer.innerHTML = `
                <div class="form-group">
                    <label>Company Entity</label>
                    <input type="text" id="mClientCompany" placeholder="E.g. Nexus Corp" required>
                </div>
                <div class="form-group">
                    <label>Target Industry</label>
                    <input type="text" id="mClientIndustry" placeholder="E.g. Cyber Security, FinTech" required>
                </div>
                <div class="form-group">
                    <label>Contract Valuation</label>
                    <input type="number" id="mClientValue" placeholder="E.g. 150000" required>
                </div>
                <button type="submit" class="btn-quick primary" style="width: 100%; justify-content: center; height: 48px; margin-top: 1rem;">REGISTER NODE</button>
            `;
        } else if (type === 'add-employee') {
            modalTitle.innerText = 'Onboard Security Engineer';
            modalFormContainer.innerHTML = `
                <div class="form-group">
                    <label>Full Name</label>
                    <input type="text" id="mEmpName" placeholder="Engineer Name" required>
                </div>
                <div class="form-group">
                    <label>Allocated Department</label>
                    <select id="mEmpDept">
                        <option value="Cloud Security">Cloud Security</option>
                        <option value="AI Core Logic">AI Core Logic</option>
                        <option value="Biometrics Research">Biometrics Research</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Onboarding Level</label>
                    <input type="text" id="mEmpRole" placeholder="E.g. Senior Architect" required>
                </div>
                <button type="submit" class="btn-quick primary" style="width: 100%; justify-content: center; height: 48px; margin-top: 1rem;">ONBOARD ENGINEER</button>
            `;
        } else if (type === 'generate-report') {
            modalTitle.innerText = 'Generate Enterprise Report';
            modalFormContainer.innerHTML = `
                <div class="form-group">
                    <label>Report Class</label>
                    <select id="mReportClass">
                        <option value="Infrastructure Outage & SLA Metrics">Infrastructure Outage & SLA Metrics</option>
                        <option value="Financial Margins & Profit Logs">Financial Margins & Profit Logs</option>
                        <option value="Endpoint Vulnerability Risk Analysis">Endpoint Vulnerability Risk Analysis</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Export Format</label>
                    <select id="mReportFormat">
                        <option value="Encrypted PDF Bundle">Encrypted PDF Bundle</option>
                        <option value="Raw CSV Audit Log">Raw CSV Audit Log</option>
                    </select>
                </div>
                <button type="submit" class="btn-quick primary" style="width: 100%; justify-content: center; height: 48px; margin-top: 1rem;">COMPILE AUDIT ARCHIVE</button>
            `;
        }

        modalOverlay.classList.add('active');
    }

    // Attach click events to Quick Actions
    const actionBtns = document.querySelectorAll('[data-action]');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const actionType = this.getAttribute('data-action');
            openAdminModal(actionType);
        });
    });

    if (modalCloseBtn && modalOverlay) {
        modalCloseBtn.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
        });

        // Close on clicking backdrop
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
            }
        });
    }

    // Handle modal form submissions
    const adminActionForm = document.getElementById('adminActionForm');
    if (adminActionForm) {
        adminActionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Administrative configuration successfully pushed to secure cloud registries!');
            modalOverlay.classList.remove('active');
        });
    }

    // 9. RE-ROUTE TICKETS & ACTIONS
    const routeBtns = document.querySelectorAll('.btn-route');
    routeBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const num = this.closest('.ticket-card').querySelector('.ticket-number').innerText;
            alert(`Re-routing support ticket ${num} to Level 2 engineering node...`);
        });
    });

    // 10. SYSTEM LOGOUT
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm("Disconnect admin terminal session and clear authentication tokens?")) {
                const usersData = localStorage.getItem('users');
                localStorage.clear();
                sessionStorage.clear();
                
                // Re-seed original user data
                if (usersData) {
                    localStorage.setItem('users', usersData);
                } else {
                    // Seed defaults
                    localStorage.setItem('users', JSON.stringify([{
                        name: "System Administrator",
                        email: "admin@antigravity.io",
                        password: "AdminSecure2026!",
                        role: "admin"
                    }]));
                }

                window.location.href = 'index.html';
            }
        });
    }
});
