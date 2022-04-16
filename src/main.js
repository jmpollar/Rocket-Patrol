/*
POINTS BREAKDOWN:
10 pts - 4 explosion SFX randomly played on impact
10 pts - display time remaining on screen
10 pts - new border artwork
10 pts - new title screen
20 pts - new spaceship type: skin + score done, need update
*/



let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}
let game = new Phaser.Game(config);
//set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

//reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;
