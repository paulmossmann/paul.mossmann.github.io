// Recuperation du contexte
let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const resolution = 10;
canvas.width = 800;
canvas.height = 800;
const COLONNES = canvas.width / resolution;
const LIGNES = canvas.height / resolution;

//Fonction qui permet de creer un tableau a deux dimensions
function creerTableau2d() {
    return new Array(COLONNES).fill(null)
        .map(() => new Array(LIGNES).fill(null)
            .map(() => Math.floor(Math.random() * 2)));
}

//Creation de la grille
let grille = creerTableau2d();
requestAnimationFrame(update);

function update() {
  grille = nouvelleGeneration(grille);
  dessinerGrille(grille);
  requestAnimationFrame(update);
}

function nouvelleGeneration(grille) {
    const nouvelleGeneration = grille.map(arr => [...arr]);
    for (let col = 0; col < grille.length; col++) {
        for (let row = 0; row < grille[col].length; row++) {
            const cell = grille[col][row];
            let nombreVoisin = 0;
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    if (i === 0 && j === 0) {
                        continue;
                    }
                    const x_cell = col + i;
                    const y_cell = row + j;

                    if (x_cell >= 0 && y_cell >= 0 && x_cell < COLONNES && y_cell < LIGNES) {
                        const currentNeighbour = grille[col + i][row + j];
                        nombreVoisin += currentNeighbour;
                    }
                }
            }

            // rules
            if (cell === 1 && nombreVoisin < 2) {
                nouvelleGeneration[col][row] = 0;
            } else if (cell === 1 && nombreVoisin > 3) {
                nouvelleGeneration[col][row] = 0;
            } else if (cell === 0 && nombreVoisin === 3) {
                nouvelleGeneration[col][row] = 1;
            }
        }
    }
    return nouvelleGeneration;
}
function dessinerGrille(grille) {
    for (let col = 0; col < grille.length; col++) {
        for (let row = 0; row < grille[col].length; row++) {
            const cell = grille[col][row];
            ctx.beginPath();
            ctx.rect(col * resolution, row * resolution, resolution, resolution);
            ctx.fillStyle = cell ? 'black' : 'white';
            ctx.fill();
            ctx.stroke();
        }
    }
}


