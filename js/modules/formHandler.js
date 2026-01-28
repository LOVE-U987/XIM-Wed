/**
 * 表单处理功能模块
 * 包含联系表单的提交处理、验证和提交反馈
 */

// 联系表单提交处理
function handleContactFormSubmit() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // 模拟表单提交
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // 禁用提交按钮，防止重复提交
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 发送中...';
            
            // 模拟API请求延迟
            setTimeout(() => {
                // 重置表单
                contactForm.reset();
                
                // 恢复按钮状态
                submitBtn.innerHTML = '<i class="fas fa-check"></i> 发送成功!';
                
                // 3秒后恢复按钮原始状态
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
}

// 表单输入验证（基本验证）
function setupFormValidation() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // 添加输入验证事件监听
        const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                validateInput(this);
            });
            
            input.addEventListener('blur', function() {
                validateInput(this);
            });
        });
    }
}

// 单个输入字段验证
function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    
    // 根据字段类型进行验证
    if (input.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
    } else if (input.tagName === 'TEXTAREA') {
        isValid = value.length >= 10; // 简单验证消息长度
    } else {
        isValid = value.length > 0;
    }
    
    // 更新输入字段样式
    if (isValid) {
        input.classList.remove('error');
        input.classList.add('success');
    } else if (value !== '') {
        input.classList.remove('success');
        input.classList.add('error');
    } else {
        input.classList.remove('error', 'success');
    }
    
    return isValid;
}

// 初始化表单处理模块
export function initFormHandler() {
    handleContactFormSubmit();
    setupFormValidation();
}
