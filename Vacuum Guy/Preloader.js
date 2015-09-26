
var thisGame;

BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;
	this.withButton = null;
	this.withoutButton = null;

	this.ready = false;

	thisGame = this;
};

BasicGame.Preloader.prototype = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		this.background = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBackground');
		this.background.anchor.setTo(0.5, 0.5);
		this.background.scale.setTo(va.scaleP, va.scaleP);
		this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');
		this.preloadBar.anchor.setTo(0, 0.5);
		this.preloadBar.x = this.background.x - ((this.preloadBar.width * va.scaleP) / 2);

		//this.preloadBar.scale.setTo(1 * va.scaleP, 1 * va.scaleP);
		//this.preloadBar.x = this.world.centerX - (this.preloadBar.width / 2);
		//this.preloadBar.y = this.world.centerY - (this.preloadBar.height / 2);

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);
		this.preloadBar.scale.setTo(va.scaleP, va.scaleP);

		//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets, the lines below won't work as the files themselves will 404, they are just an example of use.
        
        //IMAGES
        this.load.image('badBearGamesLogo', 'assets/badBearGamesLogo.png');
		this.load.image('badBearGamesLogo2', 'assets/badBearGamesLogo2.png');
        this.load.image('stars1' , 'assets/stars1.png');
        this.load.image('background1', 'assets/background1.png');
		this.load.image('background2', 'assets/background2.png');
		this.load.image('background3', 'assets/background3.png');
		this.load.image('background4', 'assets/background4.png');
		this.load.image('background5', 'assets/background5.png');
        this.load.image('vacuumGuyLogo' , 'assets/vacuumGuyLogo.png');
		this.load.image('vacuumGuyBody1' , 'assets/vacuumGuyBody1.png');
        this.load.image('vacuumGuyBody2' , 'assets/vacuumGuyBody2.png');
		this.load.image('vacuumGuyBody3' , 'assets/vacuumGuyBody3.png');
		this.load.image('vacuumGuyVacuum1' , 'assets/vacuumGuyVacuum1.png');
        this.load.image('vacuumGuyVacuum2' , 'assets/vacuumGuyVacuum2.png');
		this.load.image('vacuumGuyVacuum3' , 'assets/vacuumGuyVacuum3.png');
		this.load.image('vacuumGuyLeftFoot1' , 'assets/vacuumGuyLeftFoot1.png');
        this.load.image('vacuumGuyLeftFoot2' , 'assets/vacuumGuyLeftFoot2.png');
		this.load.image('vacuumGuyLeftFoot3' , 'assets/vacuumGuyLeftFoot3.png');
		this.load.image('vacuumGuyRightFoot1' , 'assets/vacuumGuyRightFoot1.png');
        this.load.image('vacuumGuyRightFoot2' , 'assets/vacuumGuyRightFoot2.png');
		this.load.image('vacuumGuyRightFoot3' , 'assets/vacuumGuyRightFoot3.png');
		this.load.image('vacuumGuyHand1' , 'assets/vacuumGuyHand1.png');
        this.load.image('vacuumGuyHand2' , 'assets/vacuumGuyHand2.png');
		this.load.image('vacuumGuyHand3' , 'assets/vacuumGuyHand3.png');
		
		if (this.game.device.iPhone)
		{
			this.load.image('rock1' , 'assets/rock1M.png');
			this.load.image('rock2' , 'assets/rock2M.png');
			this.load.image('rock3' , 'assets/rock3M.png');
		}
		else
		{
			this.load.image('rock1' , 'assets/rock1.png');
			this.load.image('rock2' , 'assets/rock2.png');
			this.load.image('rock3' , 'assets/rock3.png');
		}
        
		this.load.image('particle' , 'assets/particle.png');
		this.load.image('flash' , 'assets/flash.png');
		this.load.image('pauseButton', 'assets/pauseButton.png');
		this.load.image('submitScoreButton', 'assets/submitScoreButton.png');
		this.load.image('planet', 'assets/planet.png');
		this.load.image('menuGraphic', 'assets/menuGraphic.png');
		this.load.image('indicator', 'assets/indicator.png');
		this.load.image('rockIndicator', 'assets/rockIndicator.png');
		this.load.image('quitButton', 'assets/quitButton.png');
		this.load.image('powerup', 'assets/powerup.png');
		this.load.image('HTPButton', 'assets/HTPButton.png');
        
        //SPRITE SHEETS
        this.load.spritesheet('startButton', 'assets/startButton.png', 450, 160);
		this.load.spritesheet('muteButton', 'assets/muteButton.png', 226, 74);
		this.load.spritesheet('fullscreenButton', 'assets/fullscreenButton.png', 420, 80);
        
        //AUDIO
        this.load.audio('badBearGamesLogoSound', ['assets/logoSound.mp3', 'assets/logoSound.ogg']);
        this.load.audio('mainTheme', ['assets/Beauty Around Nothing.mp3', 'assets/Beauty_Around_Nothing.ogg']);
		this.load.audio('collectSound', ['assets/collectSound.mp3', 'assets/collectSound.ogg']);
		this.load.audio('selectSound', ['assets/selectSound.mp3', 'assets/selectSound.ogg']);
		this.load.audio('winSound', ['assets/winSound.mp3', 'assets/winSound.ogg']);
		this.load.audio('deadSound', ['assets/deadSound.mp3', 'assets/deadSound.ogg']);


		
		//FONTS
		this.load.bitmapFont('calibri', 'assets/calibri_0.png', 'assets/calibri.fnt');
		
		
		
	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;
		//this.preloadBar.height *= va.scaleP;
		this.preloadBar.width = 590 * va.scaleP;

		this.withButton = this.add.button(this.world.width / 2, this.world.height / 2 + 150 * va.scaleP, 'startWithSoundButton', startWithSound, this);
        this.withButton.anchor.setTo(0.5, 0.5);
		this.withButton.scale.setTo(1.5 * va.scaleP, 1.5 * va.scaleP);
		this.withButton.visible = false;
		
		this.withoutButton = this.add.button(this.world.width / 2, this.world.height / 2 + 280 * va.scaleP, 'startWithoutSoundButton', startWithoutSound, this);
        this.withoutButton.anchor.setTo(0.5, 0.5);
		this.withoutButton.scale.setTo(1.2 * va.scaleP, 1.2 * va.scaleP);
		this.withoutButton.visible = false;

	},

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.
		
		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.
		
		if (this.cache.isSoundDecoded('badBearGamesLogoSound') && this.ready == false)
		{
			this.withButton.visible = true;
			this.withoutButton.visible = true;
			this.ready = true;
		}

	}

};


function startWithSound () {
	shutDownPreloader();
	this.game.state.start('Splash');
}

function startWithoutSound () {
	thisGame.sound.mute = true;
	shutDownPreloader();
	this.game.state.start('Splash');
}

function shutDownPreloader() {
	if (thisGame.withButton)
	{
		thisGame.withButton.destroy();
		thisGame.withButton = null;
	}
	if (thisGame.withoutButton)
	{
		thisGame.withoutButton.destroy();
		thisGame.withoutButton = null;
	}
	if (thisGame.preloadBar)
	{
		thisGame.preloadBar.destroy();
		thisGame.preloadBar = null;
	}
	if (thisGame.background)
	{
		thisGame.background.destroy();
		thisGame.background = null;
	}
}

