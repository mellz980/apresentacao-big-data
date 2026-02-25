// 1. CONFIGURAÇÃO DO CURSOR PERSONALIZADO
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    // Movimento direto do ponto central
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Movimento com atraso (suave) do anel externo usando GSAP
    gsap.to(cursorOutline, {
        x: posX,
        y: posY,
        duration: 0.15,
        ease: "power2.out"
    });
});

// Aumenta o cursor ao passar por links ou botões
const links = document.querySelectorAll('a, .tilt-card');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursorOutline.style.width = '60px';
        cursorOutline.style.height = '60px';
        cursorOutline.style.backgroundColor = 'rgba(0, 240, 255, 0.1)';
    });
    link.addEventListener('mouseleave', () => {
        cursorOutline.style.width = '40px';
        cursorOutline.style.height = '40px';
        cursorOutline.style.backgroundColor = 'transparent';
    });
});

// 2. BACKGROUND DE PARTÍCULAS (Simulando fluxo de dados/Rede Neural)
particlesJS("particles-js", {
    "particles": {
        "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": ["#7b2cff", "#ff00cc", "#00f0ff"] },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.5, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
        "size": { "value": 3, "random": true, "anim": { "enable": true, "speed": 2, "size_min": 0.1, "sync": false } },
        "line_linked": { "enable": true, "distance": 150, "color": "#7b2cff", "opacity": 0.4, "width": 1 },
        "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": true, "rotateX": 600, "rotateY": 1200 } }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": { "enable": true, "mode": "grab" },
            "onclick": { "enable": true, "mode": "push" },
            "resize": true
        },
        "modes": {
            "grab": { "distance": 200, "line_linked": { "opacity": 1 } },
            "push": { "particles_nb": 4 }
        }
    },
    "retina_detect": true
});

// 3. ANIMAÇÃO INICIAL (GSAP)
const tl = gsap.timeline();
tl.from(".navbar", { y: -100, opacity: 0, duration: 1, ease: "power3.out" })
  .from(".glitch", { scale: 0.8, opacity: 0, duration: 1, ease: "back.out(1.7)" }, "-=0.5")
  .from(".subtitle", { y: 20, opacity: 0, duration: 0.8 }, "-=0.5")
  .from(".neon-btn", { y: 20, opacity: 0, duration: 0.8 }, "-=0.3");

// 4. SCROLL REVEAL (Animação ao rolar a página)
ScrollReveal().reveal('.section-title', { delay: 200, distance: '50px', origin: 'bottom', duration: 1000, reset: true });
ScrollReveal().reveal('.glass-card', { delay: 300, distance: '50px', origin: 'bottom', duration: 1000, interval: 200 });
ScrollReveal().reveal('.v-card', { delay: 200, distance: '30px', origin: 'bottom', duration: 800, interval: 150 });
ScrollReveal().reveal('.arg-item', { delay: 300, distance: '50px', origin: 'left', duration: 1000, interval: 200 });

// 5. INICIALIZAÇÃO VANILLA TILT (Efeito 3D nos cards)
VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
    scale: 1.05
});

// 6. ANIMAÇÃO DE CONTAGEM DE NÚMEROS (Seção Argumentação)
const counters = document.querySelectorAll('.arg-number');
const speed = 50; 

const animateCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 40);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

// Dispara a contagem quando a seção entra na tela
const argumentationSection = document.querySelector('#argumentacao');
const observer = new IntersectionObserver((entries) => {
    if(entries[0].isIntersecting) {
        animateCounters();
        observer.disconnect(); // Anima apenas uma vez
    }
}, { threshold: 0.5 });

observer.observe(argumentationSection);
