

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
    const mobileSidebar = document.getElementById('mobileSidebar');
    const closeSidebar = document.getElementById('closeSidebar');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuToggle && mobileOverlay) {

        const getScrollbarWidth = () => {
            return window.innerWidth - document.documentElement.clientWidth;
        };

        const preventTouchScroll = (e) => {
            if (mobileSidebar && !mobileSidebar.contains(e.target)) {
                e.preventDefault();
            }
        };

        const openMenu = () => {
            const scrollbarWidth = getScrollbarWidth();
            if (scrollbarWidth > 0) {
                document.body.style.paddingRight = `${scrollbarWidth}px`;
                const navbar = document.getElementById('mainNavbar');
                if (navbar) {
                    navbar.style.paddingRight = `${scrollbarWidth}px`;
                }
            }

            mobileOverlay.classList.add('active');
            mobileMenuToggle.classList.add('active');
            if (mobileSidebar) mobileSidebar.classList.add('active');
            document.body.classList.add('menu-open');
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';

            document.addEventListener('touchmove', preventTouchScroll, { passive: false });
        };

        const closeMenu = () => {
            mobileOverlay.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            if (mobileSidebar) mobileSidebar.classList.remove('active');
            document.body.classList.remove('menu-open');
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            document.body.style.paddingRight = '';
            const navbar = document.getElementById('mainNavbar');
            if (navbar) {
                navbar.style.paddingRight = '';
            }

            document.removeEventListener('touchmove', preventTouchScroll);
        };

        mobileMenuToggle.addEventListener('click', () => {
            if (mobileOverlay.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        if (closeSidebar) {
            closeSidebar.addEventListener('click', closeMenu);
        }

        // Close menu when clicking the overlay backdrop itself
        mobileOverlay.addEventListener('click', (e) => {
            if (e.target === mobileOverlay) {
                closeMenu();
            }
        });

        // Close mobile overlay on clicking links
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close mobile overlay when pressing the Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileOverlay.classList.contains('active')) {
                closeMenu();
            }
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
            if (window.innerWidth <= 1024) return;
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
            if (window.innerWidth <= 1024) {
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


// ==========================================
// CUSTOM PREMIUM TOAST AND VALIDATION ERRORS
// ==========================================
function showToast(title, message, type = 'success') {
    let container = document.getElementById('customToastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'customToastContainer';
        container.className = 'custom-toast-container';
        document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    toast.className = `custom-toast custom-toast-${type}`;
    
    const iconSvg = type === 'success' ? 
        `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>` :
        `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
        
    toast.innerHTML = `
        <div class="custom-toast-icon">${iconSvg}</div>
        <div class="custom-toast-content">
            <div class="custom-toast-title">${title}</div>
            <div class="custom-toast-message">${message}</div>
        </div>
        <div class="custom-toast-close">&times;</div>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    const autoRemoveTimeout = setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 400);
    }, 4000);
    
    toast.querySelector('.custom-toast-close').addEventListener('click', () => {
        clearTimeout(autoRemoveTimeout);
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 400);
    });
}

function showInputError(input, message) {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    
    let container = input;
    if (input.parentNode && input.parentNode.classList.contains('password-toggle-wrapper')) {
        container = input.parentNode;
    }
    
    let errorSpan = container.parentNode.querySelector(`.error-msg[data-for="${input.id}"]`);
    if (!errorSpan) {
        errorSpan = document.createElement('span');
        errorSpan.className = 'error-msg';
        errorSpan.setAttribute('data-for', input.id);
        container.parentNode.insertBefore(errorSpan, container.nextSibling);
    }
    errorSpan.innerText = message;
    
    if (input.parentNode && input.parentNode.classList.contains('input-group')) {
        input.parentNode.classList.add('has-error');
    }
}

function clearInputError(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    
    let container = input;
    if (input.parentNode && input.parentNode.classList.contains('password-toggle-wrapper')) {
        container = input.parentNode;
    }
    
    const errorSpan = container.parentNode.querySelector(`.error-msg[data-for="${input.id}"]`);
    if (errorSpan) {
        errorSpan.remove();
    }
    
    if (input.parentNode && input.parentNode.classList.contains('input-group')) {
        input.parentNode.classList.remove('has-error');
    }
}

// Global Password Visibility Toggle Helper
function togglePasswordVisibility(btn) {
    const input = btn.parentNode.querySelector('input');
    if (!input) return;
    
    if (input.type === 'password') {
        input.type = 'text';
        btn.innerHTML = `
            <svg class="eye-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="20" height="20">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>
        `;
    } else {
        input.type = 'password';
        btn.innerHTML = `
            <svg class="eye-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="20" height="20">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
        `;
    }
}

document.addEventListener('click', (e) => {
    const btn = e.target.closest('.password-toggle-btn');
    if (!btn) return;
    
    e.preventDefault();
    togglePasswordVisibility(btn);
});

document.addEventListener('keydown', (e) => {
    const btn = e.target.closest('.password-toggle-btn');
    if (!btn) return;
    
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        togglePasswordVisibility(btn);
    }
});

function openAuth() {

    const modal = document.getElementById("loginModal");

    modal.style.display = "flex";

    setTimeout(() => {
        modal.classList.add("active");
    }, 10);

    // Lock body scrolling when modal is open
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    showLogin();

}

function closeAuth() {

    const modal = document.getElementById("loginModal");

    modal.classList.remove("active");

    setTimeout(() => {
        modal.style.display = "none";
        // Unlock body scrolling when modal is closed
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
    }, 300);

}

function openAuthMobile(event) {
    if (event) {
        event.stopImmediatePropagation();
        event.preventDefault();
    }
    const closeSidebar = document.getElementById('closeSidebar');
    if (closeSidebar) {
        closeSidebar.click();
    }
    openAuth();
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


let loginInProgress = false;
let signupInProgress = false;

function loginUser() {
    if (loginInProgress) return;

    const emailEl = document.getElementById("loginEmail");
    const passwordEl = document.getElementById("loginPassword");
    const roleEl = document.getElementById("loginRole");

    const email = emailEl.value.trim();
    const password = passwordEl.value.trim();
    const role = roleEl.value;

    let formValid = true;

    if (email === "") {
        showInputError(emailEl, "Email is required.");
        formValid = false;
    }
    if (password === "") {
        showInputError(passwordEl, "Password is required.");
        formValid = false;
    }

    if (!formValid) {
        showToast("Validation Failed", "Please enter both email and password.", "error");
        return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        showInputError(emailEl, "Please enter a valid email address.");
        formValid = false;
    }

    const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    if (!pwdRegex.test(password)) {
        showInputError(passwordEl, "Requires 8+ chars, upper, lower, digit, special.");
        formValid = false;
    }

    if (!formValid) {
        showToast("Validation Failed", "Credentials do not meet security requirements.", "error");
        return;
    }

    loginInProgress = true;
    const submitBtn = document.querySelector("#loginBox button[type='submit']");
    const originalText = submitBtn ? submitBtn.innerHTML : "Log In";
    if (submitBtn) {
        submitBtn.innerHTML = "Verifying Credentials...";
        submitBtn.disabled = true;
    }

    // Seed default users in localStorage if empty
    let users = [];
    try {
        users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
        if (!Array.isArray(users)) users = [];
    } catch(e) {
        users = [];
    }

    if (users.length === 0) {
        users = [
            { name: "System Administrator", email: "admin@stackly.com", password: "Admin@1234", role: "admin" },
            { name: "John Client", email: "client@stackly.com", password: "Client@1234", role: "user" }
        ];
        localStorage.setItem("registeredUsers", JSON.stringify(users));
    }

    const matchedUser = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

    setTimeout(() => {
        if (!matchedUser) {
            showToast("Login Failed", "Invalid email or password.", "error");
            showInputError(emailEl, "Invalid credentials.");
            showInputError(passwordEl, "Invalid credentials.");
            loginInProgress = false;
            if (submitBtn) {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
            return;
        }

        const selectedRole = role.toLowerCase();
        const userRoleNormalized = matchedUser.role.toLowerCase();

        const isRoleMatch = (selectedRole === "admin" && userRoleNormalized === "admin") ||
                            (selectedRole === "client" && (userRoleNormalized === "client" || userRoleNormalized === "user"));

        if (!isRoleMatch) {
            showToast("Role Mismatch", `No account associated with role ${role} found.`, "error");
            showInputError(roleEl, "Role mismatch.");
            loginInProgress = false;
            if (submitBtn) {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
            return;
        }

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", matchedUser.email);
        localStorage.setItem("userName", matchedUser.name);
        
        const finalRole = selectedRole === "admin" ? "Admin" : "Client";
        localStorage.setItem("userRole", finalRole);

        showToast("Welcome Back", `Successfully authenticated as ${matchedUser.name}.`, "success");

        setTimeout(() => {
            if (finalRole === "Admin") {
                window.location.href = "admin-dashboard.html";
            } else {
                window.location.href = "client-dashboard.html";
            }
        }, 500);

    }, 1000);
}

function signupUser() {
    if (signupInProgress) return;

    const nameEl = document.getElementById("signupName");
    const emailEl = document.getElementById("signupEmail");
    const passwordEl = document.getElementById("signupPassword");
    const confirmEl = document.getElementById("confirmPassword");
    const roleEl = document.getElementById("signupRole");

    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const password = passwordEl.value.trim();
    const confirm = confirmEl.value.trim();
    const role = roleEl.value;

    let formValid = true;

    if (name === "") {
        showInputError(nameEl, "Full Name is required.");
        formValid = false;
    }
    if (email === "") {
        showInputError(emailEl, "Email Address is required.");
        formValid = false;
    }
    if (password === "") {
        showInputError(passwordEl, "Password is required.");
        formValid = false;
    }
    if (confirm === "") {
        showInputError(confirmEl, "Confirm Password is required.");
        formValid = false;
    }

    if (!formValid) {
        showToast("Validation Failed", "Please fill in all mandatory fields.", "error");
        return;
    }

    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
        showInputError(nameEl, "Full Name must contain letters and spaces only.");
        formValid = false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        showInputError(emailEl, "Please enter a valid email address.");
        formValid = false;
    }

    const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    if (!pwdRegex.test(password)) {
        showInputError(passwordEl, "Requires 8+ chars, upper, lower, digit, special.");
        formValid = false;
    }

    if (password !== confirm) {
        showInputError(confirmEl, "Passwords do not match.");
        formValid = false;
    }

    if (!formValid) {
        showToast("Validation Failed", "Please correct form validation issues.", "error");
        return;
    }

    signupInProgress = true;
    const submitBtn = document.querySelector("#signupBox button[type='submit']");
    const originalText = submitBtn ? submitBtn.innerHTML : "Create Account";
    if (submitBtn) {
        submitBtn.innerHTML = "Creating Account...";
        submitBtn.disabled = true;
    }

    let users = [];
    try {
        users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
        if (!Array.isArray(users)) users = [];
    } catch(e) {
        users = [];
    }

    const userExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (userExists) {
        setTimeout(() => {
            showInputError(emailEl, "An account with this email already exists.");
            showToast("Registration Failed", "Email is already registered.", "error");
            signupInProgress = false;
            if (submitBtn) {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        }, 800);
        return;
    }

    users.push({ name, email, password, role });
    localStorage.setItem("registeredUsers", JSON.stringify(users));

    setTimeout(() => {
        showToast("Success", "Account created successfully! Please log in.", "success");
        nameEl.value = "";
        emailEl.value = "";
        passwordEl.value = "";
        confirmEl.value = "";
        
        nameEl.classList.remove('is-valid', 'is-invalid');
        emailEl.classList.remove('is-valid', 'is-invalid');
        passwordEl.classList.remove('is-valid', 'is-invalid');
        confirmEl.classList.remove('is-valid', 'is-invalid');

        signupInProgress = false;
        if (submitBtn) {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }

        showLogin();
    }, 1000);
}

function forgotPassword() {
    window.location.href = "404.html";
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

    // ==========================================
    // CAREERS PAGE INTERACTIVE CANVAS ANIMATION
    // ==========================================
    function initCareersCanvas() {
        const canvas = document.getElementById('careersCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width = canvas.width = canvas.offsetWidth || 500;
        let height = canvas.height = canvas.offsetHeight || 500;

        const particles = [];
        const maxParticles = 40;
        const connectionDist = 100;

        window.addEventListener('resize', () => {
            if (!canvas) return;
            width = canvas.width = canvas.offsetWidth || 500;
            height = canvas.height = canvas.offsetHeight || 500;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.8;
                this.vy = (Math.random() - 0.5) * 0.8;
                this.radius = Math.random() * 2.5 + 1.5;
                this.glowColor = '#00f0ff';
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.glowColor;
                ctx.shadowBlur = 10;
                ctx.shadowColor = this.glowColor;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        for (let i = 0; i < maxParticles; i++) {
            particles.push(new Particle());
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            // Draw particles
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            // Draw connecting lines
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const p1 = particles[i];
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDist) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        const opacity = 1 - (dist / connectionDist);
                        ctx.strokeStyle = `rgba(0, 240, 255, ${opacity * 0.25})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animate);
        }

        animate();
    }
    initCareersCanvas();

    // ==========================================
    // INTERACTIVE FORM VALIDATIONS
    // ==========================================
    function setupFormLiveValidations() {
        const nameRegex = /^[A-Za-z\s]+$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneRegex = /^[0-9]+$/;
        const companyRegex = /^[A-Za-z0-9\s]+$/;
        const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

        // Trim on blur
        const allTextInputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
        allTextInputs.forEach(input => {
            input.addEventListener('blur', () => {
                input.value = input.value.trim();
            });
        });

        // Restrict signupName to letters and spaces only
        const signupName = document.getElementById('signupName');
        if (signupName) {
            signupName.addEventListener('input', () => {
                const originalVal = signupName.value;
                const cleanedVal = originalVal.replace(/[^A-Za-z\s]/g, '');
                if (originalVal !== cleanedVal) {
                    signupName.value = cleanedVal;
                    showInputError(signupName, 'Full Name must contain letters and spaces only.');
                } else if (cleanedVal.trim() === '') {
                    signupName.classList.remove('is-valid', 'is-invalid');
                    const err = document.querySelector(`.error-msg[data-for="signupName"]`);
                    if (err) err.remove();
                } else {
                    clearInputError(signupName);
                }
            });
        }

        // Live checking helper
        function setupField(id, regex, errorMsg) {
            const el = document.getElementById(id);
            if (!el) return;
            el.addEventListener('input', () => {
                const val = el.value.trim();
                if (val === '') {
                    el.classList.remove('is-valid', 'is-invalid');
                    const err = document.querySelector(`.error-msg[data-for="${id}"]`);
                    if (err) err.remove();
                    if (el.parentNode && el.parentNode.classList.contains('input-group')) {
                        el.parentNode.classList.remove('has-error');
                    }
                } else if (!regex.test(val)) {
                    showInputError(el, errorMsg);
                } else {
                    clearInputError(el);
                }
            });
        }

        // Setup Contact Form fields
        setupField('fullName', nameRegex, 'Only letters and spaces are allowed.');
        setupField('companyName', companyRegex, 'Only letters, numbers, and spaces.');
        setupField('businessEmail', emailRegex, 'Invalid email structure.');
        setupField('phoneNumber', phoneRegex, 'Digits only. No spaces or symbols.');
        setupField('country', nameRegex, 'Only letters and spaces.');

        // Setup Modal Form fields
        setupField('signupEmail', emailRegex, 'Invalid email structure.');
        setupField('signupPassword', pwdRegex, 'Requires 8+ chars, upper, lower, digit, special.');
        setupField('loginEmail', emailRegex, 'Invalid email structure.');
        setupField('loginPassword', pwdRegex, 'Requires 8+ chars, upper, lower, digit, special.');

        // Confirm Password validation link
        const signupPassword = document.getElementById('signupPassword');
        const confirmPassword = document.getElementById('confirmPassword');
        if (signupPassword && confirmPassword) {
            confirmPassword.addEventListener('input', () => {
                const pVal = signupPassword.value.trim();
                const cVal = confirmPassword.value.trim();
                if (cVal === '') {
                    confirmPassword.classList.remove('is-valid', 'is-invalid');
                } else if (pVal !== cVal) {
                    confirmPassword.classList.remove('is-valid');
                    confirmPassword.classList.add('is-invalid');
                } else {
                    confirmPassword.classList.remove('is-invalid');
                    confirmPassword.classList.add('is-valid');
                }
            });
        }

        // Intercept contactForm submission for final checks
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                const fields = [
                    { id: 'fullName', regex: nameRegex, msg: 'Name must contain letters and spaces only.' },
                    { id: 'companyName', regex: companyRegex, msg: 'Company Name must contain letters and numbers only.' },
                    { id: 'businessEmail', regex: emailRegex, msg: 'Please enter a valid business email address.' },
                    { id: 'phoneNumber', regex: phoneRegex, msg: 'Phone Number must contain digits only.' },
                    { id: 'country', regex: nameRegex, msg: 'Country must contain letters and spaces only.' }
                ];

                let formValid = true;
                fields.forEach(field => {
                    const el = document.getElementById(field.id);
                    if (el) {
                        const val = el.value.trim();
                        if (!field.regex.test(val)) {
                            showInputError(el, field.msg);
                            formValid = false;
                        }
                    }
                });

                if (!formValid) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    showToast("Form Error", "Please correct the highlighted fields before submitting.", "error");
                }
            });
        }
    }
    setupFormLiveValidations();
});

