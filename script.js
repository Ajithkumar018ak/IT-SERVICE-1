

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. PREMIUM LOADER SYSTEM (3 SECONDS DURATION)
    // ==========================================================================
    const loader = document.getElementById('loader');
    const progressBar = document.getElementById('progressBar');
    const loaderPercentage = document.getElementById('loaderPercentage');
    const loaderStatusText = document.getElementById('loaderStatusText');
    const loaderParticles = document.getElementById('loaderParticles');
    const body = document.body;

    // Generate Floating Loader Particles
    if (loaderParticles) {
        const particleCount = 20;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('loader-particle');
            particle.style.left = `${Math.random() * 100}vw`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            particle.style.animationDuration = `${4 + Math.random() * 4}s`;
            particle.style.transform = `scale(${0.3 + Math.random() * 0.7})`;
            loaderParticles.appendChild(particle);
        }
    }

    // Status message stages
    const statusMessages = [
        { progress: 0, text: 'Loading Experience...' },
        { progress: 30, text: 'Loading Future...' },
        { progress: 60, text: 'Please Wait...' },
        { progress: 85, text: 'Core...' },
        { progress: 100, text: 'STACKLY IT SERVICE' }
    ];

    let currentProgress = 0;
    const loaderDuration = 3000; // 3 seconds
    const intervalTime = 30; // ms
    const increment = 100 / (loaderDuration / intervalTime);

    const loaderInterval = setInterval(() => {
        currentProgress += increment;
        if (currentProgress >= 100) {
            currentProgress = 100;
            clearInterval(loaderInterval);
            completeLoading();
        }

        // Update progress bar width and text percentage
        const displayProgress = Math.floor(currentProgress);
        if (progressBar) progressBar.style.width = `${displayProgress}%`;
        if (loaderPercentage) loaderPercentage.textContent = `${displayProgress}%`;

        // Cycle through status messages
        const currentMessage = statusMessages.reduce((prev, curr) => {
            return (displayProgress >= curr.progress) ? curr : prev;
        });
        if (loaderStatusText && loaderStatusText.textContent !== currentMessage.text) {
            loaderStatusText.textContent = currentMessage.text;
        }
    }, intervalTime);

    function completeLoading() {
        setTimeout(() => {
            // Fade out the loader screen
            if (loader) {
                loader.classList.add('fade-out');
            }
            // Enable body scroll
            body.classList.remove('loading');

            // Trigger Hero Reveals and card animations
            setTimeout(() => {
                body.classList.add('body-loaded');
            }, 500);
        }, 300);
    }

    // ==========================================================================
    // 2. CUSTOM CURSOR & SPOTLIGHT EFFECT
    // ==========================================================================
    const customCursor = document.getElementById('customCursor');
    const cursorGlow = document.getElementById('cursorGlow');
    const heroSpotlight = document.getElementById('heroSpotlight');

    let cursorX = 0, cursorY = 0;
    let targetX = 0, targetY = 0;
    const cursorEase = 0.15; // Smooth interpolation coefficient

    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;

        // Direct spotlight coordinates updates for hero grid highlights
        const scrollY = window.scrollY;
        const pageX = e.pageX;
        const pageY = e.pageY;

        document.documentElement.style.setProperty('--mx', `${pageX}px`);
        document.documentElement.style.setProperty('--my', `${pageY}px`);
    });

    // Animate cursor spotlight trail smoothly using requestAnimationFrame
    function updateCursorPosition() {
        cursorX += (targetX - cursorX) * cursorEase;
        cursorY += (targetY - cursorY) * cursorEase;

        if (customCursor) {
            customCursor.style.left = `${cursorX}px`;
            customCursor.style.top = `${cursorY}px`;
        }
        if (cursorGlow) {
            cursorGlow.style.left = `${cursorX}px`;
            cursorGlow.style.top = `${cursorY}px`;
        }

        requestAnimationFrame(updateCursorPosition);
    }
    updateCursorPosition();

    // Hover effect for Interactive Links and Buttons
    const interactiveElements = document.querySelectorAll('a, button, .tech-card, .logo-link');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (customCursor) customCursor.classList.add('hovered');
        });
        el.addEventListener('mouseleave', () => {
            if (customCursor) customCursor.classList.remove('hovered');
        });
    });

    // ==========================================================================
    // 3. STICKY NAVBAR GLASSMORPHISM TRANSITION
    // ==========================================================================
    const mainNavbar = document.getElementById('mainNavbar');
    window.addEventListener('scroll', () => {
        if (mainNavbar) {
            if (window.scrollY > 50) {
                mainNavbar.classList.add('scrolled');
            } else {
                mainNavbar.classList.remove('scrolled');
            }
        }
    });

    // ==========================================================================
    // 4. MOBILE OVERLAY NAVIGATION SYSTEM
    // ==========================================================================
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuToggle && mobileOverlay) {
        mobileMenuToggle.addEventListener('click', () => {
            const isActive = mobileOverlay.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');

            if (isActive) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });

        // Close mobile overlay on clicking links
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileOverlay.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                body.style.overflow = '';
            });
        });
    }

    // ==========================================================================
    // 5. ADVANCED MAGNETIC BUTTON PHYSICS
    // ==========================================================================
    const magneticButtons = document.querySelectorAll('.btn-magnetic');

    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', function (e) {
            const bounds = this.getBoundingClientRect();

            // Calculate cursor offset relative to button center
            const btnCenterX = bounds.left + bounds.width / 2;
            const btnCenterY = bounds.top + bounds.height / 2;

            const mouseX = e.clientX;
            const mouseY = e.clientY;

            const deltaX = mouseX - btnCenterX;
            const deltaY = mouseY - btnCenterY;

            // Pull settings (limit maximum offset translate range)
            const magneticStrength = 22; // max translation pixels
            const transformX = (deltaX / (bounds.width / 2)) * magneticStrength;
            const transformY = (deltaY / (bounds.height / 2)) * magneticStrength;

            // Apply coordinates to current button
            this.style.transform = `translate(${transformX}px, ${transformY}px)`;

            // Subtle offset to the child to give depth
            const btnInner = this.querySelector('.btn-inner');
            if (btnInner) {
                btnInner.style.transform = `translate(${transformX * 0.3}px, ${transformY * 0.3}px)`;
            }
        });

        btn.addEventListener('mouseleave', function () {
            // Animate smoothly back on cursor exit
            this.style.transform = 'translate(0px, 0px)';
            const btnInner = this.querySelector('.btn-inner');
            if (btnInner) {
                btnInner.style.transform = 'translate(0px, 0px)';
            }
        });

        // Ripple Animation handler
        btn.addEventListener('click', function (e) {
            const rippleContainer = this.querySelector('.btn-ripple-container');
            if (!rippleContainer) return;

            const bounds = this.getBoundingClientRect();
            const x = e.clientX - bounds.left;
            const y = e.clientY - bounds.top;

            const ripple = document.createElement('span');
            ripple.classList.add('btn-ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            rippleContainer.appendChild(ripple);

            ripple.addEventListener('animationend', () => {
                ripple.remove();
            });
        });
    });

    // ==========================================================================
    // 6. INTERACTIVE PARALLAX CARD & ORBITING Badges
    // ==========================================================================
    const parallaxContainer = document.getElementById('parallaxContainer');
    const heroMainCard = document.querySelector('.hero-main-card');
    const cardReflection = document.querySelector('.card-reflection');
    const floatingTechCards = document.querySelectorAll('.tech-card');

    if (parallaxContainer && heroMainCard) {
        document.addEventListener('mousemove', (e) => {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            // Calculate normalized coordinate scale (-0.5 to 0.5) relative to center of screen
            const mouseX = (e.clientX / windowWidth) - 0.5;
            const mouseY = (e.clientY / windowHeight) - 0.5;

            // Parallax rotate coordinates for main glass card
            const maxRotateX = 15; // Degrees limit
            const maxRotateY = 15; // Degrees limit

            const rotateX = -mouseY * maxRotateX;
            const rotateY = mouseX * maxRotateY;

            heroMainCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(50px)`;

            // Card sheen reflection alignment
            if (cardReflection) {
                const shiftX = mouseX * 100;
                const shiftY = mouseY * 100;
                cardReflection.style.transform = `translate(calc(-50% + ${shiftX}px), calc(-50% + ${shiftY}px))`;
            }

            // High precision translations for orbiting floating cards
            floatingTechCards.forEach(card => {
                const depth = parseFloat(card.getAttribute('data-depth')) || 0.15;
                const translationScale = 90; // Pixels scale

                const translateX = mouseX * depth * translationScale;
                const translateY = mouseY * depth * translationScale;
                const translateZ = depth * 40;

                // Fetch current element float keyframe layout rules
                // We keep animations floating while translating under mouse coordinate offsets
                const currentTransform = window.getComputedStyle(card).transform;
                card.style.transform = `translate3d(${translateX}px, ${translateY}px, ${translateZ}px)`;
            });
        });

        // Reset visual rotation values when cursor exits window
        document.addEventListener('mouseleave', () => {
            heroMainCard.style.transform = `rotateX(0deg) rotateY(0deg) translateZ(50px)`;
            if (cardReflection) {
                cardReflection.style.transform = `translate(-50%, -50%)`;
            }
            floatingTechCards.forEach(card => {
                card.style.transform = `translate3d(0px, 0px, 0px)`;
            });
        });

    }
    // ==========================================================================
    // 7. SCROLL REVEAL OBSERVER
    // ==========================================================================
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ==========================================================================
    // 8. ANIMATED COUNTERS ENGINE (FOR STATS & WHY SECTIONS)
    // ==========================================================================
    const counterElements = document.querySelectorAll('.stat-num, .counter-num');

    const countNumber = (element) => {
        const target = parseInt(element.getAttribute('data-target'), 10);
        const duration = 2000; // 2 seconds
        let startTime = null;

        const updateCount = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);

            // easeOutCubic deceleration easing
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.floor(easeProgress * target);

            element.textContent = currentCount;

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                element.textContent = target; // Ensure exact end value
            }
        };

        requestAnimationFrame(updateCount);
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.stat-num, .counter-num');
                counters.forEach(counter => countNumber(counter));
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 }); // 30% visibility trigger

    // Observe sections housing stats counters
    const statsSections = document.querySelectorAll('.why-section, .stats-section, .metrics-section');
    statsSections.forEach(section => statsObserver.observe(section));

    // ==========================================================================
    // 9. SERVICE CARDS 3D TILT EFFECT
    // ==========================================================================
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mousemove', function (e) {
            const bounds = this.getBoundingClientRect();
            const mouseX = e.clientX - bounds.left;
            const mouseY = e.clientY - bounds.top;

            // Normalized values (-0.5 to 0.5)
            const normX = (mouseX / bounds.width) - 0.5;
            const normY = (mouseY / bounds.height) - 0.5;

            // Tilt settings (decelerate tilt degrees range)
            const maxTilt = 8;
            const tiltX = -normY * maxTilt;
            const tiltY = normX * maxTilt;

            this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });

    // ==========================================================================
    // 10. INTERACTIVE TIMELINE WORKFLOW
    // ==========================================================================
    const timelineSteps = document.querySelectorAll('.timeline-step');
    const progressLine = document.getElementById('timelineProgressLine');

    if (timelineSteps && progressLine) {
        const updateProgress = () => {
            const activeSteps = document.querySelectorAll('.timeline-step.active');
            if (activeSteps.length === 0) return;
            let maxActiveStepNum = 0;
            activeSteps.forEach(s => {
                const sNum = parseInt(s.getAttribute('data-step'), 10);
                if (sNum > maxActiveStepNum) maxActiveStepNum = sNum;
            });

            const progressPercent = (maxActiveStepNum / timelineSteps.length) * 100;
            if (window.innerWidth <= 768) {
                progressLine.style.height = `${progressPercent}%`;
                progressLine.style.width = '4px';
            } else {
                progressLine.style.width = `${progressPercent}%`;
                progressLine.style.height = '4px';
            }
        };

        timelineSteps.forEach(step => {
            step.addEventListener('click', function () {
                const stepNum = parseInt(this.getAttribute('data-step'), 10);

                timelineSteps.forEach(s => {
                    const sNum = parseInt(s.getAttribute('data-step'), 10);
                    if (sNum <= stepNum) {
                        s.classList.add('active');
                    } else {
                        s.classList.remove('active');
                    }
                });

                updateProgress();
            });
        });

        window.addEventListener('resize', updateProgress);
        // Initialize active state progress line
        setTimeout(updateProgress, 300);
    }

    // ==========================================================================
    // 11. TESTIMONIAL CAROUSEL SLIDER (WITH DRAG & AUTOPLAY)
    // ==========================================================================
    const testimonialTrack = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('slidePrevBtn') || document.getElementById('prevBtn');
    const nextBtn = document.getElementById('slideNextBtn') || document.getElementById('nextBtn');

    if (testimonialTrack && prevBtn && nextBtn) {
        let currentIdx = 0;
        const totalCards = testimonialTrack.children.length;

        const updateSlider = () => {
            // Cards width (420px) + gap (40px)
            const cardWidth = 420;
            const gap = 40;

            // Screen width boundaries check (adapt to mobile widths)
            const viewportWidth = window.innerWidth;
            const stepShift = viewportWidth < 480 ? 320 + gap : cardWidth + gap;

            const offset = -currentIdx * stepShift;
            testimonialTrack.style.transform = `translateX(${offset}px)`;
        };

        const slideNext = () => {
            currentIdx = (currentIdx + 1) % totalCards;
            updateSlider();
        };

        const slidePrev = () => {
            currentIdx = (currentIdx - 1 + totalCards) % totalCards;
            updateSlider();
        };

        nextBtn.addEventListener('click', slideNext);
        prevBtn.addEventListener('click', slidePrev);

        // Responsive adjustment on window resize
        window.addEventListener('resize', updateSlider);

        // Autoplay Interval (5 Seconds)
        let autoplayTimer = setInterval(slideNext, 5000);

        // Pause autoplay on mouse enter
        const sliderContainer = document.querySelector('.testimonial-slider-container, .testimonials-slider-wrapper');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
            sliderContainer.addEventListener('mouseleave', () => {
                autoplayTimer = setInterval(slideNext, 5000);
            });
        }

        // Drag Support Mechanics
        let isDragging = false;
        let startX = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        let animationID = 0;

        testimonialTrack.addEventListener('mousedown', dragStart);
        testimonialTrack.addEventListener('touchstart', dragStart);
        testimonialTrack.addEventListener('mouseup', dragEnd);
        testimonialTrack.addEventListener('mouseleave', dragEnd);
        testimonialTrack.addEventListener('touchend', dragEnd);
        testimonialTrack.addEventListener('mousemove', dragMove);
        testimonialTrack.addEventListener('touchmove', dragMove);

        function dragStart(e) {
            isDragging = true;
            startX = getPositionX(e);
            animationID = requestAnimationFrame(dragAnimation);
            testimonialTrack.style.cursor = 'grabbing';
            clearInterval(autoplayTimer);
        }

        function dragMove(e) {
            if (!isDragging) return;
            const currentPosition = getPositionX(e);
            currentTranslate = prevTranslate + currentPosition - startX;
        }

        function dragEnd() {
            isDragging = false;
            cancelAnimationFrame(animationID);
            testimonialTrack.style.cursor = 'grab';

            const movedBy = currentTranslate - prevTranslate;

            // If dragged significantly, switch card indices
            if (movedBy < -100 && currentIdx < totalCards - 1) {
                currentIdx++;
            } else if (movedBy > 100 && currentIdx > 0) {
                currentIdx--;
            }

            updateSlider();
            prevTranslate = -currentIdx * (window.innerWidth < 480 ? 360 : 460);
        }

        function getPositionX(e) {
            return e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        }

        function dragAnimation() {
            if (isDragging) {
                testimonialTrack.style.transform = `translateX(${currentTranslate}px)`;
                requestAnimationFrame(dragAnimation);
            }
        }
    }

    // ==========================================================================
    // 12. FAQ ACCORDION ENGINE
    // ==========================================================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const content = item.querySelector('.faq-content');

        if (trigger && content) {
            trigger.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Collapse all open items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    const otherContent = otherItem.querySelector('.faq-content');
                    if (otherContent) otherContent.style.maxHeight = null;
                });

                if (!isActive) {
                    item.classList.add('active');
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            });
        }
    });

    // ==========================================================================
    // 13. OFFICE GALLERY LIGHTBOX ENGINE
    // ==========================================================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('galleryLightbox');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxContent = document.getElementById('lightboxContent');

    if (galleryItems.length > 0 && lightbox && lightboxClose && lightboxCaption && lightboxContent) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const title = item.getAttribute('data-title') || 'Office Node';
                const svgContent = item.querySelector('svg');

                if (svgContent) {
                    lightboxCaption.textContent = title;
                    lightboxContent.innerHTML = svgContent.outerHTML;
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Lock scrolling
                }
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            lightboxContent.innerHTML = '';
            document.body.style.overflow = ''; // Unlock scrolling
        };

        lightboxClose.addEventListener('click', closeLightbox);

        // Close on clicking backdrop
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Close on ESC key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    // ==========================================================================
    // 14. CLIENT-SIDE PORTFOLIO FILTER ENGINE
    // ==========================================================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioGrid = document.getElementById('portfolioGrid');
    const projectCards = document.querySelectorAll('#portfolioGrid .project-card');
    const filterUnderline = document.getElementById('filterUnderline');

    if (filterBtns.length > 0 && portfolioGrid && filterUnderline) {
        const updateUnderline = (button) => {
            const rect = button.getBoundingClientRect();
            const parentRect = button.closest('.filter-wrapper').getBoundingClientRect();
            filterUnderline.style.width = `${rect.width}px`;
            filterUnderline.style.left = `${rect.left - parentRect.left}px`;
            filterUnderline.style.top = `${rect.bottom - parentRect.top + 4}px`;
        };

        // Initialize underline placement
        const activeBtn = document.querySelector('.filter-btn.active');
        if (activeBtn) {
            setTimeout(() => updateUnderline(activeBtn), 300);
        }

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                updateUnderline(btn);

                const filterVal = btn.getAttribute('data-filter');

                portfolioGrid.classList.add('filtering');

                setTimeout(() => {
                    projectCards.forEach(card => {
                        const category = card.getAttribute('data-category');
                        if (filterVal === 'all' || category === filterVal) {
                            card.style.display = 'flex';
                            setTimeout(() => {
                                card.classList.add('active');
                            }, 50);
                        } else {
                            card.style.display = 'none';
                            card.classList.remove('active');
                        }
                    });

                    portfolioGrid.classList.remove('filtering');
                }, 400);
            });
        });

        window.addEventListener('resize', () => {
            const currentActive = document.querySelector('.filter-btn.active');
            if (currentActive) updateUnderline(currentActive);
        });
    }

    // ==========================================================================
    // 15. CONTACT INTERACTIVE MAP ENGINE
    // ==========================================================================
    const officeDetails = {
        london: { title: "London Office", address: "30 St Mary Axe (The Gherkin), London EC3A 8EP", phone: "+44 20 7890 0122" },
        dubai: { title: "Dubai Office", address: "The Gate District, DIFC, Dubai, UAE, PO Box 50021", phone: "+971 4 678 0122" },
        chennai: { title: "Chennai Office", address: "100 Mount Road, Guindy, Chennai, TN 600032", phone: "+91 44 6789 0122" },
        bengluru: { title: "Bengaluru Office", address: "80 Feet Road, Koramangala, Bengaluru, KA 560034", phone: "+91 80 6789 0123" },
        hyderabad: { title: "Hyderabad Office", address: "Hitec City Phase II, Madhapur, Hyderabad, TS 500081", phone: "+91 40 6789 0124" },
        singapore: { title: "Singapore HQ", address: "Level 28, Marina Bay Sands, Tower 3, Singapore 018971", phone: "+65 6789 0122" }
    };

    window.showMapCard = function (nodeKey) {
        const details = officeDetails[nodeKey];
        const card = document.getElementById('mapOverlayCard');
        const title = document.getElementById('mapOverlayTitle');
        const addr = document.getElementById('mapOverlayAddress');
        const phone = document.getElementById('mapOverlayPhone');

        if (details && card && title && addr && phone) {
            title.innerText = details.title;
            addr.innerText = details.address;
            phone.innerText = details.phone;

            document.querySelectorAll('.map-marker-node').forEach(node => node.classList.remove('active'));

            // Format ID key matching
            let idKey = nodeKey.charAt(0).toUpperCase() + nodeKey.slice(1);
            if (nodeKey === 'bengluru') idKey = 'Bengluru';

            const activeNode = document.getElementById(`node${idKey}`);
            if (activeNode) activeNode.classList.add('active');

            card.classList.add('active');
        }
    };

    window.focusMapNode = function (nodeKey) {
        window.showMapCard(nodeKey);
        const mapSection = document.getElementById('mapSection');
        if (mapSection) {
            mapSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    // Auto load Singapore overlay on load
    const contactPageIndicator = document.body.classList.contains('contact-page');
    if (contactPageIndicator) {
        setTimeout(() => {
            window.showMapCard('singapore');
        }, 1200);
    }

    // ==========================================================================
    // 16. FAQ ACCORDION TRANSITIONS
    // ==========================================================================
    const faqHeaders = document.querySelectorAll('.faq-header');

    if (faqHeaders.length > 0) {
        faqHeaders.forEach(header => {
            header.addEventListener('click', function () {
                const item = this.closest('.faq-item');
                const panel = item.querySelector('.faq-panel');
                const isActive = item.classList.contains('active');

                // Close other panels
                document.querySelectorAll('.faq-item').forEach(i => {
                    if (i !== item) {
                        i.classList.remove('active');
                        i.querySelector('.faq-header').setAttribute('aria-expanded', 'false');
                        i.querySelector('.faq-panel').style.maxHeight = null;
                    }
                });

                // Toggle current
                if (isActive) {
                    item.classList.remove('active');
                    this.setAttribute('aria-expanded', 'false');
                    panel.style.maxHeight = null;
                } else {
                    item.classList.add('active');
                    this.setAttribute('aria-expanded', 'true');
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            });
        });
    }

});


function openAuth() {

    const modal = document.getElementById("loginModal");

    modal.style.display = "flex";

    setTimeout(() => {
        modal.classList.add("active");
    }, 10);

    showLogin();

}

function closeAuth() {

    const modal = document.getElementById("loginModal");

    modal.classList.remove("active");

    setTimeout(() => {
        modal.style.display = "none";
    }, 300);

}

window.addEventListener("click", function (e) {

    const modal = document.getElementById("loginModal");

    if (e.target === modal) {

        closeAuth();

    }

});


document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {

        closeAuth();

    }

});


function loginUser() {

    const role = document.getElementById("loginRole").value;
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (email === "" || password === "") {
        alert("Please enter Email & Password");
        return;
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userRole", role);

    if (role === "Admin") {

        window.location.href = "admin-dashboard.html";

    } else {

        window.location.href = "client-dashboard.html";

    }

}

function signupUser() {

    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const confirm = document.getElementById("confirmPassword").value;
    const role = document.getElementById("signupRole").value;

    if (name == "" || email == "" || password == "" || confirm == "") {
        alert("Fill all fields");
        return;
    }

    if (password !== confirm) {
        alert("Password not matched");
        return;
    }

    alert("Account Created Successfully");

    showLogin();

}

function forgotPassword() {

    const email = document.getElementById("forgotEmail").value;

    if (email == "") {
        alert("Enter Email");
        return;
    }

    alert("Password Reset Link Sent");

}

// ==========================
// SHOW LOGIN
// ==========================
function showLogin() {

    document.getElementById("loginBox").style.display = "block";
    document.getElementById("signupBox").style.display = "none";
    document.getElementById("forgotBox").style.display = "none";

}

// ==========================
// SHOW SIGNUP
// ==========================
function showSignup() {

    document.getElementById("loginBox").style.display = "none";
    document.getElementById("signupBox").style.display = "block";
    document.getElementById("forgotBox").style.display = "none";

}

// ==========================
function showForgot() {

    document.getElementById("loginBox").style.display = "none";
    document.getElementById("signupBox").style.display = "none";
    document.getElementById("forgotBox").style.display = "block";

}

// ==========================================================================
// CINEMATIC PROJECTS INTERACTION SUITE (Awwwards Grade)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const projectSection = document.querySelector('.projects-section');
    const projectCards = document.querySelectorAll('.project-card');

    if (!projectSection || projectCards.length === 0) return;

    // 1. DYNAMIC NUMBER WRAPPING & COUNTERS SETUP
    const animateableTextElements = document.querySelectorAll('.project-challenge, .project-result');
    animateableTextElements.forEach(el => {
        let html = el.innerHTML;
        // Match numbers, decimals, and percentage marks (e.g. 40%, 99.9%, 300%, 35%)
        html = html.replace(/(\d+(?:\.\d+)?%)/g, '<span class="stat-highlight">$1</span>');
        el.innerHTML = html;
    });

    // 2. INTERSECTION OBSERVER STAGGERED REVEAL
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Reveal section container/background
                entry.target.classList.add('visible');
                
                // Stagger card reveals
                projectCards.forEach((card, idx) => {
                    setTimeout(() => {
                        card.classList.add('revealed');
                    }, idx * 120);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealObserver.observe(projectSection);

    // 3. 3D TILT & MOUSE SPOTLIGHT ENGINE
    projectCards.forEach(card => {
        const spotlight = document.createElement('div');
        spotlight.classList.add('project-card-spotlight');
        card.appendChild(spotlight);

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = -(y - centerY) / 20;
            const rotateY = (x - centerX) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });

    // 4. PARALLAX AND APPLE PIN/SCROLL DEPTH
    window.addEventListener('scroll', () => {
        const sectionTop = projectSection.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;

        if (sectionTop < viewportHeight && sectionTop > -projectSection.offsetHeight) {
            const scrollPercent = (viewportHeight - sectionTop) / (viewportHeight + projectSection.offsetHeight);
            
            projectCards.forEach((card, idx) => {
                const img = card.querySelector('.project-gradient-bg');
                if (img) {
                    const depth = (idx % 3 === 0) ? -15 : (idx % 3 === 1 ? -25 : -35);
                    const yOffset = (scrollPercent - 0.5) * depth;
                    img.style.transform = `translateY(${yOffset}px) scale(1.1)`;
                }
            });
        }
    });
});