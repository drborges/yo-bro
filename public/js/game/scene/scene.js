define([ 'game/events' ], function (events) {
  var scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2( 0xefd1b5, 0.0015 );

  events.on('scene:object:load', function (sceneObject) {
    scene.add(sceneObject);
  });

  return scene;
})
