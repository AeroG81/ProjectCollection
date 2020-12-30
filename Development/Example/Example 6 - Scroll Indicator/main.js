const scrollIndicator = document.getElementById('scrollIndicator');

window.addEventListener('scroll',()=>{
    
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

    const currentScrolled = window.scrollY;

    const scrollIndicatorWidth = Math.ceil( currentScrolled / scrollableHeight * 100);

    scrollIndicator.style.width = `${scrollIndicatorWidth}%`;
})