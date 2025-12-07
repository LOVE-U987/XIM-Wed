/**
 * 背景图片预加载功能模块
 * 包含背景壁纸图片的预加载、加载指示器和加载完成后的过渡效果
 */

// 背景图片预加载函数
function preloadBackgroundImages() {
    // 所有需要预加载的背景图片
    const backgroundImages = [
        '../资源/【哲风壁纸】梦幻船只-海上景象.png',
        '../资源/【哲风壁纸】二次元-倒影-光影.png',
        '../资源/【哲风壁纸】女孩-湖面.png',
        '../资源/【哲风壁纸】二次元-动漫风-夜山.png',
        '../资源/【哲风壁纸】云-动漫女孩-天空.png'
    ];
    
    // 创建加载进度跟踪
    let loadedCount = 0;
    const totalImages = backgroundImages.length;
    
    // 创建并更新加载指示器
    const loadingIndicator = createLoadingIndicator();
    
    // 预加载每张图片
    backgroundImages.forEach(imageUrl => {
        const img = new Image();
        
        img.onload = () => {
            loadedCount++;
            updateLoadingProgress(loadingIndicator, loadedCount, totalImages);
            
            // 所有图片加载完成
            if (loadedCount === totalImages) {
                handlePreloadingComplete(loadingIndicator);
            }
        };
        
        img.onerror = () => {
            console.error(`背景图片预加载失败: ${imageUrl}`);
            loadedCount++;
            updateLoadingProgress(loadingIndicator, loadedCount, totalImages);
            
            // 即使有错误，也要继续完成预加载过程
            if (loadedCount === totalImages) {
                handlePreloadingComplete(loadingIndicator);
            }
        };
        
        // 开始加载图片
        img.src = imageUrl;
    });
}

// 创建加载指示器
function createLoadingIndicator() {
    // 检查是否已存在加载指示器
    let indicator = document.querySelector('.background-loading-indicator');
    
    if (!indicator) {
        // 创建加载指示器容器
        indicator = document.createElement('div');
        indicator.className = 'background-loading-indicator';
        indicator.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background-color: #f0f0f0;
            z-index: 9999;
            transition: opacity 0.5s ease;
        `;
        
        // 创建进度条
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.style.cssText = `
            width: 0%;
            height: 100%;
            background-color: #007bff;
            transition: width 0.3s ease;
        `;
        
        indicator.appendChild(progressBar);
        document.body.appendChild(indicator);
    }
    
    return indicator;
}

// 更新加载进度
function updateLoadingProgress(indicator, loadedCount, totalImages) {
    const progressBar = indicator.querySelector('.progress-bar');
    const percentage = (loadedCount / totalImages) * 100;
    
    if (progressBar) {
        progressBar.style.width = `${percentage}%`;
    }
}

// 处理预加载完成
function handlePreloadingComplete(loadingIndicator) {
    // 短暂延迟后隐藏加载指示器
    setTimeout(() => {
        if (loadingIndicator) {
            loadingIndicator.style.opacity = '0';
            
            // 完全隐藏后移除元素
            setTimeout(() => {
                if (loadingIndicator.parentNode) {
                    loadingIndicator.parentNode.removeChild(loadingIndicator);
                }
            }, 500);
        }
        
        // 触发背景加载完成事件
        const event = new CustomEvent('backgroundImagesLoaded');
        window.dispatchEvent(event);
        
        console.log('所有背景图片预加载完成');
    }, 300);
}

// 监听背景图片加载完成事件
export function onBackgroundImagesLoaded(callback) {
    // 检查是否已加载完成
    if (window._backgroundImagesLoaded) {
        callback();
    } else {
        window.addEventListener('backgroundImagesLoaded', callback, { once: true });
    }
}

// 初始化背景图片预加载模块
export function initBackgroundPreloader() {
    // 当DOM加载完成后开始预加载
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', preloadBackgroundImages);
    } else {
        // DOM已经加载完成，直接开始预加载
        preloadBackgroundImages();
    }
    
    // 标记背景图片加载完成状态
    window.addEventListener('backgroundImagesLoaded', () => {
        window._backgroundImagesLoaded = true;
    }, { once: true });
}
