define([ 'game/events', 'game/scene/scene', 'game/scene/camera' ], function (events, scene, camera) {
  var container = document.getElementById('game-container');
  var renderer = new THREE.WebGLRenderer( { clearColor: 0xefd1b5, clearAlpha: 1 } );

  renderer.shadowMapEnabled = true;
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  events.on('game:resize', function () {
		renderer.setSize(window.innerWidth, window.innerHeight);
	});

  events.on('game:render', function () {
    renderer.render(scene, camera);
  });

  return renderer;
})
