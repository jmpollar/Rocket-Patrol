//Ultra Spaceship prefab
class UltraSpaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); //add to existing scene
        this.points = pointValue; //store pointValue
        this.moveSpeed = game.settings.uSpaceshipSpeed; //pix/frame
        let randInt = Math.floor(Math.random()*2);
        if(randInt == 0)
        {
            this.moveSpeed *= -1; //invert direction
        }
    }

    update() {
        //move spaceship left
        this.x -= this.moveSpeed;
        //if ship position breaks left side of screen, ship pos to right edge
        if(this.moveSpeed > 0 && this.x <= 0 - this.width) {
            this.x = game.config.width;
        }
        //if ship position breaks right side of screen, ship pos to left edge
        else if(this.moveSpeed < 0 && this.x >= game.config.width+this.width)
        {
            this.x = 0;
        }
    }

    //pos reset
    reset() {
        this.x = game.config.width;
    }
}