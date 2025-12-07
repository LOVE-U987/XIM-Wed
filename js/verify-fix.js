// 验证脚本 - 确认导航元素重复问题已修复
console.log('验证导航元素修复结果...');

function verifyNavigationFix() {
    // 检查导航链接数量
    const desktopLinks = document.querySelectorAll('.nav-links a');
    const mobileLinks = document.querySelectorAll('.mobile-nav-content a');
    
    console.log(`桌面导航链接数量: ${desktopLinks.length}`);
    console.log(`移动导航链接数量: ${mobileLinks.length}`);
    
    // 检查是否有重复的链接内容
    const allLinks = [...desktopLinks, ...mobileLinks];
    const linkTexts = {};
    let hasDuplicates = false;
    
    allLinks.forEach((link, index) => {
        const text = link.textContent.trim();
        const href = link.getAttribute('href');
        
        const key = `${text}:${href}`;
        
        if (!linkTexts[key]) {
            linkTexts[key] = [];
        }
        linkTexts[key].push({ index, parent: link.parentElement.className });
    });
    
    console.log('\n链接唯一性验证结果:');
    Object.entries(linkTexts).forEach(([key, occurrences]) => {
        if (occurrences.length > 1) {
            // 允许桌面和移动端各有一个相同的链接
            const isExpected = occurrences.length === 2 && 
                             occurrences.some(o => o.parent.includes('nav-links')) && 
                             occurrences.some(o => o.parent.includes('mobile-nav-content'));
            
            if (isExpected) {
                console.log(`✅ 预期的重复: ${key} (桌面和移动版各一个)`);
            } else {
                hasDuplicates = true;
                console.log(`❌ 发现重复: ${key} 出现 ${occurrences.length} 次`);
                occurrences.forEach(o => console.log(`  - 索引 ${o.index}, 父级: ${o.parent}`));
            }
        } else {
            console.log(`✅ 唯一: ${key}`);
        }
    });
    
    // 检查导航功能是否正常工作
    console.log('\n导航功能验证:');
    // 检查是否能找到主要导航元素
    const navbar = document.querySelector('#navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav-content');
    
    console.log(`导航栏元素: ${navbar ? '✅ 找到' : '❌ 未找到'}`);
    console.log(`菜单切换按钮: ${menuToggle ? '✅ 找到' : '❌ 未找到'}`);
    console.log(`移动导航内容: ${mobileNav ? '✅ 找到' : '❌ 未找到'}`);
    
    // 输出最终结论
    console.log('\n================== 验证结论 ==================');
    if (!hasDuplicates) {
        console.log('✅ 修复成功! 导航元素不再重复渲染');
        console.log('✅ 导航结构正确，桌面端和移动端导航链接数量合适');
    } else {
        console.log('❌ 仍存在重复元素，请进一步检查');
    }
    
    // 提供清理建议
    console.log('\n建议: 验证完成后，从HTML中移除本验证脚本');
}

// 执行验证
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', verifyNavigationFix);
} else {
    verifyNavigationFix();
}