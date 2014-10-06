require([ 'game/events' ], function (events) {
  var shape = new CANNON.Box(new CANNON.Vec3(5, 5, 5));
  var body = new CANNON.Body({ mass: 5, material: new CANNON.Material("slipperyMaterial") });
  body.addShape(shape);
  body.position.set(0, 20, 0);

  events.emit('world:body:add', body);

  var cubegeometry = new THREE.BoxGeometry( 5, 5, 5 );
  var cubematerial = new THREE.MeshPhongMaterial({ color: 0xff5555 });
  cube = new THREE.Mesh( cubegeometry, cubematerial );
  cube.castshadow = true;
  cube.receiveshadow = true;
  cube.position.copy(body.position);

  events.emit('scene:object:load', cube);

  events.on('world:update', function () {
    cube.position.copy(body.position);
    cube.quaternion.copy(body.quaternion);
  });
});
