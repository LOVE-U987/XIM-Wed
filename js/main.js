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
        
        // 初始化 Anime.js 动画（如果可用）
        initAnimeAnimations();
        
        // 初始化交互特效
        initInteractiveEffects();
        
        console.log('🎉 XIM网站 v2.0 初始化完成');
    } catch (error) {
        console.error('❌ 应用初始化过程中发生错误:', error);
    }
}

/**
 * Anime.js 动画初始化
 * 安全地检查并使用 Anime.js
 */
function initAnimeAnimations() {
    // 检查 anime 是否全局可用（通过 CDN 加载）
    if (typeof window.anime !== 'function') {
        console.log('ℹ️ Anime.js 未加载，跳过动画效果');
        return;
    }
    
    console.log('✨ Anime.js 已加载，启动动画...');
    
    // 标题动画 - 淡入上滑
    window.anime({
        targets: '.hero-title, .main-title, h1',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        easing: 'easeOutExpo',
        delay: window.anime.stagger(100)
    });
    
    // 副标题动画
    window.anime({
        targets: '.section-subtitle, .hero-subtitle',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 700,
        easing: 'easeOutQuad',
        delay: 300
    });
    
    // 卡片动画 - 交错入场
    window.anime({
        targets: '.card, .project-card, .feature-card',
        opacity: [0, 1],
        translateY: [50, 0],
        scale: [0.95, 1],
        duration: 600,
        easing: 'easeOutQuad',
        delay: window.anime.stagger(80, {start: 200})
    });
    
    // 项目卡片特殊动画
    window.anime({
        targets: '.project-item',
        opacity: [0, 1],
        translateX: [-30, 0],
        duration: 700,
        easing: 'easeOutExpo',
        delay: window.anime.stagger(100, {start: 300})
    });
    
    // 导航项动画 - 从左侧滑入
    window.anime({
        targets: '.nav-item, .nav-link, .nav-links a',
        opacity: [0, 1],
        translateX: [-20, 0],
        duration: 500,
        easing: 'easeOutQuad',
        delay: window.anime.stagger(50)
    });
    
    // Logo 动画 - 缩放弹入
    window.anime({
        targets: '.logo img',
        opacity: [0, 1],
        scale: [0.5, 1],
        rotate: [-10, 0],
        duration: 800,
        easing: 'easeOutElastic(1, .6)'
    });
    
    // Logo 文字动画
    window.anime({
        targets: '.logo span',
        opacity: [0, 1],
        translateX: [-10, 0],
        duration: 600,
        easing: 'easeOutQuad',
        delay: 200
    });
    
    // 按钮动画 - 从下方弹入
    window.anime({
        targets: '.btn, .btn-outline, .btn-highlight',
        opacity: [0, 1],
        translateY: [20, 0],
        scale: [0.9, 1],
        duration: 500,
        easing: 'easeOutBack',
        delay: window.anime.stagger(100, {start: 400})
    });
    
    // 部门卡片动画
    window.anime({
        targets: '.department-card',
        opacity: [0, 1],
        translateY: [40, 0],
        rotateX: [15, 0],
        duration: 700,
        easing: 'easeOutExpo',
        delay: window.anime.stagger(120, {start: 250})
    });
    
    // 特性列表动画
    window.anime({
        targets: '.feature-item, .feature-list li',
        opacity: [0, 1],
        translateX: [-20, 0],
        duration: 500,
        easing: 'easeOutQuad',
        delay: window.anime.stagger(60, {start: 500})
    });
    
    // 图片动画
    window.anime({
        targets: '.project-image img, .feature-image img',
        opacity: [0, 1],
        scale: [1.1, 1],
        duration: 800,
        easing: 'easeOutQuad',
        delay: window.anime.stagger(100, {start: 200})
    });
    
    console.log('✨ Anime.js 页面加载动画已启动');
}

/**
 * 初始化交互特效
 * 鼠标悬停、点击等交互效果
 */
function initInteractiveEffects() {
    if (typeof window.anime !== 'function') return;
    
    // 项目卡片悬停效果
    document.querySelectorAll('.project-item').forEach(item => {
        const img = item.querySelector('.project-image img');
        const overlay = item.querySelector('.project-overlay');
        
        if (img) {
            item.addEventListener('mouseenter', () => {
                window.anime({
                    targets: img,
                    scale: 1.1,
                    duration: 400,
                    easing: 'easeOutQuad'
                });
            });
            
            item.addEventListener('mouseleave', () => {
                window.anime({
                    targets: img,
                    scale: 1,
                    duration: 400,
                    easing: 'easeOutQuad'
                });
            });
        }
        
        if (overlay) {
            item.addEventListener('mouseenter', () => {
                window.anime({
                    targets: overlay,
                    opacity: [0, 1],
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
            
            item.addEventListener('mouseleave', () => {
                window.anime({
                    targets: overlay,
                    opacity: 0,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
        }
    });
    
    // 按钮悬停效果
    document.querySelectorAll('.btn, .btn-outline, .btn-highlight').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            window.anime({
                targets: btn,
                scale: 1.05,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            window.anime({
                targets: btn,
                scale: 1,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
    });
    
    // 导航链接悬停效果
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('mouseenter', () => {
            window.anime({
                targets: link,
                translateY: -2,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
        
        link.addEventListener('mouseleave', () => {
            window.anime({
                targets: link,
                translateY: 0,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
    });
    
    // 卡片悬停效果
    document.querySelectorAll('.card, .feature-card, .department-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            window.anime({
                targets: card,
                translateY: -8,
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            window.anime({
                targets: card,
                translateY: 0,
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });
    
    // 滚动触发动画
    initScrollTriggeredAnimations();
    
    console.log('✨ 交互特效初始化完成');
}

/**
 * 滚动触发动画
 * 元素进入视口时的动画效果
 */
function initScrollTriggeredAnimations() {
    if (typeof window.anime !== 'function') return;
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                // 根据元素类型应用不同动画
                if (target.classList.contains('animate-on-scroll')) {
                    window.anime({
                        targets: target,
                        opacity: [0, 1],
                        translateY: [30, 0],
                        duration: 600,
                        easing: 'easeOutQuad'
                    });
                }
                
                if (target.classList.contains('feature-item')) {
                    window.anime({
                        targets: target,
                        opacity: [0, 1],
                        translateX: [-20, 0],
                        duration: 500,
                        easing: 'easeOutQuad',
                        delay: window.anime.stagger(80)
                    });
                }
                
                // 只触发一次
                observer.unobserve(target);
            }
        });
    }, observerOptions);
    
    // 观察所有需要动画的元素
    document.querySelectorAll('.animate-on-scroll, .feature-item').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
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
