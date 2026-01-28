// 调试脚本 - 用于检测导航元素重复问题
console.log('开始检测导航元素...');

// 检查DOM中实际存在的导航相关元素
function checkNavigationElements() {
    // 检查HTML结构中的导航容器
    console.log('导航容器检查:');
    console.log('- navbar (ID):', document.querySelector('#navbar'));
    console.log('- navbar (Class):', document.querySelector('.navbar'));
    console.log('- nav-links:', document.querySelector('.nav-links'));
    console.log('- mobile-nav-content:', document.querySelector('.mobile-nav-content'));
    console.log('- navbar-nav:', document.querySelector('.navbar-nav'));
    console.log('- menu-toggle:', document.querySelector('.menu-toggle'));
    console.log('- mobile-menu-btn:', document.querySelector('.mobile-menu-btn'));
    
    // 检查所有a标签的数量和内容
    console.log('\n所有a标签检查:');
    const allLinks = document.querySelectorAll('a');
    console.log(`总共发现 ${allLinks.length} 个链接元素`);
    
    // 按href分组计数
    const hrefGroups = {};
    allLinks.forEach((link, index) => {
        const href = link.getAttribute('href') || '无href';
        const text = link.textContent.trim() || '无文本';
        
        if (!hrefGroups[href]) {
            hrefGroups[href] = [];
        }
        hrefGroups[href].push({ index, text, element: link });
    });
    
    // 检查重复
    console.log('\n重复链接检查:');
    let hasDuplicates = false;
    
    Object.entries(hrefGroups).forEach(([href, links]) => {
        if (links.length > 1) {
            hasDuplicates = true;
            console.log(`\n发现 ${links.length} 个指向 ${href} 的链接:`);
            links.forEach(({ index, text, element }) => {
                // 获取元素的父级结构信息
                let parentInfo = '';
                let parent = element.parentElement;
                while (parent) {
                    if (parent.id) {
                        parentInfo = `#${parent.id} > ${parentInfo}`;
                    } else if (parent.className) {
                        parentInfo = `.${parent.className.split(' ').join('.')} > ${parentInfo}`;
                    } else {
                        parentInfo = `${parent.tagName.toLowerCase()} > ${parentInfo}`;
                    }
                    // 限制父级层次，避免过长
                    if (parentInfo.split('>').length > 4) break;
                    parent = parent.parentElement;
                }
                parentInfo = parentInfo.slice(0, -2); // 移除最后的 ' > '
                
                console.log(`  ${index + 1}. "${text}" (${parentInfo})`);
            });
        }
    });
    
    if (!hasDuplicates) {
        console.log('未发现重复链接');
    }
    
    // 检查是否有动态生成的导航元素
    console.log('\n检查动态生成的导航元素:');
    // 这里我们检查是否存在.navbar-nav，如果存在，它可能是动态生成的
    const navbarNav = document.querySelector('.navbar-nav');
    if (navbarNav) {
        console.log('发现.navbar-nav元素，可能是动态生成的:');
        console.log('  子元素数量:', navbarNav.children.length);
        console.log('  第一个子元素:', navbarNav.firstElementChild);
    } else {
        console.log('未发现.navbar-nav元素');
    }
}

// 在DOM加载完成后执行检查
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkNavigationElements);
} else {
    checkNavigationElements();
}