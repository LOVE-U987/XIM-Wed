/**
 * 图片加载和错误处理功能模块
 * 包含图片加载错误时的默认图片替换功能
 */

// 设置图片加载错误处理
function setupImageErrorHandling() {
    // 默认错误图片路径
    const defaultImage = '../assets/default-image.png';
    
    // 处理现有图片的错误
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        setupErrorHandler(img);
    });
    
    // 为动态加载的图片设置错误处理
    setupDynamicImageHandling();
}

// 为单个图片设置错误处理器
function setupErrorHandler(img) {
    // 默认错误图片路径
    const defaultImage = '../assets/default-image.png';
    
    // 存储原始图片路径，以便后续可能的重试
    if (!img.dataset.originalSrc) {
        img.dataset.originalSrc = img.src;
    }
    
    // 添加错误事件监听
    img.addEventListener('error', function() {
        console.log(`图片加载失败: ${this.src}，替换为默认图片`);
        
        // 防止无限循环（如果默认图片也加载失败）
        if (this.src !== defaultImage) {
            this.src = defaultImage;
            
            // 添加错误标记类
            this.classList.add('image-error');
            
            // 设置图片替代文本
            if (!this.alt || this.alt === '') {
                this.alt = '图片无法加载';
            }
        }
    });
    
    // 添加加载成功事件，移除错误状态
    img.addEventListener('load', function() {
        this.classList.remove('image-error');
    });
}

// 设置动态图片的错误处理（用于AJAX加载或动态添加的图片）
function setupDynamicImageHandling() {
    // 使用MutationObserver监听DOM变化，为新添加的图片设置错误处理
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    // 如果添加的是图片元素
                    if (node.tagName === 'IMG') {
                        setupErrorHandler(node);
                    }
                    // 如果添加的是包含图片的元素，递归查找其中的图片
                    else if (node.querySelectorAll) {
                        const newImages = node.querySelectorAll('img');
                        newImages.forEach(img => {
                            setupErrorHandler(img);
                        });
                    }
                });
            }
        });
    });
    
    // 开始观察文档变化
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// 尝试重新加载失败的图片
export function reloadFailedImages() {
    const failedImages = document.querySelectorAll('img.image-error');
    failedImages.forEach(img => {
        if (img.dataset.originalSrc) {
            // 临时更改src触发重新加载
            const tempSrc = img.src;
            img.src = '';
            img.src = img.dataset.originalSrc;
            
            // 移除错误类，让加载事件重新处理
            img.classList.remove('image-error');
        }
    });
    
    return failedImages.length;
}

// 初始化图片处理模块
export function initImageHandler() {
    setupImageErrorHandling();
}
