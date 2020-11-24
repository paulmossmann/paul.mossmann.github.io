let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const BG_COLOR = "#fff";
const SNAKE_COLOR = "#000";
const NOURRITURE_COLOR = 'red';
const resolution = 50;
const SNAKE_SPEED = 4;
canvas.width = 800;
canvas.height = 800;
const COLONNES = canvas.width / resolution;
const LIGNES = canvas.height / resolution;
let lastRenderTime = 0;


function creerTableau2d() {
    return new Array(COLONNES).fill(null)
        .map(() => new Array(LIGNES).fill(null)
            .map(() => null));
}

var snake = new Snake();
var nourriture = new Nourriture();
var testTableau = creerTableau2d();
dessinerGrille(testTableau);
let score = snake.body.length;
nourriture.SetCoord();
nourriture.Spawn();
window.requestAnimationFrame(main);
//Boucle principale du jeu
function main(currentTime){
    score = snake.body.length;
    ctx.font = "30px Arial";
    ctx.fillText(score, 10, 50);
    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;

    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

    if(VerifierMort() == false){
        console.log('Perdu');
        Reset();
    }

    lastRenderTime = currentTime
    dessinerGrille(testTableau);
    nourriture.Spawn();
    snake.update();
    snake.show();;
    if(nourriture.x === snake.body[snake.body.length -1].x && nourriture.y === snake.body[snake.body.length -1].y){
        snake.body.push({x: nourriture.x, y:nourriture.y});
        nourriture.SetCoord();
        nourriture.Spawn();
    }
};

//Controle du snake (fleches directionnelles)
document.addEventListener('keydown', keydown);
function keydown(e){
  switch(e.keyCode) {
    case 37: {
        snake.xSpeed = -resolution;
        snake.ySpeed = 0;
        break;
    }
    case 38: {
        snake.xSpeed = 0;
        snake.ySpeed = -resolution;
        break;
    }
    case 39: {
        snake.xSpeed = resolution;
        snake.ySpeed = 0;
        break;
    }
    case 40: {
        snake.xSpeed = 0;
        snake.ySpeed = resolution;
    break;
    }
  }
}

//Fonction qui va dessiner la grille
function dessinerGrille(grille) {
    for (let col = 0; col < grille.length; col++) {
        for (let row = 0; row < grille[col].length; row++) {
            ctx.beginPath();
            ctx.fillStyle = BG_COLOR;
            ctx.rect(col * resolution, row * resolution, resolution, resolution);
            ctx.fill();
            //ctx.stroke();
        }
    }
}

//Objet "Nourriture"
function Nourriture(){
    this.x = 0;
    this.y = 0;

    this.SetCoord = function(){
        this.x = Math.floor(Math.random() * (COLONNES - 0 +1)) + 0;
        this.y = Math.floor(Math.random() * (LIGNES - 0 +1)) + 0;
        this.x *= resolution;
        this.y *= resolution;
        for(var i = 0; i < snake.body.length; i++ ){
            if(this.x === snake.body[i].x && this.y === snake.body[i].y){
                return this.SetCoord();
            }
        }
        
    }
    
    this.Spawn = function(){
        ctx.beginPath();
        ctx.fillStyle = NOURRITURE_COLOR;
        ctx.rect(this.x, this.y, resolution, resolution);
        ctx.fill();
    }
}

//Objet "snake"
function Snake(){
    this.x = 50;
    this.y = 50;
    this.xSpeed = resolution;
    this.ySpeed = 0;
    this.body = [
        {x: 50 , y:50},
        {x: 100, y:50},
        {x: 150, y:50}
    ]

    // Fonction membre qui modifie la position du "snake"
    this.update = function(){
        for(let i = 0; i < this.body.length -1; i++){
            this.body[i].x = this.body[i+1].x;
            this.body[i].y = this.body[i+1].y;
        }
        this.body[this.body.length -1].x += this.xSpeed;
        this.body[this.body.length -1].y += this.ySpeed;
    }

    //Fonction membre qui dessine le "snake"
    this.show = function(){
        for(let i = 0; i < this.body.length; i++){
            ctx.beginPath();
            ctx.fillStyle = SNAKE_COLOR;
            ctx.rect(this.body[i].x, this.body[i].y, resolution, resolution);
            ctx.fill();
        }
    }
}

function VerifierMort(){
    if(snake.body[snake.body.length -1].x < 0){
        console.log("Gauche");
        return false;
    }
    else if(snake.body[snake.body.length -1].x > COLONNES * resolution -50){
        console.log("Droite");
        return false;
    }
    else if(snake.body[snake.body.length -1].y < 0){
        console.log("Haut");
        return false;
    }
    else if(snake.body[snake.body.length -1].y > LIGNES * resolution -50){
        console.log("Bas");
        return false;
    }
}

function Reset(){
    snake.body = [
        {x: 50 , y:50},
        {x: 100, y:50},
        {x: 150, y:50}
    ]
    snake.xSpeed = resolution;
    snake.ySpeed = 0;
    score = 0;
}