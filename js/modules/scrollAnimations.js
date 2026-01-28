/**
 * 滚动动画模块
 * 实现元素进入视口时的动画效果
 */

export function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-fade-in, .animate-scale-in');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // 添加额外的动画类
                addExtraAnimations(entry.target);
                
                // 可选：动画只触发一次
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // 初始化时检查可见元素
    checkInitialVisibility(animatedElements);
}

function checkInitialVisibility(elements) {
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('visible');
            addExtraAnimations(el);
        }
    });
}

function addExtraAnimations(element) {
    // 为项目卡片添加额外的悬停效果
    if (element.classList.contains('project-item')) {
        element.addEventListener('mouseenter', () => {
            element.style.zIndex = '10';
        });
        element.addEventListener('mouseleave', () => {
            setTimeout(() => {
                element.style.zIndex = '';
            }, 300);
        });
    }
    
    // 为部门卡片添加光晕效果
    if (element.classList.contains('department-item')) {
        element.addEventListener('mouseenter', () => {
            element.style.boxShadow = '0 0 40px rgba(102, 126, 234, 0.3)';
        });
        element.addEventListener('mouseleave', () => {
            element.style.boxShadow = '';
        });
    }
}
