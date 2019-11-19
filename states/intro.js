var TopDownGame = TopDownGame || {};

TopDownGame.intro = function (game) {};

TopDownGame.intro.prototype = {
    
    preload: function(){
        this.load.image('okay', 'assets/images/okay.png');
        this.load.image('food', 'assets/images/food.png');
        this.load.image('arms', 'assets/images/arms.png');
        this.load.image('gotMapFrame', 'assets/images/GOTMapFrame.png');
        this.load.image('gotDorne', 'assets/images/GOTMapDorne.png');
        this.load.image('gotThe Stormlands', 'assets/images/GOTMapStorm.png');
        this.load.image('gotThe North', 'assets/images/GOTMapNorth.png');
        this.load.image('gotThe Westerlands', 'assets/images/GOTMapWest.png');
        this.load.image('gotThe Crownlands', 'assets/images/GOTMapCrown.png');
        this.load.image('gotThe Reach', 'assets/images/GOTMapReach.png');
        this.load.image('gotThe Iron Islands', 'assets/images/GOTMapIron.png');
        this.load.image('gotThe Riverlands', 'assets/images/GOTMapRiver.png');
        this.load.image('gotThe Vale of Arryn', 'assets/images/GOTMapVale.png');
        this.load.image('intro', 'assets/images/intro.png');
        this.load.image('introBack', 'assets/images/introBack.png');
        this.load.image('provideFood', 'assets/images/provideFood.png');
        this.load.image('provideArms', 'assets/images/provideArms.png');
        this.load.spritesheet('emote2', 'assets/timefantasy_characters/sheets/emote2.png', 26, 36);
    },
    create: function(){
        obj1 = null;
        obj2 = null;
        that = this;
        this.game.stage.backgroundColor = '#000000';
        
        
        this.introBack = TopDownGame.game.add.sprite(0,0, 'introBack');
        
        this.introSprites = this.game.add.group();
        this.spriteIntro1 = this.introSprites.create(690, 10, 'emote2');
        this.spriteIntro1.frame = 75;
        this.spriteIntro1.scale.setTo(5, 5);
        this.spriteIntro2 = this.introSprites.create(375, 370, 'emote2');
        this.spriteIntro2.frame = 66;
        this.spriteIntro2.scale.setTo(2, 2);
        //this.introSprites.callAll('animations.add', 'animations', 'laugh', [75,76,77], 9, false)
        this.spriteIntro1.animations.add('laugh', [75,76,77], 9, false);
        this.spriteIntro2.animations.add('lol', [66,67,68], 9, false);
        this.intro = TopDownGame.game.add.sprite(0,0, 'intro');
        /*
        this.intro0 = TopDownGame.game.add.bitmapText(0, 0, 'nokia16', 'This game is about procedural content generation. The idea is to make games more interesting by enabling conversations with npcs. For that, we developed a generator, which allows us to provide game developers with as many npcs as needed, generated based on choosen traits. ' , 16);
        this.intro0.maxWidth = TopDownGame.game.width * 0.90;
        this.intro0.x = TopDownGame.game.width / 2 - this.intro0.width / 2;
        this.intro0.y = TopDownGame.game.height / 3 - this.intro0.height;
  //      this.intro0.smoothed = true;
        this.intro1 = TopDownGame.game.add.bitmapText(0, 0, 'nokia16', 'The story: A while ago, a few people from the GOT universe run ashore on an unknown island. Due to you experience, you need lead a small group. Choose your responsibility' , 16);
        this.intro1.maxWidth = TopDownGame.game.width * 0.90;
        this.intro1.x = TopDownGame.game.width / 2 - this.intro1.width / 2;
        this.intro1.y = this.intro0.y + this.intro0.height + 15;
        */
        that = this;
        this.food = TopDownGame.game.add.sprite(0,0,"food");
        this.food.x = TopDownGame.game.width / 2 - this.food.width * 1.25;
        this.food.y = 385;
        this.food.inputEnabled = true;
        this.food.events.onInputDown.add(function(){
            if(this.intro2 != null){
                this.intro2.destroy();
            }
            if(this.okay != null){
                this.okay.destroy();
            }
            require = "food"
            objects = "farmers and fishermen";
            obj1 = "farmer";
            obj2 = "fisherman";
            this.intro2 = TopDownGame.game.add.sprite(0,0,"provideFood"); 
            
            this.okay = TopDownGame.game.add.sprite(0,0,"okay");
            this.okay.x = TopDownGame.game.width / 2 - this.okay.width / 2;
            this.okay.y = 535;
            this.okay.inputEnabled = true;
            that.spriteIntro3 = that.introSprites.create(440, 520, 'emote2');
            that.spriteIntro3.frame = 57;
            that.spriteIntro3.scale.setTo(2, 2);
            that.spriteIntro3.animations.add('yey', [57,58,59], 9, false);
            this.okay.events.onInputDown.add(function(){
                that.state.start('generator')    
            });
        });
        this.arms = TopDownGame.game.add.sprite(0,0,"arms");
        this.arms.x = this.food.x + this.arms.width * 1.5;
        this.arms.y = 385;
        this.arms.inputEnabled = true;
        this.arms.events.onInputDown.add(function(){
            if(this.intro2 != null){
                this.intro2.destroy();
            }
            if(this.okay != null){
                this.okay.destroy();
            }
            require = "arms";
            objects = "blacksmiths"
            obj1 = "blacksmith";
            this.intro2 = TopDownGame.game.add.sprite(0,0,"provideArms"); 
            
            this.okay = TopDownGame.game.add.sprite(0,0,"okay");
            this.okay.x = TopDownGame.game.width / 2 - this.okay.width / 2;
            this.okay.y = 535;
            this.okay.inputEnabled = true;
            that.spriteIntro3 = that.introSprites.create(440, 520, 'emote2');
            that.spriteIntro3.frame = 57;
            that.spriteIntro3.scale.setTo(2, 2);
            that.spriteIntro3.animations.add('yey', [57,58,59], 9, false);
            this.okay.events.onInputDown.add(function(){
            that.state.start('generator')    
            });
        });

    },
    update: function(){
        this.spriteIntro1.play('laugh');
        this.spriteIntro2.play('lol');
        if(that.spriteIntro3 != null){
            that.spriteIntro3.play('yey');
        }
        
    }
        
}

