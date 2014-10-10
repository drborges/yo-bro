define([ 'game/events' ], function (events) {
  var ambientlight = new THREE.AmbientLight(0x111111);
  ambientlight.name = "AmbientLight";

  var createSpotlight = function (opts) {
    var spotlight = new THREE.SpotLight(opts.color);
    spotlight.position.copy(opts.position);
    spotlight.target.position.set(0, 0, 0);
    spotlight.intensity = 2;
    spotlight.castShadow = opts.castShadow;
    spotlight.shadowDarkness = opts.shadowDarkness;
    spotlight.shadowCameraVisible = opts.shadowCameraVisible;
    spotlight.shadowCameraNear = opts.shadowCameraNear;
    spotlight.shadowCameraFar = opts.shadowCameraFar;
    spotlight.shadowBias = opts.shadowBias;
    return spotlight;
  };

  var spotlight = createSpotlight({
    color: 0xffffff,
    position: new THREE.Vector3(20, 200, -70),
    shadowCameraVisible: false,
    shadowDarkness: 0.84,
    castShadow: true,
    shadowCameraNear: 20,
    shadowCameraFar: 500,
    shadowBias: -.0001,
  });

  events.emit('scene:object:load', spotlight);
  events.emit('scene:object:load', ambientlight);

  return { spotlight: spotlight, ambientlight: ambientlight };
});
