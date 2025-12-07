/**
 * XIM网站主入口文件
 * 导入并初始化所有功能模块
 */

// 导入功能模块
import { initNavigation } from './modules/navigation.js';
import { initFormHandler } from './modules/formHandler.js';
import { initAnimations } from './modules/animations.js';
import { initImageHandler } from './modules/imageHandler.js';
import { initBackgroundPreloader } from './modules/backgroundPreloader.js';
import { initLayoutSwitcher } from './modules/layoutSwitcher.js';
import { initScrollAnimations } from './modules/scrollAnimations.js';
import ThemeManager from './modules/theme.js';

/**
 * 初始化所有模块
 * 在DOM完全加载后执行初始化
 */
function initializeApp() {
    console.log('正在初始化XIM网站应用...');
    
    // 初始化各个功能模块
    try {
        // 导航模块应该首先初始化，因为它处理基本的页面交互
        initNavigation();
        console.log('导航模块初始化完成');
        
        // 表单处理模块
        initFormHandler();
        console.log('表单处理模块初始化完成');
        
        // 动画和视觉效果模块
        initAnimations();
        console.log('动画模块初始化完成');
        
        // 图片加载和错误处理模块
        initImageHandler();
        console.log('图片处理模块初始化完成');
        
        // 背景图片预加载模块
        initBackgroundPreloader();
        console.log('背景预加载模块初始化完成');
        
        // 主题切换模块
        new ThemeManager();
        console.log('主题切换模块初始化完成');
        
        // 布局切换模块
        initLayoutSwitcher();
        console.log('布局切换模块初始化完成');
        
        // 滚动动画模块
        initScrollAnimations();
        console.log('滚动动画模块初始化完成');
        
        console.log('XIM网站应用初始化完成');
    } catch (error) {
        console.error('应用初始化过程中发生错误:', error);
    }
}

/**
 * 安全的DOM加载监听
 * 确保在DOM完全加载后初始化应用
 */
if (document.readyState === 'loading') {
    // DOM仍在加载中
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    // DOM已经加载完成
    initializeApp();
}

/**
 * 错误处理和恢复机制
 * 确保应用在遇到错误时能够优雅地处理
 */
window.addEventListener('error', (event) => {
    console.error('应用运行时错误:', event.error);
    // 这里可以添加错误报告或用户友好的错误提示
});

/**
 * 暴露全局API（如果需要）
 * 允许从控制台或其他脚本访问主要功能
 */
window.XIM = {
    version: '1.0.0',
    // 可以添加需要暴露的公共方法
};
