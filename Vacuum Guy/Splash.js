var badBearLogo_mc = null;
var badBearLogoSound_snd;
var splashed = false;
var tempBack = null;
var delayTime = 0;

BasicGame.Splash = function (game) {
    
};

BasicGame.Splash.prototype = {
    
    create: function () {
        
        //var background = this.add.sprite(0, 0, 'spaceBackground');
       // background.anchor.setTo(0.5, 0.5);
      //  background.x = (this.world.width / 2);
     //   background.y = (this.world.height /2);
		tempBack = this.add.sprite(0, 0, 'flash');
		tempBack.width = this.world.width;
		tempBack.height = this.world.height;
        
        badBearLogo_mc = this.add.sprite(0, 0, 'badBearGamesLogo');
        badBearLogo_mc.scale.setTo(va.scaleP, va.scaleP);
        badBearLogo_mc.anchor.setTo(0.5, 0.5);
        badBearLogo_mc.x = (this.world.width / 2);
        badBearLogo_mc.y = (this.world.height / 2);
        badBearLogo_mc.alpha = 1;
        
        badBearLogoSound_snd = this.sound.play('badBearGamesLogoSound');
		
		delayTime = 60;
    },
    
    update: function () {
        
        if ((!splashed) || (delayTime > 0))
        {
            if (badBearLogo_mc.alpha > 0)
            {
                badBearLogo_mc.alpha -= .005;
                badBearLogo_mc.scale.x -= .001 * va.scaleP;
                badBearLogo_mc.scale.y -= .001 * va.scaleP;
            }
            
			if (badBearLogo_mc.alpha <= 0)
            {
                badBearLogo_mc.alpha = 0;
                splashed = true;
            }
			
			if (splashed)
			{
				delayTime--;
			}
        }
        else
        {
            this.game.state.start('MainMenu');
        }
    },
    
    shutdown: function () {
        if (badBearLogo_mc)
        {
            badBearLogo_mc.destroy();
            badBearLogo_mc = null;
        }
        
        if (tempBack)
        {
            tempBack.destroy();
            tempBack = null;
        }
        
        if (badBearLogoSound_snd)
        {
            badBearLogoSound_snd.stop();
            badBearLogoSound_snd = null;
        }
    }
};