class Pixel{
    constructor(posX, posY, largeur, hauteur) {
        this.largeur = largeur;
        this.hauteurr = hauteur;
        this.alive = this.EtatAleatoire();
        this.posX = posX;
        this.posY = posY;
    }

    EtatAleatoire(){
        var etat;
        var alea = Math.floor(Math.random() * 2) + 1;
        console.log(alea);
        if(alea == 1){
            etat = true;
        }
        else{
            etat = false;
        }
        return etat;
    }

    drawPixel(){
        if(this.alive == true){
            //Couleur set a blanc = elle vie !
            ctx.fillStyle = "#fff";
        }
        else{
            //Couleur set a noir = elle meure !
            ctx.fillStyle = "#000";
        }
        ctx.fillRect(this.posX, this.posY, 10, 10);
    }
}
