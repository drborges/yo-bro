require([ 'game/events' ], function (events) {
  var ambientlight = new THREE.AmbientLight(0x111111);
  ambientlight.name = "AmbientLight";

  var spotlight = new THREE.SpotLight( 0xffffff );
  spotlight.position.set(20, 200, -70);
  spotlight.target.position.set(0, 0, 0);
	spotlight.intensity = 2;
  spotlight.castShadow = true;
  spotlight.shadowDarkness = 0.84;
  spotlight.shadowCameraVisible = true;
  spotlight.shadowCameraNear = 20;
  spotlight.shadowCameraFar = 500;
  spotlight.shadowBias = -.0001;

  events.emit('scene:object:load', spotlight);
  events.emit('scene:object:load', ambientlight);
});
