/**
 * 滚动动画模块 - 处理元素在滚动时的入场动画
 */

/**
 * 初始化滚动动画功能
 */
export function initScrollAnimations() {
    // 获取所有需要动画的元素
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .rotate-in');
    
    // 如果没有动画元素，直接返回
    if (!animatedElements.length) return;
    
    // 初始检查，显示已经在视图中的元素
    checkElementsInView(animatedElements);
    
    // 添加滚动事件监听器
    window.addEventListener('scroll', () => {
        checkElementsInView(animatedElements);
    });
    
    // 添加窗口大小改变事件监听器
    window.addEventListener('resize', () => {
        checkElementsInView(animatedElements);
    });
    
    // 添加布局变化事件监听器
    window.addEventListener('layoutchange', () => {
        // 延迟检查，确保布局已经更新
        setTimeout(() => {
            checkElementsInView(animatedElements);
        }, 300);
    });
}

/**
 * 检查元素是否在视图中
 * @param {NodeList} elements - 需要检查的元素列表
 */
function checkElementsInView(elements) {
    elements.forEach(element => {
        // 如果元素已经有visible类，跳过
        if (element.classList.contains('visible')) return;
        
        // 获取元素的位置信息
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // 元素进入视图的触发点（元素顶部进入视图底部的10%位置）
        const triggerPoint = windowHeight * 0.9;
        
        // 如果元素顶部小于触发点，且元素底部大于0，说明元素在视图中
        if (rect.top < triggerPoint && rect.bottom > 0) {
            element.classList.add('visible');
        }
    });
}
