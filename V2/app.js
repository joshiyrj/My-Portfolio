// Professional Portfolio - Yashraj Joshi
// Advanced JavaScript with Real GitHub Integration and Mobile-Optimized Animations
// FIXED VERSION - Critical bugs resolved

class PortfolioApp {
    constructor() {
        this.isInitialized = false;
        this.scrollProgress = 0;
        this.statsAnimated = false;
        this.projectsLoaded = false;
        this.neuralNetwork = null;
        
        // GitHub API configuration
        this.githubUsername = 'joshiyrj';
        this.githubApiUrl = 'https://api.github.com';
        
        // EmailJS configuration
        this.emailConfig = {
            serviceId: 'service_7umntgc',
            templateId: 'template_kh764vl',
            publicKey: 'pAuNMwjaXO54bpLpC'
        };
        
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeApp());
        } else {
            this.initializeApp();
        }
    }

    initializeApp() {
        if (this.isInitialized) return;
        this.isInitialized = true;

        console.log('🚀 Initializing Yashraj Joshi Portfolio...');

        // Initialize EmailJS
        this.initEmailJS();

        // Core initialization
        this.setupScrollProgress();
        this.initNavigation();
        this.initNeuralNetwork();
        this.initTypewriter();
        this.initScrollAnimations();
        this.initAIShowcase();
        this.initSkillsAnimation();
        this.initProjectsSection();
        this.initContactForm();
        this.initReadmeModal();
        this.initSocialAnimations();
        this.fixExternalLinks();
        
        // Performance optimized scroll handling
        this.setupScrollHandlers();
        
        console.log('✅ Portfolio initialized successfully');
    }

    // Fix External Links to Open in New Tabs
    fixExternalLinks() {
        // Fix social media links and any external links
        const externalLinks = document.querySelectorAll('a[href^="http"]');
        externalLinks.forEach(link => {
            if (!link.hasAttribute('target')) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
        });

        // Specifically fix the project links that will be created dynamically
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="http"]');
            if (link && !link.hasAttribute('target')) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
        });
    }

    // Scroll Progress Indicator
    setupScrollProgress() {
        const progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) return;

        const updateProgress = () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            
            progressBar.style.width = `${Math.min(progress, 100)}%`;
            this.scrollProgress = progress;
        };

        window.addEventListener('scroll', this.throttle(updateProgress, 16), { passive: true });
    }

    // FIXED: Advanced Navigation with proper smooth scrolling
    initNavigation() {
        const navbar = document.querySelector('.navbar');
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

        // FIXED: Smooth scroll navigation with proper event handling
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const href = link.getAttribute('href');
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                console.log('Navigating to:', targetId, targetElement); // Debug log
                
                if (targetElement) {
                    const navHeight = 72;
                    const targetPosition = targetElement.offsetTop - navHeight;
                    
                    // Use native smooth scroll with fallback
                    try {
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    } catch (error) {
                        // Fallback for older browsers
                        this.smoothScrollTo(targetPosition, 800);
                    }
                    
                    this.closeMobileMenu();
                    
                    // Update active nav item immediately
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                } else {
                    console.warn('Target element not found:', targetId);
                }
            });
        });

        // Mobile menu toggle
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleMobileMenu();
            });
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navbar && navMenu && !navbar.contains(e.target) && navMenu.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });

        // Active nav item on scroll
        this.updateActiveNavigation();
    }

    // Neural Network Animation for Hero Section
    initNeuralNetwork() {
        const canvas = document.getElementById('neuralCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const nodes = [];
        const connections = [];
        
        // Responsive canvas sizing
        const resizeCanvas = () => {
            const container = canvas.parentElement;
            if (container) {
                canvas.width = container.clientWidth;
                canvas.height = container.clientHeight;
            }
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Create neural network nodes
        const createNodes = () => {
            const nodeCount = Math.min(50, Math.floor(canvas.width / 30));
            nodes.length = 0;
            
            for (let i = 0; i < nodeCount; i++) {
                nodes.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    radius: Math.random() * 2 + 1,
                    alpha: Math.random() * 0.5 + 0.3
                });
            }
        };

        // Create connections between nearby nodes
        const updateConnections = () => {
            connections.length = 0;
            const maxDistance = Math.min(150, canvas.width / 8);
            
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < maxDistance) {
                        connections.push({
                            from: nodes[i],
                            to: nodes[j],
                            distance: distance,
                            maxDistance: maxDistance
                        });
                    }
                }
            }
        };

        // Animation loop
        const animate = () => {
            if (!canvas.offsetParent) {
                requestAnimationFrame(animate);
                return;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Update node positions
            nodes.forEach(node => {
                node.x += node.vx;
                node.y += node.vy;
                
                // Bounce off edges
                if (node.x <= 0 || node.x >= canvas.width) node.vx *= -1;
                if (node.y <= 0 || node.y >= canvas.height) node.vy *= -1;
                
                // Keep in bounds
                node.x = Math.max(0, Math.min(canvas.width, node.x));
                node.y = Math.max(0, Math.min(canvas.height, node.y));
            });
            
            updateConnections();
            
            // Draw connections
            connections.forEach(conn => {
                const alpha = (1 - conn.distance / conn.maxDistance) * 0.3;
                ctx.strokeStyle = `rgba(33, 128, 141, ${alpha})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(conn.from.x, conn.from.y);
                ctx.lineTo(conn.to.x, conn.to.y);
                ctx.stroke();
            });
            
            // Draw nodes
            nodes.forEach(node => {
                ctx.fillStyle = `rgba(33, 128, 141, ${node.alpha})`;
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fill();
            });
            
            requestAnimationFrame(animate);
        };

        createNodes();
        animate();

        // Recreate network on resize
        window.addEventListener('resize', () => {
            setTimeout(() => {
                resizeCanvas();
                createNodes();
            }, 100);
        });
    }

    // Enhanced Typewriter Effect
    initTypewriter() {
        const typewriterElement = document.querySelector('.typewriter');
        if (!typewriterElement) return;

        const text = 'Yashraj Joshi';
        const speed = 120;
        const delay = 1000;

        typewriterElement.textContent = '';
        typewriterElement.style.borderRight = '3px solid var(--color-primary)';

        setTimeout(() => {
            let index = 0;
            const type = () => {
                if (index < text.length) {
                    typewriterElement.textContent += text.charAt(index);
                    index++;
                    setTimeout(type, speed);
                } else {
                    // Cursor blink effect after typing
                    setTimeout(() => {
                        typewriterElement.style.animation = 'blink 1s infinite';
                    }, 1000);
                }
            };
            type();
        }, delay);
    }

    // AI Showcase Interactive Animations
    initAIShowcase() {
        const aiBlocks = document.querySelectorAll('.ai-block');
        
        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        this.startAIBlockAnimation(entry.target);
                    }, index * 100);
                }
            });
        }, { threshold: 0.2 });

        aiBlocks.forEach(block => {
            block.style.opacity = '0';
            block.style.transform = 'translateY(30px)';
            block.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(block);

            // Interactive hover effects
            block.addEventListener('mouseenter', () => {
                this.enhanceAIBlockAnimation(block);
            });

            // Touch support for mobile
            block.addEventListener('touchstart', () => {
                this.enhanceAIBlockAnimation(block);
            }, { passive: true });
        });
    }

    startAIBlockAnimation(block) {
        const tech = block.getAttribute('data-tech');
        const animation = block.querySelector('.ai-block-animation');
        
        if (animation) {
            animation.style.opacity = '1';
            animation.style.animation = 'ai-pulse 2s infinite';
        }
    }

    enhanceAIBlockAnimation(block) {
        // Create particle effect
        this.createAIParticles(block);
        
        // Enhanced glow effect
        block.style.boxShadow = '0 20px 40px rgba(33, 128, 141, 0.3)';
        
        setTimeout(() => {
            block.style.boxShadow = '';
        }, 300);
    }

    createAIParticles(block) {
        const particles = 8;
        const rect = block.getBoundingClientRect();
        
        for (let i = 0; i < particles; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: linear-gradient(45deg, #1fb8cd, #32d74b);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                opacity: 0.8;
            `;
            
            const startX = rect.left + rect.width / 2;
            const startY = rect.top + rect.height / 2;
            
            particle.style.left = startX + 'px';
            particle.style.top = startY + 'px';
            
            document.body.appendChild(particle);
            
            // Animate particle
            const angle = (360 / particles) * i;
            const distance = 50 + Math.random() * 30;
            const duration = 1000 + Math.random() * 500;
            
            particle.animate([
                {
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(0px) scale(1)`,
                    opacity: 0.8
                },
                {
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${distance}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                fill: 'forwards'
            });
            
            setTimeout(() => particle.remove(), duration);
        }
    }

    // Skills Animation with Progress Bars
    initSkillsAnimation() {
        const skillCategories = document.querySelectorAll('.skill-category');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const category = entry.target;
                    const items = category.querySelectorAll('.skill-item');
                    
                    // Stagger animation
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                            
                            // Animate skill level with progress bar
                            const level = parseInt(item.getAttribute('data-level'));
                            this.animateSkillLevel(item, level);
                        }, index * 100);
                    });
                }
            });
        }, { threshold: 0.3 });

        // Prepare items for animation
        skillCategories.forEach(category => {
            const items = category.querySelectorAll('.skill-item');
            items.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            });
            observer.observe(category);
        });
    }

    animateSkillLevel(item, targetLevel) {
        // Create progress indicator
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--color-primary), var(--color-teal-400));
            border-radius: 0 0 var(--radius-base) var(--radius-base);
            transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
            width: 0%;
            z-index: 1;
        `;
        
        item.style.position = 'relative';
        item.style.overflow = 'hidden';
        item.appendChild(progressBar);
        
        // Animate to target level
        setTimeout(() => {
            progressBar.style.width = `${targetLevel}%`;
        }, 200);
    }

    // Real GitHub Projects Integration
    async initProjectsSection() {
        console.log('🔄 Loading GitHub projects...');
        
        const projectsGrid = document.getElementById('projectsGrid');
        const projectsError = document.getElementById('projectsError');

        try {
            const projects = await this.fetchGitHubProjects();
            this.displayProjects(projects, projectsGrid);
            
            this.projectsLoaded = true;
            console.log('✅ GitHub projects loaded successfully');
            
        } catch (error) {
            console.error('❌ Error loading GitHub projects:', error);
            if (projectsError) projectsError.classList.remove('hidden');
        }
    }

    async fetchGitHubProjects() {
        const response = await fetch(`${this.githubApiUrl}/users/${this.githubUsername}/repos?sort=updated&per_page=20`);
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const repos = await response.json();
        
        // Filter and enhance repo data - exclude specific projects
        const excludedProjects = ['portfolio', 'mqtt', 'bank-reconciliation', 'bank_reconciliation'];
        const filteredRepos = repos
            .filter(repo => !repo.fork && repo.name !== this.githubUsername) // Exclude forks and profile repo
            .filter(repo => !excludedProjects.some(excluded => 
                repo.name.toLowerCase().includes(excluded.toLowerCase())
            )) // Exclude specific projects
            .map(repo => ({
                ...repo,
                category: this.categorizeProject(repo),
                image: this.getProjectImage(repo)
            }))
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

        return filteredRepos.slice(0, 12); // Limit to 12 projects
    }

    categorizeProject(repo) {
        const name = repo.name.toLowerCase();
        const description = (repo.description || '').toLowerCase();
        const language = (repo.language || '').toLowerCase();
        const topics = repo.topics || [];
        
        // AI/ML projects
        if (topics.some(topic => ['ai', 'ml', 'machine-learning', 'tensorflow', 'keras', 'pytorch', 'scikit-learn'].includes(topic)) ||
            description.includes('ai') || description.includes('ml') || description.includes('machine learning') ||
            name.includes('ai') || name.includes('ml') || language === 'python') {
            return 'machine-learning';
        }
        
        // Web development
        if (language === 'javascript' || language === 'typescript' || language === 'html' || language === 'css' ||
            topics.some(topic => ['react', 'nodejs', 'express', 'web', 'frontend', 'backend'].includes(topic))) {
            return 'web-development';
        }
        
        // Data science
        if (topics.some(topic => ['data-science', 'analytics', 'visualization'].includes(topic)) ||
            description.includes('data') || description.includes('analytics')) {
            return 'data-science';
        }
        
        // Mobile
        if (language === 'swift' || language === 'kotlin' || language === 'dart' ||
            topics.some(topic => ['mobile', 'ios', 'android', 'flutter', 'react-native'].includes(topic))) {
            return 'mobile';
        }
        
        return 'web-development'; // Default category
    }

    getProjectImage(repo) {
        // Use GitHub's OpenGraph image or a default based on language
        const imageMap = {
            javascript: 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png',
            python: 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/python/python.png',
            html: 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/html/html.png',
            css: 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/css/css.png',
            react: 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png'
        };
        
        const language = (repo.language || 'javascript').toLowerCase();
        return imageMap[language] || imageMap.javascript;
    }

    displayProjects(projects, container) {
        if (!container) return;
        container.innerHTML = '';
        
        projects.forEach((project, index) => {
            const projectCard = this.createProjectCard(project, index);
            container.appendChild(projectCard);
        });
    }

    createProjectCard(project, index) {
        const card = document.createElement('div');
        card.className = `project-card ${project.category}`;
        card.style.animationDelay = `${index * 0.1}s`;
        
        const lastUpdated = new Date(project.updated_at).toLocaleDateString();
        const description = project.description || 'No description available';
        
        card.innerHTML = `
            <div class="project-image" style="background: var(--color-bg-${(index % 8) + 1});">
                <div style="display: flex; align-items: center; justify-content: center; height: 100%; font-size: 48px; color: var(--color-primary);">
                    ${this.getProjectIcon(project.category)}
                </div>
            </div>
            <div class="project-content">
                <div class="project-header">
                    <h3 class="project-title">${project.name}</h3>
                    ${project.language ? `<span class="project-language">${project.language}</span>` : ''}
                </div>
                <p class="project-description">${description}</p>
                <div class="project-stats">
                    <div class="project-stat">
                        <span>⭐</span>
                        <span>${project.stargazers_count}</span>
                    </div>
                    <div class="project-stat">
                        <span>🍴</span>
                        <span>${project.forks_count}</span>
                    </div>
                    <div class="project-stat">
                        <span>📅</span>
                        <span>${lastUpdated}</span>
                    </div>
                </div>
                <div class="project-actions">
                    <a href="${project.html_url}" target="_blank" rel="noopener noreferrer" class="project-btn">
                        <span>View Code</span>
                        <span>→</span>
                    </a>
                    ${project.homepage ? `<a href="${project.homepage}" target="_blank" rel="noopener noreferrer" class="project-btn">Live Demo</a>` : ''}
                    <button class="project-btn readme-btn" data-repo="${project.name}" data-owner="${project.owner.login}">
                        README
                    </button>
                </div>
            </div>
        `;
        
        return card;
    }

    getProjectIcon(category) {
        const icons = {
            'machine-learning': '🤖',
            'web-development': '🌐',
            'data-science': '📊',
            'mobile': '📱'
        };
        return icons[category] || '💻';
    }

    // setupProjectFilters(projects, filterBtns, container) { // Removed filters
    //     filterBtns.forEach(btn => {
    //         btn.addEventListener('click', () => {
    //             // Update active filter
    //             filterBtns.forEach(b => b.classList.remove('active'));
    //             btn.classList.add('active');
                
    //             const filter = btn.getAttribute('data-filter');
    //             this.filterProjects(projects, filter, container);
    //         });
    //     });
    // }

    // filterProjects(projects, filter, container) { // Removed filters
    //     const filteredProjects = filter === 'all' 
    //         ? projects 
    //         : projects.filter(project => project.category === filter);
        
    //     // Animate out current projects
    //     const currentCards = container.querySelectorAll('.project-card');
    //     currentCards.forEach((card, index) => {
    //         setTimeout(() => {
    //             card.style.opacity = '0';
    //             card.style.transform = 'translateY(20px)';
    //         }, index * 50);
    //     });
        
    //     // Display filtered projects after animation
    //     setTimeout(() => {
    //         this.displayProjects(filteredProjects, container);
    //     }, currentCards.length * 50 + 200);
    // }

    // Scroll-based Animations
    initScrollAnimations() {
        // Stats counter animation
        this.initStatsAnimation();
        
        // Timeline animation
        this.initTimelineAnimation();
        
        // General fade-in animations
        this.initFadeInAnimations();
    }

    initStatsAnimation() {
        const statsContainer = document.querySelector('.stats-container');
        if (!statsContainer) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.statsAnimated) {
                    this.statsAnimated = true;
                    this.animateStats();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsContainer);
    }

    animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number[data-count]');
        
        statNumbers.forEach((stat, index) => {
            const finalValue = parseFloat(stat.getAttribute('data-count'));
            const duration = 2000;
            const startTime = performance.now();
            const isDecimal = finalValue % 1 !== 0;
            
            const animateNumber = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function (ease-out cubic)
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const currentValue = finalValue * easeOut;
                
                if (isDecimal) {
                    stat.textContent = currentValue.toFixed(1) + '+';
                } else {
                    stat.textContent = Math.floor(currentValue) + (finalValue >= 25 ? '+' : '');
                }
                
                if (progress < 1) {
                    requestAnimationFrame(animateNumber);
                }
            };
            
            // Stagger the animation start
            setTimeout(() => {
                requestAnimationFrame(animateNumber);
            }, index * 200);
        });
    }

    initTimelineAnimation() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.3 });

        timelineItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(item);
        });
    }

    initFadeInAnimations() {
        const elements = document.querySelectorAll('.cert-category, .contact-info');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(element);
        });
    }

    // Initialize EmailJS
    initEmailJS() {
        try {
            // Initialize EmailJS with your public key
            emailjs.init(this.emailConfig.publicKey);
            console.log('✅ EmailJS initialized successfully');
        } catch (error) {
            console.error('❌ Error initializing EmailJS:', error);
        }
    }

    // FIXED: Contact Form with proper validation
    initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        const inputs = form.querySelectorAll('input, textarea');
        
        // Real-time validation
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });

        // FIXED: Form submission with proper validation
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Form submitted'); // Debug log
            
            if (this.validateForm(form)) {
                await this.submitForm(form);
            } else {
                console.log('Form validation failed'); // Debug log
                this.showNotification('Please correct the errors in the form', 'error');
            }
        });
    }

    validateForm(form) {
        const formData = new FormData(form);
        let isValid = true;

        // Clear previous errors
        form.querySelectorAll('.error-message').forEach(error => error.remove());
        form.querySelectorAll('input, textarea').forEach(control => {
            control.classList.remove('error');
        });

        // Validate name
        const name = formData.get('name');
        if (!name || name.trim().length < 2) {
            this.showFieldError(form.querySelector('#name'), 'Name must be at least 2 characters');
            isValid = false;
        }

        // Validate email
        const email = formData.get('email');
        if (!email || !this.isValidEmail(email)) {
            this.showFieldError(form.querySelector('#email'), 'Please enter a valid email address');
            isValid = false;
        }

        // Validate message
        const message = formData.get('message');
        if (!message || message.trim().length < 10) {
            this.showFieldError(form.querySelector('#message'), 'Message must be at least 10 characters');
            isValid = false;
        }

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        
        switch (field.name) {
            case 'name':
                if (value.length < 2) {
                    this.showFieldError(field, 'Name must be at least 2 characters');
                    return false;
                }
                break;
            case 'email':
                if (!this.isValidEmail(value)) {
                    this.showFieldError(field, 'Please enter a valid email address');
                    return false;
                }
                break;
            case 'message':
                if (value.length < 10) {
                    this.showFieldError(field, 'Message must be at least 10 characters');
                    return false;
                }
                break;
        }
        
        this.clearFieldError(field);
        return true;
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        
        field.classList.add('error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: var(--color-error);
            font-size: var(--font-size-sm);
            margin-top: var(--space-4);
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease;
        `;
        
        field.parentElement.appendChild(errorElement);
        
        setTimeout(() => {
            errorElement.style.opacity = '1';
            errorElement.style.transform = 'translateY(0)';
        }, 10);
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorMessage = field.parentElement.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async submitForm(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.querySelector('span').textContent;
        
        // Show loading state
        submitBtn.querySelector('span').textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        
        try {
            // Get form data
            const formData = new FormData(form);
            const templateParams = {
                from_name: formData.get('name'),
                from_email: formData.get('email'),
                subject: formData.get('subject') || 'Portfolio Contact Form',
                message: formData.get('message'),
                to_email: 'joshiyrj@gmail.com'
            };

            // Send email using EmailJS
            const response = await emailjs.send(
                this.emailConfig.serviceId,
                this.emailConfig.templateId,
                templateParams
            );

            if (response.status === 200) {
                this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                form.reset();
            } else {
                throw new Error('Email service returned non-200 status');
            }
            
        } catch (error) {
            console.error('Error sending email:', error);
            this.showNotification('Error sending message. Please email me directly at joshiyrj@gmail.com', 'error');
        } finally {
            submitBtn.querySelector('span').textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }
    }

    // FIXED: README Modal System
    initReadmeModal() {
        const modal = document.getElementById('readmeModal');
        const closeBtn = modal?.querySelector('.modal-close');
        const backdrop = modal?.querySelector('.modal-backdrop');

        if (!modal) return;

        // FIXED: Event delegation for README buttons (including dynamically created ones)
        document.addEventListener('click', (e) => {
            if (e.target.matches('.readme-btn') || e.target.closest('.readme-btn')) {
                e.preventDefault();
                e.stopPropagation();
                
                const btn = e.target.matches('.readme-btn') ? e.target : e.target.closest('.readme-btn');
                const repo = btn.getAttribute('data-repo');
                const owner = btn.getAttribute('data-owner') || this.githubUsername;
                
                console.log('Opening README for:', repo, owner); // Debug log
                this.showReadmeModal(repo, owner);
            }
        });

        closeBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            this.hideReadmeModal();
        });
        
        backdrop?.addEventListener('click', () => this.hideReadmeModal());
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                this.hideReadmeModal();
            }
        });
    }

    async showReadmeModal(repo, owner) {
        const modal = document.getElementById('readmeModal');
        const title = document.getElementById('readmeTitle');
        const content = document.getElementById('readmeContent');
        
        if (!modal || !title || !content) return;
        
        title.textContent = `${repo} - README`;
        content.innerHTML = '<div class="loading-spinner"></div><p>Loading README...</p>';
        
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        try {
            const readmeContent = await this.fetchReadmeContent(repo, owner);
            content.innerHTML = readmeContent;
        } catch (error) {
            console.error('Error loading README:', error);
            content.innerHTML = `
                <div style="text-align: center; color: var(--color-text-secondary);">
                    <p>Unable to load README for this repository.</p>
                    <p><a href="https://github.com/${owner}/${repo}" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary);">View on GitHub →</a></p>
                </div>
            `;
        }
    }

    async fetchReadmeContent(repo, owner) {
        try {
            const response = await fetch(`${this.githubApiUrl}/repos/${owner}/${repo}/readme`);
            
            if (!response.ok) {
                throw new Error('README not found');
            }
            
            const data = await response.json();
            const readmeContent = atob(data.content);
            
            // Basic markdown to HTML conversion
            return this.markdownToHtml(readmeContent);
            
        } catch (error) {
            throw new Error('Failed to fetch README');
        }
    }

    markdownToHtml(markdown) {
        // Decode HTML entities first
        const decodedMarkdown = this.decodeHtmlEntities(markdown);
        
        let html = decodedMarkdown
            .replace(/^# (.*$)/gm, '<h2>$1</h2>')
            .replace(/^## (.*$)/gm, '<h3>$1</h3>')
            .replace(/^### (.*$)/gm, '<h4>$1</h4>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
            .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/^\* (.*)$/gm, '<li>$1</li>')
            .replace(/^\d+\. (.*)$/gm, '<li>$1</li>')
            .replace(/\n\n/g, '<br><br>')
            .replace(/\n/g, '<br>');
        
        return html;
    }

    decodeHtmlEntities(text) {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = text;
        return textarea.value;
    }

    hideReadmeModal() {
        const modal = document.getElementById('readmeModal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }

    // Social Media Animation Effects
    initSocialAnimations() {
        const socialBtns = document.querySelectorAll('.social-btn');
        
        socialBtns.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                this.createSocialParticles(btn);
            });
            
            btn.addEventListener('click', (e) => {
                this.createRippleEffect(e, btn);
            });
        });
    }

    createSocialParticles(btn) {
        const particles = 6;
        const rect = btn.getBoundingClientRect();
        
        for (let i = 0; i < particles; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 3px;
                height: 3px;
                background: currentColor;
                border-radius: 50%;
                pointer-events: none;
                opacity: 0.6;
                z-index: 1000;
            `;
            
            const startX = rect.left + rect.width / 2;
            const startY = rect.top + rect.height / 2;
            
            particle.style.left = startX + 'px';
            particle.style.top = startY + 'px';
            
            document.body.appendChild(particle);
            
            // Random direction and distance
            const angle = (360 / particles) * i + Math.random() * 45;
            const distance = 20 + Math.random() * 20;
            
            particle.animate([
                {
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(0px) scale(1)`,
                    opacity: 0.6
                },
                {
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${distance}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: 1200,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                fill: 'forwards'
            });
            
            setTimeout(() => particle.remove(), 1200);
        }
    }

    createRippleEffect(e, btn) {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            pointer-events: none;
            transform: scale(0);
            left: ${x - 10}px;
            top: ${y - 10}px;
            width: 20px;
            height: 20px;
        `;
        
        btn.style.position = 'relative';
        btn.appendChild(ripple);
        
        ripple.animate([
            { transform: 'scale(0)', opacity: 1 },
            { transform: 'scale(4)', opacity: 0 }
        ], {
            duration: 600,
            easing: 'ease-out'
        });
        
        setTimeout(() => ripple.remove(), 600);
    }

    // Notification System
    showNotification(message, type = 'info') {
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        
        const icon = type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ';
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 18px;">${icon}</span>
                <span>${message}</span>
            </div>
        `;
        
        const colors = {
            success: 'var(--color-success)',
            error: 'var(--color-error)',
            info: 'var(--color-primary)'
        };
        
        Object.assign(notification.style, {
            position: 'fixed',
            top: '24px',
            right: '24px',
            padding: '16px 24px',
            borderRadius: 'var(--radius-lg)',
            color: 'var(--color-btn-primary-text)',
            fontWeight: '500',
            fontSize: 'var(--font-size-sm)',
            zIndex: '10000',
            opacity: '0',
            transform: 'translateX(100%)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            maxWidth: '400px',
            boxShadow: 'var(--shadow-lg)',
            background: colors[type]
        });

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 400);
        }, 5000);
    }

    // FIXED: Mobile Menu Functions
    toggleMobileMenu() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            if (navToggle.classList.contains('active')) {
                this.closeMobileMenu();
            } else {
                this.openMobileMenu();
            }
        }
    }

    openMobileMenu() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.classList.add('active');
            navMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeMobileMenu() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // FIXED: Update Active Navigation
    updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
        
        const updateActive = () => {
            let activeSection = '';
            const scrollPosition = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    activeSection = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href === `#${activeSection}`) {
                    link.classList.add('active');
                }
            });
        };
        
        window.addEventListener('scroll', this.throttle(updateActive, 100), { passive: true });
    }

    // FIXED: Smooth Scroll Function
    smoothScrollTo(target, duration = 800) {
        const start = window.pageYOffset;
        const distance = target - start;
        const startTime = performance.now();

        const scroll = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out cubic)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            window.scrollTo(0, start + distance * easeOut);
            
            if (progress < 1) {
                requestAnimationFrame(scroll);
            }
        };
        
        requestAnimationFrame(scroll);
    }

    // Setup Performance-Optimized Scroll Handlers
    setupScrollHandlers() {
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // Utility Functions
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    debounce(func, delay) {
        let timeoutId;
        return function() {
            const args = arguments;
            const context = this;
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(context, args), delay);
        };
    }
}

// Add dynamic CSS animations with fixes
const addDynamicStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        .form-control.error {
            border-color: var(--color-error) !important;
            box-shadow: 0 0 0 3px rgba(192, 21, 47, 0.1) !important;
        }
        
        @media (prefers-color-scheme: dark) {
            .form-control.error {
                box-shadow: 0 0 0 3px rgba(255, 84, 89, 0.1) !important;
            }
        }
        
        .notification {
            animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .project-card {
            animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        /* Ensure smooth scrolling works */
        html {
            scroll-behavior: smooth;
        }
        
        /* Fix navigation active states */
        .nav-menu a.active {
            color: var(--color-primary) !important;
            background: var(--color-secondary);
        }
        
        .nav-menu a.active::before {
            width: 20px !important;
        }
        
        /* Enhanced responsive design */
        @media (max-width: 768px) {
            .hero-stats {
                grid-template-columns: 1fr;
                gap: var(--space-12);
            }
            
            .project-actions {
                flex-wrap: wrap;
                gap: var(--space-6);
            }
            
            .modal-content {
                margin: var(--space-12);
                max-height: 90vh;
            }
            
            /* Fix mobile menu positioning */
            .nav-menu.active {
                display: flex !important;
            }
            
            /* Enhanced mobile navigation */
            .nav-menu li a {
                font-size: var(--font-size-base);
                padding: var(--space-12) var(--space-16);
                margin: var(--space-4) 0;
                border-radius: var(--radius-base);
                transition: all 0.3s ease;
            }
            
            .nav-menu li a:hover {
                transform: scale(1.02);
                background: var(--color-secondary);
            }
            
            /* Profile image mobile optimization */
            .profile-image svg {
                animation: mobileProfileFloat 4s ease-in-out infinite;
            }
        }
        
        @keyframes mobileProfileFloat {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-4px);
            }
        }
        
        @media (max-width: 480px) {
            .hero-title {
                font-size: clamp(2rem, 8vw, 3rem);
            }
            
            .hero-subtitle {
                font-size: var(--font-size-base);
            }
            
            .hero-description {
                font-size: var(--font-size-sm);
            }
            
            .section-title {
                font-size: clamp(1.5rem, 6vw, 2rem);
            }
            
            .project-actions {
                flex-direction: column;
            }
            
            .project-btn {
                width: 100%;
                justify-content: center;
            }
            
            .contact-form {
                padding: var(--space-16);
            }
        }
        
        /* Touch device optimizations */
        @media (hover: none) and (pointer: coarse) {
            .nav-menu a:hover {
                transform: none;
            }
            
            .nav-menu a:active {
                transform: scale(0.98);
                background: var(--color-secondary);
            }
        }
        
        /* High contrast mode support */
        @media (prefers-contrast: high) {
            .nav-menu a {
                border: 1px solid transparent;
            }
            
            .nav-menu a:hover,
            .nav-menu a.active {
                border-color: var(--color-primary);
            }
        }
    `;
    document.head.appendChild(style);
};

// Initialize everything
addDynamicStyles();
const portfolioApp = new PortfolioApp();

// Console branding
console.log(`
🚀 Yashraj Joshi Portfolio - FIXED VERSION
✅ Navigation smooth scrolling - FIXED
✅ README modal functionality - FIXED  
✅ Contact form validation - FIXED
✅ External links target="_blank" - FIXED
📱 Fully responsive and mobile-optimized
⚡ Performance optimized
🔒 Accessible and SEO-friendly

🎯 All critical bugs resolved!

Contact: joshiyrj@gmail.com
GitHub: https://github.com/joshiyrj
LinkedIn: https://linkedin.com/in/yashrajjoshi

Built with ❤️ in Kolkata, India
`);