define([ 'game/events', 'cannonjs' ], function (events, cannonjs) {
  window.CANNON = cannonjs;
  var timeStep = 1.0/60.0;
  var groundMaterial = new CANNON.Material("groundMaterial");
  var groundContactMaterial = new CANNON.ContactMaterial(groundMaterial, groundMaterial, {
    friction: 1,
    restitution: 0.5,
    contactEquationStiffness: 1e8,
    contactEquationRegularizationTime: 3,
    frictionEquationStiffness: 1e8,
    frictionEquationRegularizationTime: 3,
  });

  var world = new CANNON.World();
  world.quatNormalizeSkip = 0;
  world.quatNormalizeFast = false;
  world.gravity.set(0, -50, 0);
  world.broadphase = new CANNON.NaiveBroadphase();
  world.solver.iterations = 20;
  world.addContactMaterial(groundContactMaterial);

  events.on('world:body:add', function (body) {
    world.add(body);
  });

  events.on('game:update', function (gameInfo) {
    world.step(timeStep);
    events.emit('world:update');
  });

  return world;
});
