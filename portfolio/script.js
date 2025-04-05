// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Project card animasyonu (isteğe bağlı)
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = 'none';
    });
});