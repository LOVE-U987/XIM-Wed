/**
 * 导航模块
 * 处理导航栏交互和移动端菜单
 */

export function initNavigation() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // 滚动时导航栏效果
    handleScroll(navbar);
    
    // 移动端菜单切换
    if (menuToggle) {
        initMobileMenu(menuToggle);
    }
    
    // 导航链接高亮
    highlightActiveLink(navLinks);
    
    // 导航链接点击平滑滚动
    initSmoothScroll(navLinks);
}

function handleScroll(navbar) {
    if (!navbar) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // 添加/移除滚动类
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // 隐藏/显示导航栏（向下滚动隐藏，向上滚动显示）
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

function initMobileMenu(menuToggle) {
    let mobileMenu = null;
    let isOpen = false;
    
    menuToggle.addEventListener('click', () => {
        if (!mobileMenu) {
            mobileMenu = createMobileMenu();
        }
        
        isOpen = !isOpen;
        
        if (isOpen) {
            mobileMenu.classList.add('active');
            menuToggle.innerHTML = '<i class="fas fa-times"></i>';
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        }
    });
}

function createMobileMenu() {
    const menu = document.createElement('div');
    menu.className = 'mobile-menu';
    menu.innerHTML = `
        <div class="mobile-menu-content">
            <a href="#home">首页</a>
            <a href="#about">关于我们</a>
            <a href="#docs">XIM文档</a>
            <a href="#news">XIM New</a>
            <a href="#projects">项目</a>
            <a href="#departments">XIM部门</a>
        </div>
    `;
    
    menu.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(10, 10, 15, 0.98);
        backdrop-filter: blur(20px);
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    `;
    
    const content = menu.querySelector('.mobile-menu-content');
    content.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 24px;
        text-align: center;
    `;
    
    content.querySelectorAll('a').forEach(link => {
        link.style.cssText = `
            font-size: 1.5rem;
            font-weight: 600;
            color: white;
            text-decoration: none;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
        `;
        
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            document.querySelector('.menu-toggle').innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        });
    });
    
    menu.addEventListener('transitionend', () => {
        if (menu.classList.contains('active')) {
            content.querySelectorAll('a').forEach((link, index) => {
                setTimeout(() => {
                    link.style.opacity = '1';
                    link.style.transform = 'translateY(0)';
                }, index * 100);
            });
        } else {
            content.querySelectorAll('a').forEach(link => {
                link.style.opacity = '0';
                link.style.transform = 'translateY(20px)';
            });
        }
    });
    
    document.body.appendChild(menu);
    
    // 添加active样式
    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu.active {
            opacity: 1 !important;
            visibility: visible !important;
        }
    `;
    document.head.appendChild(style);
    
    return menu;
}

function highlightActiveLink(links) {
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

function initSmoothScroll(links) {
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}
