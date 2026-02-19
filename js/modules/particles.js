/**
 * 粒子效果模块
 * 创建动态粒子背景效果
 */

export function initParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    // 动态创建更多粒子
    createDynamicParticles(particlesContainer);
    
    // 鼠标交互效果
    initMouseInteraction(particlesContainer);
}

function createDynamicParticles(container) {
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (15 + Math.random() * 15) + 's';
        particle.style.opacity = 0.2 + Math.random() * 0.3;
        particle.style.width = (2 + Math.random() * 4) + 'px';
        particle.style.height = particle.style.width;
        container.appendChild(particle);
    }
}

function initMouseInteraction(container) {
    let mouseX = 0;
    let mouseY = 0;
    let isMoving = false;
    let moveTimeout;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMoving = true;
        
        clearTimeout(moveTimeout);
        moveTimeout = setTimeout(() => {
            isMoving = false;
        }, 100);
    });
    
    // 粒子跟随鼠标效果
    const particles = container.querySelectorAll('.particle');
    
    function animateParticles() {
        if (isMoving) {
            particles.forEach((particle, index) => {
                if (index % 3 === 0) { // 只有部分粒子响应鼠标
                    const rect = particle.getBoundingClientRect();
                    const particleX = rect.left + rect.width / 2;
                    const particleY = rect.top + rect.height / 2;
                    
                    const deltaX = mouseX - particleX;
                    const deltaY = mouseY - particleY;
                    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                    
                    if (distance < 200) {
                        const force = (200 - distance) / 200;
                        const moveX = (deltaX / distance) * force * 20;
                        const moveY = (deltaY / distance) * force * 20;
                        
                        particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
                    }
                }
            });
        }
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}
