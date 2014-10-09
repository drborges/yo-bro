define([ 'game/events', 'game/keyboard', 'game/scene/camera' ], function (events, keyboard, camera) {
  createjs.Sound.registerSound({src:"sounds/laser2b.wav", id:"laser"});
  createjs.Sound.registerSound({src:"sounds/explode2.ogg", id:"explosion"});

  var direction = function (quaternion) {
    var directionQuaternion = quaternion.clone();
    var rotate90 = new THREE.Quaternion();
    rotate90.setFromAxisAngle(new THREE.Vector3(0,1,0), -Math.PI/2)
    directionQuaternion.multiply(rotate90);

    var direction = new THREE.Vector3(1, 0, 0).applyQuaternion(directionQuaternion);
    return new CANNON.Vec3().copy(direction)
  };

  var fire = function (sourcePosition, sourceQuaternion) {
    var body = new CANNON.Body({ mass: 0.1 });
    body.addShape(new CANNON.Sphere(1));
    body.position.copy(sourcePosition)
    body.position = body.position.vadd(direction(sourceQuaternion).scale(6))
    body.linearDamping = 0;
    body.velocity = direction(sourceQuaternion).scale(300)

    var geometry = new THREE.SphereGeometry(0.5);
    var material = new THREE.MeshPhongMaterial({ color: 0xff5555 });
    var mesh = new THREE.Mesh(geometry, material);

    events.emit('world:body:add', body);
    events.emit('scene:object:load', mesh);
    createjs.Sound.play("laser");

    body.addEventListener('collide', function (e) {
      if (e.body.android)
        createjs.Sound.play("explosion");
    })

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
