var TopDownGame = TopDownGame || {};

TopDownGame.outro = function (game) {};

TopDownGame.outro.prototype = {
    
    preload: function(){
        
    },
    create: function(){
        this.outro = TopDownGame.game.add.sprite(0,0, 'outro');
    }
        
}

