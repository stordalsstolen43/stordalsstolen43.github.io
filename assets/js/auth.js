/**
 * Simple authentication system for protected pages
 * Uses localStorage to persist login state
 */

(function() {
    'use strict';

    // Configuration - Change these credentials as needed
    const AUTH_CONFIG = {
        username: 'guest',
        password: 'stordals2026', // Change this to your desired password
        storageKey: 'stordals_authenticated',
        sessionTimeout: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
    };

    // Check if current page is protected
    function isProtectedPage() {
        const protectedPages = ['/no.html', '/en.html', '/de.html', '/fr.html'];
        const currentPath = window.location.pathname;
        return protectedPages.some(page => currentPath.endsWith(page));
    }

    // Check if user is authenticated
    function isAuthenticated() {
        const authData = localStorage.getItem(AUTH_CONFIG.storageKey);
        if (!authData) return false;

        try {
            const data = JSON.parse(authData);
            const now = new Date().getTime();
            
            // Check if session has expired
            if (data.expires && now > data.expires) {
                localStorage.removeItem(AUTH_CONFIG.storageKey);
                return false;
            }
            
            return data.authenticated === true;
        } catch (e) {
            return false;
        }
    }

    // Set authentication state
    function setAuthenticated(value) {
        const expires = new Date().getTime() + AUTH_CONFIG.sessionTimeout;
        const authData = {
            authenticated: value,
            expires: expires,
            timestamp: new Date().getTime()
        };
        localStorage.setItem(AUTH_CONFIG.storageKey, JSON.stringify(authData));
    }

    // Show login modal
    function showLoginModal() {
        const modal = document.getElementById('login-modal');
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Focus on username input
            const usernameInput = document.getElementById('login-username');
            if (usernameInput) {
                setTimeout(() => usernameInput.focus(), 100);
            }
        }
    }

    // Hide login modal
    function hideLoginModal() {
        const modal = document.getElementById('login-modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    // Handle login form submission
    function handleLogin(event) {
        event.preventDefault();
        
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value;
        const errorMsg = document.getElementById('login-error');
        
        // Clear previous error
        if (errorMsg) {
            errorMsg.textContent = '';
            errorMsg.style.display = 'none';
        }
        
        // Validate credentials
        if (username === AUTH_CONFIG.username && password === AUTH_CONFIG.password) {
            setAuthenticated(true);
            hideLoginModal();
            
            // Show protected content
            showProtectedContent();
        } else {
            // Show error message
            const texts = getLoginText();
            if (errorMsg) {
                errorMsg.textContent = texts.error;
                errorMsg.style.display = 'block';
            }
            
            // Shake animation
            const form = document.getElementById('login-form');
            if (form) {
                form.classList.add('shake');
                setTimeout(() => form.classList.remove('shake'), 500);
            }
        }
    }

    // Show protected content
    function showProtectedContent() {
        const protectedContent = document.querySelector('.protected-content');
        if (protectedContent) {
            protectedContent.style.display = 'block';
        }
        
        // Hide login prompt
        const loginPrompt = document.getElementById('login-prompt');
        if (loginPrompt) {
            loginPrompt.style.display = 'none';
        }
    }

    // Hide protected content
    function hideProtectedContent() {
        const protectedContent = document.querySelector('.protected-content');
        if (protectedContent) {
            protectedContent.style.display = 'none';
        }
        
        // Show login prompt
        const loginPrompt = document.getElementById('login-prompt');
        if (loginPrompt) {
            loginPrompt.style.display = 'block';
        }
    }

    // Handle logout
    function handleLogout() {
        setAuthenticated(false);
        hideProtectedContent();
        showLoginModal();
    }

    // Initialize authentication check
    function initAuth() {
        if (!isProtectedPage()) {
            return; // Not a protected page, no need to check
        }

        if (isAuthenticated()) {
            showProtectedContent();
        } else {
            hideProtectedContent();
            showLoginModal();
        }
    }

    // Get language-specific text
    function getLoginText() {
        const lang = document.documentElement.lang || 'no';
        const texts = {
            'no': {
                title: '🔐 Tilgang til Gjestehåndbok',
                subtitle: 'Vennligst logg inn for å få tilgang til håndboken',
                username: 'Brukernavn:',
                password: 'Passord:',
                button: 'Logg inn',
                back: '← Tilbake til forsiden',
                error: 'Feil brukernavn eller passord. Vennligst prøv igjen.'
            },
            'en': {
                title: '🔐 Access to Visitor Guidebook',
                subtitle: 'Please log in to access the guidebook',
                username: 'Username:',
                password: 'Password:',
                button: 'Log in',
                back: '← Back to front page',
                error: 'Incorrect username or password. Please try again.'
            },
            'de': {
                title: '🔐 Zugang zum Besucher-Handbuch',
                subtitle: 'Bitte melden Sie sich an, um auf das Handbuch zuzugreifen',
                username: 'Benutzername:',
                password: 'Passwort:',
                button: 'Anmelden',
                back: '← Zurück zur Startseite',
                error: 'Falscher Benutzername oder Passwort. Bitte versuchen Sie es erneut.'
            },
            'fr': {
                title: '🔐 Accès au guide du visiteur',
                subtitle: 'Veuillez vous connecter pour accéder au guide',
                username: 'Nom d\'utilisateur:',
                password: 'Mot de passe:',
                button: 'Se connecter',
                back: '← Retour à la page d\'accueil',
                error: 'Nom d\'utilisateur ou mot de passe incorrect. Veuillez réessayer.'
            }
        };
        return texts[lang] || texts['no'];
    }

    // Create login modal HTML
    function createLoginModal() {
        const texts = getLoginText();
        const modalHTML = `
            <div id="login-modal" class="login-modal" style="display: none;">
                <div class="login-modal-content">
                    <div class="login-header">
                        <h2>${texts.title}</h2>
                        <p>${texts.subtitle}</p>
                    </div>
                    <form id="login-form" class="login-form">
                        <div id="login-error" class="login-error" style="display: none;"></div>
                        <div class="login-input-group">
                            <label for="login-username">${texts.username}</label>
                            <input type="text" id="login-username" name="username" required autocomplete="username">
                        </div>
                        <div class="login-input-group">
                            <label for="login-password">${texts.password}</label>
                            <input type="password" id="login-password" name="password" required autocomplete="current-password">
                        </div>
                        <button type="submit" class="login-button">${texts.button}</button>
                    </form>
                    <div class="login-footer">
                        <p><a href="/">${texts.back}</a></p>
                    </div>
                </div>
            </div>
        `;
        
        // Insert modal into body
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Attach event listeners
        const form = document.getElementById('login-form');
        if (form) {
            form.addEventListener('submit', handleLogin);
        }
        
        // Close modal on background click
        const modal = document.getElementById('login-modal');
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    // Don't allow closing by clicking outside on protected pages
                    if (isProtectedPage() && !isAuthenticated()) {
                        return;
                    }
                }
            });
        }
    }

    // Create logout button
    function createLogoutButton() {
        const logoutHTML = `
            <div class="logout-container" style="text-align: center; margin: 20px 0;">
                <button id="logout-button" class="logout-button" style="background-color: #95a5a6; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
                    Logg ut
                </button>
            </div>
        `;
        
        // Find a good place to insert logout button (after language selector)
        const languageSelector = document.querySelector('.inline-list');
        if (languageSelector && languageSelector.parentElement) {
            languageSelector.parentElement.insertAdjacentHTML('afterend', logoutHTML);
            
            const logoutBtn = document.getElementById('logout-button');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', handleLogout);
            }
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            createLoginModal();
            initAuth();
            if (isAuthenticated() && isProtectedPage()) {
                createLogoutButton();
            }
        });
    } else {
        createLoginModal();
        initAuth();
        if (isAuthenticated() && isProtectedPage()) {
            createLogoutButton();
        }
    }

    // Expose logout function globally (for manual logout links)
    window.handleLogout = handleLogout;
})();

