// 导航栏滚动效果
const nav = document.querySelector('nav');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    // 滚动方向检测
    const currentScrollY = window.scrollY;
    const isScrollingUp = currentScrollY < lastScrollY;
    
    if (currentScrollY > 50) {
        nav.classList.add('scrolled');
        nav.style.transform = isScrollingUp ? 'translateY(0)' : 'translateY(-100%)';
    } else {
        nav.classList.remove('scrolled');
        nav.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
    
    // 更新活动导航项
    updateActiveNavLink();
});

// 移动端菜单切换
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    // 切换导航链接容器
    navLinks.classList.toggle('active');
    
    // 切换菜单图标
    if (navLinks.classList.contains('active')) {
        menuToggle.innerHTML = '&times;'; // 关闭图标
        // 禁止页面滚动
        document.body.style.overflow = 'hidden';
    } else {
        menuToggle.innerHTML = '&#9776;'; // 菜单图标
        // 恢复页面滚动
        document.body.style.overflow = '';
    }
    
    // 添加动画效果
    menuToggle.classList.toggle('active');
});

// 点击导航链接关闭移动端菜单
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '&#9776;';
            document.body.style.overflow = '';
        }
    });
});

// 平滑滚动到锚点
function smoothScroll(targetId, offset = 80) {
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
        
        // 使用requestAnimationFrame实现更流畅的滚动
        let startPosition = window.scrollY;
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition - startPosition, 600); // 600ms动画时长
            
            window.scrollTo(0, run);
            
            if (timeElapsed < 600) requestAnimationFrame(animation);
        }
        
        // 缓动函数 - 让滚动更自然
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
        
        // 更新URL但不刷新页面
        history.pushState(null, null, targetId);
    }
}

// 为所有锚点链接添加平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        smoothScroll(targetId);
    });
});

// 处理URL中的锚点
window.addEventListener('DOMContentLoaded', () => {
    const urlHash = window.location.hash;
    if (urlHash && urlHash !== '#') {
        // 延迟执行以确保页面已完全加载
        setTimeout(() => {
            smoothScroll(urlHash);
        }, 100);
    }
});

// 活动导航项更新
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // 找到当前在视口中的部分
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        // 判断部分是否在视口中（考虑视口高度的50%作为触发点）
        if (pageYOffset >= (sectionTop - 150) && pageYOffset < (sectionTop + sectionHeight - 150)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // 更新导航链接的活动状态
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// 初始化活动导航项
updateActiveNavLink();

// 监听滚动，更新活动导航项
window.addEventListener('scroll', updateActiveNavLink);

// 联系表单提交处理
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 简单的表单验证
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        if (name && email && message) {
            // 在实际应用中，这里会发送表单数据到服务器
            // 这里仅做演示，显示一个成功消息
            alert('感谢您的留言，我们会尽快回复您！');
            this.reset();
        } else {
            alert('请填写所有必填字段！');
        }
    });
}

// 页面加载时的动画效果
window.addEventListener('DOMContentLoaded', function() {
    // 为页面元素添加动画类
    const animatedElements = document.querySelectorAll('section');
    
    // 初始检查元素是否在视口中
    checkElementsInView();
    
    // 滚动时检查元素是否在视口中
    window.addEventListener('scroll', checkElementsInView);
    
    function checkElementsInView() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }
});

// 图片加载错误处理
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = '资源/XIM图标.jpg'; // 使用默认图标作为备用
        this.alt = 'XIM工作室';
    });
});

// 背景图片预加载功能
function preloadBackgroundImages() {
    // 所有需要预加载的背景图片
    const backgroundImages = [
        '资源/【哲风壁纸】梦幻船只-海上景象.png',
        '资源/【哲风壁纸】二次元-倒影-光影.png',
        '资源/【哲风壁纸】女孩-湖面.png',
        '资源/【哲风壁纸】二次元-动漫风-夜山.png',
        '资源/【哲风壁纸】云-动漫女孩-天空.png'
    ];
    
    // 加载计数器
    let loadedCount = 0;
    const totalImages = backgroundImages.length;
    
    // 图片加载完成后的回调
    function onImageLoaded() {
        loadedCount++;
        
        // 当所有图片都加载完成时
        if (loadedCount === totalImages) {
            console.log('所有背景图片已预加载完成');
            // 可以在这里触发加载完成的事件
            document.body.classList.add('backgrounds-loaded');
        }
    }
    
    // 预加载每个背景图片
    backgroundImages.forEach(imagePath => {
        const img = new Image();
        img.src = imagePath;
        img.onload = onImageLoaded;
        img.onerror = onImageLoaded; // 即使加载失败也继续
    });
}

// 页面加载完成后开始预加载背景图片
window.addEventListener('load', function() {
    // 先显示一个加载指示器（可选）
    const loadingIndicator = document.createElement('div');
    loadingIndicator.id = 'loading-indicator';
    loadingIndicator.textContent = '加载中...';
    loadingIndicator.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 15px 30px;
        border-radius: 5px;
        z-index: 9999;
    `;
    document.body.appendChild(loadingIndicator);
    
    // 开始预加载背景图片
    preloadBackgroundImages();
    
    // 监听背景图片加载完成
    const checkInterval = setInterval(() => {
        if (document.body.classList.contains('backgrounds-loaded')) {
            clearInterval(checkInterval);
            // 隐藏加载指示器
            setTimeout(() => {
                loadingIndicator.style.opacity = '0';
                loadingIndicator.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                    document.body.removeChild(loadingIndicator);
                }, 500);
            }, 300);
        }
    }, 100);
});