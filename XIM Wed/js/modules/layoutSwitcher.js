/**
 * 布局切换模块 - 处理不同页面布局方案的切换
 */

/**
 * 初始化布局切换功能
 */
export function initLayoutSwitcher() {
    // 获取所有布局切换按钮
    const layoutButtons = document.querySelectorAll('.layout-btn');
    const body = document.body;
    
    // 如果没有布局切换按钮，直接返回
    if (!layoutButtons.length) return;
    
    // 从本地存储恢复上次使用的布局
    const savedLayout = localStorage.getItem('xim-layout') || 'layout1';
    applyLayout(savedLayout, layoutButtons, body);
    
    // 为每个布局按钮添加点击事件监听器
    layoutButtons.forEach(button => {
        button.addEventListener('click', () => {
            const layout = button.getAttribute('data-layout');
            applyLayout(layout, layoutButtons, body);
            
            // 保存布局偏好到本地存储
            localStorage.setItem('xim-layout', layout);
        });
    });
}

/**
 * 应用指定的布局方案
 * @param {string} layout - 布局名称
 * @param {NodeList} buttons - 布局切换按钮列表
 * @param {HTMLElement} body - body元素
 */
function applyLayout(layout, buttons, body) {
    // 更新按钮状态
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-layout') === layout) {
            btn.classList.add('active');
        }
    });
    
    // 移除所有布局类
    body.classList.remove('layout1', 'layout2', 'layout3');
    
    // 添加新的布局类
    body.classList.add(layout);
    
    // 触发布局变化事件，以便其他模块可以响应
    const layoutChangeEvent = new CustomEvent('layoutchange', {
        detail: { layout }
    });
    window.dispatchEvent(layoutChangeEvent);
    
    console.log(`已切换到布局方案: ${layout}`);
}
