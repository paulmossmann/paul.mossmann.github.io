let hauteur = 600 / 8;
let largeur = 800 / 10;
let carreTaille = 10;

// Creation grille a 2 dimentions
let grille = new Array(largeur);
for (var i = 0; i < largeur; i++) {
    grille[i] = new Array(hauteur);
}

// Recuperation du context
let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");
ctx.fillStyle = "#fff";
// Initialisation de la grille
var k = 0;
var l = 0;
for (var i = 0; i < grille.length; i += 1) {
    for (var j = 0; j < grille[i].length; j += 1) {
        grille[i][j] = new Pixel(k, l, carreTaille, carreTaille);
        grille[i][j].drawPixel();
        l += 11;
    }
    l = 0;
    k += 11;
}

document.addEventListener("keydown", function (event) {
    console.log(event);
    if (event.key == 'e') {
        console.log('e pressed');
        test();
    }
})

function test() {
    for (var i = 1; i < grille.length; i++) {
        for (var j = 1; j < grille[i].length; j++) {
            var nombreVoisin = 0;
            // Boucle qui calcul le nombre de voisin
            for (var k = -1; k <= 1; k++) {
                for (var l = -1; l <= 1; l++) {
                    try {
                        if (grille[k][l].alive == true) {
                            nombreVoisin++;
                        }
                    }
                    catch {

                    }
                    finally{

                    }
                }
            }
            nombreVoisin--;
            if (grille[i][j].alive == true && nombreVoisin < 2) {
                grille[i][j].alive = false;
                grille[i][j].drawPixel();
            }
            else if (grille[i][j].alive == true && nombreVoisin > 3) {
                grille[i][j].alive = false;
                grille[i][j].drawPixel();
            }

            else if (grille[i][j].alive == false && nombreVoisin == 3) {
                grille[i][j].alive = true;
                grille[i][j].drawPixel();
            }
        }
    }
}


