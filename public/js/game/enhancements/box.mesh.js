define([ 'game/events' ], function (events) {

  return function (entity) {
    var cubegeometry = new THREE.BoxGeometry(5, 5, 5);
    var cubematerial = new THREE.MeshPhongMaterial({ color: 0xff5555 });
    var mesh = new THREE.Mesh(cubegeometry, cubematerial);
    mesh.castshadow = true;
    mesh.receiveshadow = true;
    mesh.position.copy(entity.position);
    entity.mesh = mesh;

    events.emit('scene:object:load', mesh);
  };
});
