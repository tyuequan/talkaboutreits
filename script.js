// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    
    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    });
    
    // 移动端菜单切换
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // 点击菜单项后关闭移动端菜单
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // 平滑滚动到锚点
    const allNavLinks = document.querySelectorAll('a[href^="#"]');
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // FAQ折叠效果
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // 关闭所有其他FAQ项
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // 切换当前FAQ项
            item.classList.toggle('active', !isActive);
        });
    });
    
    // "开始了解"按钮功能
    const learnMoreBtn = document.getElementById('learn-more-btn');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                const offsetTop = aboutSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // 投资咨询按钮
    const consultBtn = document.querySelector('.btn-secondary');
    if (consultBtn) {
        consultBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('感谢您的关注！投资REITs需理性分析，请咨询专业投资顾问。', 'info');
        });
    }
    
    // 通知提示函数
    function showNotification(message, type = 'info') {
        // 检查是否已有通知，避免重复显示
        if (document.querySelector('.notification')) {
            return;
        }
        
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // 添加样式
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            color: 'white',
            fontSize: '0.9rem',
            fontWeight: '500',
            zIndex: '10001',
            opacity: '0',
            transform: 'translateX(100%)',
            transition: 'all 0.3s ease',
            maxWidth: '350px',
            wordWrap: 'break-word',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
        });
        
        // 设置颜色
        switch(type) {
            case 'success':
                notification.style.background = '#34C759';
                break;
            case 'error':
                notification.style.background = '#FF3B30';
                break;
            default:
                notification.style.background = '#007AFF';
        }
        
        document.body.appendChild(notification);
        
        // 显示动画
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // 自动隐藏
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
    
    // 页面滚动时的元素动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll('.about-card, .advantage-item, .stat-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // 移动端优化：防止双击缩放
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    console.log('REITs网站初始化完成 🎉');
    console.log('✅ 移动端自适应已优化');
    console.log('✅ "开始了解"按钮已连接到REITs介绍');
    console.log('✅ 基于专业REITs内容已更新');
}); 