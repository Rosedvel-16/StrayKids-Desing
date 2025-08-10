document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    
    // 1. Mostrar/ocultar contraseña
    togglePassword.addEventListener('click', function() {
        const isPasswordVisible = passwordInput.type === 'text';
        
        if (isPasswordVisible) {
            passwordInput.type = 'password';
            this.innerHTML = '<i class="far fa-eye"></i>';
        } else {
            passwordInput.type = 'text';
            this.innerHTML = '<i class="far fa-eye-slash"></i>';
        }
    });
    
    // 2. Validación del formulario
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = passwordInput.value.trim();
        const rememberMe = document.getElementById('remember').checked;
        
        // Validación básica
        if (!email || !password) {
            showAlert('Por favor completa todos los campos', 'error');
            return;
        }
        
        if (!validateEmail(email)) {
            showAlert('Por favor ingresa un correo electrónico válido', 'error');
            return;
        }
        
        if (password.length < 6) {
            showAlert('La contraseña debe tener al menos 6 caracteres', 'error');
            return;
        }
        
        // Simular envío del formulario
        simulateLogin(email, password, rememberMe);
    });
    
    // 3. Login con redes sociales
    const googleButton = document.querySelector('.social-button.google');
    const twitterButton = document.querySelector('.social-button.twitter');
    
    googleButton.addEventListener('click', function() {
        showAlert('Redirigiendo a Google para autenticación...', 'info');
        // Aquí iría la lógica real de autenticación con Google
    });
    
    twitterButton.addEventListener('click', function() {
        showAlert('Redirigiendo a Twitter para autenticación...', 'info');
        // Aquí iría la lógica real de autenticación con Twitter
    });
    
    // Funciones auxiliares
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showAlert(message, type) {
        // Eliminar alertas anteriores
        const existingAlert = document.querySelector('.login-alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        // Crear alerta
        const alertDiv = document.createElement('div');
        alertDiv.className = `login-alert ${type}`;
        alertDiv.textContent = message;
        
        // Insertar antes del formulario
        loginForm.prepend(alertDiv);
        
        // Eliminar después de 5 segundos
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }
    
    function simulateLogin(email, password, remember) {
        const loginButton = document.querySelector('.login-button');
        const originalText = loginButton.textContent;
        
        // Simular carga
        loginButton.disabled = true;
        loginButton.textContent = 'Iniciando sesión...';
        loginButton.style.opacity = '0.7';
        
        // Simular petición al servidor
        setTimeout(() => {
            // Simular éxito (en un caso real, esto dependería de la respuesta del servidor)
            const isSuccess = true; // Cambiar a false para simular error
            
            if (isSuccess) {
                showAlert('¡Inicio de sesión exitoso! Redirigiendo...', 'success');
                
                // Guardar en localStorage si marcó "Recordar sesión"
                if (remember) {
                    localStorage.setItem('stayLoggedIn', 'true');
                }
                
                // Redirigir a la página principal después de 2 segundos
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            } else {
                showAlert('Correo o contraseña incorrectos', 'error');
                loginButton.disabled = false;
                loginButton.textContent = originalText;
                loginButton.style.opacity = '1';
            }
        }, 1500);
    }
    
    // 4. Verificar si ya está logueado (simulación)
    if (localStorage.getItem('stayLoggedIn') === 'true') {
        showAlert('Ya has iniciado sesión. Redirigiendo...', 'info');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
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