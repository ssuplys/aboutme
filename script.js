document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================================================
       Dicionário de Traduções (i18n — PT / EN)
       ========================================================================== */
    const translations = {
        pt: {
            navTitle: "Navegação",
            navHome: "Início",
            navAbout: "Sobre",
            navProjects: "Projetos",
            badgeAbout: "DevSecOps",
            heroTitle: 'Olá, eu sou <span class="gradient-text">Lys</span>',
            heroSub: "Bem-vindo ao meu espaço pessoal! Aqui compartilho um pouco sobre as músicas que eu gosto, meus jogos favoritos e os times que torço com paixão (ou dor).",
            scrollBtn: "Conheça meus gostos",
            musicTitle: "Minhas Músicas Favoritas",
            listenSpotify: "Ouvir no Spotify",
            gamesTitle: "Meus Jogos Favoritos",
            teamsTitle: "Times do Coração",
            footerHeart: "Feito com",
            footerBy: "por",
            copyDiscord: "@ssuplys",
            badgeProjects: "🚀 Portfolio & Criações",
            projectsTitle: 'Meus <span class="gradient-text">Projetos</span>',
            projectsSub: "Confira os principais projetos em que venho trabalhando ultimamente.",
            emptyProjectsTitle: "Projetos em Breve",
            emptyProjectsSub: "Novas criações e projetos serão adicionados aqui em breve. Fique atento!",
            welcomeTitle: 'Olá, seja bem-vindo(a)! <span class="sparkle">✨</span>',
            welcomeSub: "Aguarde um instante enquanto preparamos a experiência completa para você...",
            welcomeBtn: "Entrar no site de Lys →"
        },
        en: {
            navTitle: "Navigation",
            navHome: "Home",
            navAbout: "About",
            navProjects: "Projects",
            badgeAbout: "DevSecOps",
            heroTitle: 'Hello, I am <span class="gradient-text">Lys</span>',
            heroSub: "Welcome to my personal space! Here I share a bit about the music I like, my favorite games, and the teams I root for with passion (or pain).",
            scrollBtn: "Explore my interests",
            musicTitle: "My Favorite Songs",
            listenSpotify: "Listen on Spotify",
            gamesTitle: "My Favorite Games",
            teamsTitle: "Favorite Teams",
            footerHeart: "Made with",
            footerBy: "by",
            copyDiscord: "@ssuplys",
            badgeProjects: "🚀 Portfolio & Creations",
            projectsTitle: 'My <span class="gradient-text">Projects</span>',
            projectsSub: "Check out the main projects I've been working on lately.",
            emptyProjectsTitle: "Projects Coming Soon",
            emptyProjectsSub: "New creations and projects will be added here soon. Stay tuned!",
            welcomeTitle: 'Hello, welcome! <span class="sparkle"></span>',
            welcomeSub: "Please wait a moment while we prepare the complete experience for you...",
            welcomeBtn: "Enter Lys's website →"
        }
    };

    // Estado e Inicialização do Idioma (PT se Português, EN se Inglês)
    let currentLang = localStorage.getItem("preferred-lang") || "pt";
    const langBtn = document.getElementById("lang-toggle");

    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem("preferred-lang", lang);
        document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";

        if (langBtn) {
            // Mostra PT quando em Português e EN quando em Inglês
            langBtn.textContent = lang === "pt" ? "PT" : "EN";
            langBtn.title = lang === "pt" ? "Idioma atual: Português (clique para Inglês)" : "Current language: English (click for Portuguese)";
        }

        const elementsToTranslate = document.querySelectorAll("[data-i18n]");
        elementsToTranslate.forEach(el => {
            const key = el.getAttribute("data-i18n");
            if (translations[lang] && translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });
    }

    if (langBtn) {
        langBtn.addEventListener("click", () => {
            const newLang = currentLang === "pt" ? "en" : "pt";
            applyLanguage(newLang);
        });
    }

    // Aplica idioma salvo no carregamento
    applyLanguage(currentLang);

    /* ==========================================================================
       Tela de Carregamento Suave & Transições
       ========================================================================== */
    const logoSymbol = document.getElementById("logo-symbol");
    const loadingScreen = document.getElementById("loading-screen");
    const homePage = document.getElementById("home-page");

    setTimeout(() => {
        transitionToHome();
    }, 1800);

    function transitionToHome() {
        if (logoSymbol) {
            logoSymbol.classList.add('expand');
        }

        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
            }

            document.body.style.overflowY = 'auto';
            document.body.style.overflowX = 'hidden';

            if (homePage) {
                homePage.classList.remove('hidden');
                void homePage.offsetWidth;
                homePage.classList.add('visible');

                // Transição automática para a página sobre caso esteja na index
                setTimeout(() => {
                    window.location.href = 'about.html';
                }, 3000);
            }
        }, 500);
    }

    /* ==========================================================================
       Controle do Menu Lateral & Backdrop Overlay
       ========================================================================== */
    const menuIcon = document.getElementById("header-h1");
    const sideMenu = document.getElementById("side-menu");
    const closeBtn = document.getElementById("close-menu");
    const menuBackdrop = document.getElementById("menu-backdrop");

    if (menuIcon && sideMenu && closeBtn) {
        const openMenu = () => {
            sideMenu.classList.add("open");
            if (menuBackdrop) menuBackdrop.classList.add("active");
            menuIcon.classList.add("hidden");
        };

        const closeMenu = () => {
            sideMenu.classList.remove("open");
            if (menuBackdrop) menuBackdrop.classList.remove("active");
            menuIcon.classList.remove("hidden");
        };

        menuIcon.addEventListener("click", openMenu);
        closeBtn.addEventListener("click", closeMenu);

        if (menuBackdrop) {
            menuBackdrop.addEventListener("click", closeMenu);
        }

        // Fechar com a tecla ESC
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && sideMenu.classList.contains("open")) {
                closeMenu();
            }
        });
    }

    /* ==========================================================================
       Animação de Reveal por Scroll
       ========================================================================== */
    const reveals = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                }
            });
        }, {
            threshold: 0.12
        });

        reveals.forEach(reveal => {
            revealObserver.observe(reveal);
        });
    } else {
        reveals.forEach(reveal => reveal.classList.add("active"));
    }
});