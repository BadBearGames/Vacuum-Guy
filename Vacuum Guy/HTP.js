var info = "Tap and hold to move the Vacuum Guy around.";
var info2 = "Follow the arrow to find particles of energy.\nCollect these to increase the energy of the universe.";
var info3 = "As your energy increases,\nmore detail will pop into the universe.";
var info4 = "Don't hit the rocks,\nor the Vacuum Guy will fail and your energy level will return to zero.";
var info5 = "Reach 50% to be rewarded with an extra life.\nGood luck!";
var infoNumber = 0;
var infoDelay = 20;
var infoDone = false;

var backHTP = null;
var energyTextHTP = null;
var tapText = null;
var infoText = null;
var playerBodyH = null;
var playerHandH = null;
var vacuumH = null;
var playerLeftFootH = null;
var playerRightFootH = null;
var rockH = null;
var particleH = null;
var arrowH = null;
var powerupH = null;
var fontSize2 = 0;

BasicGame.HTP = function (game) {
    
};

BasicGame.HTP.prototype = {
    
    create: function () {
        
        this.camera.setPosition(this.world.centerX - (this.camera.width / 2), this.world.centerY - (this.camera.height / 2));


        
        backHTP = this.add.sprite(this.world.centerX, this.world.centerY, 'background2');
        backHTP.anchor.setTo(0.5, 0.5);
        backHTP.scale.setTo(2.5 * va.scaleP, 2.5 * va.scaleP);
        
        fontSize2 = 50 * va.scaleP;
        energyTextHTP = this.add.bitmapText(this.world.centerX + 180 * va.scaleP, this.world.centerY - 90 * va.scaleP, "Energy: 34%", {font: "" + fontSize2 + "px Calibri", fill: "#ffffff", align: "center"});
        energyTextHTP.visible = false;
        energyTextHTP.body = null;
        energyTextHTP.autoCull = true;
        energyTextHTP.anchor.setTo(0.5, 0.5);
        
        fontSize2 = 40 * va.scaleP;
        tapText = this.add.bitmapText(this.world.centerX, this.world.centerY + 310 * va.scaleP, "Tap to Continue...", {font: "" + fontSize2 + "px Calibri", fill: "#ffffff", align: "cneter"});
        tapText.body = null;
        tapText.autoCull = true;
        tapText.anchor.setTo(0.5, 0.5);
        
        fontSize2 = 40 * va.scaleP;
        infoText = this.add.bitmapText(this.world.centerX - 450 * va.scaleP, this.world.centerY - 200 * va.scaleP, info, {font: "" + fontSize2 + "px Calibri", fill: "#ffffff", align: "left"});
        infoText.body = null;
        infoText.autoCull = true;
        infoText.anchor.setTo(0, 0.5);
        
        playerBodyH = this.add.sprite(this.world.centerX, this.world.centerY, 'vacuumGuyBody1');
        playerBodyH.body = null;
        playerBodyH.anchor.setTo(0.5, 0.5);
        playerBodyH.scale.setTo(va.scaleP, va.scaleP);
        
        playerHandH = this.add.sprite(this.world.centerX - 70 * va.scaleP, this.world.centerY, 'vacuumGuyHand1');
        playerHandH.body = null;
        playerHandH.anchor.setTo(0.5, 0.5);
        playerHandH.scale.setTo(va.scaleP, va.scaleP);
        
        vacuumH = this.add.sprite(this.world.centerX + 100 * va.scaleP, this.world.centerY, 'vacuumGuyVacuum1');
        vacuumH.body = null;
        vacuumH.anchor.setTo(0.5, 0.5);
        vacuumH.scale.setTo(va.scaleP, va.scaleP);
        
        playerRightFootH = this.add.sprite(this.world.centerX + 25 * va.scaleP, this.world.centerY + 100 * va.scaleP, 'vacuumGuyRightFoot1');
        playerRightFootH.body = null;
        playerRightFootH.anchor.setTo(0.5, 0.5);
        playerRightFootH.scale.setTo(va.scaleP, va.scaleP);
        
        playerLeftFootH = this.add.sprite(this.world.centerX - 25 * va.scaleP, this.world.centerY + 100 * va.scaleP, 'vacuumGuyLeftFoot1');
        playerLeftFootH.body = null;
        playerLeftFootH.anchor.setTo(0.5, 0.5);
        playerLeftFootH.scale.setTo(va.scaleP, va.scaleP);
        
        rockH = this.add.sprite(this.world.centerX + 200 * va.scaleP, this.world.centerY, 'rock1');
        rockH.anchor.setTo(0.5, 0.5);
        rockH.scale.setTo(0.5 * va.scaleP, 0.5 * va.scaleP);
        rockH.visible = false;
        
        particleH = this.add.sprite(this.world.centerX + 300 * va.scaleP, this.world.centerY, 'particle');
        particleH.anchor.setTo(0.5, 0.5);
        particleH.visible = false;
        particleH.scale.setTo(va.scaleP, va.scaleP);
        
        arrowH = this.add.sprite(this.world.centerX, this.world.centerY, 'indicator');
        arrowH.anchor.setTo(0, 0.5);
        arrowH.visible = false;
        arrowH.scale.setTo(va.scaleP, va.scaleP);
        
        powerupH = this.add.sprite(this.world.centerX + 200 * va.scaleP, this.world.centerY, 'powerup');
        powerupH.anchor.setTo(0.5, 0.5);
        powerupH.visible = false;
        powerupH.scale.setTo(va.scaleP, va.scaleP);
        

        infoNumber = 1;
        infoDelay = 20;
        infoDone = false;
    },
    
    update: function () {
        if (!infoDone)
        {
        
        if (infoDelay > 0)
        {
            infoDelay--;
        }
        else
        {
            if (this.input.activePointer.isDown)
            {
                if (infoNumber == 5)
                {
                    if (BasicGame.firstTime)
                    {
                        BasicGame.firstTime = false;
                        select_snd.play();
                        shutdown();
                        thisGame.state.start('Game');
                    }
                    else
                    {
                        select_snd.play();
                        shutdown();
                        thisGame.state.start('MainMenu');
                    }
                }
                else
                {
                    infoNumber++;
                    select_snd.play();
                    infoDelay = 20;
                }
            }
        }
        
        switch (infoNumber)
        {
            case 1:
            infoText.setText(info);
            infoText.updateTransform();

            break;
                
            case 2:
            infoText.setText(info2);
            infoText.updateTransform();
            break;
                
            case 3:
            infoText.setText(info3);
            infoText.updateTransform();
            break;
                
            case 4:
            infoText.setText(info4);
            infoText.updateTransform();
            break;
                
            case 5:
            if (!infoDone)
            {
                infoText.setText(info5);
                infoText.updateTransform();
            }
            break;
        }
        
        if (!infoDone)
        {
            if (infoNumber == 2)
            {
                playerBodyH.x = this.world.centerX - 100 * va.scaleP;
                playerHandH.x = playerBodyH.x - 60 * va.scaleP;
                vacuumH.x = playerBodyH.x + 120 * va.scaleP;
                playerLeftFootH.x = playerBodyH.x - 25 * va.scaleP;
                playerLeftFootH.y = playerBodyH.y + 100 * va.scaleP;
                playerRightFootH.x = playerBodyH.x + 25 * va.scaleP;
                playerRightFootH.y = playerBodyH.y + 100 * va.scaleP;
            }
            else if (infoNumber == 3)
            {
                playerBodyH.x = this.world.centerX;
                playerHandH.x = playerBodyH.x - 65 * va.scaleP;
                vacuumH.x = playerBodyH.x + 100 * va.scaleP;
                playerLeftFootH.x = playerBodyH.x - 25 * va.scaleP;
                playerLeftFootH.y = playerBodyH.y + 100 * va.scaleP;
                playerRightFootH.x = playerBodyH.x + 25 * va.scaleP;
                playerRightFootH.y = playerBodyH.y + 100 * va.scaleP;
                playerBodyH.loadTexture('vacuumGuyBody2');
                playerHandH.loadTexture('vacuumGuyHand2');
                playerLeftFootH.loadTexture('vacuumGuyLeftFoot2');
                backHTP.loadTexture('background3');
            }
            if (infoNumber == 4)
            {
                playerBodyH.x = this.world.centerX - 100 * va.scaleP;
                playerBodyH.y = this.world.centerY + 30 * va.scaleP;
                playerHandH.x = playerBodyH.x - 60 * va.scaleP;
                playerHandH.y = playerBodyH.y - 10 * va.scaleP;
                vacuumH.x = playerBodyH.x + 120 * va.scaleP;
                vacuumH.y = playerBodyH.y;
                playerLeftFootH.x = playerBodyH.x - 25 * va.scaleP;
                playerLeftFootH.y = playerBodyH.y + 100 * va.scaleP;
                playerRightFootH.x = playerBodyH.x + 25 * va.scaleP;
                playerRightFootH.y = playerBodyH.y + 100 * va.scaleP;
            }
            else if (infoNumber == 5)
            {
                playerBodyH.x = this.world.centerX;
                playerBodyH.y = this.world.centerY;
                playerHandH.x = playerBodyH.x - 65 * va.scaleP;
                playerHandH.y = playerBodyH.y;
                vacuumH.x = playerBodyH.x + 100 * va.scaleP;
                vacuumH.y = playerBodyH.y;
                playerLeftFootH.x = playerBodyH.x - 25 * va.scaleP;
                playerLeftFootH.y = playerBodyH.y + 100 * va.scaleP;
                playerRightFootH.x = playerBodyH.x + 25 * va.scaleP;
                playerRightFootH.y = playerBodyH.y + 100 * va.scaleP;
            }



            
            
            if (infoNumber == 3)
            {
                energyTextHTP.visible = true;
            }
            else
            {
                energyTextHTP.visible = false;
            }
            
            if (infoNumber == 2)
            {
                particleH.visible = true;
            }
            else
            {
                particleH.visible = false;
            }
            
            arrowH.x = playerBodyH.x;
            arrowH.y = playerBodyH.y;
            
            if (infoNumber > 1)
            {
                arrowH.visible = true;
            }
            else
            {
                arrowH.visible = false;
            }
            if (infoNumber == 3)
            {
                arrowH.angle = 20;
            }
            else if (infoNumber == 4)
            {
                arrowH.angle = 180;
            }
            
            if (infoNumber == 4)
            {
                rockH.visible = true;
            }
            else
            {
                rockH.visible = false;
            }
            
            if (infoNumber == 5)
            {
                powerupH.visible = true;
            }
            else
            {
                powerupH.visible = false;
            }
        }
            
            
        }
    },
    
};

function shutdown() {
    if (backHTP)
    {
        backHTP.destroy();
        backHTP = null;
    }
    if (energyTextHTP)
    {
        energyTextHTP = null;
    }
    if (tapText)
    {
        tapText = null;
    }
    if (infoText)
    {
        infoText = null;
    }
    if (playerBodyH)
    {
        playerBodyH.destroy();
        playerBodyH = null;
    }
    if (playerHandH)
    {
        playerHandH.destroy();
        playerHandH = null;
    }
    if (vacuumH)
    {
        vacuumH.destroy();
        vacuumH = null;
    }
    if (playerRightFootH)
    {
        playerRightFootH.destroy();
        playerRightFootH = null;
    }
    if (playerLeftFootH)
    {
        playerLeftFootH.destroy();
        playerLeftFootH = null;
    }
    if (rockH)
    {
        rockH.destroy();
        rockH = null;
    }
    if (particleH)
    {
        particleH.destroy();
        particleH = null;
    }
    if (arrowH)
    {
        arrowH.destroy();
        arrowH = null;
    }
    if (powerupH)
    {
        powerupH.destroy();
        powerupH = null;
    }
    
    infoDone = true;
}
