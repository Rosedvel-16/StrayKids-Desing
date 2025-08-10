document.addEventListener('DOMContentLoaded', function() {
    // 1. Filtrado de noticias
    const filterButtons = document.querySelectorAll('.filter-btn');
    const newsItems = document.querySelectorAll('.noticia, .noticia-destacada');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Añadir clase active al botón clickeado
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filtrar noticias
            newsItems.forEach(item => {
                const itemCategory = item.getAttribute('data-categoria');
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Asegurarse de que la noticia destacada siempre se muestre primero
            if (filterValue === 'all') {
                document.querySelector('.noticia-destacada').style.display = 'grid';
            }
        });
    });
    
    // 2. Búsqueda de noticias
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            // Si la búsqueda está vacía, mostrar todas las noticias según el filtro activo
            document.querySelector('.filter-btn.active').click();
            return;
        }
        
        newsItems.forEach(item => {
            const title = item.querySelector('h2').textContent.toLowerCase();
            const content = item.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || content.includes(searchTerm)) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // 3. Carousel de imágenes para los álbumes
    function setupCarousels() {
        const carousels = document.querySelectorAll('.album-carousel');
        
        carousels.forEach(carousel => {
            const slide = carousel.querySelector('.carousel-slide');
            const images = slide.querySelectorAll('img');
            const prevBtn = carousel.querySelector('.prev');
            const nextBtn = carousel.querySelector('.next');
            const dotsContainer = carousel.querySelector('.carousel-dots');
            
            let currentIndex = 0;
            
            // Crear indicadores (dots)
            images.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('carousel-dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    goToSlide(index);
                });
                dotsContainer.appendChild(dot);
            });
            
            const dots = dotsContainer.querySelectorAll('.carousel-dot');
            
            // Mostrar primera imagen
            images[0].classList.add('active');
            
            // Función para ir a un slide específico
            function goToSlide(index) {
                images[currentIndex].classList.remove('active');
                dots[currentIndex].classList.remove('active');
                
                currentIndex = index;
                
                images[currentIndex].classList.add('active');
                dots[currentIndex].classList.add('active');
            }
            
            // Botón siguiente
            nextBtn.addEventListener('click', () => {
                images[currentIndex].classList.remove('active');
                dots[currentIndex].classList.remove('active');
                
                currentIndex = (currentIndex + 1) % images.length;
                
                images[currentIndex].classList.add('active');
                dots[currentIndex].classList.add('active');
            });
            
            // Botón anterior
            prevBtn.addEventListener('click', () => {
                images[currentIndex].classList.remove('active');
                dots[currentIndex].classList.remove('active');
                
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                
                images[currentIndex].classList.add('active');
                dots[currentIndex].classList.add('active');
            });
            
            // Auto-avance cada 5 segundos
            let interval = setInterval(() => {
                nextBtn.click();
            }, 5000);
            
            // Pausar al interactuar
            carousel.addEventListener('mouseenter', () => {
                clearInterval(interval);
            });
            
            carousel.addEventListener('mouseleave', () => {
                interval = setInterval(() => {
                    nextBtn.click();
                }, 5000);
            });
        });
    }
    
    setupCarousels();
    
    // 4. Paginación
    const pageButtons = document.querySelectorAll('.pagina-btn');
    
    pageButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('siguiente')) {
                // Cambiar a página específica
                pageButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Simular cambio de página
                simulatePageChange();
            } else {
                // Siguiente página
                const activeBtn = document.querySelector('.pagina-btn.active');
                const nextPage = parseInt(activeBtn.textContent) + 1;
                
                if (nextPage <= 3) {
                    document.querySelector(`.pagina-btn:nth-child(${nextPage})`).click();
                }
            }
        });
    });
    
    function simulatePageChange() {
        const newsGrid = document.querySelector('.noticias-grid');
        newsGrid.style.animation = 'none';
        void newsGrid.offsetWidth; // Trigger reflow
        newsGrid.style.animation = 'fadeIn 0.5s ease forwards';
    }
    
    // 5. Animación inicial
    function animateOnLoad() {
        const heroContent = document.querySelector('.hero-content');
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';
        heroContent.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
    
    animateOnLoad();
});