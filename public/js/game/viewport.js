require([ 'game/events' ], function (events) {
	window.addEventListener('resize', function () {
    events.emit('game:resize');
  }, false);
})
