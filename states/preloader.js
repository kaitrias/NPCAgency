var TopDownGame = TopDownGame || {};

TopDownGame.preloader = function (game) {};

TopDownGame.preloader.prototype = {
    
    preload: function(){
        //loading Screen
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
        this.preloadBar.anchor.setTo(0.5);
        
        this.load.setPreloadSprite(this.preloadBar);
        
        //assets
        //local array, contains all map names, for find spawn areas
        this.maps = [];
        
        this.load.tilemap('world', 'assets/world.json', null, Phaser.Tilemap.TILED_JSON);
        this.maps.push('world');

        
        this.load.image('tilesCastle', 'assets/TimeFantasy_TILES_6.24.17/TILESETS/castle.png')
        this.load.image('tilesTerrain', 'assets/TimeFantasy_TILES_6.24.17/TILESETS/terrain.png')
        this.load.image('tilesWater', 'assets/TimeFantasy_TILES_6.24.17/TILESETS/water.png')
        this.load.image('tilesOutside', 'assets/TimeFantasy_TILES_6.24.17/TILESETS/outside.png')
        this.load.image('tilesFire', 'assets/TimeFantasy_TILES_6.24.17/TILESETS/animated/fireplace.png')
        this.load.image('tilesHouse', 'assets/TimeFantasy_TILES_6.24.17/TILESETS/house.png')
        this.load.image('tilesInside', 'assets/TimeFantasy_TILES_6.24.17/TILESETS/inside.png')
        
        this.load.image('player', 'assets/images/player.png');
        this.load.image('browndoor', 'assets/images/browndoor.png');
        
        this.load.spritesheet('bonus', 'assets/timefantasy_characters/sheets/bonus1.png', 26, 36);
        this.load.spritesheet('chara2', 'assets/timefantasy_characters/sheets/chara2.png', 26, 36);
        this.load.spritesheet('chara3', 'assets/timefantasy_characters/sheets/chara3.png', 26, 36);
        this.load.spritesheet('chara4', 'assets/timefantasy_characters/sheets/chara4.png', 26, 36);
        this.load.spritesheet('chara5', 'assets/timefantasy_characters/sheets/chara5.png', 26, 36);
        this.load.spritesheet('military1', 'assets/timefantasy_characters/sheets/military1.png', 26, 36);
        this.load.spritesheet('military2', 'assets/timefantasy_characters/sheets/military2.png', 26, 36);
        this.load.spritesheet('military3', 'assets/timefantasy_characters/sheets/military3.png', 26, 36);
        this.load.spritesheet('npc1', 'assets/timefantasy_characters/sheets/npc1.png', 26, 36);
        this.load.spritesheet('npc2', 'assets/timefantasy_characters/sheets/npc2.png', 26, 36);
        this.load.spritesheet('npc3', 'assets/timefantasy_characters/sheets/npc3.png', 26, 36);
        this.load.spritesheet('npc4', 'assets/timefantasy_characters/sheets/npc4.png', 26, 36);
        
        this.load.image('dialogBox2', 'assets/images/dialog.png');
        this.load.image('systemMessage', 'assets/images/systemMessage.png');
        this.load.image('dialogWheelHome', 'assets/images/dialogWheelHome.png');
        this.load.image('dialogWheelWheel', 'assets/images/dialogWheelWheel.png');
        this.load.image('dialogWheelAdolscene', 'assets/images/dialogWheelAdolscene.png');
        this.load.image('dialogWheelJob', 'assets/images/dialogWheelJob.png');
        this.load.image('dialogWheelChildhood', 'assets/images/dialogWheelChildhood.png');
        this.load.image('dialogWheelAdulthood', 'assets/images/dialogWheeladulthood.png');
        this.load.image('dialogWheelElder', 'assets/images/dialogWheelelder.png');
        this.load.image('dialogWheelMid', 'assets/images/dialogWheelmid.png');
        this.load.image('dialogWheelOthers', 'assets/images/dialogWheelothers.png');
        this.load.image('dialogWheelOthers2', 'assets/images/dialogWheelOthers2.png');
        this.load.image('questionmark', 'assets/images/dialogQuestionmark.png');
        this.load.image('questionmarkNorm', 'assets/images/dialogQuestionmarkNorm.png');
        this.load.image('dialogWheelYourself', 'assets/images/dialogWheelyourself.png');
        this.load.image('dialogWheelKin', 'assets/images/dialogWheelKin.png');
        this.load.image('dialogWheelhimself', 'assets/images/dialogWheelhimself.png')
    
        this.load.image('traitsBox', 'assets/images/traits.png');
        
        this.load.image('outro', 'assets/images/outro.png');
        
        this.load.audio('fantasyRPG', ['assets/audio/fantasyRPGLoop.mp3', 'assets/audio/fantasyRPGLoop.ogg']);
    },
    
    create: function(){
        
        
        //spriteArray[0] == HairColor gray
        //spriteArray[1] == HairColor brown
        //0: = bonus.png
        //1: = char2.png
        //2: = char3.png
        //3: = char4.png
        //4: = char5.png
        //5: = military1.png
        //6: = military2.png
        //7: = military3.png
        //8: = npc1.png
        //9: = npc2.png
        //10: = npc3.png
        //11: = npc4.png
        
        spritePNGArray = ["bonus", "chara2", "chara3", "chara4", "chara5", "military1", "military2", "military3", "npc1", "npc2", "npc3", "npc4"];
        
        spriteArray = [];
        spriteArray[0] = new Array();
        spriteArray[1] = new Array();
        spriteArray[2] = new Array();
        //male
        spriteArray[0].push({0: [1, 52], 1: [4, 49, 55], 3: [10], 5: [1, 49], 6: [49], 8:[4, 10, 55], 9: [1, 49]})
        //female
        spriteArray[0].push({0: [58], 2: [7, 52, 55], 3: [7], 6: [52], 9: [7, 49], 11: [1, 52]})
        
        
        //male
        spriteArray[1].push({1: [10], 3: [1], 4: [4], 5: [4], 6:[1, 55], 8: [1, 7, 49, 52, 58], 10: [4, 10, 55, 58]})
        //female
        spriteArray[1].push({0: [10], 2: [58], 4: [7], 9: [1, 4, 10, 52, 55], 11: [7, 49, 55]})
        
        //male
        spriteArray[2].push({0: [4], 1: [1], 4: [1], 7: [52], 10: [7]})
        //female
        spriteArray[2].push({0: [7], 2: [1], 3: [52], 9: [58], 11: [4, 10]})

        
//        console.log(Object.keys(this.spriteArray[0][0])[2])
        //neccessary for enetring doors. if > 0, get x,y for player spawn from door
        TopDownGame.housesEntered = 0;
        //describes how good you know the npc
        TopDownGame.relationship = [];
        //true if npc was met before
        TopDownGame.metBefore = [];
        //Array, enthält alle Spawnareas, größen + belegung
        TopDownGame.spawnAreas = [];
        //Array, contains job of every npc and spawnpoint for every npc
        TopDownGame.npcSpawnPoints = [];
        //Array, contains length of amount of spawns per job
        TopDownGame.spawnAreasAmount = [];
        //Array, contains all jobs
        npcGenerate.jobsOfNpcs = []
        
        
        for(var idx in allPersons){
            npcGenerate.jobsOfNpcs.push(allPersons[idx].job)
        }
        
        //checks if on map are enough blacksmiths/farmers+fishermen
        objectsChek();
        /*
        //Genreates Array with all jobs, important for paths
        $.ajax({
            url: 'assets/testOut.json',
            dataType: 'json',
            type: 'get',
            cache: false,
            success: function(data){
                
                //npcGenerate.numberOfNpcs = data.people.length;
                npcGenerate.jobsOfNpcs = [];
                data.people.forEach(function(element){
                    npcGenerate.jobsOfNpcs.push(element.profession.detail);
                   
                });
                
                
                }
            });
        
        */
        //fills spawnAreas array
        for(i = 0; i < this.maps.length; i++){
            this.map = this.game.add.tilemap(this.maps[i]);
            var t = 0;
            if(this.map.objects['spawnlayer'] != null){
                for(j = 0; j < this.map.objects['spawnlayer'].length/2; j++){
                    var min = this.map.objects['spawnlayer'][t];
                    var max = this.map.objects['spawnlayer'][t + 1];
                    var job = this.map.objects['spawnlayer'][t].properties.type;
                    //how many npcs can spawn
                    var space = Math.round(((max.x - min.x) * (max.y - min.y))/290);
                    //how many npcs spawned in this area
                    var taken = 0;
                    TopDownGame.spawnAreas.push({map: this.maps[i], job: job, min: min, max: max, space: space, taken: taken});
                    t += 2;
                }
            }
        }
        //tileHeigt of sprite
        TopDownGame.tileHeight = this.map.tileHeight;
        
        //sorts spawnAreas by job        
        TopDownGame.spawnAreas.sort(function(a, b){
          var x = a.job.toLowerCase();
          var y = b.job.toLowerCase();
          if (x < y) {return -1;}
          if (x > y) {return 1;}
          return 0;
        });
           
        //fills spawnAreasAmount
        var job = TopDownGame.spawnAreas[0].job
        var begin = 0
        
        for(var index = 0; index < TopDownGame.spawnAreas.length - 1; index++){
            
            if(TopDownGame.spawnAreas[index].job != TopDownGame.spawnAreas[index + 1].job){
                TopDownGame.spawnAreasAmount.push({job: job, begin: begin, end: index}) 
                job = TopDownGame.spawnAreas[index + 1].job;
                begin = index + 1;
            }if(index == TopDownGame.spawnAreas.length-2){
                TopDownGame.spawnAreasAmount.push({job: job, begin: begin, end: index + 1})
                }

        }
        
        //fills array npcSpawnPoints with npc + job
        for(var idx in allPersons){
            var job = allPersons[idx].job;
            var gender = allPersons[idx].gender;
            var regNo = allPersons[idx].regNo;
            var tall = allPersons[idx].tall;
            var large = allPersons[idx].large;
            var agile = allPersons[idx].agile;
            var energetic = allPersons[idx].energetic;
            
            TopDownGame.npcSpawnPoints.push({job: job, number: idx, gender: gender, regNo: regNo, tall: tall, large: large, agile: agile, energetic: energetic})
            TopDownGame.relationship.push(allPersons[idx].relationship)
        }
        
        chooseSpawn();
        
        /*
        $.ajax({
            url: 'assets/testOut.json',
            dataType: 'json',
            type: 'get',
            cache: false,
            success: function(data){
                
                //sets relationship for every npc to 0
                $(data.people[0].class.exclusions).each(function(index, value){
                    for(i = 0; i < data.people.length; i++){
                        TopDownGame.relationship.push(0);
                    }
                });
                //fills array npcSpawnPoints with npc + job
                $(data.people).each(function(index, value){
                   TopDownGame.npcSpawnPoints.push({job: value.profession.detail, number: index}) 
                });

                chooseSpawn();
            }
            
        });
*/

        
      //  this.state.start("house01", true, false, null, 40, 30)
    },
    

   

 
}

function chooseSpawn(){
    

    //gehe alle npcs durch
    TopDownGame.npcSpawnPoints.forEach(function(value, index){
        job = value.job;
        //suche Arraybereich für äquivalenten Job und wähle zufällig eine spawnarea
        var done = false;
        outerLoop:
        for(var i = 0; i < TopDownGame.spawnAreasAmount.length; i++){
            this.sp = TopDownGame.spawnAreasAmount[i];
            if(job == this.sp.job || this.sp.job == "zAny"){
                var counterArray = [];
                for(var j = this.sp.begin; j <= this.sp.end; j++){
                    counterArray.push(j);
                }
                for(var k = 0; k <= counterArray.length; k++){
                    this.spawnArea = Math.floor((Math.random() * (this.sp.end - this.sp.begin +1)) + this.sp.begin);
                    if(TopDownGame.spawnAreas[this.spawnArea].taken == 1){
                    }
                    if(TopDownGame.spawnAreas[this.spawnArea].taken < 1){
                        TopDownGame.spawnAreas[this.spawnArea].taken += 1;
                        break outerLoop;
                    }
                    for(var w = 0; w < counterArray.length; w++){
                        if(this.spawnArea == counterArray[w]){
                            counterArray.splice(w, 1)
                        }
                    }
                    k = 0;
                    if(k == counterArray.length && i == TopDownGame.spawnAreasAmount.length -1){
                        console.log("NOT ENOUGH SPAWN AREAS")
                        this.spawnArea = 1;
                    }
                }
            }
            
            /*
            if(job == this.sp.job && this.sp.taken < 1){
                this.spawnArea = Math.floor((Math.random() * (this.sp.end - this.sp.begin +1)) + this.sp.begin);
                break;
            }
            */
        }
        /*
        TopDownGame.spawnAreasAmount.forEach(function(value){
            if(job == value.job && !done){
                this.spawnArea = Math.floor((Math.random() * (value.end - value.begin +1)) + value.begin);
                done = true;
            }
        })
        */
        var max = TopDownGame.spawnAreas[this.spawnArea].max;
        var min = TopDownGame.spawnAreas[this.spawnArea].min;
        var map = TopDownGame.spawnAreas[this.spawnArea].map;
        var xPoint = Math.floor((Math.random() * (max.x - min.x)) + min.x);
        var yPoint = Math.floor((Math.random() * (max.y - min.y)) + min.y);
        yPoint -= TopDownGame.tileHeight;
        
        TopDownGame.npcSpawnPoints[index].map = map;
        TopDownGame.npcSpawnPoints[index].xPoint = xPoint;
        TopDownGame.npcSpawnPoints[index].yPoint = yPoint;
        })

    TopDownGame.game.state.start("world", true, false);
}