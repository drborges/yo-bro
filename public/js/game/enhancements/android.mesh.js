define([ 'game/events' ], function (events) {
  var jsonLoader = new THREE.JSONLoader();

  return function (android) {
    jsonLoader.load("models/android.js", function (geometry) {
      var material = new THREE.MeshPhongMaterial({
        color: android.color,
        morphTargets: true,
        vertexColors: THREE.FaceColors
      });

      var mesh = new THREE.Mesh(geometry, material);
      mesh.name = android.name;

      mesh.scale.set(1, 1, 1);
      mesh.position = android.position;

      mesh.castShadow = true;
      mesh.receiveShadow = true;
      android.mesh = mesh;

      events.emit('scene:object:load', mesh);
    });
  };
});
