/**
 * 动画和视觉效果功能模块
 * 包含页面加载动画、滚动触发的元素淡入和其他视觉交互效果
 */

// 页面加载动画
function handlePageLoadAnimation() {
    const loader = document.querySelector('.loader');
    const body = document.querySelector('body');
    
    if (loader) {
        window.addEventListener('load', () => {
            // 延迟移除加载动画，确保用户体验
            setTimeout(() => {
                loader.classList.add('fade-out');
                
                // 加载动画淡出后移除它
                setTimeout(() => {
                    if (loader.parentNode) {
                        loader.parentNode.removeChild(loader);
                    }
                    body.classList.remove('loading');
                }, 500);
            }, 800);
        });
    }
}

// 设置滚动触发的元素淡入效果
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // 检查元素是否在视口中
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85
        );
    }
    
    // 处理元素动画
    function handleAnimation() {
        animatedElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
            }
        });
    }
    
    // 初始检查
    handleAnimation();
    
    // 添加滚动事件监听
    window.addEventListener('scroll', handleAnimation);
}

// 平滑滚动效果（如果未在导航模块中实现）
function setupSmoothScrolling() {
    // 检查是否已在导航模块中实现
    // 这里可以添加额外的平滑滚动功能
}

// 初始化动画模块
export function initAnimations() {
    handlePageLoadAnimation();
    setupScrollAnimations();
}
