define([ 'game/events' ], function (events) {

  return function (android) {
    events.on('game:update', function (gameInfo) {
      if (android.mesh) {
        var rotationFactor = 3 * gameInfo.delta;
        var moveDistance = android.maxVelocity * gameInfo.delta;
        android.state = android.states.walking;
        android.mesh.translateZ(moveDistance);
        android.mesh.rotation.y -= rotationFactor;
      }
    });
  };
});
