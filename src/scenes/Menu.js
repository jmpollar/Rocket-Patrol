class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        //load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.audio('sfx_expMod1', './assets/explodeSound-1.wav');
        this.load.audio('sfx_expMod2', './assets/explodeSound-2.wav');
        this.load.audio('sfx_expMod3', './assets/explodeSound-3.wav');
        this.load.audio('sfx_expMod4', './assets/explodeSound-4.wav');
        //load title image
        this.load.image('title', './assets/Title-bg.png');
    } 
    create() {
        let menuConfig = {
            fontSize: '60px',
            fontFamily: 'Georgia',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        } 
        //show menu text (title, instructions, high score)
        this.add.tileSprite(0,0,640,480, 'title').setOrigin(0,0);
        this.add.text(game.config.width/2, game.config.height/4 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '50px';
        this.add.text(game.config.width/2, game.config.height-borderUISize-borderPadding, 'HIGH SCORE: ' + highScore, menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '27px';
        this.add.text(game.config.width/2, game.config.height/2, 'Use <- -> arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    }
    update() {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            //easy mode
            game.settings = {
                spaceshipSpeed: 3,
                uSpaceshipSpeed: 4,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            //hard mode
            game.settings = {
                spaceshipSpeed: 4,
                uSpaceshipSpeed: 5,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
}