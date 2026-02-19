/**
 * 布局切换模块
 * 处理三种不同布局模式的切换
 */

export function initLayoutSwitcher() {
    const layoutBtns = document.querySelectorAll('.layout-btn');
    const body = document.body;
    
    // 从localStorage读取保存的布局
    const savedLayout = localStorage.getItem('xim-layout') || 'layout1';
    setLayout(savedLayout);
    
    // 更新按钮状态
    updateButtonState(savedLayout);
    
    layoutBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const layout = btn.dataset.layout;
            
            // 添加切换动画
            body.style.opacity = '0';
            body.style.transition = 'opacity 0.3s ease';
            
            setTimeout(() => {
                setLayout(layout);
                updateButtonState(layout);
                localStorage.setItem('xim-layout', layout);
                
                body.style.opacity = '1';
            }, 300);
        });
    });
}

function setLayout(layout) {
    const body = document.body;
    
    // 移除所有布局类
    body.classList.remove('layout1', 'layout2', 'layout3');
    
    // 添加新布局类
    body.classList.add(layout);
    
    // 触发布局切换事件
    window.dispatchEvent(new CustomEvent('layoutChanged', { detail: { layout } }));
}

function updateButtonState(activeLayout) {
    const layoutBtns = document.querySelectorAll('.layout-btn');
    
    layoutBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.layout === activeLayout) {
            btn.classList.add('active');
        }
    });
}
