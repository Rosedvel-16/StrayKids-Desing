document.addEventListener('DOMContentLoaded', function() {
    // Filtrado de fotos
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Añadir clase active al botón clickeado
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if(filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Funcionalidad de like
    const likeButtons = document.querySelectorAll('.like-btn');
    
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('liked');
            const icon = this.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
            
            // Actualizar contador (simulado)
            if(this.classList.contains('liked')) {
                const currentLikes = parseInt(this.textContent.match(/\d+/)[0]);
                this.textContent = this.textContent.replace(/\d+/, currentLikes + 1);
            } else {
                const currentLikes = parseInt(this.textContent.match(/\d+/)[0]);
                this.textContent = this.textContent.replace(/\d+/, currentLikes - 1);
            }
        });
    });
    
    // Búsqueda de fotos
    const searchInput = document.querySelector('.search-box input');
    
    searchInput.addEventListener('keyup', function() {
        const searchTerm = this.value.toLowerCase();
        
        galleryItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const description = item.querySelector('p').textContent.toLowerCase();
            
            if(title.includes(searchTerm) || description.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
    
    // Cargar más fotos
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    let currentItems = 8;
    
    if(loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            const hiddenItems = Array.from(galleryItems).slice(currentItems, currentItems + 4);
            
            hiddenItems.forEach(item => {
                item.style.display = 'block';
            });
            
            currentItems += 4;
            
            if(currentItems >= galleryItems.length) {
                loadMoreBtn.style.display = 'none';
            }
        });
    }
    
    // Lightbox para ampliar fotos
    galleryItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if(!e.target.classList.contains('like-btn') && !e.target.classList.contains('download-btn')) {
                const imgSrc = this.querySelector('img').src;
                const title = this.querySelector('h3').textContent;
                const description = this.querySelector('p').textContent;
                
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                lightbox.innerHTML = `
                    <div class="lightbox-content">
                        <span class="close-btn">&times;</span>
                        <img src="${imgSrc}" alt="${title}">
                        <div class="lightbox-info">
                            <h3>${title}</h3>
                            <p>${description}</p>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(lightbox);
                
                const closeBtn = lightbox.querySelector('.close-btn');
                closeBtn.addEventListener('click', () => {
                    lightbox.remove();
                });
                
                lightbox.addEventListener('click', (e) => {
                    if(e.target === lightbox) {
                        lightbox.remove();
                    }
                });
            }
        });
    });
});
