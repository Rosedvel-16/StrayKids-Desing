// eventos.js
document.addEventListener('DOMContentLoaded', function() {
    // 1. Efecto de conteo para las fechas de premiación
    const awardDates = document.querySelectorAll('.award-date');
    awardDates.forEach(date => {
        const endDate = new Date(date.textContent.includes('Hasta')) ? 
            date.textContent.replace('Hasta el ', '') : date.textContent;
        date.setAttribute('data-enddate', endDate);
        startCountdown(date);
    });

    // 2. Animación al hacer hover en las tarjetas
    const awardCards = document.querySelectorAll('.award-card');
    awardCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.querySelector('.award-image').style.transform = 'scale(1.05)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.querySelector('.award-image').style.transform = '';
        });
    });

    // 3. Confirmación al hacer clic en votar
    const voteButtons = document.querySelectorAll('.vote-button');
    voteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if(!confirm('¿Estás seguro que quieres ir a votar? Serás redirigido al sitio oficial.')) {
                e.preventDefault();
            }
        });
    });

    // 4. Cargar más premiaciones dinámicamente
    const loadMoreBtn = document.createElement('button');
    loadMoreBtn.textContent = 'Ver más premiaciones';
    loadMoreBtn.className = 'load-more-btn';
    document.querySelector('.awards-section .container').appendChild(loadMoreBtn);
    
    loadMoreBtn.addEventListener('click', loadMoreAwards);
});

// Función para el contador regresivo
function startCountdown(element) {
    const endDate = new Date(element.getAttribute('data-enddate'));
    const now = new Date();
    
    if(endDate > now) {
        const timer = setInterval(() => {
            const diff = endDate - new Date();
            if(diff <= 0) {
                clearInterval(timer);
                element.textContent = "¡Votación cerrada!";
                return;
            }
            
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            
            element.textContent = `Cierra en ${days}d ${hours}h`;
        }, 1000);
    }
}

// Función para cargar más premiaciones (simulada)
function loadMoreAwards() {
    const awardsGrid = document.querySelector('.awards-grid');
    const loading = document.createElement('div');
    loading.className = 'loading-spinner';
    awardsGrid.after(loading);
    
    // Simular carga con API (en un caso real sería fetch)
    setTimeout(() => {
        const newAward = document.createElement('div');
        newAward.className = 'award-card';
        newAward.innerHTML = `
            <img src="../imagenes/placeholder-award.jpg" alt="Nueva premiación" class="award-image">
            <div class="award-date">15 Oct 2025</div>
            <h3>NUEVA PREMIACIÓN</h3>
            <p>Próximamente más información</p>
            <span class="nomination-status">Por confirmar</span>
            <a href="#" class="vote-button">Próximamente</a>
        `;
        awardsGrid.appendChild(newAward);
        loading.remove();
    }, 1500);
}