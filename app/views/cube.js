import app from 'appkit/app';
import player from 'appkit/models/player';

export default Ember.View.extend({
  canvas: null,
  isRunning: false,
  player: null,
  init: function () {
    this._super();
  },
  didInsertElement: function () {
    this.renderCanvas();
    console.log('rendering..');
  },
  renderCanvas: function () {
    if (!this.player) {
      this.player = player.create();
    }
    if (!this.canvas) {
      var p = this.player;
      this.canvas = cq().framework({
        /* game logic loop */
        onstep: function(delta, time) {
          p.rotation += 0.05;
          TWEEN.update();
        },

        /* rendering loop */
        onrender: function(delta, time) {
          this.save()
            .clear("#000")
            .translate(p.position.x, p.position.y)
            .rotate(p.rotation)
            .fillStyle("#fff")
            .fillRect( -p.size.x / 2, -p.size.y / 2, p.size.x, p.size.y)
          .restore();
        },

        /* window resize */
        onresize: function(width, height) {
          /* resize canvas with window */
          this.canvas.width = width;
          this.canvas.height = height;
        },

        /* mouse events */
        onmousedown: function(cx, cy) {
          var tween = new TWEEN.Tween( { x: p.position.x, y: p.position.y } )
              .to( { x: cx, y: cy }, 2000 )
              .easing( TWEEN.Easing.Sinusoidal.Out )
              .onUpdate( function () {
                p.position.x = this.x;
                p.position.y = this.y;
              } )
              .start();
        },
        onmouseup: function(x, y) { },
        onmousemove: function(x, y) {

        },
        onmousewheel: function(delta) { },

        /* touch events */
        ontouchstart: function(x, y, touches) { },
        ontouchend: function(x, y, touches) { },
        ontouchmove: function(x, y, touches) { },

        /* keyboard events */
        onkeydown: function(key) { },
        onkeyup: function(key) { },

        /* gamepad events (chrome only) */
        ongamepaddown: function(button, gamepad) { },
        ongamepadup: function(button, gamepad) { },
        ongamepadmove: function(xAxis, yAxis, gamepad) { },

        /* user drops image from disk */
        ondropimage: function(image) { }
      }).appendTo('.scene-cube');
    }
  }
});
