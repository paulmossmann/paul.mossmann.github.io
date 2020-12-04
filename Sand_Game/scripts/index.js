/*
    Description: Index du jeu "Sand Game" où se trouve la boucle principale.
    Date création: 25/11/2020
    Dernière modification: 25/11/2020
    Auteur: Paul Mossmann
    Site: https://paulmossmann.github.io/paul.mossmann.github.io/
*/

// Recuperation du contexte
let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const RESOLUTION = 5;
const VITESSE_SABLE = 500;

let lastRenderTime = 0;
canvas.width = 800;
canvas.height = 800;
const COLONNES = canvas.width / RESOLUTION;
const LIGNES = canvas.height / RESOLUTION;

let grille = CreationTableau2D();
grille[80][0] = 1;
AfficherGrille(grille);
console.log(grille[1].length);
console.table(grille);
let test = 1;
let compteur = 0;
window.requestAnimationFrame(main);

//Boucle principale du jeu
function main(currentTime) {
    window.requestAnimationFrame(main);
    const SECONDES_DEPUIS_DERNIER_RENDU = (currentTime - lastRenderTime) / 1000;

    if (SECONDES_DEPUIS_DERNIER_RENDU < 1 / VITESSE_SABLE) return
    if(test === 1){
        if(compteur != 50){
            grille[40][0] = 1;
            grille[120][0] = 1;
        }
        compteur++;
        grille[80][0] = 2;
    }
    test *= -1;
    
    grille = MiseAJourGrille(grille);
    AfficherGrille(grille);
    lastRenderTime = currentTime
};

function CreationTableau2D() {
    return new Array(COLONNES).fill(null)
        .map(() => new Array(LIGNES).fill(null)
            .map(() => 0));
}

function MiseAJourGrille(grille) {
    const COPIE_GRILLE = grille.map(arr => [...arr]);
    for (let i = 0; i < grille.length; i++) {
        for (let j = 0; j < grille[i].length; j++) {
            if(grille[i][j] === 1){
                if(grille[i][j + 1] === 0){
                    COPIE_GRILLE[i][j] = 0;
                    COPIE_GRILLE[i][j + 1] = 1;
                }
                else if(grille[i - 1][j + 1] === 0){
                    COPIE_GRILLE[i][j] = 0;
                    COPIE_GRILLE[i - 1][j + 1] = 1;
                }
                else if(grille[i + 1][j + 1] === 0){
                    COPIE_GRILLE[i][j] = 0;
                    COPIE_GRILLE[i + 1][j + 1] = 1;
                }
            }
            if(grille[i][j] === 2){
                //Check en desous
                if(grille[i][j + 1] === 0){
                    COPIE_GRILLE[i][j] = 0;
                    COPIE_GRILLE[i][j + 1] = 2;
                }
                //Check bas gauche
                else if(grille[i - 1][j + 1] === 0 || grille[i + 1][j + 1] === 1){
                    COPIE_GRILLE[i][j] = 0;
                    COPIE_GRILLE[i - 1][j + 1] = 2;
                    //Check gauche
                    if(grille[i - 1][j] === 0 || grille[i + 1][j + 1] === 1){
                        COPIE_GRILLE[i][j] = 0;
                        COPIE_GRILLE[i - 1][j] = 2;
                    }
                }
                //Check bas droite
                else if(grille[i + 1][j + 1] === 0 || grille[i + 1][j + 1] === 1){
                    COPIE_GRILLE[i][j] = 0;
                    COPIE_GRILLE[i + 1][j + 1] = 2;
                    //Check droite
                    if(grille[i + 1][j] === 0 || grille[i + 1][j + 1] === 1){
                        COPIE_GRILLE[i][j] = 0;
                        COPIE_GRILLE[i + 1][j] = 2;
                    }
                }
                
            }
        }
    }
    return COPIE_GRILLE;
}

function AfficherGrille(grille) {
    for (let i = 0; i < grille.length; i++) {
        for (let j = 0; j < grille[i].length; j++) {
            if (grille[i][j] == 0) {
                ctx.beginPath();
                ctx.fillStyle = "white";
                ctx.rect(i * RESOLUTION, j * RESOLUTION, COLONNES, LIGNES);
                ctx.fill();
            }
            else if (grille[i][j] == 1) {
                ctx.beginPath();
                ctx.fillStyle = "black";
                ctx.rect(i * RESOLUTION, j * RESOLUTION, COLONNES, LIGNES);
                ctx.fill();
            }
            else if (grille[i][j] == 2) {
                ctx.beginPath();
                ctx.fillStyle = "blue";
                ctx.rect(i * RESOLUTION, j * RESOLUTION, COLONNES, LIGNES);
                ctx.fill();
            }
        }
    }
}