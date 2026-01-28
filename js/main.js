/**
 * XIM网站主入口文件 v2.0
 * 现代化交互体验与动态视觉效果
 */

// 导入功能模块
import { initNavigation } from './modules/navigation.js';
import { initScrollAnimations } from './modules/scrollAnimations.js';
import { initLayoutSwitcher } from './modules/layoutSwitcher.js';
import { initParticles } from './modules/particles.js';
import { initMouseEffects } from './modules/mouseEffects.js';
import { initSmoothScroll } from './modules/smoothScroll.js';

/**
 * 初始化所有模块
 * 在DOM完全加载后执行初始化
 */
function initializeApp() {
    console.log('🚀 XIM网站 v2.0 正在初始化...');
    
    try {
        // 初始化平滑滚动
        initSmoothScroll();
        console.log('✅ 平滑滚动初始化完成');
        
        // 初始化导航模块
        initNavigation();
        console.log('✅ 导航模块初始化完成');
        
        // 初始化滚动动画
        initScrollAnimations();
        console.log('✅ 滚动动画初始化完成');
        
        // 初始化布局切换
        initLayoutSwitcher();
        console.log('✅ 布局切换初始化完成');
        
        // 初始化粒子效果
        initParticles();
        console.log('✅ 粒子效果初始化完成');
        
        // 初始化鼠标效果
        initMouseEffects();
        console.log('✅ 鼠标效果初始化完成');
        
        // 添加页面加载完成动画
        document.body.classList.add('loaded');
        
        console.log('🎉 XIM网站 v2.0 初始化完成');
    } catch (error) {
        console.error('❌ 应用初始化过程中发生错误:', error);
    }
}

/**
 * 安全的DOM加载监听
 * 确保在DOM完全加载后初始化应用
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

/**
 * 错误处理和恢复机制
 */
window.addEventListener('error', (event) => {
    // 忽略非关键错误，避免干扰用户体验
    if (event.error && event.error.message && 
        (event.error.message.includes('Cannot read properties of null') ||
         event.error.message.includes('classList'))) {
        console.warn('非关键错误已捕获:', event.error.message);
        event.preventDefault();
        return;
    }
    console.error('应用运行时错误:', event.error);
});

/**
 * 暴露全局API
 */
window.XIM = {
    version: '2.0.0',
    init: initializeApp
};
