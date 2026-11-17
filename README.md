# Calculateur de moyennes scolaires – Algérie

Projet de calcul des moyennes scolaires développé par Aoudj Mayas / Digital Web DZ.

## Version web

Les fichiers nécessaires au site sont :
- `index.html` : structure de la page ;
- `style.css` : mise en forme ;
- `script.js` : fonctionnalités et calculs.

### Tester le site sur ordinateur

1. Extraire le dossier ZIP.
2. Ouvrir le dossier `calculateur-moyennes`.
3. Double-cliquer sur `index.html` pour l'ouvrir dans un navigateur.

Garder les trois fichiers web dans le même dossier. Ne pas déplacer `style.css` ou `script.js` séparément.

## Publier avec GitHub Pages

1. Créer un dépôt GitHub.
2. Envoyer les fichiers `index.html`, `style.css` et `script.js` à la racine du dépôt.
3. Ouvrir **Settings → Pages**.
4. Dans **Build and deployment**, choisir **Deploy from a branch**.
5. Choisir la branche `main` et le dossier `/ (root)`, puis enregistrer.

GitHub affichera ensuite l'adresse publique du site dans la section Pages.

## Version C

`calcul_moyenne.c` est la version console du projet. Elle est indépendante de la version web.

Compilation avec GCC :

```bash
gcc -Wall -Wextra -std=c11 calcul_moyenne.c -o calcul.exe
```

Exécution sous Windows PowerShell :

```powershell
.\calcul.exe
```

## Vérification des coefficients

Les coefficients signalés comme « non confirmé » doivent être vérifiés auprès des références officielles du ministère de l'Éducation nationale avant une diffusion publique.
