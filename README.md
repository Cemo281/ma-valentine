# 🌹 Ma Valentine - La Demande Impossible à Refuser

Bienvenue sur **Ma Valentine**, une application web interactive et ludique conçue pour la Saint-Valentin. Ce projet n'est pas une simple page statique : c'est un piège algorithmique bienveillant qui garantit une réponse positive grâce à une gestion d'événements dynamique.

## ✨ Fonctionnalités

L'expérience utilisateur est conçue pour être fluide, amusante et surprenante. Le cœur du projet réside dans le bouton "Non", qui réagit intelligemment au survol ou au toucher selon trois scénarios probabilistes :

### 🎯 La Logique du "Non"
Dès que l'utilisateur tente de refuser, un algorithme se déclenche :

* **L'Esquive (95% de chance)** : Le bouton fuit instantanément à une position aléatoire sur l'écran, rendant le clic impossible.
* **Le Renversement (4% de chance)** : Les boutons "Oui" et "Non" échangent leurs places et leurs fonctionnalités. Celui que vous pensiez être le "Non" devient le "Oui", et l'autre s'enfuit !
* **L'Ultimatum (1% de chance)** : Le bouton "Non" capitule et se transforme lui aussi en bouton "Oui". L'écran affiche alors deux options positives.

### 🎉 La Célébration
Une fois le "Oui" obtenu (car c'est inévitable) :
* L'interface se verrouille pour fêter le moment.
* Une pluie de confettis est déclenchée via `canvas-confetti`.
* Une animation de cœurs flottants s'active en arrière-plan.

## 🛠️ Stack Technique

Projet **Vanilla JS** léger et performant, sans framework lourd.

* **HTML5** : Structure sémantique.
* **CSS3** : Design moderne avec **Glassmorphism**, animations `@keyframes` (battement de cœur), et dégradés radiaux.
* **JavaScript (ES6+)** : Gestion du DOM, calculs de collisions pour la fuite du bouton, et logique événementielle (`touchstart`/`mouseover`).
* **Librairie Externe** : `canvas-confetti` (via CDN) pour les effets de particules.

## 🚀 Installation & Utilisation

Aucune compilation n'est nécessaire. Vous pouvez lancer le projet directement.

1.  **Cloner le dépôt :**
    ```bash
    git clone [https://github.com/Cemo281/ma-valentine.git](https://github.com/Cemo281/ma-valentine.git)
    cd ma-valentine
    ```

2.  **Lancer le projet :**
    Ouvrez simplement le fichier `index.html` dans votre navigateur web préféré.

3.  **Déploiement (Optionnel) :**
    Pour partager le lien avec votre Valentine, activez **GitHub Pages** dans les paramètres du dépôt (Source : `main` branch).

## 🎨 Personnalisation

Vous pouvez modifier les messages ou les couleurs dans les fichiers suivants :
* `index.html` : Pour changer le texte "Veux-tu être ma Valentine ?".
* `style.css` : Modifiez les variables `:root` pour adapter la palette de couleurs.

---
*Fait avec ❤️ pour célébrer l'amour (et le JavaScript).*
