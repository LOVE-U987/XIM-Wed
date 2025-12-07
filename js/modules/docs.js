/**
 * XIM文档页面交互功能模块 - 优化版
 */

class DocsModule {
    constructor() {
        // 缓存DOM元素
        this.cacheDOM();
        this.init();
    }

    // 缓存DOM元素，减少重复查询
    cacheDOM() {
        this.sidebarToggle = document.querySelector('.sidebar-toggle');
        this.sections = document.querySelectorAll('.docs-section');
        this.navLinks = document.querySelectorAll('.docs-nav-link');
        this.subLinks = document.querySelectorAll('.docs-nav-sublink');
        this.backToTopButton = document.getElementById('back-to-top');
        this.mobileSidebarToggle = document.getElementById('mobile-sidebar-toggle');
        this.sidebar = document.querySelector('.docs-sidebar');
        this.contentArea = document.querySelector('.docs-content');
        this.searchInput = document.getElementById('docs-search-input');
        this.allLinks = document.querySelectorAll('.docs-nav-link, .docs-nav-sublink');
        this.sublists = document.querySelectorAll('.docs-nav-sublist');
        this.sidebarOverlay = document.getElementById('sidebarOverlay');
    }

    init() {
        // 初始化所有功能
        this.initSidebarToggle();
        this.initScrollSpy();
        this.initBackToTop();
        this.initMobileSidebar();
        this.initSearch();
        this.initSmoothScroll();
        
        // 添加延迟加载优化
        this.initLazyLoading();
    }
    
    // 防抖函数
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // 初始化侧边栏折叠/展开功能
    initSidebarToggle() {
        if (!this.sidebarToggle) return;

        this.sidebarToggle.addEventListener('click', () => {
            const icon = this.sidebarToggle.querySelector('i');
            
            if (icon && icon.classList.contains('fa-chevron-down')) {
                // 折叠所有子列表
                this.sublists.forEach(sublist => {
                    sublist.style.display = 'none';
                });
                icon.classList.replace('fa-chevron-down', 'fa-chevron-right');
            } else if (icon) {
                // 展开所有子列表
                this.sublists.forEach(sublist => {
                    sublist.style.display = 'block';
                });
                icon.classList.replace('fa-chevron-right', 'fa-chevron-down');
            }
        });

        // 子列表点击事件 - 使用事件委托优化
        const navContainer = document.querySelector('.docs-nav');
        if (navContainer) {
            navContainer.addEventListener('click', (e) => {
                const item = e.target.closest('.docs-nav-item > a');
                if (!item) return;
                
                const parent = item.parentElement;
                const sublist = parent.querySelector('.docs-nav-sublist');
                
                if (sublist && !item.classList.contains('active')) {
                    e.preventDefault();
                    // 使用CSS类代替直接修改style属性，提高性能和可维护性
                    sublist.classList.toggle('hidden');
                }
            });
        }
    }

    // 初始化滚动监听，实现目录高亮联动
    initScrollSpy() {
        if (this.sections.length === 0 || (this.navLinks.length === 0 && this.subLinks.length === 0)) return;

        // 使用防抖优化滚动监听性能
        const updateActiveLink = this.debounce(() => {
            let currentSection = '';
            
            // 使用getBoundingClientRect提高性能
            this.sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 100) {
                    currentSection = section.getAttribute('id');
                }
            });

            // 优化DOM操作，减少不必要的类切换
            if (!this._lastActiveSection || this._lastActiveSection !== currentSection) {
                // 更新主链接高亮
                this.navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${currentSection}`) {
                        if (!link.classList.contains('active')) {
                            link.classList.add('active');
                        }
                    } else if (link.classList.contains('active')) {
                        link.classList.remove('active');
                    }
                });

                // 更新子链接高亮
                this.subLinks.forEach(link => {
                    const href = link.getAttribute('href').substring(1);
                    if (href === currentSection) {
                        link.classList.add('active');
                        const parentLink = link.closest('.docs-nav-sublist').previousElementSibling;
                        if (parentLink) {
                            this.navLinks.forEach(l => l.classList.remove('active'));
                            parentLink.classList.add('active');
                        }
                    } else if (link.classList.contains('active')) {
                        link.classList.remove('active');
                    }
                });
                
                this._lastActiveSection = currentSection;
            }
        }, 100);

        window.addEventListener('scroll', updateActiveLink);
        // 初始加载时执行一次
        updateActiveLink();
    }

    // 初始化返回顶部按钮
    initBackToTop() {
        if (!this.backToTopButton) return;

        // 使用防抖优化滚动监听性能
        const toggleButtonVisibility = this.debounce(() => {
            if (window.scrollY > 300) {
                if (!this.backToTopButton.classList.contains('visible')) {
                    this.backToTopButton.classList.add('visible');
                }
            } else {
                if (this.backToTopButton.classList.contains('visible')) {
                    this.backToTopButton.classList.remove('visible');
                }
            }
        }, 100);

        this.backToTopButton.addEventListener('click', () => {
            // 使用requestAnimationFrame优化滚动性能
            window.requestAnimationFrame(() => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        });

        window.addEventListener('scroll', toggleButtonVisibility);
        // 初始检查
        toggleButtonVisibility();
    }

    // 初始化移动端侧边栏切换
    initMobileSidebar() {
        if (!this.mobileSidebarToggle || !this.sidebar) return;

        // 统一使用'open'类名以匹配CSS
        const toggleSidebar = () => {
            this.sidebar.classList.toggle('open');
            
            // 切换按钮图标
            const icon = this.mobileSidebarToggle.querySelector('i');
            if (icon) {
                if (icon.classList.contains('fa-bars')) {
                    icon.classList.replace('fa-bars', 'fa-times');
                } else {
                    icon.classList.replace('fa-times', 'fa-bars');
                }
            }
            
            // 更新遮罩层显示状态
            if (this.sidebarOverlay) {
                if (this.sidebar.classList.contains('open')) {
                    this.sidebarOverlay.style.display = 'block';
                } else {
                    this.sidebarOverlay.style.display = 'none';
                }
            }
        };

        // 优化移动端触摸事件，提高响应速度
        this.mobileSidebarToggle.addEventListener('click', toggleSidebar);

        // 添加点击遮罩层关闭侧边栏功能
        if (this.sidebarOverlay) {
            this.sidebarOverlay.addEventListener('click', () => {
                if (window.innerWidth <= 992 && this.sidebar.classList.contains('open')) {
                    this.sidebar.classList.remove('open');
                    this.sidebarOverlay.style.display = 'none';
                    const icon = this.mobileSidebarToggle.querySelector('i');
                    if (icon && icon.classList.contains('fa-times')) {
                        icon.classList.replace('fa-times', 'fa-bars');
                    }
                }
            });
        }

        // 在移动端点击文档内容区域关闭侧边栏
        if (this.contentArea) {
            this.contentArea.addEventListener('click', () => {
                if (window.innerWidth <= 992 && this.sidebar.classList.contains('open')) {
                    this.sidebar.classList.remove('open');
                    if (this.sidebarOverlay) {
                        this.sidebarOverlay.style.display = 'none';
                    }
                    const icon = this.mobileSidebarToggle.querySelector('i');
                    if (icon && icon.classList.contains('fa-times')) {
                        icon.classList.replace('fa-times', 'fa-bars');
                    }
                }
            });
        }
        
        // 添加resize事件监听，确保在屏幕尺寸变化时正确处理侧边栏状态
        window.addEventListener('resize', this.debounce(() => {
            if (window.innerWidth > 992 && this.sidebar.classList.contains('open')) {
                this.sidebar.classList.remove('open');
                if (this.sidebarOverlay) {
                    this.sidebarOverlay.style.display = 'none';
                }
                const icon = this.mobileSidebarToggle.querySelector('i');
                if (icon && icon.classList.contains('fa-times')) {
                    icon.classList.replace('fa-times', 'fa-bars');
                }
            }
        }, 250));
    }

    // 初始化搜索功能
    initSearch() {
        if (!this.searchInput) return;

        // 预处理搜索数据，提高搜索效率
        this._searchData = Array.from(this.sections).map(section => ({
            element: section,
            id: section.getAttribute('id'),
            content: section.textContent.toLowerCase()
        }));

        // 使用防抖优化搜索性能
        const handleSearch = this.debounce((searchTerm) => {
            if (searchTerm === '') {
                // 清空搜索时显示所有内容
                this._searchData.forEach(item => {
                    item.element.style.display = 'block';
                });
                return;
            }

            let hasResults = false;
            let firstMatch = null;

            // 过滤搜索内容
            this._searchData.forEach(item => {
                const shouldShow = item.content.includes(searchTerm);
                
                if (item.element.style.display !== (shouldShow ? 'block' : 'none')) {
                    item.element.style.display = shouldShow ? 'block' : 'none';
                }
                
                if (shouldShow) {
                    hasResults = true;
                    if (!firstMatch) firstMatch = item.element;
                }
            });

            // 优化自动滚动逻辑
            if (hasResults && firstMatch && window.innerWidth > 992) {
                // 避免重复滚动
                if (!this._lastScrolledSection || this._lastScrolledSection !== firstMatch.getAttribute('id')) {
                    // 使用requestAnimationFrame优化滚动
                    window.requestAnimationFrame(() => {
                        firstMatch.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    });
                    this._lastScrolledSection = firstMatch.getAttribute('id');
                }
            }
        }, 300);

        this.searchInput.addEventListener('input', (e) => {
            handleSearch(e.target.value.toLowerCase().trim());
        });
    }

    // 初始化平滑滚动
    initSmoothScroll() {
        if (this.allLinks.length === 0) return;

        // 使用事件委托优化，减少事件监听器数量
        const navContainer = document.querySelector('.docs-nav');
        if (navContainer) {
            navContainer.addEventListener('click', (e) => {
                const link = e.target.closest('.docs-nav-link, .docs-nav-sublink');
                if (!link) return;
                
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        // 使用requestAnimationFrame优化滚动性能
                        window.requestAnimationFrame(() => {
                            window.scrollTo({
                                top: targetElement.getBoundingClientRect().top + window.pageYOffset - 100,
                                behavior: 'smooth'
                            });
                        });

                        // 移动端点击链接后关闭侧边栏
                        if (window.innerWidth <= 992 && this.sidebar && this.mobileSidebarToggle) {
                            this.sidebar.classList.remove('active');
                            const icon = this.mobileSidebarToggle.querySelector('i');
                            if (icon && icon.classList.contains('fa-times')) {
                                icon.classList.replace('fa-times', 'fa-bars');
                            }
                        }
                    }
                }
            });
        }
    }
    
    // 初始化延迟加载优化
    initLazyLoading() {
        // 延迟加载非关键内容
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                // 预加载可见区域外的图像
                const images = document.querySelectorAll('img[data-src]');
                images.forEach(img => {
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                });
            }, { timeout: 2000 });
        }
    }
}

// 导出模块
export default DocsModule;

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    new DocsModule();
});