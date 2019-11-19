var TopDownGame = TopDownGame || {};

TopDownGame.boot = function (game) {};


TopDownGame.boot.prototype = {
    
    preload: function(){
        this.load.image('preloadbar', 'assets/images/preloader-bar.png');
        TopDownGame.game.load.bitmapFont('nokia16', 'assets/fonts/font.png', 'assets/fonts/font.fnt');
        TopDownGame.game.load.bitmapFont('mid', 'assets/fonts/fontmid.png', 'assets/fonts/fontmid.fnt');
        TopDownGame.game.load.bitmapFont('midcopy', 'assets/fonts/fontmidKopie.png', 'assets/fonts/fontmidKopie.fnt');
    },
    
    
    
    create: function(){
        TopDownGame.game.add.plugin(PhaserInput.Plugin);
        this.game.stage.backgroundColor = '#fff';
        this.game.plugins.add(Phaser.Plugin.TilemapPlus);
        //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas)
        
//        this.scale.pageAlignHorizontally = true;
//        this.scale.pageAlignHorizontally = true;
        
        //physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        
        this.state.start('intro');
    },
};