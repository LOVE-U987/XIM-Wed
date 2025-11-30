/**
 * 主题切换模块 - 处理深色/浅色模式切换
 */

class ThemeManager {
    constructor() {
        // 缓存DOM元素
        this.themeToggle = document.getElementById('theme-toggle');
        this.body = document.body;
        this.init();
    }

    init() {
        // 检查是否存在切换按钮
        if (!this.themeToggle) return;

        // 从本地存储恢复用户偏好的主题，或使用系统偏好
        this.applySavedTheme();

        // 添加点击事件监听器
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    /**
     * 应用保存的主题设置
     * 优先使用本地存储的用户偏好，否则使用系统设置
     */
    applySavedTheme() {
        // 获取保存的主题设置
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // 确定要应用的主题
        const theme = savedTheme || (prefersDark ? 'dark' : 'light');
        
        // 应用主题
        this.setTheme(theme);
    }

    /**
     * 切换当前主题
     */
    toggleTheme() {
        const currentTheme = this.body.getAttribute('data-theme') || 
                           (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        this.setTheme(newTheme);
    }

    /**
     * 设置指定主题
     * @param {string} theme - 'light' 或 'dark'
     */
    setTheme(theme) {
        // 更新body的data-theme属性
        this.body.setAttribute('data-theme', theme);
        
        // 保存到本地存储
        localStorage.setItem('theme', theme);
        
        // 更新图标
        this.updateIcon(theme);
    }

    /**
     * 更新切换按钮的图标
     * @param {string} theme - 当前主题
     */
    updateIcon(theme) {
        const icon = this.themeToggle.querySelector('i');
        if (icon) {
            if (theme === 'dark') {
                icon.classList.remove('fas', 'fa-moon');
                icon.classList.add('fas', 'fa-sun');
            } else {
                icon.classList.remove('fas', 'fa-sun');
                icon.classList.add('fas', 'fa-moon');
            }
        }
    }
}

// 导出模块
export default ThemeManager;

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
});