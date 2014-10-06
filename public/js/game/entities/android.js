define(function () {
  var Android = function (opts) {
    this.name = opts.name || 'Droid';
    this.mass = opts.mass || 5;
    this.state = opts.state || Android.states.still;
    this.color = opts.color || Android.colors.green;
    this.position = opts.position || new THREE.Vector3(-10, 0, 10);
    this.maxVelocity = opts.maxVelocity || 30;
    this.angularDamping = opts.angularDamping || 0.5;
  };

  Android.prototype.states = Android.states = {
    still: 0,
    walking: 1,
    dead: 2,
    damaged: 3,
    firing: 4
  };

  Android.prototype.colors = Android.colors = {
    red: 0xff5555,
    green: 0x55ff55,
    blue: 0x5555ff,
  };

  Android.prototype.with = function (enhancement) {
    enhancement(this);
    return this;
  };

  return Android;
});

