require([ 'game/events' ], function (events) {
  var sideSize = 500;
  function addPhysics(mesh) {
    var shape = new CANNON.Box(new CANNON.Vec3(sideSize/2, 2, sideSize/2));
    var body = new CANNON.Body({ mass: 0, material: new CANNON.Material("groundMaterial") });
    body.addShape(shape);
    // body.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);

    mesh.position.copy(body.position);
    mesh.quaternion.copy(body.quaternion);

    events.emit('world:body:add', body);
  }

  var floorTexture = new THREE.ImageUtils.loadTexture( 'textures/checkerboard.jpg' );
	floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
	floorTexture.repeat.set( 10, 10 );

	var floorMaterial = new THREE.MeshPhongMaterial({ map: floorTexture, side: THREE.DoubleSide });
	var floorGeometry = new THREE.BoxGeometry(sideSize, 1, sideSize);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);

  floor.name = "Terrain";
	floor.position.y = -0.5;
	floor.rotation.x = Math.PI / 2;
  floor.receiveShadow = true;
  floor.castShadow = false;

  addPhysics(floor);

  events.emit('scene:object:load', floor);
});
