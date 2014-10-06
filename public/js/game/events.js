define(function () {
  // builtin events
  var listeners = {
      'game:load': [],
      'game:start': [],
      'game:pause': [],
      'game:over': [],
      'game:update': [],
      'game:resize': [],
      'game:render': [],

      'scene:load': [],
      'scene:object:load': [],

      'world:update': [],
      'world:body:add': [],
  };

  var EventEmitter = {

    on: function (event, callback) {
      if (!listeners.hasOwnProperty(event)) {
        listeners[event] = [];
      }

      listeners[event].push(callback);
    },

    emit: function (event, data) {
      listeners[event].forEach(function (listener) {
        listener(data);
      });
    }
  };

  return EventEmitter;
})
