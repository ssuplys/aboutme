document.addEventListener("DOMContentLoaded", () => {
    // Bloqueia temporariamente dispositivos móveis
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

    if (isMobile) {
        document.body.innerHTML = '<div style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #111; color: #ff4d4d; font-family: \'Inter\', sans-serif; text-align: center; padding: 20px; box-sizing: border-box;"><h1 style="font-size: 1.5rem;">Acesso pelo celular bloqueado temporariamente</h1></div>';
        document.body.style.margin = '0';
        document.body.style.overflow = 'hidden';
        return; // Interrompe o restante do script
    }

    const progressBar = document.getElementById("progress-bar");
    const progressBarContainer = document.querySelector(".progress-bar-container");
    const logoSymbol = document.getElementById("logo-symbol");
    const loadingScreen = document.getElementById("loading-screen");
    const homePage = document.getElementById("home-page");

    // Configurações do carregamento
    let progress = 0;
    const duration = 2000; // Aproximadamente 2 segundos
    const intervalTime = 20; // Atualiza a cada 20ms
    const totalSteps = duration / intervalTime;
    const stepAmount = 100 / totalSteps;

    // Função que aumenta a barra de progresso
    const progressInterval = setInterval(() => {
        progress += stepAmount;
        progressBar.style.width = `${progress}%`;

        // Quando chega em 100%
        if (progress >= 100) {
            clearInterval(progressInterval);
            progressBar.style.width = '100%';
            
            // Aguarda um pequeno momento com a barra cheia para o usuário perceber que terminou
            setTimeout(() => {
                transitionToHome();
            }, 300);
        }
    }, intervalTime);

    // Função para rodar a animação do logo e trocar de tela
    function transitionToHome() {
        // 1. Esconde a barra de progresso com um fade-out
        progressBarContainer.classList.add('fade-out');

        // 2. Aumenta o tamanho do símbolo </> até cobrir a tela (e ficar transparente)
        logoSymbol.classList.add('expand');

        // 3. Após a animação de expansão, oculta a tela de load e exibe o conteúdo
        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
            }
            
            // Permite a rolagem de página, se houver conteúdo maior que a tela
            document.body.style.overflow = 'auto'; 
            
            // Verifica se está na index.html (onde existe o homePage)
            if (homePage) {
                homePage.classList.remove('hidden');
                
                // Gatilho de reflow para o navegador processar que o display mudou, antes de alterar a opacidade
                void homePage.offsetWidth; 
                
                // Aplica a classe que faz a home aparecer suavemente
                homePage.classList.add('visible');
                
                // Redireciona automaticamente para a outra página após 3 segundos
                setTimeout(() => {
                    window.location.href = 'about.html';
                }, 3000);
            }
            // Se estiver em outra página, apenas a tela de carregamento será ocultada,
            // e o conteúdo que estiver ali aparecerá normalmente!
            
        }, 600); // 600ms acompanha a transição no CSS
    }

    // Toggle side menu
    const menuIcon = document.getElementById("header-h1");
    const sideMenu = document.getElementById("side-menu");
    const closeBtn = document.getElementById("close-menu");

    if (menuIcon && sideMenu && closeBtn) {
        menuIcon.addEventListener("click", () => {
            sideMenu.classList.add("open");
            menuIcon.classList.add("hidden");
        });

        closeBtn.addEventListener("click", () => {
            sideMenu.classList.remove("open");
            menuIcon.classList.remove("hidden");
        });
    }

    // Scroll reveal animation
    const reveals = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, {
        threshold: 0.1 // Gatilho quando 10% do elemento estiver visível
    });

    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });
});
