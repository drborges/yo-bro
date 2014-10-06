define([ 'game/events' ], function (events) {
  var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
	var camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.name = "PerspectiveCamera";
  camera.position.set(-10, 150, 110)
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  events.on('player:move', function (playerPosition) {
    camera.position.set(playerPosition.x, playerPosition.y + 150, playerPosition.z + 100);
    camera.lookAt(playerPosition);
  });

  events.on('game:resize', function () {
		camera.aspect	= window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
	});

  events.emit('scene:object:load', camera);

  return camera;
})
