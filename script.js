const bOui = document.getElementById('btn-oui');
const bNon = document.getElementById('btn-non');

// Fonction de victoire
function celebrer() {
    // On masque les boutons s'ils sont encore présents dans le body
    [bOui, bNon].forEach(btn => {
        btn.style.display = 'none';
    });

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
            shapes: ['heart'],
            colors: ['#ff4d6d', '#ff0000'],
            origin: { y: 0.7 }
        });
    }, 500);
}

// Logique de fuite (ajustée pour accepter n'importe quel bouton)
function fuir(el) {
    el.style.transition = "none";
    el.style.transform = "none"; 
    el.style.margin = "0";

    if (el.parentElement !== document.body) {
        document.body.appendChild(el);
    }

    const btnWidth = el.offsetWidth;
    const btnHeight = el.offsetHeight;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const safetyMargin = 30;
    const maxX = Math.max(safetyMargin, windowWidth - btnWidth - safetyMargin);
    const maxY = Math.max(safetyMargin, windowHeight - btnHeight - safetyMargin);

    const randomX = Math.floor(Math.random() * (maxX - safetyMargin + 1)) + safetyMargin;
    const randomY = Math.floor(Math.random() * (maxY - safetyMargin + 1)) + safetyMargin;

    el.style.position = "fixed";
    el.style.left = `${randomX}px`;
    el.style.top = `${randomY}px`;
    el.style.zIndex = "10000";
    
    const randomAngle = (Math.random() * 20) - 10;
    el.style.transform = `rotate(${randomAngle}deg)`;

    setTimeout(() => {
        el.style.transition = "all 0.3s ease-out";
    }, 10);
}

// Transformation du bouton en Oui
function transformerEnOui(el) {
    el.innerText = "OUI ! ❤️";
    el.style.backgroundColor = "var(--primary-color)";
    el.style.color = "white";
    el.style.border = "none";
    el.style.animation = "pulse 2s infinite";
    el.style.pointerEvents = "auto";
    
    // Nettoyage des événements de fuite
    el.removeEventListener('mouseover', handleHover);
    el.removeEventListener('touchstart', handleHover);
    el.onclick = celebrer; // Utilisation de onclick pour simplifier le remplacement
}

// Transformation du bouton en Non (avec fuite)
function transformerEnNon(el) {
    el.innerText = "Non";
    el.style.backgroundColor = "white";
    el.style.color = "var(--text-color)";
    el.style.border = "2px solid var(--secondary-color)";
    el.style.animation = "none";
    el.onclick = null;
    
    // Ajout de la logique de fuite
    el.addEventListener('mouseover', handleHover);
    el.addEventListener('touchstart', handleHover);
}

// Événement principal sur le survol
function handleHover(e) {
    if (e && e.type === 'touchstart') {
        e.preventDefault();
    }

    const target = e.currentTarget;
    const rand = Math.random();

    if (rand < 0.95) {
        // 1 - le bouton change de position (95% de chance)
        fuir(target);
    } else if (rand < 0.99) {
        // 2 - Inversion des rôles (4% de chance)
        const autreBouton = (target === bNon) ? bOui : bNon;
        
        transformerEnOui(target);
        transformerEnNon(autreBouton);
        
        // On fait fuir le nouveau bouton "Non" immédiatement pour l'effet
        fuir(autreBouton);
    } else {
        // 3 - le bouton devient oui (1% de chance)
        transformerEnOui(target);
    }
}

// Initialisation des événements
bOui.addEventListener('click', celebrer);
bNon.addEventListener('mouseover', handleHover);
bNon.addEventListener('touchstart', handleHover);

// Sécurité redimensionnement
window.addEventListener('resize', () => {
    [bOui, bNon].forEach(btn => {
        if (btn.parentElement === document.body && btn.innerText === "Non") {
            fuir(btn);
        }
    });
});

// ==========================================
// FOND ANIMÉ OPTIMISÉ (CSS + JS)
// ==========================================

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️'; // Tu peux varier les emojis : 🌹, 💖, 🌸
    
    // Position horizontale aléatoire (0 à 100vw)
    heart.style.left = Math.random() * 100 + "vw";
    
    // Taille aléatoire pour la profondeur
    heart.style.fontSize = Math.random() * 20 + 10 + "px";
    
    // Durée d'animation aléatoire (entre 3s et 6s) pour ne pas que ça fasse "robotique"
    heart.style.animationDuration = Math.random() * 3 + 3 + "s";
    
    document.getElementById('hearts-container').appendChild(heart);
    
    // Nettoyage : On supprime l'élément du DOM quand l'animation est finie
    // C'est CRUCIAL pour ne pas faire planter le navigateur à la longue
    setTimeout(() => {
        heart.remove();
    }, 6000); // 6000ms correspond à la durée max de l'animation
}

// On génère un cœur tous les 300ms (ajuste ce chiffre : 100 = tempête, 500 = brise légère)
setInterval(createHeart, 300);