/**
 * 导航和滚动相关功能模块
 * 包含导航栏滚动效果、移动端菜单切换、平滑滚动和活动导航项更新
 */

// 导航栏滚动效果
function handleNavbarScroll() {
    const navbar = document.querySelector('#navbar');
    if (navbar && window.scrollY > 100) {
        navbar.classList.add('navbar-shrink');
    } else if (navbar) {
        navbar.classList.remove('navbar-shrink');
    }
}

// 移动端菜单切换
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.menu-toggle');
    const mobileNavContent = document.querySelector('.mobile-nav-content');
    
    if (mobileMenuBtn && mobileNavContent) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNavContent.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
        
        // 点击导航项关闭菜单
        const navLinks = mobileNavContent.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNavContent.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }
}

// 平滑滚动到锚点
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 更新活动导航项
function updateActiveNavItem() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100) {
            current = '#' + section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === current) {
            link.classList.add('active');
        }
    });
}

// 初始化导航模块
export function initNavigation() {
    // 添加滚动事件监听
    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        updateActiveNavItem();
    });
    
    // 初始化功能
    setupMobileMenu();
    setupSmoothScroll();
    
    // 初始状态检查
    handleNavbarScroll();
    updateActiveNavItem();
}
