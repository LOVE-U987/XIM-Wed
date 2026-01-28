/**
 * 鼠标效果模块
 * 创建鼠标跟随和悬停效果
 */

export function initMouseEffects() {
    // 创建光标跟随效果
    createCursorGlow();
    
    // 为卡片添加3D倾斜效果
    initTiltEffect();
    
    // 为按钮添加磁吸效果
    initMagneticButtons();
}

function createCursorGlow() {
    // 检测是否为触摸设备
    if (window.matchMedia('(pointer: coarse)').matches) return;
    
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    glow.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
        opacity: 0;
    `;
    document.body.appendChild(glow);
    
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        glow.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        glow.style.opacity = '0';
    });
    
    function animate() {
        // 平滑跟随
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;
        
        glow.style.left = currentX + 'px';
        glow.style.top = currentY + 'px';
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

function initTiltEffect() {
    const cards = document.querySelectorAll('.project-item, .department-item, .docs-card, .news-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn, .btn-outline, .btn-highlight');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });
}
