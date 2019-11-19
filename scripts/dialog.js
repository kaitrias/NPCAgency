/* global console */
/* global _ */
/* global Phaser */


(function() {
  'use strict';
  window.MyGame = {
    states: {}
  };
  var game;
/*
  window.adjust = function adjust() {
    game.scale.setGameSize(window.innerWidth, window.innerHeight);
  };

  window.addEventListener("optimizedResize", function() {
    window.adjust();
  });

  var throttle = function(type, name, obj) {
    obj = obj || window;
    var running = false;
    var func = function() {
      if (running) { return; }
      running = true;
      requestAnimationFrame(function() {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };
    obj.addEventListener(type, func);
  };

  throttle("resize", "optimizedResize");
*/
  window.onload = function() {
    // var cp = Phaser.Tile.prototype.containsPoint;
    game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

    window.game = game;

    game.state.add('Base', window.MyGame.states.Base);

    game.state.start('Base');
  };

})();


/* global console */
/* global _ */
/* global $ */
/* global ajv */
/* global Phaser */
/* global PhreakNation */
var manDiag;
(function() {
    'use strict';
    var $dialog = $('.dialog');
    var $dialogActorName = $dialog.find('.dialog-actor-name');
    var $dialogText = $dialog.find('.dialog-text');
    var $dialogOptions = $dialog.find('.dialog-options');

    var triggerDialog = function triggerDialog() {
        if (_.isUndefined($dialog.attr('data-playing')) || $dialog.attr('data-playing') !== 'true') {
            this.play();
            $dialog.attr({
                'data-playing': 'true',
            });
        } else {
            if (_.isUndefined($dialog.attr('data-rendered')) || $dialog.attr('data-rendered') !== 'true') {
                if (this.isQuestion !== true) {
                    if (_.isFunction(this.next))
                        this.next();
                    else {
                        clearDialog();
                        return;
                    }
                }
            }
        }

        if (_.isUndefined($dialog.attr('data-rendered')) || $dialog.attr('data-rendered') !== 'true') {
            $dialogActorName.text(this.actor().name() + ':');
            $dialogText.text(this.text());
            $dialog.css({
                opacity: 1,
            });
            console.log($dialog);

            if (this.isQuestion === true) {
                _.each(this.answers(), (function(text, index) {
                    var $li = $('<li />');
                    $li.text((index+1) + '. ' + text);
                    $li.appendTo($dialogOptions);
                    $li.on('click', (function(choice) {
                        var next = this.choose(choice);
                        clearDialog();
                        setTimeout((function() {
                            triggerDialog.apply(this);
                        }).bind(next), 500);
                    }).bind(this, index));
                }).bind(this));
                $dialogOptions.show();
            }

            $dialog.attr({
                'data-rendered': 'true',
            });
        } else {
            var next = this.next();
            clearDialog();
            setTimeout((function() {
                triggerDialog.apply(this);
            }).bind(next), 500);
        }
    };

    var clearDialog = function clearDialog() {
        $dialog.css({
            opacity: 0,
        });
        setTimeout(function() {
            $dialogActorName.text('');
            $dialogText.text('');
            $dialogOptions.empty().hide();
            $dialog.attr({
                'data-rendered': 'false',
            });
        }, 250);
    };

    var Choose = function() {};

    var state = function state(game) {};

    state.prototype = {
        preload: function () {
            this.game.scale.setResizeCallback(function() {
              window.adjust();
            });

            this.game.input.maxPointers = 1;
            this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.refresh();
        },

        create: function () {
            var text = "This just the prototype of what the dialog should look like. Hit ENTER to go back.";
            var style = { font: "24px Arial", fill: "#f0f0f0", align: "center" };

            var t = game.add.text(10, 10, text, style);
          
            console.log('Loading Dialog Manager...');
            manDiag = this.game.plugins.add(PhreakNation.Plugins.DialogManager);
            manDiag.load(configDialog);
            var Conv = manDiag.get(1, 'dialog');

            triggerDialog.apply(Conv);

            var keyEnter = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
            keyEnter.onDown.add(triggerDialog, Conv);

            /*
            Conv.play();
            console.log('[%s]: %s', Conv.actor().name(), Conv.text());

            var list = Conv.answers();
            var choice = _.random(0, 2);
            console.log('Options: ', list);
            console.log('Chose: `%s`', list[choice]);
            Conv.choose(choice);
            console.log('[%s]: %s', Conv.actor().name(), Conv.text());

            Conv.next();
            console.log('[%s]: %s', Conv.actor().name(), Conv.text());

            Conv.next();
            console.log('[%s]: %s', Conv.actor().name(), Conv.text());

            list = Conv.answers();
            choice = _.random(0, 2);
            console.log('Options: ', list);
            console.log('Chose: `%s`', list[choice]);
            Conv.choose(_.random(0, 1));
            console.log('[%s]: %s', Conv.actor().name(), Conv.text());

            Conv.next();
            console.log('[%s]: %s', Conv.actor().name(), Conv.text());
            */

            this.game.stage.backgroundColor = 0x444444;
            this.game.stage.backgroundColor = '#004a10';
            this.cursors = this.input.keyboard.createCursorKeys();
            this.game.input.mouse.capture = true;
        },

        update: function () {

        },

        render: function () {

        },
    };

    window.MyGame.states.Base = state;
})();
 
window.configDialog = {
  actor: [
    {
      id: 1,
      name: {
        first: 'Flynn',
        last: '',
      },
    },
    {
      type: 'actor',
      id: 2,
      name: {
        first: 'Colin',
        last: '',
      },
    },
  ],
  answer: [
    {
      id: 1,
      emotion: 1,
      text: 'Hey {actor:0x002}, how many NPCs are in this world?'
    },
    {
      id: 2,
      emotion: 7,
      text: 'Hey {actor:0x002}, for what kind of games could this be interesting?',
    },
    {
      id: 3,
      emotion: 0,
      text: 'Not right now.',
    },
  ],
  dialog: [
    {
      id: 1,
      type: 'question',
      actorId: 2,
      emotion: 0,
      text: 'Hello and welcome to the NPC AGENCY WORLD. In our world you are able to talk to every NPC you want to. Ask them about their childhood, parents, jobs or anything else. If you have any questions, let me know.',
      answers: [
        {
          answerId: 1,
          next: 2,
        },
        {
          answerId: 2,
          next: 3,
        },
        {
          answerId: 3,
          next: 4,
        },
      ],
    },
    {
      id: 2,
      type: 'statement',
      actorId: 2,
      emotion: 1,
      text: 'How many NPCs, that is up to you. If you continue I will tell you more about that.',
      next: 5,
    },
    {
      id: 3,
      type: 'statement',
      actorId: 2,
      emotion: 4,
      text: 'Did you notice that the NPCs in Assasins Creed will just say HI to you? I think Assasins Creed is a good example. Ok thats all you should know right know. Just hit continue.',
      next: 5,
    },
    {
      id: 4,
      type: 'statement',
      actorId: 2,
      emotion: 4,
      text: 'Ok, if you need me, you will find me in the Welcome Center.',
      next: 5,
    },
    {
      id: 5,
      type: 'statement',
      actorId: 2,
      emotion: 1,
      text: 'Thats the end of the prototype right now.',
      next: 1,
    },
  ],
  emotion: [
    'Happy',
    'Curious',
    'Joking',
    'Joyful',
    'Playful',
    'Sad',
    'Sorrowful',
    'Tired',
  ]
};