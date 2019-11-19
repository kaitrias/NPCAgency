//git canutils python3

var dialog = dialog || {};
var npcGenerate = {};
var npcMovement = {};
var objCounter = 0;
dialog.personIdx = null;

function createItems(map){
    //create items
    TopDownGame.items = TopDownGame.game.add.group();
    TopDownGame.items.enableBody = true;
    var item;
    result = this.findObjectsByType('item', map, 'objectslayer');
    result.forEach(function(element){
        this.createFromTiledObject(element, TopDownGame.items);
    }, this);
}

function createNpcs(map){
    //create items
    TopDownGame.npcs = TopDownGame.game.add.group();
    TopDownGame.npcs.enableBody = true;    
    var npc;
    result = this.findObjectsByType('npc', map, 'objectslayer');
    result.forEach(function(element){
        this.createFromTiledObject(element, TopDownGame.npcs);
    }, this);
}

function showNPCs(currentMap){
    npcMovement.npcSprites = [];
    TopDownGame.npcs = TopDownGame.game.add.group();
    TopDownGame.npcs.enableBody = true;
    //Array, contains current npc position
    TopDownGame.npcPositions = [];
    TopDownGame.npcSpawnPoints.forEach(function(value, index){
        var x = value.xPoint;
        var y = value.yPoint;
        var map = value.map;
        var gender = value.gender;
        var regNo = value.regNo;
        var tall = value.tall;
        var large = value.large;
        var agile = value.agile;
        var energetic = value.energetic;
        var age = TopDownGame.allPersons[index].sprite;
            
        //Contains all sprites
        dialog.sprite = null;
            
        var male = 0;
        var female = 1;
        
        if(gender == "male"){
            gender = male;
            var rnd = Math.floor(Math.random() * ObjectSize(this.spriteArray[regNo][male]));
            var idx = Object.keys(this.spriteArray[regNo][male])[rnd]
        }else{
            gender = female;
            var rnd = Math.floor(Math.random() * ObjectSize(this.spriteArray[regNo][female]));
            var idx = Object.keys(this.spriteArray[regNo][female])[rnd]
        }
        
        var rnd = Math.floor(Math.random() * ObjectSize(this.spriteArray[regNo][gender][idx]));   
        var spriteFrame = this.spriteArray[regNo][gender][idx][rnd]
        
            
        dialog.sprite = TopDownGame.npcs.create(x, y, spritePNGArray[idx]);
        dialog.sprite.frame = spriteFrame;
        dialog.sprite.frontFrame = spriteFrame;
        dialog.sprite.leftFrame = spriteFrame + 12;
        dialog.sprite.rightFrame = spriteFrame + 24;
        dialog.sprite.backFrame = spriteFrame + 36;
        dialog.sprite['number'] = index; 
        if(tall > 50){
            dialog.sprite.scale.setTo(1, 1.2);
        }
        if(large > 50){
            dialog.sprite.scale.setTo(1.2, 1.1)
        }
        if(agile > 50){
           dialog.sprite.agile = true;
           }else{
               dialog.sprite.agile = false;
           }
        if(energetic > 50){
            dialog.sprite.energetic = true;
        }else{
            dialog.sprite.energetic = false;
        }
        dialog.sprite.animations.add('walkDown', [spriteFrame - 1,spriteFrame,spriteFrame + 1], 9, false);
        dialog.sprite.animations.add('walkUp', [spriteFrame + 35,spriteFrame + 36,spriteFrame + 37], 9, false);
        dialog.sprite.animations.add('walkRight', [spriteFrame + 23,spriteFrame + 24,spriteFrame + 25], 9, false);
        dialog.sprite.animations.add('walkLeft', [spriteFrame + 11,spriteFrame + 12,spriteFrame + 13], 9, false);
        dialog.sprite.animations.add('talk', [spriteFrame,spriteFrame,spriteFrame], 9, false);
        dialog.sprite.oldX = x;
        dialog.sprite.oldY = y;
        dialog.sprite.body.setSize(20 , 40, 4, 7);
        npcMovement.npcSprites.push(dialog.sprite)
        TopDownGame.npcPositions[index] = {map: map, x: x, y: y };
        
    })
    TopDownGame.npcs.setAll('body.immovable', true);

}

function createDoors(map){
    TopDownGame.doors = TopDownGame.game.add.group();
    TopDownGame.doors.enableBody = true;
    result = this.findObjectsByType('door', map, 'objectslayer');
    result.forEach(function(element){
        this.createFromTiledObject(element, TopDownGame.doors);
    }, this);
}

function findObjectsByType(type, map, layer){
    var result = new Array();
    map.objects[layer].forEach(function(element){
        if(element.properties.type === type){
                //Phaser top left, TILED bottom left. Convert here
            element.y -= map.tileHeight;
            result.push(element);
        }
    });
    return result;
}

function createFromTiledObject(element, group){
    var sprite = group.create(element.x, element.y, element.properties.sprite);
        
    //copy properties to sprites
    Object.keys(element.properties).forEach(function(key){
        sprite[key] = element.properties[key];
    });
}


function collect(player, collectable) {
    collectable.destroy();
    
}

function enterDoor(player, door) {
//    this.state.start(door.targetTilemap, true, false, door.targetX, door.targetY);
    if(door.targetTilemap == 'world'){
        this.state.start("world", true, false, door.targetTilemap, door.targetX, door.targetY);  
    }else{
        this.state.start("house01", true, false, door.targetTilemap, door.targetX, door.targetY) 
    }

}


function testMessageBox(player,  npc){
    //true if player hits npc
    dialog.npcContact = true;
    TopDownGame.collide = true;
    //Nummer von aktuell dialog npc
    dialog.npcNumber = npc.number;
    dialog.intro = true;
    
    
    if(TopDownGame.relationship[dialog.npcNumber] == null){
        TopDownGame.relationship[dialog.npcNumber] = 0;            
    }
    getInfo(npc.number, player);

}

function getInfo(npcNumber, player){   
    this.player = player;
    this.person = allPersons[npcNumber]
    dialog.personIdx = npcNumber;
    
    this.spriteAdder;
    this.spriteAddNumber = npcNumber;
    if(this.player.x < npcMovement.npcSprites[npcNumber].position.x - 10){
        npcMovement.npcSprites[npcNumber].frame += 12;
        this.spriteAdder = 12;
    }else if(this.player.x > npcMovement.npcSprites[npcNumber].position.x + 10){
        npcMovement.npcSprites[npcNumber].frame += 24;
        this.spriteAdder = 24;
    }else if(this.player.y < npcMovement.npcSprites[npcNumber].position.y + 8){
        npcMovement.npcSprites[npcNumber].frame += 36;
        this.spriteAdder = 36;
    }
    
    
    showMessageBox();
}

function showMessageBox(npcText, oNpcName, npcNumber, w = 500, h = 105){
    that = this;
    	//destroy it
        if (this.msgBox) {
            this.msgBox.destroy();
        }
    
        if(this.wheelGroup){
            this.wheelGroup.destroy();
        }
            
        if(this.questionmark){
            this.questionmark.destroy();
        }
        //make a group to hold all the elements
        var msgBox = TopDownGame.game.add.group();
        //make a group to hold all questions which are available
        var questionGroup = TopDownGame.game.add.group();
        //make a group to hold all questions which are not available due to relationship to low
        var disabledGroup = TopDownGame.game.add.group();
    
        var wheelGroup = TopDownGame.game.add.group();

        var wheel = TopDownGame.game.add.sprite(0,0, 'dialogWheelWheel');
        wheel.x = 15 + TopDownGame.game.camera.x;
        wheel.y = 10 + TopDownGame.game.camera.y;
        wheelGroup.add(wheel);
    
        
        //shows sprite of npc in middle of wheel
        var key = npcMovement.npcSprites[this.person.index].key
        var spriteFrame = npcMovement.npcSprites[this.person.index].frontFrame
        //var wheelSprite = TopDownGame.game.add.sprite(100, 200, npcMovement.npcSprites[this.person.index].generateTexture());
        var wheelSprite = TopDownGame.game.add.sprite(0, 0, key)
        wheelSprite.frame = spriteFrame;
        wheelSprite.x = wheel.x + wheel.width / 2 - wheelSprite.width + 3 ;
        wheelSprite.y = wheel.y + wheel.height / 2 - wheelSprite.height ;
        wheelSprite.scale.setTo(1.7, 1.7)
        wheelGroup.add(wheelSprite);
    
        var dialogBox2 = TopDownGame.game.add.sprite(0,0, 'dialogBox2');
        dialogBox2.x = 15 + TopDownGame.game.width - dialogBox2.width - 30 + TopDownGame.game.camera.x;
        dialogBox2.y = 70 + TopDownGame.game.camera.y;
        npcName2 = TopDownGame.game.add.bitmapText(0, 0, 'mid', this.person.firstName + ':', 20);
        npcName2.x = dialogBox2.x + 5;
        npcName2.y = dialogBox2.y + 5;
        wheelGroup.add(dialogBox2);
        wheelGroup.add(npcName2)
    
        //ERSTES TREFFEN, first + last name
        if(dialog.intro && !this.person.metBefore){ 
            var npcText = this.person.dialog[0].line;
        };
    
        //ERSTER SATZ. Wenn bekannt, dann greeting
        if(dialog.intro && this.person.metBefore){
            var npcText = this.person.dialog[1].line;
        };

        //ANTWORT
        var text = TopDownGame.game.add.bitmapText(0, 0, 'mid', npcText, 20);
        text.x = dialogBox2.x + 5;
        text.y = npcName2.y + npcName2.height + 5;
        text.maxWidth = dialogBox2.width - 8;
        
        wheelGroup.add(text)
    
        var relsh = this.person.dialog.length -3;
        //gerundete Relationship zu aktuellem NPC
        var roundRelationship = Math.round(this.person.relationship);
        dialog.question1 = roundRelationship;
        
        
        wheelSprite.inputEnabled = true;
        wheelSprite.events.onInputOver.add(function(){
            dialogBox2.visible = false;
            text.visible = false;
            npcName2.visible = false;
            this.traitsGroup = TopDownGame.game.add.group();
            this.traits = TopDownGame.game.add.sprite(0,0, 'traitsBox');
            this.traits.x = 15 + TopDownGame.game.width - this.traits.width - 29 + TopDownGame.game.camera.x;
            this.traits.y = 70 + TopDownGame.game.camera.y;
            this.traitsGroup.add(this.traits);
            var traitArray = ["agile", "brave", "diligent", "dirty", "energetic", "gentle", "intelligent", "reliable", "creative", "large", "tall", "muscular"]
            
            var oldtraitTextY = this.traits.y + 30;
            var oldtraitTextHeight = 0;
            
            for(var i in this.person.traitInfo){
                var traitText = TopDownGame.game.add.bitmapText(0,0, 'mid', this.person.traitInfo[i], 20);
                traitText.x = this.traits.x + 15;
                traitText.y = oldtraitTextY + oldtraitTextHeight + 3;
                traitText.maxWidth = dialogBox2.width - 15;
                oldtraitTextHeight = traitText.height;
                oldtraitTextY = traitText.y;
                this.traitsGroup.add(traitText);

            }
            //Comunity traits:
            if(this.person.kinBool){
                var location = this.person.region;
                var social = this.person.social;
                var age = this.person[age];
                if(social == "rich" || social == "commoner"){
                    social = "commoner or rich"
                }else{
                    social = social;
                }
                if(age == "adolescent" || age == "child"){
                    age = "young"
                }else{
                    age = "older"
                }
                this.traitText = TopDownGame.game.add.bitmapText(0,0, 'mid','The ' + this.person.comName + '. Most of them are from ' + location + ', ' + age + ' and ' + social , 20);
                this.traitText.x = this.traits.x + 10;
                this.traitText.y = this.traits.y + 325;
                this.traitText.maxWidth = dialogBox2.width - 8;
                this.traitsGroup.add(this.traitText);     
            }

        });
        wheelSprite.events.onInputOut.add(function(){
        if(typeof this.traits != undefined){
            this.traitsGroup.destroy();
            dialogBox2.visible = true;
            text.visible = true;
            npcName2.visible = true;
        }
        });
    
        this.wheelGroup = wheelGroup;
    
        var texts = [];
        var textsName = [];
    
        //1. Frage her/himself
        if(dialog.intro){
            var wheelHimher = TopDownGame.game.add.sprite(0,0, 'dialogWheelhimself');
            wheelHimher.x = wheel.x;
            wheelHimher.y = wheel.y;
            var wheelHimherX = wheel.width / 2  ;
            var wheelHimherY = wheel.height / 2 - 44;
            wheelHimher.hitArea = new PIXI.Circle(wheelHimherX,wheelHimherY,20);
            wheelHimher.inputEnabled = true;
            wheelHimher.events.onInputOver.add(function(){
                this.questionmark = TopDownGame.game.add.sprite(0,0, 'questionmark');
                this.questionmark.x = wheel.x + wheelHimherX - this.questionmark.width/2;
                this.questionmark.y = wheel.y + wheelHimherY - this.questionmark.height/2;
            });
            wheelHimher.events.onInputOut.add(function(){
                this.questionmark.destroy();
            });
            wheelHimher.events.onInputDown.add(function(){
                clickSelf();
            })
            wheelGroup.add(wheelHimher);
        }
        
        //2. Frage home
        if(!dialog.intro){
            var wheelHome = TopDownGame.game.add.sprite(0,0, 'dialogWheelHome');
            wheelHome.x = wheel.x;
            wheelHome.y = wheel.y;
            var wheelHomeX = wheel.width / 2;
            var wheelHomeY = wheel.height / 2 - 45;
            wheelHome.hitArea = new PIXI.Circle(wheelHomeX,wheelHomeY,20);
            wheelHome.inputEnabled = true;
            wheelHome.events.onInputOver.add(function(){
                this.questionmark = TopDownGame.game.add.sprite(0,0, 'questionmark');
                this.questionmark.x = wheel.x + wheelHomeX - this.questionmark.width/2;
                this.questionmark.y = wheel.y + wheelHomeY - this.questionmark.height/2;
            });
            wheelHome.events.onInputOut.add(function(){
                this.questionmark.destroy();
            });
            wheelHome.events.onInputDown.add(function(){
                clickHome();
            })
            wheelGroup.add(wheelHome);
            
        }
        
        //3. Frage job
        if(!dialog.intro && this.person.relationship >= 1){
            var wheelJob = TopDownGame.game.add.sprite(0,0, 'dialogWheelJob');
                wheelJob.x = wheel.x;
                wheelJob.y = wheel.y;
                var wheelJobX = wheel.width / 2;
                var wheelJobY = wheel.height / 2 + 43;
                wheelJob.hitArea = new PIXI.Circle(wheelJobX, wheelJobY,20);
                wheelJob.inputEnabled = true;
                wheelJob.events.onInputOver.add(function(){
                    this.questionmark = TopDownGame.game.add.sprite(0,0, 'questionmark');
                    this.questionmark.x = wheel.x + wheelJobX - this.questionmark.width/2;
                    this.questionmark.y = wheel.y + wheelJobY - this.questionmark.height/2;
                });
                wheelJob.events.onInputOut.add(function(){
                    this.questionmark.destroy();
                });
                wheelJob.events.onInputDown.add(function(){
                    clickJob();
                })
                wheelGroup.add(wheelJob);

        }
        
        //4. Frage child
        if(!dialog.intro && this.person.relationship >= 2){
            var wheelChild = TopDownGame.game.add.sprite(0,0, 'dialogWheelChildhood');
                wheelChild.x = wheel.x;
                wheelChild.y = wheel.y;
                var wheelChildX = wheel.width / 2 + 27;
                var wheelChildY = wheel.height / 2 - 38;
                wheelChild.hitArea = new PIXI.Circle(wheelChildX,wheelChildY,20);
                wheelChild.inputEnabled = true;
                wheelChild.events.onInputOver.add(function(){
                    this.questionmark = TopDownGame.game.add.sprite(0,0, 'questionmark');
                    this.questionmark.x = wheel.x + wheelChildX - this.questionmark.width/2;
                    this.questionmark.y = wheel.y + wheelChildY - this.questionmark.height/2;
                });
                wheelChild.events.onInputOut.add(function(){
                    this.questionmark.destroy();
                });
                wheelChild.events.onInputDown.add(function(){
                    clickChild();
                })
                wheelGroup.add(wheelChild);

        }
    
        //5.Frage adolescene
        if(!dialog.intro && this.person.relationship >= 3){
            if(this.person.age == "adolscene"|| this.person.age == "young adult"|| this.person.age == "mid-life"|| this.person.age == "elder"){
                var wheelAdolscene = TopDownGame.game.add.sprite(0,0, 'dialogWheelAdolscene');
                wheelAdolscene.x = wheel.x;
                wheelAdolscene.y = wheel.y;
                var wheelAdolX = wheel.width / 2 + 41;
                var wheelAdolY = wheel.height / 2 - 15;
                wheelAdolscene.hitArea = new PIXI.Circle(wheelAdolX,wheelAdolY,20);
                wheelAdolscene.inputEnabled = true;
                wheelAdolscene.events.onInputOver.add(function(){
                    this.questionmark = TopDownGame.game.add.sprite(0,0, 'questionmark');
                    this.questionmark.x = wheel.x + wheelAdolX - this.questionmark.width/2;
                    this.questionmark.y = wheel.y + wheelAdolY - this.questionmark.height/2;
                });
                wheelAdolscene.events.onInputOut.add(function(){
                    this.questionmark.destroy();
                });
                wheelAdolscene.events.onInputDown.add(function(){
                    clickAdolscene();
                })
                wheelGroup.add(wheelAdolscene);

            }
        }
    
        
        //6.Frage young adulthood
        if(!dialog.intro && this.person.relationship >= 4){
            if(this.person.age == "young adult"|| this.person.age == "mid-life"|| this.person.age == "elder"){
                var wheelAdult = TopDownGame.game.add.sprite(0,0, 'dialogWheelAdulthood');
                wheelAdult.x = wheel.x;
                wheelAdult.y = wheel.y;
                var wheelAdultX = wheel.width / 2 + 41;
                var wheelAdultY = wheel.height / 2 + 13;
                wheelAdult.hitArea = new PIXI.Circle(wheelAdultX,wheelAdultY,20);
                wheelAdult.inputEnabled = true;
                wheelAdult.events.onInputOver.add(function(){
                    this.questionmark = TopDownGame.game.add.sprite(0,0, 'questionmark');
                    this.questionmark.x = wheel.x + wheelAdultX - this.questionmark.width/2;
                    this.questionmark.y = wheel.y + wheelAdultY - this.questionmark.height/2;
                });
                wheelAdult.events.onInputOut.add(function(){
                    this.questionmark.destroy();
                });
                wheelAdult.events.onInputDown.add(function(){
                    clickAdult();
                })
                wheelGroup.add(wheelAdult);

            }
        }
    
        //7.Frage young mid life
        if(!dialog.intro && this.person.relationship >= 5){
            if(this.person.age == "mid-life"|| this.person.age == "elder"){
                var wheelMid = TopDownGame.game.add.sprite(0,0, 'dialogWheelMid');
                wheelMid.x = wheel.x;
                wheelMid.y = wheel.y;
                var wheelMidX = wheel.width / 2 - 28;
                var wheelMidY = wheel.height / 2 - 38;
                wheelMid.hitArea = new PIXI.Circle(wheelMidX,wheelMidY,20);
                wheelMid.inputEnabled = true;
                wheelMid.events.onInputOver.add(function(){
                    this.questionmark = TopDownGame.game.add.sprite(0,0, 'questionmark');
                    this.questionmark.x = wheel.x + wheelMidX - this.questionmark.width/2;
                    this.questionmark.y = wheel.y + wheelMidY - this.questionmark.height/2;
                });
                wheelMid.events.onInputOut.add(function(){
                    this.questionmark.destroy();
                });
                wheelMid.events.onInputDown.add(function(){
                    clickMid();
                })
                wheelGroup.add(wheelMid);

            }
        }
    
        //8.Frage young elder
        if(!dialog.intro && this.person.relationship >= 6){
            if(this.person.age == "elder"){
                var wheelElder = TopDownGame.game.add.sprite(0,0, 'dialogWheelElder');
                wheelElder.x = wheel.x;
                wheelElder.y = wheel.y;
                var wheelElderX = wheel.width / 2 - 41;
                var wheelElderY = wheel.height / 2 - 15;
                wheelElder.hitArea = new PIXI.Circle(wheelElderX,wheelElderY,20);
                wheelElder.inputEnabled = true;
                wheelElder.events.onInputOver.add(function(){
                    this.questionmark = TopDownGame.game.add.sprite(0,0, 'questionmark');
                    this.questionmark.x = wheel.x + wheelElderX - this.questionmark.width/2;
                    this.questionmark.y = wheel.y + wheelElderY - this.questionmark.height/2;
                });
                wheelElder.events.onInputOut.add(function(){
                    this.questionmark.destroy();
                });
                wheelElder.events.onInputDown.add(function(){
                    clickElder();
                })
                wheelGroup.add(wheelElder);

            }
        }
    
        //9.Frage others
        if(!dialog.intro && this.person.dialog[this.person.dialog.length - 1].line.length > 0 && this.person.relationship >= 2){
            if(oNpcName == null){
                var wheelOthers = TopDownGame.game.add.sprite(0,0, 'dialogWheelOthers');
                var correctur = 0;
            }else{
                var wheelOthers = TopDownGame.game.add.sprite(0,0, 'dialogWheelOthers2');
                var correctur = 10;
            }
            
                wheelOthers.x = wheel.x;
                wheelOthers.y = wheel.y - correctur;
                var wheelOthersX = wheel.width / 2 - 27;
                var wheelOthersY = wheel.height / 2 + 36 - correctur;
                wheelOthers.hitArea = new PIXI.Circle(wheelOthersX,wheelOthersY + correctur,20);
                wheelOthers.inputEnabled = true;
                wheelOthers.events.onInputOver.add(function(){
                    this.questionmark = TopDownGame.game.add.sprite(0,0, 'questionmark');
                    this.questionmark.x = wheel.x + wheelOthersX - this.questionmark.width/2;
                    this.questionmark.y = wheel.y + wheelOthersY - this.questionmark.height/2;
                });
                wheelOthers.events.onInputOut.add(function(){
                    this.questionmark.destroy();
                });
                wheelOthers.events.onInputDown.add(function(){
                    clickOthers();
                })
                wheelGroup.add(wheelOthers);

        }
        
        //10.Frage spezieller Npc
        if(oNpcName != null){
            var oNpc = TopDownGame.game.add.bitmapText(0,0, 'midcopy',oNpcName, 16)
            oNpc.x = wheel.x + wheel.width / 2 - 160;
            oNpc.y = wheel.y + wheel.height / 2 + 39;
            oNpc.tint = 0x00000;
            oNpc.alpha = 0.8
            var questionmark = TopDownGame.game.add.sprite(0,0, 'questionmarkNorm');
            questionmark.x = oNpc.x + oNpc.width + 5;
            questionmark.y = oNpc.y - 3;
            questionmark.inputEnabled = true;
            questionmark.events.onInputOver.add(function(){
                this.questionmark = TopDownGame.game.add.sprite(0,0, 'questionmark');
                this.questionmark.x = questionmark.x;
                this.questionmark.y = questionmark.y;
            });
            questionmark.events.onInputOut.add(function(){
                this.questionmark.destroy();
            });
            questionmark.events.onInputDown.add(function(){
                clickONpc();
            })
            wheelGroup.add(questionmark);
            wheelGroup.add(oNpc);
        }
    
    
        //11.Frage yourself
        if(!dialog.intro){
            var wheelYourself = TopDownGame.game.add.sprite(0,0, 'dialogWheelYourself');
            wheelYourself.x = wheel.x;
            wheelYourself.y = wheel.y;
            var wheelYourselfX = wheel.width / 2 - 41;
            var wheelYourselfY = wheel.height / 2 + 13;
            wheelYourself.hitArea = new PIXI.Circle(wheelYourselfX,wheelYourselfY,20);
            wheelYourself.inputEnabled = true;
            wheelYourself.events.onInputOver.add(function(){
                this.questionmark = TopDownGame.game.add.sprite(0,0, 'questionmark');
                this.questionmark.x = wheel.x + wheelYourselfX - this.questionmark.width/2;
                this.questionmark.y = wheel.y + wheelYourselfY - this.questionmark.height/2;
            });
            wheelYourself.events.onInputOut.add(function(){
                this.questionmark.destroy();
            });
            wheelYourself.events.onInputDown.add(function(){
                clickYourself();
            })
            wheelGroup.add(wheelYourself);
            
        }
    
        //11.Frage yourself
        if(!dialog.intro){
            var wheelKin = TopDownGame.game.add.sprite(0,0, 'dialogWheelKin');
            wheelKin.x = wheel.x;
            wheelKin.y = wheel.y;
            var wheelKinX = wheel.width / 2 + 27;
            var wheelKinY = wheel.height / 2 + 36;
            wheelKin.hitArea = new PIXI.Circle(wheelKinX,wheelKinY,20);
            wheelKin.inputEnabled = true;
            wheelKin.events.onInputOver.add(function(){
                this.questionmark = TopDownGame.game.add.sprite(0,0, 'questionmark');
                this.questionmark.x = wheel.x + wheelKinX - this.questionmark.width/2;
                this.questionmark.y = wheel.y + wheelKinY - this.questionmark.height/2;
            });
            wheelKin.events.onInputOut.add(function(){
                this.questionmark.destroy();
            });
            wheelKin.events.onInputDown.add(function(){
                clickKin();
            })
            wheelGroup.add(wheelKin);
            
        }
    
}

function hideBox(){
    dialog.personIdx = null;
    TopDownGame.collide = false;
    this.wheelGroup.destroy();
    npcMovement.npcSprites[this.spriteAddNumber].frame -= this.spriteAdder;
    this.spriteAdder = 0;
    if(this.questionmark != null){
        this.questionmark.destroy();
    }
    
    if(this.traitsGroup != null){
        this.traitsGroup.destroy();
    }
    
}

//Generiert antwort auf frage über aktuellen npc
function clickSelf() {
    dialog.intro = false;
    this.person.metBefore = true;
    var npcText = this.person.dialog[2].line
    this.showMessageBox(npcText);
}

function clickHome(){
    if(Array.isArray(this.person.dialog[3].line)){
            var subLength = this.person.dialog[3].line.length;
            var rndNumber = Math.floor((Math.random() * subLength) + 0);
            var npcText = this.person.dialog[3].line[rndNumber];
        }else{
            var npcText = this.person.dialog[3].line;
        }
    this.person.relationship += ((Math.random() * 0.5) + 0.2)
    Math.random
    this.showMessageBox(npcText);
}

function clickJob(){
    if(this.person.job == obj1 && !this.person.jobbed || this.person.job == obj2 && !this.person.jobbed){
        objCounter++;
    }
    this.person.jobbed = true;
    var npcText = this.person.dialog[4].line;
    this.person.relationship++;
    this.showMessageBox(npcText);
}

function clickChild(){
    if(Array.isArray(this.person.dialog[5].line)){
            var subLength = this.person.dialog[5].line.length;
            var rndNumber = Math.floor((Math.random() * subLength) + 0);
            var npcText = this.person.dialog[5].line[rndNumber];
        }else{
            var npcText = this.person.dialog[5].line;
        }
    this.person.relationship++;
    this.showMessageBox(npcText);
}

function clickAdolscene(){
    if(Array.isArray(this.person.dialog[6].line)){
            var subLength = this.person.dialog[6].line.length;
            var rndNumber = Math.floor((Math.random() * subLength) + 0);
            var npcText = this.person.dialog[6].line[rndNumber];
        }else{
            var npcText = this.person.dialog[6].line;
        }
    this.person.relationship++;
    this.showMessageBox(npcText);
}

function clickAdult(){
    if(Array.isArray(this.person.dialog[7].line)){
            var subLength = this.person.dialog[7].line.length;
            var rndNumber = Math.floor((Math.random() * subLength) + 0);
            var npcText = this.person.dialog[7].line[rndNumber];
        }else{
            var npcText = this.person.dialog[7].line;
        }
    this.person.relationship++;
    this.showMessageBox(npcText);
}

function clickMid(){
    if(Array.isArray(this.person.dialog[8].line)){
            var subLength = this.person.dialog[8].line.length;
            var rndNumber = Math.floor((Math.random() * subLength) + 0);
            var npcText = this.person.dialog[8].line[rndNumber];
        }else{
            var npcText = this.person.dialog[8].line;
        }
    this.person.relationship++;
    this.showMessageBox(npcText);
}

function clickElder(){
    if(Array.isArray(this.person.dialog[9].line)){
            var subLength = this.person.dialog[9].line.length;
            var rndNumber = Math.floor((Math.random() * subLength) + 0);
            var npcText = this.person.dialog[9].line[rndNumber];
        }else{
            var npcText = this.person.dialog[9].line;
        }
    this.person.relationship++;
    this.showMessageBox(npcText);
}

function clickOthers(){
    var last = this.person.dialog.length - 2;
    if(Array.isArray(this.person.dialog[last].line)){
            var subLength = this.person.dialog[last].line.length;
            if(subLength > 0){
            var rndNumber = Math.floor((Math.random() * subLength) + 0);
            oNpcI = this.person.dialog[last].line[rndNumber];
            subLength = oNpcI.line.length
            var oNpcName = oNpcI.name;
            //console.log(oNpcName)
            rndNumber = Math.floor((Math.random() * subLength) + 0);
            var npcText = oNpcI.line[rndNumber]
            }else{
                var npcText = "I don't have a kin."
            }
        }else{
            var npcText = this.person.dialog[10].line;
        }
    this.showMessageBox(npcText, oNpcName);
}

function clickONpc(){
    subLength = oNpcI.line.length
    var oNpcName = oNpcI.name;
    //console.log(oNpcName)
    rndNumber = Math.floor((Math.random() * subLength) + 0);
    var npcText = oNpcI.line[rndNumber]
    //this.person.relationship++;
    this.showMessageBox(npcText, oNpcName);
}

function clickYourself(traitInfo){
    var last = this.person.dialog.length - 1;
    if(Array.isArray(this.person.dialog[last].line)){
            var subLength = this.person.dialog[last].line.length;
            var rndNumber = Math.floor((Math.random() * subLength) + 0);
            var npcText = this.person.dialog[last].line[rndNumber];
        }else{
            var npcText = this.person.dialog[last].line;
        }
    this.person.relationship += ((Math.random() * 0.5) + 0.2)
    
    var traitText = this.person.trait[rndNumber]
    var tBool = false;
    this.person.traitInfo.forEach(function(element) {
        if(element == traitText)
            tBool = true;
    });
    if(!tBool){
        this.person.traitInfo.push(this.person.trait[rndNumber])
    }
    this.showMessageBox(npcText);
}

function clickKin(){
    this.person.kinBool = true;
    var region = this.person.region;
    var age = this.person.age;
    var social = this.person.social;
    var com = this.person.comName;
    if(social == "commoner" || social == "rich"){
        social = "commoner or rich"
    }
    if(age == "child" || age == "adolescent"){
        age = "young"
    }else{
        age = "old"
    }
    var npcText = 'We the '+ com + ', we are from ' + region + '. We are all ' + social + ' and pretty ' + age;
    this.showMessageBox(npcText);
}

function objectsChek(){
    objCount = 0;
    for(var i in TopDownGame.allPersons){
        var job = TopDownGame.allPersons[i].job
        if(obj1 == job || obj2 == job){
            objCount++;
        }
    }
    if(objCount == 0){
        TopDownGame.allPersons[0].job = obj1;
        TopDownGame.allPersons[0].dialog[4].line = "I am a " + obj1;
        objCount = 1;
    }else if(objCount == 2 && TopDownGame.allPersons.length > 15){
        objCount = 1;
    }else if(objCount >= 3){
        objCount = 2;
    }
}
objFound = null;
syBox = null;
function objectsFound(that){
    that = that;
    if(objFound != null){
       objFound.destroy();
       }
    if(syBox != null){
        syBox.destroy();
    }
    syBox = TopDownGame.game.add.sprite(0, 0, 'systemMessage')
    syBox.x = TopDownGame.game.width - syBox.width - 20 + TopDownGame.game.camera.x;
    syBox.y = TopDownGame.game.height - syBox.height - 20 + TopDownGame.game.camera.y;
    objFound = TopDownGame.game.add.bitmapText(0,0, 'mid', objects + ' found: ' + objCounter + '/' + objCount, 20)
    objFound.x = syBox.x + 15;
    objFound.y = syBox.y + 7;
    
    if(objCounter >= objCount){
        setTimeout( startOutro, 3000);
        
    }

function startOutro(){
    that.state.start('outro')
}

}

function readPaths(map){
    this.pathPoints = findPathsByType(map);
    this.bmd = TopDownGame.game.add.bitmapData(TopDownGame.game.width, TopDownGame.game.height);
    this.bmd.addToWorld();
    this.plot(map);
}

function findPathsByType(map){
    this.points = [];
    for (j = 0; j < npcGenerate.jobsOfNpcs.length; j++){
        this.number = 0;
        var x = [];
        var y = [];
        for (i = 0; i < map.objects['pathlayer'].length; i++){ 
            var pi = map.objects['pathlayer'][i];
            var pn = map.objects['pathlayer'][i].properties.number;
            
                if(pi.properties.type === npcGenerate.jobsOfNpcs[j] && pn == this.number){
                    x.push(Math.round(pi.x));
                    y.push(Math.round(pi.y));
            }
            if(i == map.objects['pathlayer'].length - 1){
                i = 0;
                this.number++;
                if(x.length > 0){
                    this.points.push({
                        'job': npcGenerate.jobsOfNpcs[j],
                        'x': x,
                        'y': y,
                        })
                var x = [];
                var y = [];
                }else{
                    break;
                }
            }
        } 
        
        
    }
    
}

//gets Obj size
function ObjectSize(obj){
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function plot(map){
    //pfad wird errstellt
    npcMovement.path = [];
    for(var k = 0; k < this.points.length; k++){    
        npcMovement.path[k] = new Array();
        for(var i = 0; i <= this.points[k].x.length - 2; i++){
            var distanceVec = {
                'x': this.points[k].x[i+1] - this.points[k].x[i],
                'y': this.points[k].y[i+1] - this.points[k].y[i]}
            var distance = Math.sqrt(Math.pow(distanceVec.x, 2) + Math.pow(distanceVec.y, 2));
            var progress = 1/ distance * 0.5;

            for(var j = 0; j <= 1; j += progress){
            var px = this.points[k].x[i] + (this.points[k].x[i+1] - this.points[k].x[i]) * j;
            var py = this.points[k].y[i] + (this.points[k].y[i+1] - this.points[k].y[i]) * j;

            npcMovement.path[k].push({x: px, y: py});
   //         this.bmd.rect(px, py, 1, 1, 'rgba(255, 0, 0, 1)');
                }

        }
    }


    //contains every index for npc nearby a path
    npcMovement.nearby = [];
    //contains nearest point of path to npc
    npcMovement.startPoint = [];
    //contains used path index
    npcMovement.pathIndex = [];
//überprüft ob npc in der nähe von route ist.
    
    for(i = 0; i < TopDownGame.npcSpawnPoints.length; i++){
        var npcJob = TopDownGame.npcSpawnPoints[i].job;
        midLoop:
        for(p = 0; p < this.points.length; p++){
            if(this.points[p].job === npcJob){
               for(j = 0; j < npcMovement.path[p].length - 51; j += 50){
                    var distanceVec = {
                    
                    'x': npcMovement.path[p][j].x - TopDownGame.npcPositions[i].x,
                    'y': npcMovement.path[p][j].y - TopDownGame.npcPositions[i].y}    

                    var distance = Math.sqrt(Math.pow(distanceVec.x, 2) + Math.pow(distanceVec.y, 2));
                   if(distance <= 80 && TopDownGame.npcPositions[i].map == map.key){
                       npcMovement.nearby.push(i);
                       npcMovement.startPoint.push(j);
                       npcMovement.pathIndex.push(p);
                       break midLoop;
                       
                   }
                } 
            }
        }
        
    }
    
}
