// -----------------------------------------------------------------carrusel --------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    const carrusel = document.querySelector('.grid-integrantes');
    const btnAnterior = document.querySelector('.btn-carrusel.anterior');
    const btnSiguiente = document.querySelector('.btn-carrusel.siguiente');
    
    if (carrusel && btnAnterior && btnSiguiente) {
        // Ancho de cada item + gap (180px imagen + 24px gap)
        const itemWidth = 180 + 24;
        
        btnAnterior.addEventListener('click', () => {
            carrusel.scrollBy({ left: -itemWidth * 2, behavior: 'smooth' });
        });
        
        btnSiguiente.addEventListener('click', () => {
            carrusel.scrollBy({ left: itemWidth * 2, behavior: 'smooth' });
        });
        
        // Ocultar botones si no hay overflow
        function checkOverflow() {
            const container = carrusel.parentElement;
            if (carrusel.scrollWidth <= carrusel.clientWidth) {
                container.classList.add('no-scroll');
            } else {
                container.classList.remove('no-scroll');
            }
        }
        
        checkOverflow();
        window.addEventListener('resize', checkOverflow);
    }
});
//----------------------------------------------------------------------------musica---------------------------------------------------------
// js/musica.js
let audioPlayer;
let isPlaying = false;

function initMusicPlayer() {
    audioPlayer = document.getElementById('audio-player');
    const volumeControl = document.querySelector('.control-volumen');
    
    // Configurar volumen inicial
    audioPlayer.volume = 0.7;
    volumeControl.value = 0.7;
    
    // Event listeners
    volumeControl.addEventListener('input', function() {
        audioPlayer.volume = this.value;
    });
}

function toggleMusica() {
    if (!audioPlayer) initMusicPlayer();
    
    if (isPlaying) {
        audioPlayer.pause();
        document.querySelector('.boton-musica .icono-musica').textContent = '▶';
        document.querySelector('.boton-musica').innerHTML = '<span class="icono-musica">▶</span> Reproducir Música';
    } else {
        audioPlayer.play()
            .then(() => {
                document.querySelector('.boton-musica .icono-musica').textContent = '⏸';
                document.querySelector('.boton-musica').innerHTML = '<span class="icono-musica">⏸</span> Pausar Música';
            })
            .catch(error => {
                console.error('Error al reproducir:', error);
                document.querySelector('.boton-musica').textContent = 'Error al reproducir';
            });
    }
    isPlaying = !isPlaying;
}

function skipBack() {
    if (!audioPlayer) initMusicPlayer();
    audioPlayer.currentTime = Math.max(0, audioPlayer.currentTime - 10);
}

function skipForward() {
    if (!audioPlayer) initMusicPlayer();
    audioPlayer.currentTime = Math.min(audioPlayer.duration, audioPlayer.currentTime + 10);
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', initMusicPlayer);
//-------------------------------------------------------------------------navegacion----------------------------------------------------
// js/navegacion.js
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Efecto activo en el menú
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.opciones a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
    
    // Cerrar menú desplegable al hacer clic fuera
    document.addEventListener('click', function(e) {
        const desplegable = document.querySelector('.desplegable');
        if (!desplegable.contains(e.target)) {
            document.querySelector('.opciones').style.display = 'none';
        }
    });
});
//---------------------------------------------------------------------------------main----------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    // Precarga de imágenes importantes
    const imagesToPreload = [
        '../imagenes/logoSKZ.png',
        '../imagenes/fila.jpeg',
        '../imagenes/karma.jpg',
        '../imagenes/alwayLove.jpeg'
    ];
    
    imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    // Animación de carga
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // Manejo del menú desplegable en móviles
    const btnOpciones = document.querySelector('.btnopciones');
    if (btnOpciones) {
        btnOpciones.addEventListener('click', function(e) {
            e.stopPropagation();
            const opciones = document.querySelector('.opciones');
            if (opciones.style.display === 'block') {
                opciones.style.display = 'none';
            } else {
                opciones.style.display = 'block';
            }
        });
    }
    
    // Detección de dispositivo para ajustes específicos
    function detectDevice() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobile) {
            document.body.classList.add('mobile');
        } else {
            document.body.classList.add('desktop');
        }
    }
    
    detectDevice();
});


