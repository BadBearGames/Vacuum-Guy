var gameOver_txt = null;
var results_txt = null;
var tapToContinue_txt = null;
var fade = false;
var fade_mc = null;
var tapEvent = null;
var canTap = false;
var tempTime = 150;
var fontSize3 = 0;

BasicGame.GameOver = function (game) {
    thisGame = game;
    this.time;
};

BasicGame.GameOver.prototype = {
    
    create: function () {
        this.camera.setPosition(this.world.centerX - (this.camera.width / 2), this.world.centerY - (this.camera.height / 2));
        
        fontSize3 = 70 * va.scaleP;
        tapToContinue_txt = thisGame.add.bitmapText(thisGame.world.centerX, thisGame.world.centerY + 200 * va.scaleP, "Tap to Continue", {font: fontSize3 + "px Calibri", fill: "#ffffff", align: "center"});
        
        fontSize3 = 60 * va.scaleP;
        if (energyPercent >= 100)
        {
            gameOver_txt = this.add.bitmapText(this.world.centerX, this.world.centerY - 200 * va.scaleP, "Game Won!", {font: fontSize3 + "px Calibri", fill: "#ffffff", align: "center"});
        }
        else
        {
            gameOver_txt = this.add.bitmapText(this.world.centerX, this.world.centerY - 200 * va.scaleP, "Game Over", {font: fontSize3 + "px Calibri", fill: "#ffffff", align: "center"});
        }
        
        fontSize3 = 50 * va.scaleP;
        if (energyPercent >= 100)
        {
            results_txt = this.add.bitmapText(this.world.centerX, this.world.centerY, "You brought the universe to life!", {font: fontSize3 + "px Calibri", fill: "#ffffff", align: "center"});
        }
        else
        {
            if (energyPercent < 5)
            {
               results_txt = this.add.bitmapText(this.world.centerX, this.world.centerY, "Energy Collected: " + energyPercent + "% ...Hey, you tried ;)", {font: fontSize3 + "px Calibri", fill: "#ffffff", align: "center"});
            }
			else if (energyPercent < 10)
            {
                results_txt = this.add.bitmapText(this.world.centerX, this.world.centerY, "Energy Collected: " + energyPercent + "% ...I commend you for effort!", {font: fontSize3 + "px Calibri", fill: "#ffffff", align: "center"});
            }
            else if (energyPercent < 15)
            {
                results_txt = this.add.bitmapText(this.world.centerX, this.world.centerY, "Energy Collected: " + energyPercent + "% ...Hint: avoid squares ;)", {font: fontSize3 + "px Calibri", fill: "#ffffff", align: "center"});
            }
            else if (energyPercent < 20)
            {
                results_txt = this.add.bitmapText(this.world.centerX, this.world.centerY, "Energy Collected: " + energyPercent + "% ...Come on, you can do it!", {font: fontSize3 + "px Calibri", fill: "#ffffff", align: "center"});
            }
            else if (energyPercent < 25)
            {
                results_txt = this.add.bitmapText(this.world.centerX, this.world.centerY, "Energy Collected: " + energyPercent + "% ...Hey, it happens :)", {font: fontSize3 + "px Calibri", fill: "#ffffff", align: "center"});
            }
            else if (energyPercent < 30)
            {
                results_txt = this.add.bitmapText(this.world.centerX, this.world.centerY, "Energy Collected: " + energyPercent + "% ...Insert coin to continue", {font: fontSize3 + "px Calibri", fill: "#ffffff", align: "center"});
            }
            else if (energyPercent < 35)
            {
                results_txt = this.add.bitmapText(this.world.centerX, this.world.centerY, "Energy Collected: " + energyPercent + "% ...Defeat tastes salty :'(", {font: fontSize3 + "px Calibri", fill: "#ffffff", align: "center"});
            }
            else if (energyPercent < 40)
            {
                results_txt = this.add.bitmapText(this.world.centerX, this.world.centerY, "Energy Collected: " + energyPercent + "% ...I believe in you! :D", {font: fontSize3 + "px Calibri", fill: "#ffffff", align: "center"});
            }
            else if (energyPercent < 45)
            {
                results_txt = this.add.bitmapText(this.world.centerX, this.world.centerY, "Energy Collected: " + energyPercent + "% ... :(", {font: fontSize3 + "px Calibri", fill: "#ffffff", align: "center"});
            }
            else if (energyPercent < 50)
            {
                results_txt = this.add.bitmapText(this.world.centerX, this.world.centerY, "Energy Collected: " + energyPercent + "% ...Great Scott! :O", {font: fontSize3 + "px Calibri", fill: "#ffffff", align: "center"});
            }
            else if (energyPercent < 55)
            {
                results_txt = this.add.bitmapText(this.world.centerX, this.world.centerY, "Energy Collected: " + energyPercent + "% ...Smile :D", {font: fontSize3 + "px Calibri", fill: "#ffffff", align: "center"});
            }
            else if (energyPercent < 60)
            {
                results_txt = this.add.bitmapText(this.world.centerX, this.world.centerY, "Energy Collected: " + energyPercent + "% ...You're the best, around!", {font: fontSize3 + "px Calibri", fill: "#ffffff", align: "center"});
            }
            else if (energyPercent < 65)
            {
                results_txt = this.add.bitmapText(this.world.centerX, this.world.centerY, "Energy Collected: " + energyPercent + "% ...Come on, hit me! Hit me!", {font: fontSize3 + "px Calibri", fill: "#ffffff", align: "center"});
            }
            else if (energyPercent < 70)
            {
                results_txt = this.add.bitmapText(this.world.centerX, this.world.centerY, "Energy Collected: " + energyPercent + "% ...Son of a nutcracker!", {font: fontSize3 + "px Calibri", fill: "#ffffff", align: "center"});
            }
            else if (energyPercent < 75)
            {
                results_txt = this.add.bitmapText(this.world.centerX, this.world.centerY, "Energy Collected: " + energyPercent + "% ...Meh", {font: fontSize3 + "px Calibri", fill: "#ffffff", align: "center"});
            }
            else if (energyPercent < 80)
            {
                results_txt = this.add.bitmapText(this.world.centerX, this.world.centerY, "Energy Collected: " + energyPercent + "% ...You're a winner! ;D", {font: fontSize3 + "px Calibri", fill: "#ffffff", align: "center"});
            }
            else if (energyPercent < 85)
            {
                results_txt = this.add.bitmapText(this.world.centerX, this.world.centerY, "Energy Collected: " + energyPercent + "% ...Dance mode not unlocked!", {font: fontSize3 + "px Calibri", fill: "#ffffff", align: "center"});
            }
            else if (energyPercent < 90)
            {
                results_txt = this.add.bitmapText(this.world.centerX, this.world.centerY, "Energy Collected: " + energyPercent + "% ...You smell good :)", {font: fontSize3 + "px Calibri", fill: "#ffffff", align: "center"});
            }
            else if (energyPercent < 95)
            {
                results_txt = this.add.bitmapText(this.world.centerX, this.world.centerY, "Energy Collected: " + energyPercent + "% ...I'm so sorry...", {font: fontSize3 + "px Calibri", fill: "#ffffff", align: "center"});
            }
            else if (energyPercent < 100)
            {
                results_txt = this.add.bitmapText(this.world.centerX, this.world.centerY, "Energy Collected: " + energyPercent + "% ...So close it hurts!", {font: fontSize3 + "px Calibri", fill: "#ffffff", align: "center"});
            }
        }
		
		if (select_snd == null)
		{
			select_snd = this.add.audio('selectSound');
		}
        
        tapToContinue_txt.visible = false;
        gameOver_txt.visible = false;
        results_txt.visible = false;
        tapToContinue_txt.anchor.setTo(0.5, 0.5);
        gameOver_txt.anchor.setTo(0.5, 0.5);
        results_txt.anchor.setTo(0.5, 0.5);

        
        fade_mc = this.add.sprite(this.world.centerX, this.world.centerY, 'background1');
        fade_mc.width = 1200 * va.scaleP;
        fade_mc.height = 1200 * va.scaleP;
        fade_mc.anchor.setTo(0.5, 0.5);
        fade_mc.alpha = 0;
        
        fade = false;
        canTap = false;
        tempTime = 50;
        
        //tapEvent = this.time.events.add(Phaser.Timer.SECOND * 2, tapable, this);
        //tapEvent = this.time.create(false);
        //tapEvent.add(3000, tapable, this);
        //tapEvent.start();

    },
    
    update: function () {
        
        
        if ((this.input.activePointer.isDown) && (!fade) && (canTap))
        {
            fade = true;
			select_snd.play();
        }
        
        if (fade_mc.alpha < 1)
        {
            if (fade)
            {
                fade_mc.alpha += 0.02;
            }
        }
        else
        {
            fade_mc.alpha = 1;
            shutDownGameOver();
            this.game.state.start('MainMenu');
        }
        
        if (tempTime > 0)
        {
            tempTime--;
        }
        else if (tempTime == 0)
        {
            tempTime = (-1);
            tapable();
        }
    },
};

function shutDownGameOver() { //DELETES EVERYTHING ON THIS SCREEN
    if (gameOver_txt)
    {
        gameOver_txt = null;
    }
    if (results_txt)
    {
        results_txt = null;
    }
    if (tapToContinue_txt)
    {
        tapToContinue_txt = null;
    }
    if (fade_mc)
    {
        fade_mc.destroy();
        fade_mc = null;
    }
	if (select_snd)
	{
		select_snd = null;
	}
}

function tapable() {
    canTap = true;
    tapToContinue_txt.visible = true;
    gameOver_txt.visible = true;
    results_txt.visible = true;

    //tapEvent.stop();
    //thisGame.time.events.remove(tapEvent);
    
}
