/*
 * Digital Web DZ - Calculateur de moyennes scolaires (Algerie)
 *
 * IMPORTANT : les coefficients marques "A VERIFIER" proviennent de sources
 * non officielles. Verifiez-les avec les textes du Ministere de l'Education
 * nationale (arretes / notes de service de l'annee scolaire en cours) avant
 * toute publication. Pour corriger un coefficient, il suffit de modifier
 * la table correspondante : la logique de calcul ne change pas.
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define NB(t) ((int)(sizeof(t) / sizeof((t)[0])))
#define MAX_MATIERES 20

typedef struct {
    const char *nom;
    double coef;
    int optionnelle;          /* 1 = l'eleve peut ne pas etudier cette matiere */
} Matiere;

typedef struct {
    const char *nom;          /* nom de la filiere */
    const Matiere *matieres;  /* NULL = coefficients pas encore renseignes */
    int nb;
} Filiere;

/* ===================== TABLES DE COEFFICIENTS ===================== */

/* ---- PRIMAIRE : moyenne arithmetique (coefficient 1 partout) ---- */
static const Matiere PREPA[] = {
    {"langue arabe", 1, 0}, {"math", 1, 0}, {"education islamique", 1, 0},
    {"sport", 1, 0}, {"education artistique", 1, 0},
    {"activites scientifiques", 1, 0}
};
static const Matiere AP1_AP2[] = {
    {"langue arabe", 1, 0}, {"math", 1, 0}, {"education islamique", 1, 0},
    {"sport", 1, 0}, {"education artistique", 1, 0},
    {"education scientifique et technologie", 1, 0},
    {"activites scientifiques", 1, 0}
};
static const Matiere AP3[] = {
    {"langue arabe", 1, 0}, {"math", 1, 0}, {"anglais", 1, 0},
    {"education civique", 1, 0}, {"education islamique", 1, 0},
    {"histoire et geographie", 1, 0}, {"sport", 1, 0},
    {"education artistique", 1, 0},
    {"education scientifique et technologie", 1, 0},
    {"activites scientifiques", 1, 0}, {"tamazight", 1, 1}
};
/* A VERIFIER : liste des matieres de 4AP et 5AP (francais inclus) */
static const Matiere AP4_AP5[] = {
    {"langue arabe", 1, 0}, {"math", 1, 0}, {"francais", 1, 0},
    {"anglais", 1, 0}, {"education civique", 1, 0},
    {"education islamique", 1, 0}, {"histoire et geographie", 1, 0},
    {"sport", 1, 0}, {"education artistique", 1, 0},
    {"education scientifique et technologie", 1, 0}, {"tamazight", 1, 1}
};

/* ---- CEM (1AM a 4AM) et BEM : A VERIFIER (regime 2025-2026) ---- */
static const Matiere CEM[] = {
    {"langue arabe", 5, 0}, {"math", 4, 0}, {"francais", 4, 0},
    {"anglais", 2, 0}, {"histoire et geographie", 2, 0},
    {"sciences naturelles", 2, 0}, {"physique et technologie", 2, 0},
    {"education islamique", 2, 0}, {"education civique", 1, 0},
    {"informatique", 1, 0}, {"education artistique (dessin)", 1, 0},
    {"education musicale", 1, 0}, {"education physique et sportive", 1, 0},
    {"tamazight", 2, 1}
};
static const Matiere BEM[] = {
    {"langue arabe", 5, 0}, {"math", 4, 0}, {"francais", 4, 0},
    {"anglais", 2, 0}, {"histoire et geographie", 2, 0},
    {"sciences naturelles", 2, 0}, {"physique et technologie", 2, 0},
    {"education islamique", 2, 0}, {"education civique", 1, 0},
    {"tamazight", 2, 1}
};

/* ---- LYCEE, 3AS (Baccalaureat) : A VERIFIER ---- */
static const Matiere BAC_SE[] = {
    {"sciences naturelles", 5, 0}, {"sciences physiques", 5, 0},
    {"math", 5, 0}, {"langue arabe", 3, 0}, {"francais", 2, 0},
    {"anglais", 2, 0}, {"philosophie", 2, 0},
    {"histoire et geographie", 2, 0}, {"education islamique", 2, 0}
};
static const Matiere BAC_MATH[] = {
    {"math", 7, 0}, {"sciences physiques", 6, 0},
    {"sciences naturelles", 2, 0}, {"langue arabe", 3, 0},
    {"francais", 2, 0}, {"anglais", 2, 0}, {"philosophie", 2, 0},
    {"histoire et geographie", 2, 0}, {"education islamique", 2, 0}
};
static const Matiere BAC_LETTRES[] = {
    {"langue arabe", 6, 0}, {"philosophie", 6, 0},
    {"histoire et geographie", 4, 0}, {"francais", 3, 0},
    {"anglais", 3, 0}, {"education islamique", 2, 0}, {"math", 2, 0}
};
static const Matiere BAC_LANGUES[] = {
    {"langue arabe", 5, 0}, {"francais", 5, 0}, {"anglais", 5, 0},
    {"3eme langue etrangere", 4, 0}, {"philosophie", 2, 0},
    {"histoire et geographie", 2, 0}, {"education islamique", 2, 0},
    {"math", 2, 0}
};

/* Filieres : NULL = coefficients a renseigner (ne pas inventer de valeurs) */
static const Filiere FILIERES_3AS[] = {
    {"sciences experimentales", BAC_SE, NB(BAC_SE)},
    {"mathematiques", BAC_MATH, NB(BAC_MATH)},
    {"technique mathematique", NULL, 0},
    {"gestion et economie", NULL, 0},
    {"lettres et philosophie", BAC_LETTRES, NB(BAC_LETTRES)},
    {"langues etrangeres", BAC_LANGUES, NB(BAC_LANGUES)}
};
static const Filiere FILIERES_1AS_2AS[] = {
    {"sciences experimentales", NULL, 0},
    {"mathematiques", NULL, 0},
    {"technique mathematique", NULL, 0},
    {"gestion et economie", NULL, 0},
    {"lettres et philosophie", NULL, 0},
    {"langues etrangeres", NULL, 0}
};

/* ===================== OUTILS DE SAISIE ===================== */

/* Lit une ligne, retire le \n et met en minuscules */
static void lire_texte(char *dst, size_t taille) {
    if (fgets(dst, (int)taille, stdin) == NULL) {
        printf("\nFin de la saisie. Programme termine.\n");
        exit(0);
    }
    dst[strcspn(dst, "\n")] = '\0';
    for (size_t i = 0; dst[i]; i++)
        dst[i] = (char)tolower((unsigned char)dst[i]);
}

/* Lit le nom complet sans le mettre en minuscules */
static void lire_nom(char *dst, size_t taille) {
    if (fgets(dst, (int)taille, stdin) == NULL) exit(0);
    dst[strcspn(dst, "\n")] = '\0';
}

static int egal(const char *s, const char *a, const char *b) {
    return strcmp(s, a) == 0 || (b != NULL && strcmp(s, b) == 0);
}

static int oui_non(const char *question) {
    char rep[10];
    for (;;) {
        printf("%s (oui / non)\n", question);
        lire_texte(rep, sizeof rep);
        if (strcmp(rep, "oui") == 0) return 1;
        if (strcmp(rep, "non") == 0) return 0;
        printf("Erreur : veuillez saisir oui ou non.\n");
    }
}

/* Redemande tant que la note n'est pas un nombre entre 0 et 20 */
static double lire_note(const char *libelle) {
    char ligne[50];
    double v;
    for (;;) {
        printf("%s (0 a 20) :\n", libelle);
        lire_texte(ligne, sizeof ligne);
        if (sscanf(ligne, "%lf", &v) == 1 && v >= 0.0 && v <= 20.0)
            return v;
        printf("Erreur : saisissez un nombre entre 0 et 20.\n");
    }
}

/* ===================== CALCULS ===================== */

/* Moyenne ponderee : sum(note x coef) / sum(coef) */
static double ponderee(double *notes, const double *coefs, int n) {
    double total = 0, somme = 0;
    for (int i = 0; i < n; i++) {
        total += notes[i] * coefs[i];
        somme += coefs[i];
    }
    return somme > 0 ? total / somme : 0;
}

/* Demande quelles matieres optionnelles l'eleve etudie */
static void choisir_matieres(const Matiere *m, int n, int *actif) {
    for (int i = 0; i < n; i++) {
        actif[i] = 1;
        if (m[i].optionnelle) {
            char q[100];
            snprintf(q, sizeof q, "Etudies-tu la matiere %s ?", m[i].nom);
            actif[i] = oui_non(q);
        }
    }
}

/*
 * Calcule une moyenne a partir d'une table.
 * mode_composition = 1 : moyenne de matiere = (controle continu + 2 x composition) / 3
 *                        (A VERIFIER selon le cycle)
 * mode_composition = 0 : une seule note par matiere (primaire, examens)
 */
static double calculer(const Matiere *m, int n, const int *actif, int mode_composition) {
    double notes[MAX_MATIERES], coefs[MAX_MATIERES];
    int k = 0;
    for (int i = 0; i < n; i++) {
        if (!actif[i]) continue;
        char lib[120];
        if (mode_composition) {
            snprintf(lib, sizeof lib, "%s - note de controle continu", m[i].nom);
            double cc = lire_note(lib);
            snprintf(lib, sizeof lib, "%s - note de composition", m[i].nom);
            double co = lire_note(lib);
            notes[k] = (cc + 2.0 * co) / 3.0;
            printf("  -> moyenne de %s : %.2f (coef %.0f)\n", m[i].nom, notes[k], m[i].coef);
        } else {
            snprintf(lib, sizeof lib, "Ta note en %s", m[i].nom);
            notes[k] = lire_note(lib);
        }
        coefs[k] = m[i].coef;
        k++;
    }
    return ponderee(notes, coefs, k);
}

/* Trimestres (1 a 3) puis moyenne annuelle = moyenne des trimestres */
static double calcul_annuel(const Matiere *m, int n) {
    int actif[MAX_MATIERES], nbt = 0;
    double somme = 0;
    char ligne[20];

    choisir_matieres(m, n, actif);
    while (nbt < 1 || nbt > 3) {
        printf("Combien de trimestres veux-tu saisir ? (1 / 2 / 3)\n");
        lire_texte(ligne, sizeof ligne);
        if (sscanf(ligne, "%d", &nbt) != 1) nbt = 0;
    }
    for (int t = 1; t <= nbt; t++) {
        printf("\n--- Trimestre %d ---\n", t);
        double mt = calculer(m, n, actif, 1);
        printf("Moyenne du trimestre %d : %.2f\n", t, mt);
        somme += mt;
    }
    return somme / nbt;   /* moyenne annuelle = moyenne des trimestres saisis */
}

/* ===================== AFFICHAGE ===================== */

static void afficher_resultat(const char *nom, double age, const char *classe,
                              const char *libelle, double moy) {
    printf("\nEleve : %s\n", nom);
    printf("Age : %.0f\n", age);
    printf("Classe : %s\n", classe);
    printf("%s : %.2f\n", libelle, moy);
    printf("Resultat : %s\n", moy >= 10.0 ? "admis(e) (moyenne >= 10)"
                                          : "non admis(e) (moyenne < 10)");
}

static void afficher_mention(double moy) {
    if (moy >= 16)      printf("Mention : tres bien\n");
    else if (moy >= 14) printf("Mention : bien\n");
    else if (moy >= 12) printf("Mention : assez bien\n");
    else if (moy >= 10) printf("Mention : passable\n");
}

/* ===================== PROGRAMME PRINCIPAL ===================== */

int main(void) {
    char fullname[100], etab[100], niveau[30], choix[30], ligne[50];
    double age = 0;

    printf("Bienvenue dans le programme de calcul de moyenne.\n");

    printf("Quel est votre nom complet :\n");
    lire_nom(fullname, sizeof fullname);

    do {
        printf("Quel age as-tu :\n");
        lire_texte(ligne, sizeof ligne);
    } while (sscanf(ligne, "%lf", &age) != 1 || age <= 0 || age > 100);

    printf("Dans quel etablissement etudiez-vous ?\n");
    printf("(ecole primaire / college / lycee)\n");
    lire_texte(etab, sizeof etab);

    /* ---------------- PRIMAIRE ---------------- */
    if (egal(etab, "ecole primaire", "école primaire")) {
        const Matiere *t = NULL;
        int n = 0;

        printf("Quelle est l'annee scolaire ?\n");
        printf("(annee preparatoire / 1AP / 2AP / 3AP / 4AP / 5AP)\n");
        lire_texte(niveau, sizeof niveau);

        if (egal(niveau, "annee preparatoire", "année préparatoire")) { t = PREPA; n = NB(PREPA); }
        else if (egal(niveau, "1ap", "2ap"))                          { t = AP1_AP2; n = NB(AP1_AP2); }
        else if (egal(niveau, "3ap", NULL))                           { t = AP3; n = NB(AP3); }
        else if (egal(niveau, "4ap", "5ap"))                          { t = AP4_AP5; n = NB(AP4_AP5); }
        else { printf("Niveau invalide.\n"); return 0; }

        printf("Vous etes sur le portail de %s.\n", niveau);
        printf("Voulez-vous commencer le calcul ? (ok)\n");
        lire_texte(choix, sizeof choix);
        if (strcmp(choix, "ok") != 0) {
            printf("Erreur : veuillez saisir a nouveau vos informations.\n");
            return 0;
        }

        int actif[MAX_MATIERES];
        choisir_matieres(t, n, actif);
        double moy = calculer(t, n, actif, 0);
        afficher_resultat(fullname, age, niveau, "Moyenne", moy);
    }

    /* ---------------- COLLEGE (CEM / BEM) ---------------- */
    else if (egal(etab, "college", "collège")) {
        printf("Quel niveau ?\n(1AM / 2AM / 3AM / 4AM / BEM)\n");
        lire_texte(niveau, sizeof niveau);

        if (egal(niveau, "1am", "2am") || egal(niveau, "3am", "4am")) {
            printf("Vous etes sur le portail de %s (coefficients A VERIFIER).\n", niveau);
            double moy = calcul_annuel(CEM, NB(CEM));
            afficher_resultat(fullname, age, niveau, "Moyenne annuelle", moy);
        }
        else if (egal(niveau, "bem", NULL)) {
            printf("Calcul du BEM (coefficients A VERIFIER).\n");
            int actif[MAX_MATIERES];
            choisir_matieres(BEM, NB(BEM), actif);
            double exam = calculer(BEM, NB(BEM), actif, 0);
            printf("Moyenne de l'examen du BEM : %.2f\n", exam);

            if (oui_non("Veux-tu inclure la moyenne annuelle de 4AM dans le resultat final ?")) {
                double annuelle = lire_note("Ta moyenne annuelle de 4AM");
                double finale = (exam + annuelle) / 2.0;   /* A VERIFIER */
                afficher_resultat(fullname, age, "BEM", "Moyenne finale (examen + annuelle) / 2", finale);
                afficher_mention(finale);
            } else {
                afficher_resultat(fullname, age, "BEM", "Moyenne de l'examen", exam);
                afficher_mention(exam);
            }
        }
        else printf("Niveau invalide.\n");
    }

    /* ---------------- LYCEE ---------------- */
    else if (egal(etab, "lycee", "lycée")) {
        printf("Quel niveau ?\n(1AS / 2AS / 3AS)\n");
        lire_texte(niveau, sizeof niveau);

        int est3as = egal(niveau, "3as", NULL);
        if (!est3as && !egal(niveau, "1as", "2as")) {
            printf("Niveau invalide.\n");
            return 0;
        }

        const Filiere *f = est3as ? FILIERES_3AS : FILIERES_1AS_2AS;
        int nf = est3as ? NB(FILIERES_3AS) : NB(FILIERES_1AS_2AS);

        printf("Quelle filiere ?\n");
        for (int i = 0; i < nf; i++) printf("  %d - %s\n", i + 1, f[i].nom);
        int idx = 0;
        while (idx < 1 || idx > nf) {
            lire_texte(ligne, sizeof ligne);
            if (sscanf(ligne, "%d", &idx) != 1) idx = 0;
            if (idx < 1 || idx > nf) printf("Choisissez un numero entre 1 et %d.\n", nf);
        }
        const Filiere *fil = &f[idx - 1];

        if (fil->matieres == NULL) {
            printf("Les coefficients de %s en %s ne sont pas encore renseignes.\n",
                   fil->nom, niveau);
            printf("Cette partie sera ajoutee dans une prochaine version.\n");
            return 0;
        }

        if (est3as) {
            printf("Calcul de la moyenne du baccalaureat (%s) - coefficients A VERIFIER.\n", fil->nom);
            int actif[MAX_MATIERES];
            choisir_matieres(fil->matieres, fil->nb, actif);
            double moy = calculer(fil->matieres, fil->nb, actif, 0);
            afficher_resultat(fullname, age, "3AS", "Moyenne du baccalaureat", moy);
            afficher_mention(moy);
        } else {
            double moy = calcul_annuel(fil->matieres, fil->nb);
            afficher_resultat(fullname, age, niveau, "Moyenne annuelle", moy);
        }
    }

    else {
        printf("Etablissement invalide.\n");
    }

    return 0;
}
