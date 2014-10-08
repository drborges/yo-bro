require([ 'game/events' ], function (events) {
  var meshSize = 5.0;
  var bodySize = meshSize / 2;
  var shape = new CANNON.Box(new CANNON.Vec3(bodySize, bodySize, bodySize));
  var body = new CANNON.Body({ mass: 5, material: new CANNON.Material("slipperyMaterial") });
  body.addShape(shape);
  body.position.set(10, 20, 10);

  var cubegeometry = new THREE.BoxGeometry(meshSize, meshSize, meshSize);
  var cubematerial = new THREE.MeshPhongMaterial({ color: 0xff5555 });
  cube = new THREE.Mesh(cubegeometry, cubematerial);
  cube.castShadow = true;
  cube.receiveShadow = true;
  cube.position.copy(body.position);

  events.emit('world:body:add', body);
  events.emit('scene:object:load', cube);

  events.on('world:update', function () {
    cube.position.copy(body.position);
    cube.quaternion.copy(body.quaternion);
  });
});
