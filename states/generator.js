var TopDownGame = TopDownGame || {};
var generator = {};

TopDownGame.generator = function (game) {};

TopDownGame.generator.prototype = {
    
    preload: function(){
        this.load.image('generate', 'assets/images/generate.png');
        this.load.image('controls', 'assets/images/controls.png');
        this.load.image('controls2', 'assets/images/controls2.png');
        this.load.image('tips', 'assets/images/tips.png');
        this.load.image('generateBack', 'assets/images/generateBack.png');
        this.load.image('play', 'assets/images/play.png');
        this.load.image('insertOther', 'assets/images/insertOther.png')
        
   //     TopDownGame.game.load.bitmapFont('nokia16', 'assets/fonts/desyrel-pink.png', 'assets/fonts/desyrel-pink.xml');
    },
    create: function(){
        //contains all npcs with every information
        this.regions = [];
        buttonGroup = TopDownGame.game.add.group();
        hint = null;
        regions = null;
        var regionCounter = 0;
        TopDownGame.bsTotal = 0;
        TopDownGame.npcs = [];
        this.regionsArr = [];
        this.i = 0; 
        //this.howManyTimes = 30;
        that = this;
        region = "The Reach"
        this.firstName = [];
        var textBox = TopDownGame.game.add.group();
        
        this.generateBack = TopDownGame.game.add.sprite(0,0, 'generateBack');
        
        this.howManyTimesInput = TopDownGame.game.add.inputField(0, 175, {
        font: '18px Arial',
        fill: '#212121',
        fontWeight: 'bold',
        width: 160,
        padding: 8,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 6,
        placeHolder: 'How many (eg. 10)',
        //type: PhaserInput.InputType.password
        });
        this.howManyTimesInput.x = TopDownGame.game.width / 2 - this.howManyTimesInput.width / 2;
        
        this.seedInput = TopDownGame.game.add.inputField(0, 135, {
        font: '16px Arial',
        fill: '#212121',
        fontWeight: 'bold',
        width: 500,
        padding: 8,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 6,
        placeHolder: 'Seed',
        //type: PhaserInput.InputType.password
        });
        this.seedInput.x = TopDownGame.game.width / 2 - this.seedInput.width / 2;
        
        
    //    var buttonReach = TopDownGame.game.add.button(200, 100, "button");
    //    buttonReach.inputEnabled = true;
    //    buttonReach.events.onInputDown.add(this.reach, this);
        
        
        this.Frame = TopDownGame.game.add.sprite(0,190, 'gotMapFrame');
        this.Frame.x = TopDownGame.game.width / 2 - this.Frame.width / 2 + 180;
        this.FrameBool = true;
        
        
        
        
        
        
        
        var generateButton = TopDownGame.game.add.sprite(0, 0, "generate");
        //textBox.add(generateButton);
    
        generateButton.x = TopDownGame.game.width / 2 - generateButton.width;
        generateButton.y = 520;
        //enable the button for input
        generateButton.inputEnabled = true;
        //add a listener to destroy the box when the button is pressed
        generateButton.events.onInputDown.add(this.click, this);
        
  //      story.x = TopDownGame.game.width / 2 - story.width / 2;
  //      story.y = TopDownGame.game.height / 5 - story.height;
        
        this.done = false;
        this.once = false;
    },
    update: function(){
    
        if(this.done && !this.once){
            this.once = true;
            this.sprite = TopDownGame.game.add.sprite(730,545,"play");
            this.sprite.anchor.set(0.5,0.5);
            this.sprite.inputEnabled = true;
            this.sprite.events.onInputDown.add(function(){
                that.state.start('preloader')
            });
            this.hit = TopDownGame.game.add.sprite(0,0,"insertOther");
        }
              
    },
    
    inputFieldGenerate: function(){
        
    },
    click: function(){
        if(this.howManyTimesInput.value == "" || this.seedInput.value == ""){
            console.log("missing value")
            console.log(this.seedInput.placeHolder._text)
        }else{
            
        
        this.howManyTimes = this.howManyTimesInput.value;
        var decodeArr = ["The Reach", "The Westerlands", "The North", "The Riverlands", "The Vale of Arryn", "The Stormlands", "The Crownlands", "The Iron Islands", "Dorne", "[Random]", "blacksmith", "farmer", "fisherman", "guard", "knight", "merchant", "mentor", "poor", "commoner", "rich", "noble", "child", "adolescent", "young adult", "mid-life", "elder", "Positive", "Negative", "yellow", "black", "brown", "white", "blue", "green", "gray", "arm missing", "leg missing", "face scar", "limp", "none"];
        this.input = this.seedInput.value.split(" ")
        this.seedInput.placeHolder._text = "Insert an other seed or play"
        this.seedInput.setText("")
        
        this.howManyTimesInput.setText("")
        for(var i in this.input){
            if(this.input[i] == "x"){
                this.input[i] = 100;
            }
            if(this.input[i] == "v"){
                this.input[i] = 50;
            }
            if(this.input[i] == "$"){
                this.input[i] = "[Random]";
            }
        }
        var mapBool = false;
        if(this.input[2] == 9){
            if(this.regionsArr.length >= 3){
                this.input[2] = this.regionsArr[Math.floor(Math.random() * 3)]
                mapBool = true;
            }
            if(this.regionsArr.length < 3 && this.regionsArr.length > 0 && TopDownGame.npcs.length < 10){
                this.input[2] = this.regionsArr[Math.floor(Math.random() * this.regionsArr.length)]
                mapBool = true;
            }
            if(this.regionsArr.length < 3 && this.regionsArr.length > 0 && TopDownGame.npcs.length >= 10){
                this.input[2] = Math.floor(Math.random() * 9)
            }
            if(this.regionsArr.length == 0){
                this.input[2] = Math.floor(Math.random() * 9)
            }
        }
        if(!mapBool){
            this.input[2] = decodeArr[this.input[2]]
        }
        this.input[0] = decodeArr[this.input[0]]
        this.input[1] = decodeArr[this.input[1]]
        this.input[3] = decodeArr[this.input[3]]
        var newRegion = false;
        if(this.regionsArr.length == 0){
            this.regionsArr.push(this.input[2])
        }
        for(var ix in this.regionsArr){
            if(this.input[2] == this.regionsArr[ix]){
                break;
            }
            if(ix == this.regionsArr.length -1 && this.regionsArr.length < 3){
                this.regionsArr.push(this.input[2])
                lastRegion = this.input[2];
                break;
            }
            if(ix == this.regionsArr.length - 1 && this.regionsArr.length >= 3){
                console.log("only 3 regions")
                this.input[2] = lastRegion
            }
                
        }
        var regImage = "got" + this.input[2]
        this.sprite = TopDownGame.game.add.sprite(0,0,regImage);
            this.sprite.x = this.Frame.x;
            this.sprite.y = this.Frame.y;
        
        TopDownGame.regNoArr = this.regionsArr;
        that.i = 0;
        this.f();
        /*
        if(that.regions.length == 3){
            if(hint){
                hint.destroy();
            }
            that.i = 0;
            this.f();
        }else{
            if(hint){
                hint.destroy();
            }
            
            hint = TopDownGame.game.add.bitmapText(140, 160, 'nokia16', 'please choose 3 regions', 16);
            hint.tint = 0xFF0000;
        }
        */
        }
    },
    
    f: function() {
    that.i++;
    if(that.i <= that.howManyTimes){
        that.generate(that.i);
        setTimeout( that.f, 100);
    }
    if(that.i == that.howManyTimes){
        createGroups();
        for(var idx in allPersons){
            allPersons[idx].relationship = 0;
            allPersons[idx].metBefore = false;
        }
        TopDownGame.allPersons = allPersons
    //    that.popTimeline()
        for(var idy in TopDownGame.allPersons){
            if(TopDownGame.allPersons[idy].job == "fisherman"){
                TopDownGame.bsTotal++
            }
        }
        that.comNames();
        that.done = true;
    }
    },
    
    generate: function(i){
        //regions.destroy();
        //that.intro.destroy();
        buttonGroup.destroy();
        if(i <= that.howManyTimes / 3){
            var region = that.regions[0]
        }else if (i > that.howManyTimes / 3 && i <= that.howManyTimes * 2 / 3){
            var region = that.regions[1]
        }else{
            var region = that.regions[2]
        }
        setNpcTraits(this.input, region);
        if(that.arriving != null){
            that.arriving.destroy();
        }
        that.arriving = TopDownGame.game.add.bitmapText(60, that.Frame.y + 30, 'mid', 'People generated ...  ', 20);
        
        that.firstName.push(' ' + person.firstName);
        if(that.name != null){
            that.name.destroy();
        }
        that.name = TopDownGame.game.add.bitmapText(40, that.Frame.y + 60, 'mid', that.firstName, 20);
        //that.name.scale.set(0.5);
        that.name.maxWidth = TopDownGame.game.width * 0.5;
     //   that.name.wordWrap = true;
    //    that.name.wordWrapWidth = (0.5 * 200);
     //   that.name.wordWrap.set(true);
    //    that.name.setAll('wordWrapWidth', TopDownGame.width * .9);
        TopDownGame.npcs.push(person);
        if(this.npcAmount != undefined){
            this.npcAmount.destroy();
        }
        this.npcAmount = TopDownGame.game.add.bitmapText(that.arriving.x + 30 + that.arriving.width, that.arriving.y, 'mid', 'total: ' + TopDownGame.npcs.length , 20)

    },
    
    comNames: function(){
        var comNames = ["Waterroses", "Boneshade", "Rumblethorn", "Mystic Predators", "Battle Hawks",  "Blue Dynasty", "Raingarde", "Armfall", "Stormcry", "Gentlebane", "Redshields", "Golden Dragons", "Mystical End", "Ravencloaks", "Blackguards", "Twin Oath" , "Humminghoods", "Lowthorn", "Bellowcloaks", "Froststriders", "Ivorymanes", "Battlebrand", "Arm Rage", "Lightningwell", "Thunderhammers", "Shimmerflags", "Solarskulls", "Assorted Wound", "Rumblepikes", "Hummingblades", "Holy Exiles", "Allies of Might", "Boulderblades", "Doombrawlers", "Doombrawlers"];
        var allComs = [];
        for(var i in TopDownGame.allPersons){
            var comUsed = false;
            var com = TopDownGame.allPersons[i].aCommunity
            for(var u in allComs){
                if(com == allComs[u]){
                    comUsed = true;
                    break;
                }       
            }
            if(!comUsed){
                var rndNumber = Math.floor(Math.random() * comNames.length);
                var comName = comNames[rndNumber];
                TopDownGame.allPersons[i].comName = comName;
                for(var z = 1; z < TopDownGame.allPersons.length - i; z++){
                    var iint = parseInt(i)
                    var y = z + iint 
                    var com2 = TopDownGame.allPersons[y].aCommunity
                    if(com2 == com){
                        TopDownGame.allPersons[y].comName = comName
                    }
                }
                allComs.push(com)
                comNames.splice(rndNumber, 1);              
            }

        }
        
    }

    
}

