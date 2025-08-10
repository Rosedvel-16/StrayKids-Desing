document.addEventListener('DOMContentLoaded', function() {
    // Configuración del reproductor de audio
    const player = document.getElementById('player');
    const audioPlayer = document.querySelector('.audio-player');
    const nowPlaying = document.getElementById('now-playing');
    const closePlayer = document.getElementById('btn-close-player');
    
    // Mapeo de canciones (rutas a los archivos de audio)
    const songs = {
        // Álbum HOP
        'Walkin On Water': '../musica/hop/WalkinOnWater.mp3',
        'Bounce Back': '../musica/hop/Bounce Back.mp3',
        'U': '../musica/hop/U.mp3',
        'Walkin On WaterVer': '../musica/hop/Walkin On Water(HIP Ver.).mp3',
        'Railway': '../musica/hop/Railway.mp3',
        'Unfair': '../musica/hop/Unfair.mp3',
        'Hallucination': '../musica/hop/HALLUCINATION.mp3',
        'Youth': '../musica/hop/Youth.mp3',
        'So Good':'../musica/hop/SoGood.mp3',
        'ULTRA': '../musica/hop/ULTRA.mp3',
        'Hold my hand': '../musica/hop/Hold my hand.mp3',
        'As we are': '../musica/hop/As we are.mp3',
        // Álbum GIANT
        'Giant': '../musica/GIANT/Giant.mp3',
        'ChkChkBoom-Japanese ver': '../musica/GIANT/Chk Chk Boom-Japanese ver.mp3',
        'NIGHT': '../musica/GIANT/NIGHT.mp3',
        'Falling Up': '../musica/GIANT/Falling Up.mp3',
        'WHY': '../musica/GIANT/WHY.mp3',
        'Saiyan': '../musica/GIANT/Saiyan.mp3',
        'Aiwokuretanoninaze': '../musica/GIANT/Aiwokuretanoninaze.mp3',
        'Christmas Love': '../musica/GIANT/Christmas Love.mp3',
        'NIGHTEnglish': '../musica/GIANT/NIGHT -English ver-.mp3',
        'FallingEnglish': '../musica/GIANT/Falling Up -English ver-.mp3',
        // Álbum ATE
        'Mountains': '../musica/ATE/01.mp3',
        'Chk Chk Boom': '../musica/ATE/02.mp3',
        'JJAM': '../musica/ATE/03.mp3',
        'I Like It': '../musica/ATE/04.mp3',
        'Runners': '../musica/ATE/05.mp3',
        'Twilight': '../musica/ATE/06.mp3',
        'Stray Kids': '../musica/ATE/07.mp3',
        'Chk Chk Boom(Festival ver.)': '../musica/ATE/08.mp3',
        // Álbum ROCK-STAR
        'Megaverse': '../musica/ROCK-STAR/01.mp3',
        'LALALALA': '../musica/ROCK-STAR/LaLaLaLa.unknown',
        'BLIND SPOT': '../musica/ROCK-STAR/03.mp3',
        'COMFLEX': '../musica/ROCK-STAR/04.mp3',
        'Cover Me': '../musica/ROCK-STAR/05.mp3',
        'Leave': '../musica/ROCK-STAR/06.mp3',
        'Social Path': '../musica/ROCK-STAR/07.mp3',
        'LALALALA(Rock Ver.)': '../musica/ROCK-STAR/08.mp3',
        // 5-STAR
        'Hall of Fame': '../musica/5-STAR/Hall of Fame.mp3',
        'S-Class': '../musica/5-STAR/S-Class.mp3',
        'ITEM': '../musica/5-STAR/ITEM.mp3',
        'Super Bowl': '../musica/5-STAR/Super Bowl.mp3',
        'TOPLINE': '../musica/5-STAR/TOPLINE.mp3',
        'DLC': '../musica/5-STAR/DLC.mp3',
        'GET LIT': '../musica/5-STAR/GET LIT.mp3',
        'Collision': '../musica/5-STAR/Collision.mp3',
        'FNF': '../musica/5-STAR/FNF.mp3',
        'Youtiful': '../musica/5-STAR/YOUTIFUL.mp3',
        'The Sound': '../musica/5-STAR/THE SOUND.mp3',
        'Time Out': '../musica/5-STAR/Time Out.mp3',
        
    };
    // Función para limpiar nombres de archivo
    function cleanFileName(name) {
        return name.replace(/[^\w\s]/gi, '').replace(/\s+/g, ' ').trim();
    }
    
    // Reproducir canción individual
    document.querySelectorAll('.btn-play').forEach(button => {
        button.addEventListener('click', function() {
            const songKey = this.getAttribute('data-song');
            const songName = this.parentElement.textContent.replace('▶', '').trim();
            
            // Buscar la canción en el mapeo
            let songPath = songs[songKey];
            
            // Si no está en el mapeo, intentar construir la ruta automáticamente
            if (!songPath) {
                const cleanName = cleanFileName(songName);
                songPath = `../musica/${cleanName}.mp3`;
            }
            
            // Intentar reproducir
            player.src = songPath;
            player.play().then(() => {
                nowPlaying.textContent = `${songName} (Preview)`;
                audioPlayer.classList.add('active');
                
                // Desplazarse al reproductor
                setTimeout(() => {
                    audioPlayer.scrollIntoView({ behavior: 'smooth' });
                }, 300);
            }).catch(error => {
                console.error('Error al reproducir:', error);
                alert('No se pudo cargar el preview. Por favor visita los canales oficiales.');
                window.open('https://www.youtube.com/@StrayKids/featured', '_blank');
            });
        });
    });
    

    // Reproducir álbum completo (solo primera canción como preview)
    document.querySelectorAll('.btn-reproducir').forEach(button => {
        button.addEventListener('click', function() {
            const albumName = this.getAttribute('data-album');
            let firstSong = '';
            let firstSongName = '';
            
            // Encontrar la primera canción del álbum
            const albumElement = this.closest('.album');
            const firstSongElement = albumElement.querySelector('.btn-play');
            if (firstSongElement) {
                firstSong = firstSongElement.getAttribute('data-song');
                firstSongName = firstSongElement.parentElement.textContent.replace('▶', '').trim();
            }
            
            // Buscar la canción en el mapeo
            let songPath = songs[firstSong];
            
            // Si no está en el mapeo, intentar construir la ruta automáticamente
            if (!songPath && firstSongName) {
                const cleanName = cleanFileName(firstSongName);
                songPath = `../musica/${cleanName}.mp3`;
            }
            
            if (songPath) {
                player.src = songPath;
                player.play().then(() => {
                    nowPlaying.textContent = `${firstSongName} (Preview de ${albumName})`;
                    audioPlayer.classList.add('active');
                    
                    // Desplazarse al reproductor
                    setTimeout(() => {
                        audioPlayer.scrollIntoView({ behavior: 'smooth' });
                    }, 300);
                }).catch(error => {
                    console.error('Error al reproducir:', error);
                    alert('No se pudo cargar el preview. Por favor visita los canales oficiales.');
                    window.open('https://open.spotify.com/artist/2dIgFjalVxs4ThymZ67YCE', '_blank');
                });
            } else {
                alert('Preview no disponible. Por favor visita los canales oficiales.');
                window.open('https://www.youtube.com/@StrayKids/featured', '_blank');
            }
        });
    });
    
    // Cerrar reproductor
    closePlayer.addEventListener('click', function() {
        player.pause();
        audioPlayer.classList.remove('active');
    });
    
    // Mostrar mensaje cuando termine la reproducción
    player.addEventListener('ended', function() {
        nowPlaying.innerHTML = 'Preview finalizado. <a href="https://www.youtube.com/@StrayKids/featured" target="_blank" style="color: #e53e3e;">Escucha más en YouTube</a>';
    });
});