// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    
    // 햄버거 메뉴 토글
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // 메뉴 링크 클릭 시 햄버거 메뉴 닫기
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // 스크롤 시 네비게이션 바 스타일 변경
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // 부드러운 스크롤 애니메이션
    const smoothScroll = function(target) {
        const targetElement = document.querySelector(target);
        if (targetElement) {
            const targetPosition = targetElement.offsetTop - 70; // 네비게이션 바 높이만큼 조정
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    };
    
    // 네비게이션 링크 클릭 시 부드러운 스크롤
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
        });
    });
    
    // 전화번호 팝업 기능 (컴퓨터용)
    const phonePopup = document.getElementById('phone-popup');
    const closePopup = document.querySelector('.close-popup');
    
    // 모바일인지 확인하는 함수
    const isMobile = function() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };
    
    // 전화번호 링크 클릭 시 처리
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!isMobile()) {
                e.preventDefault();
                phonePopup.style.display = 'block';
                document.body.style.overflow = 'hidden'; // 스크롤 방지
            }
            // 모바일에서는 기본 동작 (전화 앱 실행)
        });
    });
    
    // 팝업 닫기
    closePopup.addEventListener('click', function() {
        phonePopup.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // 팝업 외부 클릭 시 닫기
    phonePopup.addEventListener('click', function(e) {
        if (e.target === phonePopup) {
            phonePopup.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // ESC 키로 팝업 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && phonePopup.style.display === 'block') {
            phonePopup.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // 스크롤 애니메이션 효과
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 애니메이션을 적용할 요소들
    const animateElements = document.querySelectorAll('.service-card, .case-card, .stat, .feature');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // 폼 관련 코드 제거 - 백엔드 없음
    
    // 스크롤 진행률 표시 (선택사항)
    const createScrollProgress = function() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    };
    
    // 스크롤 진행률 표시 활성화
    createScrollProgress();
    
    // 페이지 로드 시 애니메이션
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // 터치 디바이스에서 호버 효과 개선
    if ('ontouchstart' in window) {
        const touchElements = document.querySelectorAll('.service-card, .case-card, .btn');
        touchElements.forEach(el => {
            el.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            el.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
    }
    
    // 성능 최적화: 스크롤 이벤트 쓰로틀링
    let ticking = false;
    function updateScroll() {
        // 스크롤 관련 업데이트 로직
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScroll);
            ticking = true;
        }
    }
    
    // 스크롤 이벤트 최적화
    window.addEventListener('scroll', requestTick);
    
    // 뷰포트 크기 변경 시 레이아웃 조정
    window.addEventListener('resize', function() {
        // 모바일 메뉴가 열려있을 때 화면 크기 변경 시 메뉴 닫기
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // 접근성 개선: 키보드 네비게이션
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // 로딩 상태 표시 (선택사항)
    const showLoadingState = function() {
        const loadingOverlay = document.createElement('div');
        loadingOverlay.id = 'loading-overlay';
        loadingOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        loadingOverlay.innerHTML = `
            <div style="text-align: center;">
                <div style="width: 50px; height: 50px; border: 3px solid #f3f3f3; border-top: 3px solid #667eea; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
                <p style="color: #333; font-size: 18px;">로딩 중...</p>
            </div>
        `;
        
        document.body.appendChild(loadingOverlay);
        
        // CSS 애니메이션 추가
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            loadingOverlay.style.opacity = '1';
        }, 100);
        
        // 2초 후 로딩 화면 제거
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                if (loadingOverlay.parentNode) {
                    loadingOverlay.parentNode.removeChild(loadingOverlay);
                }
            }, 300);
        }, 2000);
    };
    
    // 페이지 로드 시 로딩 상태 표시
    showLoadingState();
    
    console.log('철거업 사이트 JavaScript 로드 완료! 🏗️');
});
