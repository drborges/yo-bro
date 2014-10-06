define([ 'game/events' ], function (events) {

  return function (android) {
    var animOffset = 0
      , duration = 1000
      , keyframes = 20
      , interpolation = duration / keyframes
      , lastKeyframe = 0
      , currentKeyframe = 0;

    var animate = function (android) {
      var time = new Date().getTime() % duration;
      keyframe = Math.floor( time / interpolation ) + animOffset;

      if (keyframe != currentKeyframe) {
        android.mesh.morphTargetInfluences[lastKeyframe] = 0;
        android.mesh.morphTargetInfluences[currentKeyframe] = 1;
        android.mesh.morphTargetInfluences[keyframe] = 0;
        lastKeyframe = currentKeyframe;
        currentKeyframe = keyframe;
      }
      android.mesh.morphTargetInfluences[keyframe] = (time % interpolation) / interpolation;
      android.mesh.morphTargetInfluences[lastKeyframe] = 1 - android.mesh.morphTargetInfluences[keyframe];
    };

    events.on('game:update', function () {
      if (android.state === android.states.walking) {
        animate(android);
      }
    });
  };
});
