document.addEventListener('DOMContentLoaded', function() {
    // 1. Filtrado de datos curiosos
    const filterButtons = document.querySelectorAll('.filter-btn');
    const triviaCards = document.querySelectorAll('.trivia-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Añadir clase active al botón clickeado
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filtrar tarjetas
            triviaCards.forEach(card => {
                const cardCategory = card.getAttribute('data-categoria');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // 2. Búsqueda de datos curiosos
    const searchInput = document.getElementById('search-trivia');
    const searchBtn = document.getElementById('search-btn-trivia');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            // Si la búsqueda está vacía, mostrar todas según el filtro activo
            document.querySelector('.filter-btn.active').click();
            return;
        }
        
        triviaCards.forEach(card => {
            const title = card.querySelector('.trivia-title').textContent.toLowerCase();
            const content = card.querySelector('.trivia-dato p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || content.includes(searchTerm)) {
                card.style.display = 'flex';
                card.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // 3. Funcionalidad de "me gusta"
    const likeButtons = document.querySelectorAll('.trivia-like');
    
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            this.innerHTML = this.classList.contains('active') ? 
                '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
            
            // Aquí podrías guardar en localStorage o enviar a un servidor
            const cardId = this.closest('.trivia-card').getAttribute('data-id'); // Necesitarías agregar data-id a cada card
            console.log(`Card ${cardId} liked`);
        });
    });
    
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
                
                if (nextPage <= 2) { // Asumiendo que hay 2 páginas
                    document.querySelector(`.pagina-btn:nth-child(${nextPage})`).click();
                }
            }
        });
    });
    
    function simulatePageChange() {
        const triviaGrid = document.querySelector('.trivia-grid');
        triviaGrid.style.animation = 'none';
        void triviaGrid.offsetWidth; // Trigger reflow
        triviaGrid.style.animation = 'fadeIn 0.5s ease forwards';
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