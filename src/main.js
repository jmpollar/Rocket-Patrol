/*
POINTS BREAKDOWN:
5 pts - random left-right spaceship movement
5 pts - new scrolling background
10 pts - 4 explosion SFX randomly played on impact
10 pts - display time remaining on screen
10 pts - new border artwork
10 pts - new title screen
20 pts - new spaceship type: skin + score + speed
30 pts - simultaneous multiplayer (WAD and arrows&F)
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
//keys for player 2
let keyW, keyA, keyD;
//highScore var
let highScore = 0;