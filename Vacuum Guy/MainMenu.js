var logo_mc = null;
var select_snd = null;
var backRot = null;
var alphaer = false;
var createdBy_txt = null;
var thisGame;
var bbLogo_mc = null;
var menuGraphic_mc = null;
var music = null;
var fontSize = 0;

BasicGame.MainMenu = function (game) {

	music = null;
	this.playButton = null;
	this.muteButton = null;
	this.fullscreenButton = null;
	this.HTPButton = null;
	thisGame = game;
	
	

};

BasicGame.MainMenu.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)
		
		this.camera.setPosition(this.world.centerX - (this.camera.width / 2), this.world.centerY - (this.camera.height / 2));

		
		if (music == null)
		{
			music = this.add.audio('mainTheme');
			music.play('', 0, 1, true);
			this.game.onPause.add(loseFocus2, this); 
    		this.game.onResume.add(gainFocus2, this);

		}
		
		if (select_snd == null)
		{
			select_snd = this.add.audio('selectSound');
		}
		

		//this.add.sprite(0, 0, 'background1');
		
		backRot = this.add.sprite(this.world.centerX, this.world.centerY, 'background5');
		backRot.anchor.setTo(0.5, 0.5);
		backRot.scale.setTo(2.5 * va.scaleP, 2.5 * va.scaleP);
		
		
       
        logo_mc = this.add.sprite(this.world.width / 2, this.world.height / 2 - 130 * va.scaleP, 'vacuumGuyLogo');
        logo_mc.anchor.setTo(0.5, 0.5);
		logo_mc.scale.setTo(va.scaleP, va.scaleP);
		
		bbLogo_mc = this.add.sprite(this.world.centerX + 330 * va.scaleP, this.world.centerY + 180 * va.scaleP, 'badBearGamesLogo2');
		bbLogo_mc.anchor.setTo(0.5, 0.5);
		bbLogo_mc.scale.setTo(0.6 * va.scaleP, 0.6 * va.scaleP);
		
		menuGraphic_mc = this.add.sprite(this.world.centerX, this.world.centerY + 20 * va.scaleP, 'menuGraphic');
		menuGraphic_mc.anchor.setTo(0.5, 0.5);
		menuGraphic_mc.scale.setTo(va.scaleP, va.scaleP);
        
		this.playButton = this.add.button(this.world.width / 2, this.world.height / 2 + 200 * va.scaleP, 'startButton', this.startGame, this, 0, 1, 2);
        this.playButton.anchor.setTo(0.5, 0.5);
        this.playButton.scale.setTo(0.5 * va.scaleP, 0.5 * va.scaleP);
		
		this.muteButton = this.add.button(this.world.width / 2 - 420 * va.scaleP, this.world.height / 2 - 315 * va.scaleP, 'muteButton', muteGame, this, 0, 1, 2);
        this.muteButton.anchor.setTo(0.5, 0.5);
		this.muteButton.scale.setTo(0.50 * va.scaleP, 0.50 * va.scaleP);
		
		this.HTPButton = this.add.button(this.world.centerX, this.world.centerY + 310 * va.scaleP, 'HTPButton', goToHTP, this, 0, 0, 0);
		this.HTPButton.anchor.setTo(0.5, 0.5);
		this.HTPButton.scale.setTo(va.scaleP, va.scaleP);
		
		this.fullscreenButton = this.add.button(this.world.width / 2 + 370 * va.scaleP, this.world.height / 2 - 315 * va.scaleP, 'fullscreenButton', fullscreenGame, this, 0, 1, 2);
		this.fullscreenButton.anchor.setTo(0.5, 0.5);
		this.fullscreenButton.scale.setTo(0.5 * va.scaleP, 0.5 * va.scaleP);
		
		fontSize = 40 * va.scaleP;
		createdBy_txt = this.add.bitmapText(this.world.centerX - 167 * va.scaleP, this.world.centerY - 250 * va.scaleP, "A Game by Nelson Scott", {font: "" + fontSize + "px Calibri", fill: "#ffffff", align: "center"});
		
		
		

	},

	update: function () {

		//	Do some nice funky main menu effect here
		
		if (!alphaer)
		{
			backRot.alpha -= 0.002;
			if (backRot.alpha <= .70)
			{
				alphaer = true;
			}
		}
		else
		{
			backRot.alpha += 0.002;
			if (backRot.alpha >= 1)
			{
				alphaer = false;
			}
		}

	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//this.music.stop();

		//	And start the actual game
		
		if (BasicGame.firstTime)
		{
			select_snd.play();
			shutdown(thisGame);
			thisGame.state.start('HTP');
		}
		else
		{
			select_snd.play();
			shutdown(this);
			this.game.state.start('Game');
		}
	}

};

function shutdown (game) {
	if (game.playButton)
	{
		game.playButton.destroy();
		game.playButton = null;
	}
	
	if (game.muteButton)
	{
		game.muteButton.destroy();
		game.muteButton = null;
	}
	
	if (game.fullscreenButton)
	{
		game.fullscreenButton.destroy();
		game.fullscreenButton = null;
	}
	
	if (game.HTPButton)
	{
		game.HTPButton.destroy();
		game.HTPButton = null;
	}
	
	if (logo_mc)
	{
		logo_mc.destroy();
		logo_mc = null;
	}
	
	if (bbLogo_mc)
	{
		bbLogo_mc.destroy();
		bbLogo_mc = null;
	}
	
	if (menuGraphic_mc)
	{
		menuGraphic_mc.destroy();
		menuGraphic_mc = null;
	}
	
	if (backRot)
	{
		backRot.destroy();
		backRot = null;
	}
	
	if (select_snd)
	{
		select_snd = null;
	}
	
	//game.game.onPause.remove(loseFocus2, this);
    //game.game.onResume.remove(gainFocus2, this);

}

function muteGame () {
	if (thisGame.sound.mute == false)
	{
		thisGame.sound.mute = true;
	}
	else
	{
		thisGame.sound.mute = false;
	}
}

function fullscreenGame () {
	thisGame.stage.scale.startFullScreen();
}

function loseFocus2() {
     music.volume = 0;
    //pp = music.pausedTime;
}

function gainFocus2() {
    music.volume = 1;
   // music.loop = true;
   // music.play(music.currentMarker, 0, 1, true);
}

function goToHTP () {
	select_snd.play();
	BasicGame.firstTime = false;
	shutdown(thisGame);
	thisGame.state.start('HTP');
}


