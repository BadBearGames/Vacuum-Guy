/*OBJECTIVES
 - SEPERATE MOBILE TEXTURES
 - Pause menu, first try isn't dark
 - Performance as always
 - Cut down on size where possible
*/

var player_g = null;
var playerBody_mc = null;
var playerHand_mc = null;
var playerLeftFoot_mc = null;
var playerRightFoot_mc = null;
var vacuum_mc = null;
var rock = null;
var pull = false;
var temp = 0;
var temp2 = 0;
var tempO = null;
var tempP = false;
var i = 0;
var i2 = 0;
var background = null;
var stars = null;
var rocks_g = null;
var particles_g = null;
var tempParticle = null;
var maxEnergy = 50;
var collectedEnergy = 0;
var energyPercent = 0;
var text_hud = null;
var textInstructions = null;
var tut = "TAP and HOLD to move.\nFollow the ARROW to the PARTICLES.\nDon't hit the ROCKS.";
var tutRelease = false;
var textSprite = null;
var collect_snd;
var flash_mc = null;
var rc = 0;
var tr = 0;
var timeOut = 0;
var thisGame;
var gameOver = false;
var pauseButton = null;
var rr = 0;
var tempP = 0;
var planet_mc = null;
var win_snd = null;
var dead_snd = null;
var dg = 0;
var paused_txt = null;
var pausedFade_mc = null;
var endTimer = -1;
var tutTimer = 0;
var indicator_mc = null;
var rIndicator_mc = null;
var limits_txt = null;
var tempPD = null;
var muteButton = null;
var quitButton = null;
var extraLives = 0;
var mr = 0;
var powerup_mc = null;
var pp = 0;
var fontSizeG = 0;

BasicGame.Game = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;	//	the tween manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator

    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
    
    thisGame = game;
};

BasicGame.Game.prototype = {

	create: function () {
        
        this.world.setBounds(0, 0, 10000 * va.scaleP, 10000 * va.scaleP);
        
        background = this.add.sprite(0, 0, 'background1');
        background.anchor.setTo(0.5, 0.5);
        background.scale.setTo(3.8 * va.scaleP, 3.8 * va.scaleP);//background.scale.setTo(2, 2);
        background.body = null;
        //background.body.drag.x = 1000;
        //background.body.drag.y = 1000;
        background.autoCull = true;
        
        stars = this.add.sprite(this.world.width / 2, this.world.height / 2, 'stars1');
        stars.body = null;
        stars.scale.setTo(4 * va.scaleP, 4 * va.scaleP);
        stars.anchor.setTo(0.5, 0.5);
        stars.alpha = 0;
        stars.autoCull = true;
        
        //PLANET 
        planet_mc = this.add.sprite(0, 0, 'planet');
        planet_mc.anchor.setTo(0.5, 0.5);
        planet_mc.visible = false;
        planet_mc.body = null;
        planet_mc.autoCull = true;
        planet_mc.scale.setTo(1.5 * va.scaleP, 1.5 * va.scaleP);

        //PLAYER
        player_g = this.add.group();
       // player_g.x = this.world.width / 2;
        //player_g.y = this.world.height / 2;
        
        playerBody_mc = player_g.create(this.world.width / 2, this.world.height / 2, 'vacuumGuyBody1');
        playerBody_mc.anchor.setTo(0.5, 0.5);
        playerBody_mc.scale.setTo(va.scaleP * 0.8, va.scaleP * 0.8);
        //playerBody_mc.scale.setTo(.75, .75);//playerBody_mc.scale.setTo(0.25, 0.25);
        //playerBody_mc.body.setSize(50, 50, 0, 0);
        playerBody_mc.body.collideWorldBounds = true;
        //playerBody_mc.inWorldThreshold = 800;

        //ROCKS
        rocks_g = this.add.group();
        rocks_g.x = 0;
        rocks_g.y = 0;
        
        for (i = 0; i < 3; i++) //25
        {
            rock = rocks_g.create(0, 0, 'rock1');
            rock.anchor.setTo(0.5, 0.5);
            temp = 0.20 + Math.random() * 1.00;
            if (this.game.device.iPhone)
            {
                rock.scale.setTo((temp * 8) * va.scaleP, (temp * 8) * va.scaleP);
            }
            else
            {
                rock.scale.setTo(temp * va.scaleP, temp * va.scaleP);
            }
            rock.body.velocity.x = randomSpeed();
            rock.body.velocity.y = randomSpeed();
            rock.angle = randomRotation();
            rock.body.bounce.setTo(0.8 * va.scaleP, 0.8 * va.scaleP);
            randomPosition2(rock, this, playerBody_mc);
            rock.autoCull = true;
        }
        
        
        rock = rocks_g.create(this.world.width / 2 + 650 * va.scaleP, this.world.height / 2, 'rock1');
        rock.anchor.setTo(0.5, 0.5);
        if (this.game.device.iPhone)
        {
            rock.scale.setTo(0.2 * 10 * va.scaleP, 0.2 * 10 * va.scaleP);
        }
        else
        {
            rock.scale.setTo(0.2 * va.scaleP, 0.2 * va.scaleP);
        }
        
        rock.body.velocity.x = -50 * va.scaleP;
        rock.body.bounce.setTo(0.8 * va.scaleP, 0.8 * va.scaleP);
        rock.autoCull = true;
        
        for (i = rocks_g.length - 1; i >= 0; i--) //ROCKS LOOP
        {
            for (i2 = rocks_g.length - 1; i2 >= 0; i2--)
            {
                //this.physics.overlap(rocks_g.getAt(i), rocks_g.getAt(i2), objectsCollide, null, this);
                this.physics.separate(rocks_g.getAt(i), rocks_g.getAt(i2));
            }
        }

        //PARTICLES
        particles_g = this.add.group();
        
        for (i = 0; i < 4; i++) // 70
        {
            tempParticle = particles_g.create(this.world.randomX, this.world.randomY, 'particle');
            tempParticle.anchor.setTo(0.5, 0.5);
            tempParticle.angle = this.rnd.integerInRange(0, 360);
            moveParticle(tempParticle, playerBody_mc);
            tempParticle.autoCull = true;
            tempParticle.scale.setTo(va.scaleP, va.scaleP);
        }
        
        tempParticle = particles_g.create(this.world.width / 2 + 350 * va.scaleP, this.world.height / 2, 'particle');
        tempParticle.anchor.setTo(0.5, 0.5);
        tempParticle.angle = this.rnd.integerInRange(0, 360);
        tempParticle.autoCull = true;
        tempParticle.scale.setTo(va.scaleP, va.scaleP);

        
        
        playerHand_mc = player_g.create(this.world.width / 2 - 50 * va.scaleP, this.world.height / 2, 'vacuumGuyHand1');
        playerHand_mc.anchor.setTo(0.5, 0.5);
        playerHand_mc.scale.setTo(va.scaleP * 0.9, va.scaleP * 0.9);
        //playerHand_mc.scale.setTo(.75, .75);
        
        
        playerLeftFoot_mc = player_g.create(this.world.width / 2 - 20 * va.scaleP, this.world.height / 2 + 85 * va.scaleP, 'vacuumGuyLeftFoot1');
        //playerLeftFoot_mc.scale.setTo(.75, .75);
        playerLeftFoot_mc.anchor.setTo(0.5, 0.5);
        playerLeftFoot_mc.scale.setTo(va.scaleP * 0.8, va.scaleP * 0.8);
        
        playerRightFoot_mc = player_g.create(this.world.width / 2 + 20 * va.scaleP, this.world.height / 2 + 85 * va.scaleP, 'vacuumGuyRightFoot1');
        //playerRightFoot_mc.scale.setTo(.75, .75);
        playerRightFoot_mc.anchor.setTo(0.5, 0.5);
        playerRightFoot_mc.scale.setTo(va.scaleP * 0.8, va.scaleP * 0.8);

        
        vacuum_mc = player_g.create(this.world.width / 2 + 100 * va.scaleP, this.world.height / 2, 'vacuumGuyVacuum1');
        //vacuum_mc.scale.setTo(.75, .75);
        vacuum_mc.anchor.setTo(0.5, 0.5);
        vacuum_mc.body.collideWorldBounds = true;
        vacuum_mc.scale.setTo(va.scaleP * 0.9, va.scaleP * 0.9);
        //vacuum_mc.scale.setTo(0.25, 0.25);
       // vacuum_mc.body.collideWorldBounds = true;
        
        //CAMERA
        this.camera.follow(playerBody_mc);
        this.camera.bounds = null;
        //this.camera.bounds = null;
       // this.camera.setBoundsToWorld();
        background.x = playerBody_mc.x;
        background.y = playerBody_mc.y;
        
        fontSizeG = 50 * va.scaleP;
        //TEXT
        text_hud = this.add.bitmapText(this.world.centerX, this.world.centerY, "Energy: ", {font: fontSizeG + "px Calibri", fill: "#ffffff", align: "center"});
        text_hud.alpha = 0;
        text_hud.body = null;
        text_hud.autoCull = true;
        
        fontSizeG = 45 * va.scaleP;
        textInstructions = this.add.bitmapText(this.world.centerX - 375 * va.scaleP, this.world.centerY + 200 * va.scaleP, tut, {font: fontSizeG + "px Calibri", fill: "#ffffff", align: "center"});
        textInstructions.body = null;
        textInstructions.autoCull = true;
        
        pauseButton = this.add.button(this.world.centerX + 400 * va.scaleP, this.world.centerY - 330 * va.scaleP, 'pauseButton', pauseGame, this, 0, 0, 0);
        pauseButton.scale.setTo(0.7 * va.scaleP, 0.7 * va.scaleP);
        pauseButton.fixedToCamera = true;
        pauseButton.cameraOffset.setTo(25 * va.scaleP, 700 * va.scaleP);
        pauseButton.body = null;
        //pauseButton.autoCull = true;
        
        /*muteButton = this.add.button(this.world.centerX + 400 * va.scaleP, this.world.centerY - 330 * va.scaleP, 'muteButton', muteGame, this, 0, 1, 2);
        muteButton.scale.setTo(0.5 * va.scaleP, 0.5 * va.scaleP);
        muteButton.fixedToCamera = true;
        muteButton.cameraOffset.setTo(25 * va.scaleP, 40 * va.scaleP);
        muteButton.body = null;
        muteButton.autoCull = true;*/
        
        quitButton = this.add.button(this.world.centerX + 400 * va.scaleP, this.world.centerY - 330 * va.scaleP, 'quitButton', quitToMenu, this, 0, 1, 2);
        quitButton.fixedToCamera = true;
        quitButton.scale.setTo(1.5 * va.scaleP, 1.5 * va.scaleP);
        quitButton.cameraOffset.setTo(900 * va.scaleP, 700 * va.scaleP);
        quitButton.body = null;
        //quitButton.autoCull = true;
        
        indicator_mc = this.add.sprite(this.world.centerX, this.world.centerY, 'indicator');
        indicator_mc.anchor.setTo(0, 0.5);
        indicator_mc.scale.setTo(1.1 * va.scaleP, 1.1 * va.scaleP);
        indicator_mc.autoCull = true;
        indicator_mc.body = null;
        
        rIndicator_mc = this.add.sprite(this.world.centerX, this.world.centerY, 'rockIndicator');
        rIndicator_mc.anchor.setTo(0, 0.5);
        rIndicator_mc.scale.setTo(1.5 * va.scaleP, 1.5 * va.scaleP);
        rIndicator_mc.autoCull = true;
        rIndicator_mc.body = null;
        rIndicator_mc.visible = false;
        
        powerup_mc = this.add.sprite(this.world.centerX, this.world.centerY, 'powerup');
        powerup_mc.anchor.setTo(0, 0.5);
        powerup_mc.scale.setTo(0.8 * va.scaleP, 0.8 * va.scaleP);
        powerup_mc.autoCull = true;
        powerup_mc.body = null;
        powerup_mc.fixedToCamera = true;
        powerup_mc.cameraOffset.setTo(930 * va.scaleP, 45 * va.scaleP);
        powerup_mc.visible = false;

        
        //SOUND
        collect_snd = this.add.audio('collectSound');
        dead_snd = this.add.audio('deadSound');
        win_snd = this.add.audio('winSound');
        
        fontSizeG = 40 * va.scaleP;
        limits_txt = this.add.bitmapText(this.world.centerX, this.world.centerY - 200 * va.scaleP, "Edge Reached", {font: fontSizeG + "px Calibri", fill: "#ffffff", align: "center"});
        limits_txt.anchor.setTo(0.5, 0.5);
        limits_txt.visible = false;
        limits_txt.autoCull = true;
        limits_txt.body = null;

        
        //FLASH
        flash_mc = this.add.sprite(playerBody_mc.x, playerBody_mc.y, 'flash');
        flash_mc.anchor.setTo(0.5, 0.5);
        flash_mc.width = 1524 * va.scaleP;
        flash_mc.height = 1068 * va.scaleP;
        flash_mc.alpha = 0;
        flash_mc.visible = false;
        flash_mc.fixedToCamera = true;
        flash_mc.cameraOffset.x = 400 * va.scaleP;
        flash_mc.cameraOffset.y = 400 * va.scaleP;
        flash_mc.body = null;
        flash_mc.autoCull = true;
        
       /* pausedFade_mc = this.add.sprite(0, 0, 'background1');
        pausedFade_mc.anchor.setTo(0.5, 0.5);
        pausedFade_mc.scale.setTo(3, 3);
        pausedFade_mc.alpha = 0.5;
        pausedFade_mc.visible = false;
        pausedFade_mc.autoCull = true;
        pausedFade_mc.body = null;*/

        fontSizeG = 40 * va.scaleP;
        paused_txt = this.add.bitmapText(this.world.centerX - 375 * va.scaleP, this.world.centerY + 200 * va.scaleP, "Paused, Tap to Resume", {font: fontSizeG + "px Calibri", fill: "#ffffff", align: "center"});
        paused_txt.anchor.setTo(0.5, 0.5);
        paused_txt.visible = false;
        paused_txt.body = null;

        
        energyPercent = 0;
        collectedEnergy = 0;
        tempP = 0;
        endTimer = -1;
        tutTimer = 200;
        gameOver = false;
        extraLives = 0;
        
        this.game.onPause.add(pauseGame, this);
        
        /*this.game.onPause.add(loseFocus, this);
        this.game.onResume.add(gainFocus, this);*/

    },
    
	update: function () {
        
        if (!gameOver)
        {
        
        for (i = particles_g.length - 1; i >= 0; i--) //PARTICLES LOOP
        {
            particles_g.getAt(i).angle += 3;
        }
        
        for (i = rocks_g.length - 1; i >= 0; i--) //ROCKS LOOP
        {
            for (i2 = rocks_g.length - 1; i2 >= 0; i2--)
            {
                if (this.physics.overlap(rocks_g.getAt(i), rocks_g.getAt(i2)))
                {
                    this.physics.separate(rocks_g.getAt(i).body, rocks_g.getAt(i2).body);
                }
                
                this.physics.collide(rocks_g.getAt(i), rocks_g.getAt(i2));
            }
            
            if (((rocks_g.getAt(i).x < (-600 * va.scaleP)) || (rocks_g.getAt(i).x > this.world.width + 600 * va.scaleP)
            || (rocks_g.getAt(i).y < (-600 * va.scaleP)) || (rocks_g.getAt(i).y > this.world.height + 600 * va.scaleP)) ||
            ((rocks_g.getAt(i).x < playerBody_mc.x - 1000 * va.scaleP) || (rocks_g.getAt(i).x > playerBody_mc.x + 1000 * va.scaleP)
            || (rocks_g.getAt(i).y < playerBody_mc.y - 1000 * va.scaleP) || (rocks_g.getAt(i).y > playerBody_mc.y + 1000 * va.scaleP)))
            {
                temp = (0.20 + Math.random() * 1.00);
                if (this.game.device.iPhone)
                {
                    rocks_g.getAt(i).scale.setTo(temp * 8 * va.scaleP, temp * 8 * va.scaleP);
                }
                else
                {
                    rocks_g.getAt(i).scale.setTo(temp * va.scaleP, temp * va.scaleP);
                }
                rocks_g.getAt(i).anchor.setTo(0.5, 0.5);
                rocks_g.getAt(i).body.velocity.x = randomSpeed();;
                rocks_g.getAt(i).body.velocity.y = randomSpeed();;
                randomPosition2(rocks_g.getAt(i), this, playerBody_mc);
                rocks_g.getAt(i).angle = randomRotation();
            }
        }
        
        if ((this.input.activePointer.isDown) && (this.input.activePointer.targetObject == null))
        {
            if (!tutRelease)
            {
                tutRelease = true;
            }
            
            pull = true;
            if (pull)
            {
                if ((vacuum_mc.x < playerBody_mc.x + 200 * va.scaleP) && (vacuum_mc.x > playerBody_mc.x - 200 * va.scaleP)
                && (vacuum_mc.y < playerBody_mc.y + 200 * va.scaleP) && (vacuum_mc.y > playerBody_mc.y - 200 * va.scaleP))
                {
                    //vacuum_mc.rotation = this.physics.accelerateToPointer(vacuum_mc, this.input.activePointer, 300, 300, 300);
                    if ((vacuum_mc.x < this.input.activePointer.worldX + 5 * va.scaleP) && (vacuum_mc.y < this.input.activePointer.worldY + 5 * va.scaleP)
                    && (vacuum_mc.x > this.input.activePointer.worldX - 5 * va.scaleP) && (vacuum_mc.y > this.input.activePointer.worldY - 5 * va.scaleP))
                    {
                        vacuum_mc.body.velocity.x = playerBody_mc.body.velocity.x;
                        vacuum_mc.body.velocity.y = playerBody_mc.body.velocity.y;
                    }
                    else
                    {
                        this.physics.moveToPointer(vacuum_mc, 250 * va.scaleP, this.input.activePointer); //300
                        vacuum_mc.rotation = this.physics.angleToPointer(vacuum_mc, this.input.activePointer);
                        //vacuum_mc.rotation = this.physics.angleToXY(playerBody_mc, vacuum_mc.x, vacuum_mc.y);
                    }
                    //this.physics.velocityFromAngle(this.physics.angleToPointer(vacuum_mc, this.input.activePointer), 60, vacuum_mc.body.velocity);
                }
                else
                {
                    vacuum_mc.body.velocity.x = 0;
                    vacuum_mc.body.velocity.y = 0;
                }
            }
        }

        
        //MOVE BODY
        if ((vacuum_mc.x > playerBody_mc.x + 120 * va.scaleP) || (vacuum_mc.x < playerBody_mc.x - 120 * va.scaleP)
        || (vacuum_mc.y > playerBody_mc.y + 120 * va.scaleP) || (vacuum_mc.y < playerBody_mc.y - 120 * va.scaleP))
        {
            if ((vacuum_mc.body.velocity.x != 0) || (vacuum_mc.body.velocity.y != 0))
            {
                this.physics.moveToObject(playerBody_mc, vacuum_mc, 250 * va.scaleP, 0); //300
            }
            
            if (vacuum_mc.x < playerBody_mc.x)
            {
                if (playerBody_mc.scale.x > 0)
                {
                    playerBody_mc.scale.x *= (-1);
                }
            }
            else
            {
                if (playerBody_mc.scale.x < 0)
                {
                    playerBody_mc.scale.x *= (-1);
                }
            }
        }
        else
        {
            if ((vacuum_mc.body.velocity.x != 0) || (vacuum_mc.body.velocity.y != 0))
            {
                this.physics.moveToObject(playerBody_mc, vacuum_mc, 200 * va.scaleP, 0);
            }
            
            if (vacuum_mc.x < playerBody_mc.x)
            {
                if (playerBody_mc.scale.x > 0)
                {
                    playerBody_mc.scale.x *= (-1);
                }
            }
            else
            {
                if (playerBody_mc.scale.x < 0)
                {
                    playerBody_mc.scale.x *= (-1);
                }
            }

        }
        
        //MOVE HAND
        if ((playerBody_mc.body.velocity.x == 0) || (playerBody_mc.body.velocity.y == 0))
        {
            playerHand_mc.body.velocity.x = 0;
            playerHand_mc.body.velocity.y = 0;
        }
        else
        {
            if (playerBody_mc.scale.x > 0)
            {
                if ((playerHand_mc.x < playerBody_mc.x - 40 * va.scaleP) && (playerHand_mc.y < playerBody_mc.y + 10 * va.scaleP) 
                && (playerHand_mc.x > playerBody_mc.x - 60 * va.scaleP) && (playerHand_mc.y > playerBody_mc.y - 10 * va.scaleP))
                {
                    playerHand_mc.x = playerBody_mc.x - 50 * va.scaleP;
                    playerHand_mc.y = playerBody_mc.y;
                }
                else
                {
                    this.physics.moveToXY(playerHand_mc, playerBody_mc.x - 50 * va.scaleP, playerBody_mc.y, 250 * va.scaleP, 0);
                }
            }
            else
            {
                if ((playerHand_mc.x < playerBody_mc.x + 60 * va.scaleP) && (playerHand_mc.y < playerBody_mc.y + 10 * va.scaleP) 
                && (playerHand_mc.x > playerBody_mc.x + 40 * va.scaleP) && (playerHand_mc.y > playerBody_mc.y - 10 * va.scaleP))
                {
                    playerHand_mc.x = playerBody_mc.x + 50 * va.scaleP;
                    playerHand_mc.y = playerBody_mc.y;
                }
                else
                {
                    this.physics.moveToXY(playerHand_mc, playerBody_mc.x + 50 * va.scaleP, playerBody_mc.y, 250 * va.scaleP, 0);
                }
             }
        }

        
        //MOVE LEFT FOOT
        if ((playerBody_mc.body.velocity.x == 0) || (playerBody_mc.body.velocity.y == 0))
        {
            playerLeftFoot_mc.body.velocity.x = 0;
            playerLeftFoot_mc.body.velocity.y = 0;
        }
        else
        {
            if (playerBody_mc.scale.x > 0)
            {
                if ((playerLeftFoot_mc.x < playerBody_mc.x - 10 * va.scaleP) && (playerLeftFoot_mc.y < playerBody_mc.y + 90 * va.scaleP) 
                && (playerLeftFoot_mc.x > playerBody_mc.x - 30 * va.scaleP) && (playerLeftFoot_mc.y > playerBody_mc.y + 80 * va.scaleP))
                {
                    playerLeftFoot_mc.x = playerBody_mc.x - 20 * va.scaleP;
                    playerLeftFoot_mc.y = playerBody_mc.y + 85 * va.scaleP;
                }
                else
                {
                    this.physics.moveToXY(playerLeftFoot_mc, playerBody_mc.x - 20 * va.scaleP, playerBody_mc.y + 85 * va.scaleP, 260 * va.scaleP, 0);
                }
            }
            else
            {
                if ((playerLeftFoot_mc.x < playerBody_mc.x + 30 * va.scaleP) && (playerLeftFoot_mc.y < playerBody_mc.y + 90 * va.scaleP) 
                && (playerLeftFoot_mc.x > playerBody_mc.x + 10 * va.scaleP) && (playerLeftFoot_mc.y > playerBody_mc.y + 80 * va.scaleP))
                {
                    playerLeftFoot_mc.x = playerBody_mc.x + 20 * va.scaleP;
                    playerLeftFoot_mc.y = playerBody_mc.y + 85 * va.scaleP;
                }
                else
                {
                    this.physics.moveToXY(playerLeftFoot_mc, playerBody_mc.x + 20 * va.scaleP, playerBody_mc.y + 85 * va.scaleP, 260 * va.scaleP, 0);
                }
             }
        }
        if (playerBody_mc.scale.x < 0)
        {
            if (playerLeftFoot_mc.scale.x > 0)
            {
                playerLeftFoot_mc.scale.x *= (-1);
            }            
        }
        else
        {
            if (playerLeftFoot_mc.scale.x < 0)
            {
                playerLeftFoot_mc.scale.x *= (-1);
            }
        }
        
        //MOVE RIGHT FOOT
        if ((playerBody_mc.body.velocity.x == 0) || (playerBody_mc.body.velocity.y == 0))
        {
            playerRightFoot_mc.body.velocity.x = 0;
            playerRightFoot_mc.body.velocity.y = 0;
        }
        else
        {
            if (playerBody_mc.scale.x < 0)
            {
                if ((playerRightFoot_mc.x < playerBody_mc.x - 10 * va.scaleP) && (playerRightFoot_mc.y < playerBody_mc.y + 90 * va.scaleP) 
                && (playerRightFoot_mc.x > playerBody_mc.x - 30 * va.scaleP) && (playerRightFoot_mc.y > playerBody_mc.y + 80 * va.scaleP))
                {
                    playerRightFoot_mc.x = playerBody_mc.x - 20 * va.scaleP;
                    playerRightFoot_mc.y = playerBody_mc.y + 85 * va.scaleP;
                }
                else
                {
                    this.physics.moveToXY(playerRightFoot_mc, playerBody_mc.x - 20 * va.scaleP, playerBody_mc.y + 85 * va.scaleP, 260 * va.scaleP, 0);
                }
            }
            else
            {
                if ((playerRightFoot_mc.x < playerBody_mc.x + 30 * va.scaleP) && (playerRightFoot_mc.y < playerBody_mc.y + 90 * va.scaleP) 
                && (playerRightFoot_mc.x > playerBody_mc.x + 10 * va.scaleP) && (playerRightFoot_mc.y > playerBody_mc.y + 80 * va.scaleP))
                {
                    playerRightFoot_mc.x = playerBody_mc.x + 20 * va.scaleP;
                    playerRightFoot_mc.y = playerBody_mc.y + 85 * va.scaleP;
                }
                else
                {
                    this.physics.moveToXY(playerRightFoot_mc, playerBody_mc.x + 20 * va.scaleP, playerBody_mc.y + 85 * va.scaleP, 260 * va.scaleP, 0);
                }
             }
        }
        if (playerBody_mc.scale.x < 0)
        {
            if (playerRightFoot_mc.scale.x > 0)
            {
                playerRightFoot_mc.scale.x *= (-1);
            }            
        }
        else
        {
            if (playerRightFoot_mc.scale.x < 0)
            {
                playerRightFoot_mc.scale.x *= (-1);
            }
        }
            
        //INDICATOR
        indicator_mc.x = playerBody_mc.x;
        indicator_mc.y = playerBody_mc.y;
        
        tempPD = particles_g.getAt(particles_g.length - 1);
        for (i = particles_g.length - 2; i >= 0; i--)
        {
            if (this.physics.distanceBetween(playerBody_mc, particles_g.getAt(i))
            < this.physics.distanceBetween(playerBody_mc, tempPD))
            {
                tempPD = particles_g.getAt(i);
            }
        }
        
        if (tempPD != null)
        {
            indicator_mc.rotation = this.physics.angleToXY(indicator_mc, tempPD.x, tempPD.y); 
        }
            
        rIndicator_mc.x = playerBody_mc.x;
        rIndicator_mc.y = playerBody_mc.y;
        
        tempPD = rocks_g.getAt(rocks_g.length - 1);
        for (i = rocks_g.length - 2; i >= 0; i--)
        {
            if (tempPD.inCamera)
            {
                tempPD = rocks_g.getAt(i);
            }
            else
            {
                if ((this.physics.distanceBetween(playerBody_mc, rocks_g.getAt(i))
                < this.physics.distanceBetween(playerBody_mc, tempPD)) && (rocks_g.getAt(i).inCamera == false))
                {
                    tempPD = rocks_g.getAt(i);
                }
            }
        }
        
        if ((tempPD != null) && (this.physics.distanceBetween(playerBody_mc, tempPD) < 1000 * va.scaleP) && (tempPD.inCamera == false))
        {
            rIndicator_mc.rotation = this.physics.angleToXY(rIndicator_mc, tempPD.x, tempPD.y);
            rIndicator_mc.visible = true;
        }
        else
        {
            rIndicator_mc.visible = false;
        }




        //BACKGROUND
        background.x = playerBody_mc.x - (((playerBody_mc.x - (this.world.width / 2)) / (15))) * va.scaleP;
        background.y = playerBody_mc.y - (((playerBody_mc.y - (this.world.height / 2)) / (15))) * va.scaleP;
            
        planet_mc.x = playerBody_mc.x - (((playerBody_mc.x - (this.world.width / 2)) / (25))) * va.scaleP;
        planet_mc.y = playerBody_mc.y - (((playerBody_mc.y - (this.world.height / 2)) / (25))) * va.scaleP;
            
        //STARS
        if (energyPercent > 0)
        {
            stars.x = playerBody_mc.x - (((playerBody_mc.x - (this.world.width / 2)) / (10))) * va.scaleP;
            stars.y = playerBody_mc.y - (((playerBody_mc.y - (this.world.height / 2)) / (10))) * va.scaleP;
        }
        
        //TEXT
        if (text_hud.alpha > 0)
        {
            if (text_hud.alpha - 0.01 >= 0)
            {
                text_hud.alpha -= .01;
            }
        }
        if (text_hud.alpha <= 0)
        {
            text_hud.alpha = 0;
        }
        
        if ((tutRelease) && (textInstructions != null) && (tutTimer <= 0))
        {
            if (textInstructions.alpha > 0)
            {
                textInstructions.alpha -= 0.05;
            }
            else if (textInstructions)
            {
                textInstructions.destroy();
                textInstructions = null;
            }
        }


        //FLASH
        if (flash_mc.alpha > 0)
        {
            if (flash_mc.alpha - 0.1 >= 0)
            {
                flash_mc.alpha -= 0.1;
            }
        }
        if (flash_mc.alpha <= 0)
        {
            flash_mc.alpha = 0;
            flash_mc.visible = false;
        }
        
        //COLLISIONS
        //this.physics.collide(playerBody_mc, rocks_g);
        this.physics.overlap(playerBody_mc, particles_g, collectParticle, null, this);
        this.physics.overlap(vacuum_mc, particles_g, collectParticle, null, this);
        this.physics.overlap(playerBody_mc, rocks_g, this.quitGame, null, this);
            
        /*if (pausedFade_mc)
        {
            paused_txt.visible = false;
            pausedFade_mc.visible = false;
        }*/
            
        if (paused_txt)
        {
            paused_txt.visible = false;
        }
            
        if (endTimer > 0)
        {
            endTimer--;
        }
        
        if (endTimer == 0)
        {
            this.quitGame();
        }
            
        if (tutTimer > 0)
        {
            tutTimer--;
        }
            
        if (limits_txt)
        {
            limits_txt.x = playerBody_mc.x;
            limits_txt.y = playerBody_mc.y - 200 * va.scaleP;

            if ((playerBody_mc.x < 100 * va.scaleP) || (playerBody_mc.y < 100 * va.scaleP)
            || (playerBody_mc.x > this.world.width - 100 * va.scaleP) || (playerBody_mc.y > this.world.height - 100 * va.scaleP))
            {
                limits_txt.visible = true;
            }
            else
            {
                limits_txt.visible = false;
            }
        }
            
        }

	},

	quitGame: function (pointer) {

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.

		//	Then let's go back to the main menu.
        if (planet_mc.visible != true)
        {
            dead_snd.play();
        }
        else
        {
            collect_snd.play();
        }
        
        if (extraLives > 0)
        {
            playerBody_mc.x = this.world.centerX;
            playerBody_mc.y = this.world.centerY;
            playerBody_mc.body.velocity.x = 0;
            playerBody_mc.body.velocity.y = 0;
            playerHand_mc.x = this.world.centerX - 70 * va.scaleP;
            playerHand_mc.y = this.world.centerY;
            playerHand_mc.body.velocity.y = 0;
            playerHand_mc.body.velocity.x = 0;
            playerLeftFoot_mc.x = this.world.centerX - 25 * va.scaleP;
            playerLeftFoot_mc.y = this.world.centerY + 100 * va.scaleP;
            playerLeftFoot_mc.body.velocity.x = 0;
            playerLeftFoot_mc.body.velocity.y = 0;
            playerRightFoot_mc.x = this.world.centerX + 25 * va.scaleP;
            playerRightFoot_mc.y = this.world.centerY + 100 * va.scaleP;
            playerRightFoot_mc.body.velocity.x = 0;
            playerRightFoot_mc.body.velocity.y = 0;
            vacuum_mc.x = this.world.centerX + 100 * va.scaleP;
            vacuum_mc.y = this.world.centerY;
            vacuum_mc.body.velocity.x = 0;
            vacuum_mc.body.velocity.y = 0;
            vacuum_mc.angle = 0;
            
            for (mr = rocks_g.length - 1; mr >= 0; mr--)
            {
                if (rocks_g.getAt(mr).inCamera)
                {
                    randomPosition2(rocks_g.getAt(mr), this, playerBody_mc);
                }
            }
            
            text_hud.setText("Second Chance!");
            text_hud.x = playerBody_mc.x + this.rnd.integerInRange(-200 * va.scaleP, 200 * va.scaleP);
            text_hud.y = playerBody_mc.y + this.rnd.integerInRange(-200 * va.scaleP, 200 * va.scaleP);
            text_hud.alpha = 1;

            powerup_mc.visible = false;
            extraLives--;
        }
        else
        {
            gameOver = true;
            shutDownGame();
            //PLAY SOUND HERE
            this.camera.follow(null);
            //this.camera.x = this.world.centerX;
            //this.camera.y = this.world.centerY;
		    this.game.state.start('GameOver');
        }
	}
    
};

function collectParticle(player, thatParticle) {
    moveParticle(thatParticle, playerBody_mc);
    thatParticle.angle = this.rnd.integerInRange(0, 360);
    collectedEnergy++;
    energyPercent = Math.round((collectedEnergy / maxEnergy) * 100);
    collect_snd.play();
    flash_mc.alpha = 1;
    flash_mc.visible = true;
    buildAWorld(this);
    text_hud.setText("Energy: " + energyPercent + "%");
    if (energyPercent == 50)
    {
        text_hud.setText("Extra Life! " + energyPercent + "%");
        powerup_mc.visible = true;
        extraLives++;
    }
    text_hud.x = playerBody_mc.x + this.rnd.integerInRange(-200 * va.scaleP, 200 * va.scaleP);
    text_hud.y = playerBody_mc.y + this.rnd.integerInRange(-200 * va.scaleP, 200 * va.scaleP);
    text_hud.alpha = 1;
}

function buildAWorld(game) {
    switch (energyPercent)
    {
        case 2:
        stars.alpha = 1;
        break;
            
        case 4:
        playerLeftFoot_mc.loadTexture('vacuumGuyLeftFoot2');
        break;
        
        case 6:
        playerHand_mc.loadTexture('vacuumGuyHand2');
        break;
        
        case 10:
        playerRightFoot_mc.loadTexture('vacuumGuyRightFoot2');
        break;
            
        case 14:
        playerBody_mc.loadTexture('vacuumGuyBody2');
        break;
        
        case 18:
        changeRocks1(game);
        break;
        
        case 22:
        background.loadTexture('background2');
        break;
        
        case 28:
        vacuum_mc.loadTexture('vacuumGuyVacuum2');
        break;
            
        case 36:
        background.loadTexture('background3');
        break;
            
        case 40:
        playerRightFoot_mc.loadTexture('vacuumGuyRightFoot3');
        break;
            
        case 46:
        playerHand_mc.loadTexture('vacuumGuyHand3');
        break;
            
        case 50:
        background.loadTexture('background4');
        break;
            
        case 58:
        changeRocks2(game);
        break;
        
        case 64:
        playerLeftFoot_mc.loadTexture('vacuumGuyLeftFoot3');
        break;
        
        case 72:
        vacuum_mc.loadTexture('vacuumGuyVacuum3');
        break;
            
        case 78:
        playerBody_mc.loadTexture('vacuumGuyBody3');
        break;
            
        case 84:
        background.loadTexture('background5');
        break;
        
        case 100:
        planet_mc.visible = true;
        planet_mc.x = playerBody_mc.x;
        planet_mc.y = playerBody_mc.y;
        win_snd.play();
        endTimer = 500;
        break;
            
        default:
        
        break;
    }
}

function changeRocks1 (game) {
    for (tr = rocks_g.length - 1; tr >= 0; tr--)
    {
        rocks_g.getAt(tr).loadTexture('rock2');
    }
}

function changeRocks2 (game) {
    for (tr = rocks_g.length - 1; tr >= 0; tr--)
    {
        rocks_g.getAt(tr).loadTexture('rock3');
    }
}

function pauseGame() { //PAUSES THE GAME
    if (paused_txt)
    {
    paused_txt.visible = true;
    paused_txt.x = playerBody_mc.x;
    paused_txt.y = playerBody_mc.y + 200 * va.scaleP;
    }
    /*pausedFade_mc.visible = true;
    pausedFade_mc.alpha = 0.5;
    pausedFade_mc.x = playerBody_mc.x;
    pausedFade_mc.y = playerBody_mc.y;*/
    thisGame.paused = true;
}

/*function loseFocus() {
     music.volume = 0;
    //pp = music.pausedTime;
}

function gainFocus() {
    music.volume = 1;
   // music.loop = true;
   // music.play(music.currentMarker, 0, 1, true);
}*/

function shutDownGame() { //REMOVES ALL OBJECTS
    //PLAYER
    if (playerBody_mc)
    {
        playerBody_mc.destroy();
        playerBody_mc = null;
    }
    if (playerHand_mc)
    {
        playerHand_mc.destroy();
        playerHand_mc = null;
    }
    if (playerRightFoot_mc)
    {
        playerRightFoot_mc.destroy();
        playerRightFoot_mc = null;
    }
    if (playerLeftFoot_mc)
    {
        playerLeftFoot_mc.destroy();
        playerLeftFoot_mc = null;
    }
    if (vacuum_mc)
    {
        vacuum_mc.destroy();
        vacuum_mc = null;
    }
    
    //GROUPS
    if (rocks_g)
    {
        rocks_g.destroy();
        rocks_g = null;
    }
    
    if (particles_g)
    {
        particles_g.destroy();
        particles_g = null;
    }
    
    //MISC
    if (stars)
    {
        stars.destroy();
        stars = null;
    }
    if (background)
    {
        background.destroy();
        background = null;
    }
    if (planet_mc)
    {
        planet_mc.destroy();
        planet_mc = null;
    }
    if (flash_mc)
    {
        flash_mc.destroy();
        flash_mc = null;
    }
    if (text_hud)
    {
        text_hud = null;
    }
    if (textInstructions)
    {
        textInstructions = null;
    }
    if (paused_txt)
    {
        paused_txt = null;
    }
    if (pausedFade_mc)
    {
        pausedFade_mc.destroy();
        pausedFade_mc = null;
    }
    if (indicator_mc)
    {
        indicator_mc.destroy();
        indicator_mc = null;
    }
    if (limits_txt)
    {
        limits_txt = null;
    }
    if (muteButton)
    {
        muteButton.destroy();
        muteButton = null;
    }
    if (quitButton)
    {
        quitButton.destroy();
        quitButton = null;
    }
    if (rIndicator_mc)
    {
        rIndicator_mc.destroy();
        rIndicator_mc = null;
    }
    if (powerup_mc)
    {
        powerup_mc.destroy();
        powerup_mc = null;
    }
    
    //thisGame.game.onPause.remove(loseFocus, thisGame);
   //thisGame.game.onResume.remove(gainFocus, thisGame);

}

function randomRotation() {
    rr = thisGame.rnd.integerInRange(1, 5);
    
    if (rr == 1)
    {
        return 0;
    }
    else if (rr == 2)
    {
        return 90;
    }
    else if (rr == 3)
    {
        return 180;
    }
    else
    {
        return 270;
    }
}

function randomSpeed() {
    tempP = thisGame.rnd.integerInRange(1, 3);
    
    if (tempP == 1)
    {
        return thisGame.rnd.integerInRange(60 * va.scaleP, 120 * va.scaleP);
    }
    else
    {
        return (thisGame.rnd.integerInRange(-120 * va.scaleP, -60 * va.scaleP));
    }
}

function randomPosition(rock, game, playerBod) {
    if (playerBod != null)
    {
        
    tempP = game.rnd.integerInRange(1, 3);
        
    if (tempP == 1)
    {
        //ABOVE
        if (playerBod.y < 500 * va.scaleP)
        {
            rock.y = game.rnd.integerInRange(playerBod.y + 500 * va.scaleP, game.world.height);
        }
        else
        {
            rock.y = game.rnd.integerInRange(0, playerBod.y - 500 * va.scaleP);
        }
    }
    else
    {
        //BELOW
        if (playerBod.y > game.world.height - 500 * va.scaleP)
        {
            rock.y = game.rnd.integerInRange(0, playerBod.y - 500 * va.scaleP);
        }
        else
        {
            rock.y = game.rnd.integerInRange(playerBod.y + 500 * va.scaleP, game.world.height);
        }

    }
    
    tempP = game.rnd.integerInRange(1, 3);
    
    if (tempP == 1)
    {
        //LEFT
        if (playerBod.x < 500 * va.scaleP)
        {
            rock.x = game.rnd.integerInRange(playerBod.x + 500 * va.scaleP, game.world.width);
        }
        else
        {
            rock.x = game.rnd.integerInRange(0, playerBod.x - 500 * va.scaleP);
        }
    }
    else
    {
        //RIGHT
        if (playerBod.x > game.world.width - 500 * va.scaleP)
        {
            rock.x = game.rnd.integerInRange(0, playerBod.x - 500 * va.scaleP);
        }
        else
        {
            rock.x = game.rnd.integerInRange(playerBod.x + 500 * va.scaleP, game.world.width);
        }

    }

    }
}

function randomPosition2(rock, game, playerBod) {
    if (playerBod != null)
    {
        
    tempP = game.rnd.integerInRange(1, 3);
        
    if (tempP == 1)
    {
        //ABOVE
        rock.y = game.rnd.integerInRange(playerBod.y - 1000 * va.scaleP, playerBod.y - 500 * va.scaleP);
    }
    else
    {
        //BELOW
        rock.y = game.rnd.integerInRange(playerBod.y + 500 * va.scaleP, playerBod.y + 1000 * va.scaleP);
    }
    
    tempP = game.rnd.integerInRange(1, 3);
    
    if (tempP == 1)
    {
        rock.x = game.rnd.integerInRange(playerBod.x - 1000 * va.scaleP, playerBod.x - 500 * va.scaleP);
    }
    else
    {
        rock.x = game.rnd.integerInRange(playerBod.x + 500 * va.scaleP, playerBod.x + 1000 * va.scaleP);
    }

    }
}


function moveParticle(part, playerBod) {
    part.x = thisGame.rnd.integerInRange(playerBod.x - 2500 * va.scaleP, playerBod.x + 2500 * va.scaleP);
    part.y = thisGame.rnd.integerInRange(playerBod.y - 2500 * va.scaleP, playerBod.y + 2500 * va.scaleP);
    
    if ((part.x < 0) || (part.x > thisGame.world.width)
    || (part.y < 0) || (part.y > thisGame.world.height))
    {
        part.x = thisGame.rnd.integerInRange(0, thisGame.world.width);
        part.y = thisGame.rnd.integerInRange(0, thisGame.world.height);
    }
}

function quitToMenu () {
    dead_snd.play();
    gameOver = true;
    shutDownGame();
    //PLAY SOUND HERE
    this.camera.follow(null);
    //this.camera.x = this.world.centerX;
    //this.camera.y = this.world.centerY;
    this.game.state.start('GameOver');
}