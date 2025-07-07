// Arquitetura de Script Profissional
// IIFE (Immediately Invoked Function Expression) para encapsular o escopo e evitar conflitos globais
(function() {
    'use strict';

    // Função para inicializar todos os módulos do site
    function init() {
        handleHeaderScroll();
        handleMobileMenu();
        handleScrollAnimations();
        handleBackToTopButton();
        handleActiveNavOnScroll();
        setupLightbox();
    }

    // Módulo 1: Comportamento do Cabeçalho ao Rolar
    function handleHeaderScroll() {
        const header = document.getElementById('main-header');
        if (!header) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Módulo 2: Menu Mobile
    function handleMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const mainNav = document.querySelector('.main-nav');
        const navLinks = document.querySelectorAll('.nav-link');

        if (!menuToggle || !mainNav) return;

        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            const isExpanded = mainNav.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });

        // Fecha o menu ao clicar em um link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // Módulo 3: Animações de Scroll com Intersection Observer
    function handleScrollAnimations() {
        const sections = document.querySelectorAll('.content-section');
        if (sections.length === 0) return;

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Anima apenas uma vez
                }
            });
        }, {
            rootMargin: '0px',
            threshold: 0.15
        });

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Módulo 4: Botão "Voltar ao Topo"
    function handleBackToTopButton() {
        const backToTopButton = document.querySelector('.back-to-top');
        if (!backToTopButton) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Módulo 5: Destaque do Link Ativo na Navegação
    function handleActiveNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        if (sections.length === 0 || navLinks.length === 0) return;

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= sectionTop - 150) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    // Módulo 6: Configuração da Lightbox
    function setupLightbox() {
        if (typeof lightbox !== 'undefined') {
            lightbox.option({
              'resizeDuration': 200,
              'wrapAround': true,
              'fadeDuration': 300,
              'imageFadeDuration': 300
            });
        }
    }

    // Inicializa o site quando o DOM estiver pronto
    document.addEventListener('DOMContentLoaded', init);

})();