var TopDownGame = TopDownGame || {};

TopDownGame.world = function (game) {};

TopDownGame.world.prototype = {
    
    init: function(targetTilemap, targetX, targetY){
        this.targetX = parseInt(targetX);
        this.targetY = parseInt(targetY);
        this.bool = false;
        this.game.renderer.renderSession.roundPixels = true;
    },

    create: function (){
        
        this.map = this.game.add.tilemap('world');
    //erster Parameter ist der in Tile festgelegte, zweiter der key den wir in preload festelegt haben für tiles.png
        this.map.addTilesetImage('terrain', 'tilesTerrain');
        this.map.addTilesetImage('water', 'tilesWater');
        this.map.addTilesetImage('fireplace', 'tilesFire');
        this.map.addTilesetImage('outside', 'tilesOutside');
        this.map.addTilesetImage('castle', 'tilesCastle');
        this.map.addTilesetImage('house', 'tilesHouse');
        this.map.addTilesetImage('inside', 'tilesInside');
    
    //create layer
    
    this.blockedwaterlayer = this.map.createLayer('blockedwaterlayer');
    this.waterlayer = this.map.createLayer('waterlayer');
    this.backgroundlayer = this.map.createLayer('backgroundlayer2');
    this.backgroundlayer1 = this.map.createLayer('backgroundlayer1');
    this.blockedlayer2 = this.map.createLayer('blockedlayer2');
    this.backgroundlayer0 = this.map.createLayer('backgroundlayer0');
   // this.blockedlayer2 = this.map.createLayer('blockedlayer2');
    this.blockedlayer1 = this.map.createLayer('blockedlayer1');
    this.blockedlayer0 = this.map.createLayer('blockedlayer0');
    this.firelayer = this.map.createLayer('firelayer');
    this.map.plus.animation.enable();
            
        
        
    //kollision with blockedLayer
    // 1, 2000 = index range for included tiles
    this.map.setCollisionBetween(1000, 2000, true, 'blockedwaterlayer')
    this.map.setCollisionBetween(0, 10000, true, 'blockedlayer0');
    this.map.setCollisionBetween(0, 10000, true, 'blockedlayer1');
    this.map.setCollisionBetween(0, 10000, true, 'blockedlayer2');
        
    //world größe anpasssen auf die von map
    this.backgroundlayer.resizeWorld();
    
        
    createItems(this.map);
    createDoors(this.map);
    showNPCs(this.map);
//    this.createItems();
        
        
    var result = findObjectsByType('playerStart', this.map, 'objectslayer')
    if(TopDownGame.housesEntered == 0){
    this.player = this.game.add.sprite(result[0].x, result[0].y, 'chara2')
    }else{
        this.player = this.game.add.sprite(this.targetX, this.targetY, 'chara2')
    }
    this.player.frame = 51;
    var frame = 51;
    this.player.animations.add('walkDown', [frame + 0,frame + 1,frame + 2], 9, false);
    this.player.animations.add('walkUp', [frame + 36,frame + 37,frame + 38], 9, false);
    this.player.animations.add('walkRight', [frame + 24,frame + 25,frame + 26], 9, false);
    this.player.animations.add('walkLeft', [frame + 12,frame + 13,frame + 14], 9, false);
    this.pOldY = this.player.y;
    this.pOldX = this.player.x;
     
    this.tunnelayer = this.map.createLayer('tunnellayer');    
    this.game.physics.enable([this.player], Phaser.Physics.ARCADE);
        
    this.player.body.setSize(11 , 10, 9, 27);
        

        
    this.map.smoothed = false;    
    this.game.physics.arcade.enable(this.player);
     
       
        
    //camera follows player
    this.game.camera.follow(this.player);
    readPaths(this.map);
 
    //wsad for player control
    this.cursors = this.game.input.keyboard.createCursorKeys();
        
        
    this.tipsBool = false;
        
    this.counter = [];   
    this.bool = [];
    this.load.crossOrigin = 'anonymous';
    this.pi = 0;

    if(TopDownGame.housesEntered == 0){
        var sprite1 = TopDownGame.game.add.sprite(this.player.x + 40,this.player.y,"controls2");
        sprite1.anchor.set(0.5,0.5);
        sprite1.inputEnabled = true;
        that = this
        sprite1.events.onInputDown.add(function(){
            sprite1.destroy();
            var sprite = TopDownGame.game.add.sprite(that.player.x,that.player.y,"controls");
            sprite.anchor.set(0.5,0.5);
            sprite.inputEnabled = true;
            sprite.events.onInputDown.add(function(){
                sprite.destroy();
                var controls = TopDownGame.game.add.sprite(that.player.x,that.player.y,"tips");
                controls.anchor.set(0.5,0.5);
                controls.inputEnabled = true;
                that.tipsSprites = that.game.add.group();
                that.spriteTall = that.tipsSprites.create(controls.x - 180, controls.y - 80, spritePNGArray[0])
                that.spriteTall.frame = 1;
                that.spriteTall.scale.setTo(1, 1.2);
                that.spriteLarge = that.tipsSprites.create(controls.x - 60, controls.y - 80, spritePNGArray[0])
                that.spriteLarge.frame = 1;
                that.spriteLarge.scale.setTo(1.2, 1.1);
                that.spriteAgile = that.tipsSprites.create(controls.x + 60, controls.y - 80, spritePNGArray[0])
                that.spriteAgile.frame = 1;
                that.spriteEnergetic = that.tipsSprites.create(controls.x + 180, controls.y - 80, spritePNGArray[0])
                that.spriteEnergetic.frame = 1;
                var cy = controls.y - 80;
                var cy2 = controls.y + 70;
                that.tipsMovement = [];
                var distance = Math.sqrt(Math.pow(0, 2) + Math.pow(cy2 - cy, 2));
                var progress = 1/ distance * 0.5;
                for(var j = 0; j <= 1; j += progress){
                var py = cy + (cy2 - cy) * j;
                that.tipsMovement.push({y: py});
                }
                that.tipsSprites.callAll('animations.add', 'animations', 'walkDown', [1 - 1,1,1 + 1], 9, false)
                that.tipsSprites.callAll('animations.add', 'animations', 'walkUp', [1 + 35,1 + 36,1 + 37], 9, false)
                that.tipsBool = true;
                controls.events.onInputDown.add(function(){
                    that.tipsSprites.destroy();
                    controls.destroy();
                    that.tipsBool = false;
                });
            });
        });
        this.music = TopDownGame.game.add.audio('fantasyRPG');
        this.music.loop = true;
        this.music.play();
    }
    
        
    },
    
    
    update: function() {
        //player walk animation
        if(this.player.y > this.pOldY){
            this.player.play('walkDown');
            this.pOldY = this.player.y;
        }else if(this.player.y < this.pOldY){
            this.player.play('walkUp');
            this.pOldY = this.player.y;
        }else if(this.player.x > this.pOldX){
            this.player.play('walkRight');
            this.pOldX = this.player.x;
        }else if(this.player.x < this.pOldX){
            this.player.play('walkLeft');
            this.pOldX = this.player.x;
        }
        
        objectsFound(this);
        if(that.tipsBool){
            if(this.i == null){
                this.i = 0;
                this.iAgile = 0;
                this.tipPathBool = false;
                this.agileTipPathBool = false;
                that.spriteEnergetic.oldX = that.spriteEnergetic.x;
            }
            var energeticTips = Math.random() < 0.5 ? -0.7 : 0.7;;
            that.spriteLarge.oldY = that.spriteLarge.y;
            that.spriteAgile.oldY = that.spriteAgile.y;
            that.spriteLarge.y = that.tipsMovement[this.i].y;
            that.spriteTall.y = that.spriteLarge.y;
            that.spriteEnergetic.y = that.spriteLarge.y;
            that.spriteEnergetic.x = that.spriteEnergetic.oldX + energeticTips;
            that.spriteAgile.y = that.tipsMovement[this.iAgile].y;
            if(this.i < (that.tipsMovement.length - 3) && !this.tipPathBool){
                this.i += 1;
            }else if(this.i >= that.tipsMovement.length - 3 || this.tipPathBool){
                    this.tipPathBool = true;
                    this.i -= 1;
                    if(this.i == 0){
                        this.tipPathBool = false;
                    }
            }
            if(this.iAgile < (that.tipsMovement.length - 3) && !this.agileTipPathBool){
                this.iAgile += 2;
            }else if(this.iAgile >= that.tipsMovement.length - 3 || this.agileTipPathBool){
                    this.agileTipPathBool = true;
                    this.iAgile -= 2;
                    if(this.iAgile == 0){
                        this.agileTipPathBool = false;
                    }
            }
            if(that.spriteLarge.y > that.spriteLarge.oldY + 0.2){
                    that.spriteLarge.play('walkDown');
                    that.spriteTall.play('walkDown');
                    that.spriteEnergetic.play('walkDown');
            }else if(that.spriteLarge.y < that.spriteLarge.oldY - 0.2){
                    that.spriteLarge.play('walkUp');
                    that.spriteTall.play('walkUp');
                    that.spriteEnergetic.play('walkUp');
            }
            if(that.spriteAgile.y > that.spriteAgile.oldY + 0.2){
                    that.spriteAgile.play('walkDown');
            }else if(that.spriteAgile.y < that.spriteAgile.oldY - 0.2){
                    that.spriteAgile.play('walkUp');
            }
        }
        
 //       console.log(npcMovement.nearby)
        if(npcMovement.nearby.length > 0 /*&& !dialog.npcContact*/){ 
            for(j = 0; j < npcMovement.nearby.length; j++){
                if(this.counter[j] == null){
                    this.counter[j] = new Array();
                    this.counter[j] = 0;
                }
                if(this.bool[j] == null){
                    this.bool[j] = false;
                }
                var p = npcMovement.pathIndex[j];
                var i = npcMovement.nearby[j];
                if(npcMovement.npcSprites[i].agile){
                        var agile = 2;
                    }else{
                        var agile = 1;
                    }
                if(npcMovement.npcSprites[i].energetic){
                        var energetic = Math.random() < 0.5 ? -0.7 : 0.7;;
                    }else{
                        var energetic = 0;
                    }
                
                this.pi = npcMovement.startPoint[j] + this.counter[j];
                npcMovement.npcSprites[i].position.x = npcMovement.path[p][this.pi].x;
                npcMovement.npcSprites[i].position.y = npcMovement.path[p][this.pi].y - this.map.tileHeight * 3; 
                
                
                //npc walk animation
                if(npcMovement.npcSprites[i].position.y > npcMovement.npcSprites[i].oldY + 0.2){
                    npcMovement.npcSprites[i].position.x += energetic;
                    npcMovement.npcSprites[i].play('walkDown');
                }else if(npcMovement.npcSprites[i].position.y < npcMovement.npcSprites[i].oldY - 0.2){
                    npcMovement.npcSprites[i].position.x += energetic;
                    npcMovement.npcSprites[i].play('walkUp');
                }else if(npcMovement.npcSprites[i].position.x > npcMovement.npcSprites[i].oldX + 0.2){
                    npcMovement.npcSprites[i].play('walkRight');
                }else if(npcMovement.npcSprites[i].position.x < npcMovement.npcSprites[i].oldX - 0.2){
                    npcMovement.npcSprites[i].play('walkLeft');
                }
                
                npcMovement.npcSprites[i].oldX = npcMovement.npcSprites[i].position.x;
                npcMovement.npcSprites[i].oldY = npcMovement.npcSprites[i].position.y;
                
                
                if(this.pi < (npcMovement.path[p].length - 3) && !this.bool[j]){
                    if(dialog.personIdx != i){
                        this.counter[j] += 1 * agile;
                    }                    
                }else if(this.pi >= npcMovement.path[p].length - 3 || this.bool[j]){
                    if(dialog.personIdx != i){
                        this.bool[j] = true;
                        this.counter[j] -= 1* agile;
                        if(this.counter[j] == 0){
                            this.bool[j] = false;
                        }
                    } 
                } 
            }
            
        }
        //collision
        this.game.physics.arcade.collide(this.player, this.blockedlayer2);
        this.game.physics.arcade.collide(this.player, this.blockedlayer1);
        this.game.physics.arcade.collide(this.player, this.blockedlayer0);
        this.game.physics.arcade.collide(this.player, this.blockedwaterlayer);
        
        this.game.physics.arcade.overlap(this.player, TopDownGame.items, collect, null, this);
        
      //  this.game.physics.arcade.overlap(this.player, TopDownGame.doors, enterDoor, null, this);
        
        if(!TopDownGame.collide){
            this.game.physics.arcade.collide(this.player, TopDownGame.npcs, testMessageBox, null, this.player);  
        }else{
            this.game.physics.arcade.collide(this.player, TopDownGame.npcs);
            var py = Math.floor(this.player.y)
            var px = Math.floor(this.player.x)
            var ny = Math.floor(npcMovement.npcSprites[dialog.npcNumber].position.y)
            var nx = Math.floor(npcMovement.npcSprites[dialog.npcNumber].position.x)
            if(py - 20 > ny){
                npcMovement.npcSprites[dialog.npcNumber].frame = npcMovement.npcSprites[dialog.npcNumber].frontFrame;
            }else if(py + 20 < ny){
                npcMovement.npcSprites[dialog.npcNumber].frame = npcMovement.npcSprites[dialog.npcNumber].backFrame;
            }else if(px - 18 > nx){
                npcMovement.npcSprites[dialog.npcNumber].frame = npcMovement.npcSprites[dialog.npcNumber].rightFrame;
            }else{
                npcMovement.npcSprites[dialog.npcNumber].frame = npcMovement.npcSprites[dialog.npcNumber].leftFrame;
            }
            
            //npcMovement.npcSprites[dialog.npcNumber].play('talk');
            if(this.player.x - npcMovement.npcSprites[dialog.npcNumber].position.x > 25 ||  this.player.x - npcMovement.npcSprites[dialog.npcNumber].position.x < -25 || this.player.y - npcMovement.npcSprites[dialog.npcNumber].position.y > 30 || this.player.y - npcMovement.npcSprites[dialog.npcNumber].position.y < -35 || this.map.key != TopDownGame.npcPositions[dialog.npcNumber].map){
            dialog.npcContact = false;
            hideBox();

        }
        }
        
        //this.game.physics.arcade.overlap(this.player, TopDownGame.doors, this.enterDoor, null, this);
        
        //player move
        this.player.body.velocity.x = 0;
        
        if(this.cursors.up.isDown) {
            if(this.player.body.velocity.y == 0)
                this.player.body.velocity.y -= 100;
        }
        else if(this.cursors.down.isDown) {
        if(this.player.body.velocity.y == 0)
        this.player.body.velocity.y += 100;
        }
        else {
          this.player.body.velocity.y = 0;
        }
        if(this.cursors.left.isDown) {
          this.player.body.velocity.x -= 100;
        }
        else if(this.cursors.right.isDown) {
          this.player.body.velocity.x += 100;
        }
    },
/*    enterDoor: function(player, door) {
        console.log('entered door, it will take you to '+door.targetTilemap+' on x:'+door.targetX+' and y:'+door.targetY);
        this.state.start("house01");
    },
    */
};