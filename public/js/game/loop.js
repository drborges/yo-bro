require([ 'game/events' ], function (events) {
  var clock = new THREE.Clock();

  events.emit('game:load');

  (function gameLoop() {

    events.emit('game:update', {
      delta: clock.getDelta(),
      time: clock.getElapsedTime()
    });

    events.emit('game:render');

    requestAnimationFrame(gameLoop);
  })();
})
