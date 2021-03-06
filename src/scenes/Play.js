class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
 
    preload() {
        //load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('spaceshipUltra', './assets/spaceship-2.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('background', './assets/Background-rocket.png');
        this.load.image('borderHorizon', './assets/border-horizon.png');
        this.load.image('borderVert', './assets/border-vert.png');
        //load spritesheet for explosion
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        //create timer
        this.timeRemaining = game.settings.gameTimer;
        //place tile sprite
        this.background = this.add.tileSprite(0,0,640,480,'background').setOrigin(0,0);

        //green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2+5, 0x00FF00).setOrigin(0,0);

        //borders
        this.add.tileSprite(0,32,32,416, 'borderVert').setOrigin(0,0);
        this.add.tileSprite(game.config.width-32, 32,32,416, 'borderVert').setOrigin(0,0);
        this.add.tileSprite(0,0,640,32, 'borderHorizon').setOrigin(0,0);
        this.add.tileSprite(0, game.config.height-32, 640,32, 'borderHorizon').setOrigin(0,0);
        
        //add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        //add rocket (p2)
        this.p2Rocket = new Rocket2(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        //add spaceships (3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width+borderUISize*3, borderUISize*5+borderPadding*2, 'spaceship',0,20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6+borderPadding*4,'spaceship',0,10).setOrigin(0,0);

        //ultra spaceship
        this.shipUltra = new UltraSpaceship(this, game.config.width-borderUISize*3, borderUISize*6, 'spaceshipUltra', 0, 50).setOrigin(0,0);
        //define keys (additional p2 ones)
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        //animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        //initialize scores
        this.p1Score = 0;
        this.p2Score = 0;

        //display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 250
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding, 'PLAYER 1: ' + this.p1Score, scoreConfig);
        this.scoreBelow = this.add.text(borderUISize + borderPadding, borderUISize*2 + borderPadding, 'PLAYER 2: ' + this.p2Score, scoreConfig);
        this.timeRight = this.add.text(game.config.width - borderUISize - borderPadding - scoreConfig.fixedWidth, borderUISize + borderPadding*2, this.timeRemaining/1000, scoreConfig);
        //game over flag
        this.gameOver = false;

        //60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2+64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        //define array for random explosion sounds
        this.explosionSounds = ['sfx_expMod1', 'sfx_expMod2', 'sfx_expMod3', 'sfx_expMod4'];
    }

    update() {
        //update seconds remaining then print to screen
        this.timeRight.text = (this.timeRemaining-this.clock.elapsed)/1000;
        //check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        this.background.tilePositionX -=4;
        if(!this.gameOver) {
            this.p1Rocket.update();
            this.p2Rocket.update();
            this.ship01.update(); //update 4 spaceships
            this.ship02.update();
            this.ship03.update();
            this.shipUltra.update();
        }
        //check collisions
        if(this.checkCollision(this.p1Rocket, this.shipUltra)) {
            this.p1Rocket.reset();
            this.shipExplode(this.shipUltra, this.p1Rocket);
        }
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03, this.p1Rocket);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02, this.p1Rocket);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01, this.p1Rocket);
        }

        if(this.checkCollision(this.p2Rocket, this.shipUltra)) {
            this.p2Rocket.reset();
            this.shipExplode(this.shipUltra, this.p2Rocket);
        }
        if(this.checkCollision(this.p2Rocket, this.ship03)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship03, this.p2Rocket);
        }
        if (this.checkCollision(this.p2Rocket, this.ship02)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship02, this.p2Rocket);
        }
        if (this.checkCollision(this.p2Rocket, this.ship01)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship01, this.p2Rocket);
        }
    }

    checkCollision(rocket, ship) {
        //simple AABB checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
            } else {
                return false;
            }
    }

    shipExplode(ship, rocket) {
        //temporarily hide ship
        ship.alpha = 0;
        //create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode'); // play explode animation
        boom.on('animationcomplete', () => { //callback after anim completes
            ship.reset(); // reset ship pos
            ship.alpha=1; // make ship visible again
            boom.destroy(); // remove explosion sprite
        });
        //score add and repaint (player dependent)
        if(rocket == this.p2Rocket)
        {
            this.p2Score += ship.points;
        }
        else if(rocket == this.p1Rocket)
        {
            this.p1Score += ship.points;
        }
        this.scoreLeft.text = "PLAYER 1: " + this.p1Score;
        this.scoreBelow.text = "PLAYER 2: " + this.p2Score;
        let randInt = Math.floor(Math.random()*4);
        this.sound.play(this.explosionSounds[randInt]);
    }
}