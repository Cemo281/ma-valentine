const bOui = document.getElementById('btn-oui');
const bNon = document.getElementById('btn-non');

// Message de victoire
bOui.addEventListener('click', () => {
    // Changement du texte
    const container = document.querySelector('.container');
    container.innerHTML = `
        <h1 style="font-size: 4rem;">OUI ! ❤️</h1>
        <p style="font-size: 1.5rem; color: #590d22;">Rendez-vous le 14 !</p>
    `;
    
    // Lancement des confettis
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
    
    // On lance une boucle de cœurs pendant quelques secondes
    setInterval(() => {
        confetti({
            particleCount: 20,
            spread: 60,
            shapes: ['heart'], // Des confettis en forme de coeur !
            colors: ['#ff4d6d', '#ff0000'],
            origin: { y: 0.7 }
        });
    }, 500);
});

// Logique de fuite
function fuir() {
    // 1. On récupère les dimensions de la fenêtre et du bouton
    const btnWidth = bNon.offsetWidth;
    const btnHeight = bNon.offsetHeight;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // 2. On calcule la position max possible pour ne pas sortir
    // On enlève la taille du bouton ET une marge de sécurité de 20px
    const maxWidth = windowWidth - btnWidth - 20;
    const maxHeight = windowHeight - btnHeight - 20;

    // 3. Calcul aléatoire (Math.max(0, ...) empêche d'avoir un nombre négatif)
    const randomX = Math.max(0, Math.floor(Math.random() * maxWidth));
    const randomY = Math.max(0, Math.floor(Math.random() * maxHeight));

    // 4. Application du style
    bNon.style.position = "fixed"; // "fixed" est plus sûr que "absolute" ici pour garantir le repère par rapport à l'écran
    bNon.style.left = `${randomX}px`;
    bNon.style.top = `${randomY}px`;
    
    // Ajout esthétique : on fait tourner un peu le bouton pour le rendre plus "fou"
    const randomAngle = (Math.random() * 20) - 10; // Entre -10 et 10 degrés
    bNon.style.transform = `rotate(${randomAngle}deg)`;
}

// Événements (Souris et Tactile)
bNon.addEventListener('mouseover', fuir);
bNon.addEventListener('touchstart', (e) => {
    e.preventDefault();
    fuir();
});

// ==========================================
// FOND ANIMÉ : PLUIE DE CŒURS
// ==========================================

const canvas = document.getElementById('heart-canvas');
const ctx = canvas.getContext('2d');

// On s'assure que le canvas fait toujours la taille de la fenêtre
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Appel initial

let heartsArray = [];

class HeartParticle {
    constructor() {
        // Position de départ aléatoire en bas de l'écran
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        // Taille aléatoire entre 10px et 30px
        this.size = Math.random() * 20 + 10;
        // Vitesse verticale aléatoire
        this.speedY = Math.random() * 1 + 0.5;
        // Opacité de départ
        this.opacity = 1;
        // Une petite rotation aléatoire pour le style
        this.angle = Math.random() * 360;
        this.spinSpeed = Math.random() * 2 - 1; // Vitesse de rotation
    }

    update() {
        // Le cœur monte
        this.y -= this.speedY;
        // L'opacité diminue doucement
        this.opacity -= 0.003;
        // Rotation
        this.angle += this.spinSpeed;

        // Si le cœur est invisible, on le reset en bas pour le recycler
        if (this.opacity <= 0) {
            this.y = canvas.height + Math.random() * 100;
            this.x = Math.random() * canvas.width;
            this.opacity = 1;
            this.speedY = Math.random() * 1 + 0.5;
        }
    }

    draw() {
        ctx.save(); // Sauvegarde l'état actuel du canvas
        ctx.globalAlpha = this.opacity; // Applique la transparence
        ctx.translate(this.x, this.y); // Déplace le point de dessin
        ctx.rotate(this.angle * Math.PI / 180); // Applique la rotation
        ctx.font = `${this.size}px Arial`;
        ctx.fillText('❤️', 0 - this.size/2, 0 + this.size/2); // Dessine l'emoji
        ctx.restore(); // Restaure l'état (pour ne pas affecter les autres cœurs)
    }
}

// Initialisation : on crée 50 cœurs
function initHearts() {
    for (let i = 0; i < 50; i++) {
        heartsArray.push(new HeartParticle());
    }
}

// La boucle d'animation principale
function animateHearts() {
    // On nettoie le canvas à chaque frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Pour chaque cœur, on met à jour sa position et on le dessine
    for (let i = 0; i < heartsArray.length; i++) {
        heartsArray[i].update();
        heartsArray[i].draw();
    }
    // Rappelle la fonction pour la prochaine frame (environ 60fps)
    requestAnimationFrame(animateHearts);
}

// Lancement
initHearts();
animateHearts();