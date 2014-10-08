define([ 'game/events' ], function (events) {

  return function (android) {
    var body = new CANNON.Body({ mass: android.mass });
    body.addShape(new CANNON.Box(new CANNON.Vec3(4, 3, 4)));
    body.angularDamping = android.angularDamping;
    // body.position.copy(android.position);

    android.body = body;

    body.addEventListener('collide', function (e) {
      if (android.mesh) {
        // android.mesh.material.color = 0x0000ff;
      }
    })

    events.emit('world:body:add', body);
    events.on('world:update', function () {
      if (android.mesh) {
        android.mesh.position.copy(body.position);
        android.mesh.position.y -= 3
      }
    });
  };
});
