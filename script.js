const bOui = document.getElementById('btn-oui');
const bNon = document.getElementById('btn-non');

// Quand on clique sur OUI
bOui.addEventListener('click', () => {
    // On remplace le contenu de la page par un message de victoire
    document.body.innerHTML = '<h1 style="color:#ff4757; font-size:3em;">Je savais que tu dirais OUI ! ❤️</h1>';
});

// Quand la souris approche du NON (Version Ordinateur)
bNon.addEventListener('mouseover', deplacerBouton);

// Quand on essaie de toucher le NON (Version Mobile)
bNon.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Empêche le clic
    deplacerBouton();
});

function deplacerBouton() {
    // On récupère la largeur et hauteur de la fenêtre disponible
    const x = Math.random() * (window.innerWidth - bNon.offsetWidth);
    const y = Math.random() * (window.innerHeight - bNon.offsetHeight);

    // On applique les nouvelles coordonnées
    bNon.style.position = 'absolute';
    bNon.style.left = `${x}px`;
    bNon.style.top = `${y}px`;
}