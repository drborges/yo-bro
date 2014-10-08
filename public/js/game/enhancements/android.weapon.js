define([ 'game/events', 'game/keyboard', 'game/scene/camera' ], function (events, keyboard, camera) {

  var direction = function (quaternion) {
    var directionQuaternion = quaternion.clone();
    var rotate90 = new THREE.Quaternion();
    rotate90.setFromAxisAngle(new THREE.Vector3(0,1,0), -Math.PI/2)
    directionQuaternion.multiply(rotate90);

    var direction = new THREE.Vector3(1, 0, 0).applyQuaternion(directionQuaternion);
    return new CANNON.Vec3().copy(direction)
  };

  var fire = function (sourcePosition, sourceQuaternion) {
    var bodyCenter = new CANNON.Vec3(0, 0, 0);
    var body = new CANNON.Body({ mass: 1 });
    body.addShape(new CANNON.Sphere(1));
    body.position.copy(sourcePosition)
    body.velocity = direction(sourceQuaternion).scale(500)

    var geometry = new THREE.SphereGeometry(0.5);
    var material = new THREE.MeshPhongMaterial({ color: 0xff5555 });
    var mesh = new THREE.Mesh(geometry, material);

    events.emit('world:body:add', body);
    events.emit('scene:object:load', mesh);

    return {
      update: function () {
        mesh.position.copy(body.position);
      }
    }
  }

  return function (android) {
    var ammoLeft = 10;
    var bullets = [];
    var throttledFire = _.throttle(function () {
      bullets.push(fire(android.body.position, android.mesh.quaternion));
    }, 500);

    events.on('game:update', function (gameInfo) {
      if (android.body) {
        var fired = keyboard.pressed('f');

        if (fired) {
          throttledFire();
        }

        bullets.forEach(function (bullet) {
          bullet.update();
        });
      }
    });
  };
});
