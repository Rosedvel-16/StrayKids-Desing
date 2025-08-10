document.addEventListener('DOMContentLoaded', function() {
    // Filtrado de productos
    const filterButtons = document.querySelectorAll('.filter-btn');
    const merchItems = document.querySelectorAll('.merch-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Añadir clase active al botón clickeado
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filtrar productos
            merchItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Simulación de añadir al carrito
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.closest('.merch-item').querySelector('.merch-title').textContent;
            const productPrice = this.closest('.merch-item').querySelector('.merch-price').textContent;
            
            // Aquí podrías añadir una animación o notificación
            const originalText = this.textContent;
            this.textContent = '¡Añadido!';
            this.style.backgroundColor = '#4CAF50';
            
            // Resetear el botón después de 2 segundos
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '#e53e3e';
            }, 2000);
            
            console.log(`Producto añadido: ${productName} - ${productPrice}`);
            // En una implementación real, aquí iría la lógica para añadir al carrito
        });
    });
    
    // Lista de deseos
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');
    
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function() {
            const isActive = this.classList.contains('active');
            
            if (isActive) {
                this.classList.remove('active');
                this.textContent = '♥';
                this.style.color = '#ccc';
            } else {
                this.classList.add('active');
                this.textContent = '❤';
                this.style.color = '#e53e3e';
            }
        });
    });
    
    // Paginación
    const pageButtons = document.querySelectorAll('.page-btn');
    
    pageButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('active')) {
                // Remover clase active de todos los botones de página
                pageButtons.forEach(btn => btn.classList.remove('active'));
                
                // Añadir clase active al botón clickeado
                this.classList.add('active');
                
                // Aquí iría la lógica para cargar la página correspondiente
                console.log(`Cambiar a página ${this.textContent}`);
            }
        });
    });
    
    // Efecto hover para los productos
    merchItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});