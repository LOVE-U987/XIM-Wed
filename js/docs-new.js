/**
 * XIM文档页面交互脚本 v2.0
 * 实现现代化文档界面的所有交互功能
 */

(function() {
    'use strict';

    // ============================================
    // 全局状态
    // ============================================
    const state = {
        sidebarOpen: true,
        sidebarWidth: 300,
        fontSize: 100,
        theme: localStorage.getItem('xim-docs-theme') || 'dark',
        currentSection: null,
        isResizing: false
    };

    // ============================================
    // DOM元素缓存
    // ============================================
    const elements = {};

    function cacheElements() {
        elements.sidebar = document.getElementById('docsSidebar');
        elements.sidebarToggle = document.getElementById('sidebarToggle');
        elements.sidebarResizeHandle = document.getElementById('sidebarResizeHandle');
        elements.docsLayout = document.getElementById('docsLayout');
        elements.docsContent = document.getElementById('docsContent');
        elements.overlay = document.getElementById('overlay');
        elements.backToTop = document.getElementById('backToTop');
        elements.readingProgress = document.getElementById('readingProgress');
        elements.globalSearch = document.getElementById('globalSearch');
        elements.fontIncrease = document.getElementById('fontIncrease');
        elements.fontDecrease = document.getElementById('fontDecrease');
        elements.fontSizeDisplay = document.querySelector('.font-size-display');
        elements.themeToggle = document.getElementById('themeToggle');
        elements.layoutToggle = document.getElementById('layoutToggle');
        elements.collapseAll = document.getElementById('collapseAll');
        elements.outlineNav = document.getElementById('outlineNav');
        elements.breadcrumb = document.getElementById('breadcrumb');
        elements.tabButtons = document.querySelectorAll('.tab-btn');
        elements.tabPanels = document.querySelectorAll('.tab-panel');
        elements.accordionItems = document.querySelectorAll('.accordion-item');
        elements.navItems = document.querySelectorAll('.nav-item.has-children');
        elements.quickLinks = document.querySelectorAll('.quick-link');
    }

    // ============================================
    // 侧边栏功能
    // ============================================
    function initSidebar() {
        // 切换侧边栏
        elements.sidebarToggle.addEventListener('click', toggleSidebar);

        // 点击遮罩关闭侧边栏
        elements.overlay.addEventListener('click', () => {
            if (window.innerWidth <= 1024) {
                closeSidebar();
            }
        });

        // 侧边栏拖拽调整大小
        if (elements.sidebarResizeHandle) {
            elements.sidebarResizeHandle.addEventListener('mousedown', startResize);
        }

        // 目录折叠/展开
        elements.navItems.forEach(item => {
            const link = item.querySelector('.nav-link');
            const toggleIcon = item.querySelector('.toggle-icon');
            
            if (toggleIcon) {
                toggleIcon.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    item.classList.toggle('expanded');
                });
            }
        });

        // 全部折叠
        if (elements.collapseAll) {
            elements.collapseAll.addEventListener('click', () => {
                const isExpanded = elements.collapseAll.classList.contains('expanded');
                elements.navItems.forEach(item => {
                    item.classList.toggle('expanded', !isExpanded);
                });
                elements.collapseAll.classList.toggle('expanded', !isExpanded);
                elements.collapseAll.innerHTML = isExpanded ? 
                    '<i class="fas fa-expand-alt"></i>' : 
                    '<i class="fas fa-compress-alt"></i>';
            });
        }

        // 快速导航
        elements.quickLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                elements.quickLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    function toggleSidebar() {
        if (window.innerWidth <= 1024) {
            elements.sidebar.classList.toggle('open');
            elements.overlay.classList.toggle('active');
        } else {
            elements.sidebar.classList.toggle('collapsed');
            state.sidebarOpen = !elements.sidebar.classList.contains('collapsed');
            localStorage.setItem('xim-docs-sidebar', state.sidebarOpen ? 'open' : 'collapsed');
        }
    }

    function closeSidebar() {
        elements.sidebar.classList.remove('open');
        elements.overlay.classList.remove('active');
    }

    function startResize(e) {
        state.isResizing = true;
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
        
        const startX = e.clientX;
        const startWidth = elements.sidebar.offsetWidth;

        function handleMouseMove(e) {
            if (!state.isResizing) return;
            
            const newWidth = Math.max(200, Math.min(400, startWidth + e.clientX - startX));
            elements.sidebar.style.width = newWidth + 'px';
            document.documentElement.style.setProperty('--sidebar-width', newWidth + 'px');
        }

        function handleMouseUp() {
            state.isResizing = false;
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            localStorage.setItem('xim-docs-sidebar-width', elements.sidebar.offsetWidth);
        }

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }

    // ============================================
    // 字体大小控制
    // ============================================
    function initFontSize() {
        const savedSize = localStorage.getItem('xim-docs-font-size');
        if (savedSize) {
            state.fontSize = parseInt(savedSize);
            updateFontSize();
        }

        if (elements.fontIncrease) {
            elements.fontIncrease.addEventListener('click', () => {
                if (state.fontSize < 150) {
                    state.fontSize += 10;
                    updateFontSize();
                }
            });
        }

        if (elements.fontDecrease) {
            elements.fontDecrease.addEventListener('click', () => {
                if (state.fontSize > 80) {
                    state.fontSize -= 10;
                    updateFontSize();
                }
            });
        }
    }

    function updateFontSize() {
        document.documentElement.style.fontSize = state.fontSize + '%';
        if (elements.fontSizeDisplay) {
            elements.fontSizeDisplay.textContent = state.fontSize + '%';
        }
        localStorage.setItem('xim-docs-font-size', state.fontSize);
    }

    // ============================================
    // 主题切换
    // ============================================
    function initTheme() {
        // 应用保存的主题
        document.body.setAttribute('data-theme', state.theme);
        updateThemeIcon();

        if (elements.themeToggle) {
            elements.themeToggle.addEventListener('click', () => {
                state.theme = state.theme === 'dark' ? 'light' : 'dark';
                document.body.setAttribute('data-theme', state.theme);
                localStorage.setItem('xim-docs-theme', state.theme);
                updateThemeIcon();
            });
        }
    }

    function updateThemeIcon() {
        if (elements.themeToggle) {
            const icon = elements.themeToggle.querySelector('i');
            if (icon) {
                icon.className = state.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
        }
    }

    // ============================================
    // 搜索功能
    // ============================================
    function initSearch() {
        if (!elements.globalSearch) return;

        // 创建搜索结果容器
        createSearchResultsContainer();

        // 快捷键 Ctrl+K 聚焦搜索
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                elements.globalSearch.focus();
            }
        });

        // 搜索功能
        let searchTimeout;
        elements.globalSearch.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.trim();
            
            if (query.length === 0) {
                hideSearchResults();
                clearHighlights();
                return;
            }
            
            searchTimeout = setTimeout(() => {
                performSearch(query);
            }, 300);
        });

        // 点击外部关闭搜索结果
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-box') && !e.target.closest('.search-results')) {
                hideSearchResults();
            }
        });
    }

    function createSearchResultsContainer() {
        const searchBox = document.querySelector('.search-box');
        if (!searchBox) return;

        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'search-results';
        resultsContainer.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            margin-top: 8px;
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            max-height: 400px;
            overflow-y: auto;
            z-index: 10000;
            display: none;
        `;
        searchBox.style.position = 'relative';
        searchBox.appendChild(resultsContainer);
        elements.searchResults = resultsContainer;
    }

    function performSearch(query) {
        const content = elements.docsContent;
        const sections = content.querySelectorAll('.doc-section');
        const results = [];

        // 清除之前的高亮
        clearHighlights();

        // 搜索所有章节
        sections.forEach(section => {
            const title = section.querySelector('h2, h3')?.textContent || '';
            const text = section.textContent.toLowerCase();
            const queryLower = query.toLowerCase();

            if (text.includes(queryLower)) {
                // 找到匹配的文本片段
                const paragraphs = section.querySelectorAll('p');
                let matchedSnippet = '';
                
                for (const p of paragraphs) {
                    const pText = p.textContent;
                    if (pText.toLowerCase().includes(queryLower)) {
                        // 提取包含关键词的片段
                        const index = pText.toLowerCase().indexOf(queryLower);
                        const start = Math.max(0, index - 30);
                        const end = Math.min(pText.length, index + query.length + 30);
                        matchedSnippet = pText.substring(start, end);
                        if (start > 0) matchedSnippet = '...' + matchedSnippet;
                        if (end < pText.length) matchedSnippet += '...';
                        break;
                    }
                }

                results.push({
                    id: section.id,
                    title: title,
                    snippet: matchedSnippet || title,
                    element: section
                });

                // 高亮匹配的文本
                highlightText(section, query);
            }
        });

        // 显示搜索结果
        displaySearchResults(results, query);
    }

    function highlightText(element, query) {
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        const nodesToHighlight = [];
        let node;
        while (node = walker.nextNode()) {
            if (node.textContent.toLowerCase().includes(query.toLowerCase())) {
                nodesToHighlight.push(node);
            }
        }

        nodesToHighlight.forEach(node => {
            const span = document.createElement('span');
            span.className = 'search-highlight';
            span.style.cssText = `
                background: rgba(102, 126, 234, 0.4);
                color: #fff;
                border-radius: 3px;
                padding: 0 2px;
            `;
            
            const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
            const parts = node.textContent.split(regex);
            
            const fragment = document.createDocumentFragment();
            parts.forEach((part, i) => {
                if (i % 2 === 1) {
                    const highlight = span.cloneNode();
                    highlight.textContent = part;
                    fragment.appendChild(highlight);
                } else {
                    fragment.appendChild(document.createTextNode(part));
                }
            });
            
            node.parentNode.replaceChild(fragment, node);
        });
    }

    function clearHighlights() {
        document.querySelectorAll('.search-highlight').forEach(el => {
            const parent = el.parentNode;
            parent.replaceChild(document.createTextNode(el.textContent), el);
            parent.normalize();
        });
    }

    function escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function displaySearchResults(results, query) {
        if (!elements.searchResults) return;

        if (results.length === 0) {
            elements.searchResults.innerHTML = `
                <div style="padding: 20px; text-align: center; color: var(--text-muted);">
                    <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 10px; display: block;"></i>
                    未找到包含 "${query}" 的内容
                </div>
            `;
        } else {
            elements.searchResults.innerHTML = results.map(result => `
                <div class="search-result-item" data-target="${result.id}" style="
                    padding: 12px 16px;
                    border-bottom: 1px solid var(--border-color);
                    cursor: pointer;
                    transition: background 0.2s;
                " onmouseover="this.style.background='var(--bg-glass)'" onmouseout="this.style.background='transparent'">
                    <div style="font-weight: 600; color: var(--text-primary); margin-bottom: 4px;">
                        ${highlightMatch(result.title, query)}
                    </div>
                    <div style="font-size: 0.85rem; color: var(--text-secondary);">
                        ${highlightMatch(result.snippet, query)}
                    </div>
                </div>
            `).join('');

            // 添加点击事件
            elements.searchResults.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', () => {
                    const targetId = item.dataset.target;
                    const target = document.getElementById(targetId);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        hideSearchResults();
                    }
                });
            });
        }

        elements.searchResults.style.display = 'block';
    }

    function highlightMatch(text, query) {
        const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
        return text.replace(regex, '<span style="color: var(--accent-color); font-weight: 600;">$1</span>');
    }

    function hideSearchResults() {
        if (elements.searchResults) {
            elements.searchResults.style.display = 'none';
        }
    }

    // ============================================
    // 滚动和导航功能
    // ============================================
    function initScroll() {
        // 返回顶部
        if (elements.backToTop) {
            elements.backToTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        // 滚动监听
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateScrollProgress();
                    updateBackToTop();
                    updateActiveSection();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        // 平滑滚动到锚点
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href && href !== '#') {
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        const headerOffset = 80;
                        const elementPosition = target.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });

                        // 移动端关闭侧边栏
                        if (window.innerWidth <= 1024) {
                            closeSidebar();
                        }
                    }
                }
            });
        });
    }

    function updateScrollProgress() {
        if (!elements.readingProgress) return;

        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        
        elements.readingProgress.style.width = progress + '%';
    }

    function updateBackToTop() {
        if (!elements.backToTop) return;

        if (window.pageYOffset > 300) {
            elements.backToTop.classList.add('visible');
        } else {
            elements.backToTop.classList.remove('visible');
        }
    }

    function updateActiveSection() {
        const sections = document.querySelectorAll('.doc-section[id], .doc-section h3[id]');
        const scrollPos = window.pageYOffset + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < bottom) {
                // 更新导航高亮
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });

                // 更新大纲高亮
                if (elements.outlineNav) {
                    elements.outlineNav.querySelectorAll('a').forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + id) {
                            link.classList.add('active');
                        }
                    });
                }

                // 更新面包屑
                updateBreadcrumb(section);
            }
        });
    }

    function updateBreadcrumb(section) {
        if (!elements.breadcrumb) return;

        const sectionTitle = section.querySelector('h2, h3')?.textContent || '';
        if (sectionTitle) {
            const lastCrumb = elements.breadcrumb.querySelector('span:last-child');
            if (lastCrumb) {
                lastCrumb.textContent = sectionTitle;
            }
        }
    }

    // ============================================
    // 生成右侧大纲
    // ============================================
    function initOutline() {
        if (!elements.outlineNav) return;

        const headings = document.querySelectorAll('.doc-section h2[id], .doc-section h3[id]');
        
        if (headings.length === 0) return;

        elements.outlineNav.innerHTML = '';
        
        headings.forEach(heading => {
            const link = document.createElement('a');
            link.href = '#' + heading.id;
            link.textContent = heading.textContent;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
            elements.outlineNav.appendChild(link);
        });
    }

    // ============================================
    // 标签页功能
    // ============================================
    function initTabs() {
        if (!elements.tabButtons.length) return;

        elements.tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.dataset.tab;

                // 切换按钮状态
                elements.tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // 切换面板
                elements.tabPanels.forEach(panel => {
                    panel.classList.remove('active');
                    if (panel.id === tabId) {
                        panel.classList.add('active');
                    }
                });
            });
        });
    }

    // ============================================
    // 手风琴功能
    // ============================================
    function initAccordion() {
        if (!elements.accordionItems.length) return;

        elements.accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            if (header) {
                header.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    
                    // 关闭其他项（可选）
                    // elements.accordionItems.forEach(i => i.classList.remove('active'));
                    
                    // 切换当前项
                    item.classList.toggle('active', !isActive);
                });
            }
        });
    }

    // ============================================
    // 布局切换
    // ============================================
    function initLayout() {
        if (!elements.layoutToggle) return;

        elements.layoutToggle.addEventListener('click', () => {
            document.body.classList.toggle('layout-compact');
            const isCompact = document.body.classList.contains('layout-compact');
            localStorage.setItem('xim-docs-layout', isCompact ? 'compact' : 'default');
        });

        // 恢复保存的布局
        const savedLayout = localStorage.getItem('xim-docs-layout');
        if (savedLayout === 'compact') {
            document.body.classList.add('layout-compact');
        }
    }

    // ============================================
    // 键盘快捷键
    // ============================================
    function initKeyboard() {
        document.addEventListener('keydown', (e) => {
            // ESC 关闭侧边栏
            if (e.key === 'Escape') {
                if (window.innerWidth <= 1024) {
                    closeSidebar();
                }
            }

            // / 聚焦搜索
            if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
                e.preventDefault();
                if (elements.globalSearch) {
                    elements.globalSearch.focus();
                }
            }
        });
    }

    // ============================================
    // 初始化
    // ============================================
    function init() {
        cacheElements();
        initSidebar();
        initFontSize();
        initTheme();
        initSearch();
        initScroll();
        initOutline();
        initTabs();
        initAccordion();
        initLayout();
        initKeyboard();

        // 恢复侧边栏状态
        const savedSidebar = localStorage.getItem('xim-docs-sidebar');
        if (savedSidebar === 'collapsed' && window.innerWidth > 1024) {
            elements.sidebar.classList.add('collapsed');
            state.sidebarOpen = false;
        }

        // 恢复侧边栏宽度
        const savedWidth = localStorage.getItem('xim-docs-sidebar-width');
        if (savedWidth && window.innerWidth > 1024) {
            document.documentElement.style.setProperty('--sidebar-width', savedWidth + 'px');
            elements.sidebar.style.width = savedWidth + 'px';
        }

        console.log('✅ XIM文档页面已初始化');
    }

    // DOM加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
