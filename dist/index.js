function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _ref = function () {
  var stores = {};
  return {
    _bindStore: function _bindStore(name, component) {
      var initState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      if (!name) throw 'missing store name';
      if (!component || !component.forceUpdate) throw 'missing component';
      if (stores[name]) stores[name].components.push(component);else {
        var store = {
          state: initState,
          setState: function setState(updater) {
            if (typeof updater === 'function') this.state = updater(this.state);else this.state = updater;
            this.components.forEach(function (component) {
              return component.forceUpdate();
            });
          },
          components: [component]
        };
        store.setState = store.setState.bind(store);
        stores = Object.assign({}, stores, _defineProperty({}, name, store));
      }
    },
    _getStore: function _getStore(name) {
      if (!stores[name]) throw "cannot find a store named ".concat(name);
      return [stores[name].state, stores[name].setState];
    },
    _unbindStore: function _unbindStore(name, component) {
      if (!stores[name]) throw "cannot find a store named ".concat(name);

      var deleteElement = function deleteElement(array, element) {
        return array.splice(array.indexOf(element), 1);
      };

      deleteElement(stores[name].components, component);
    }
  };
}(),
    _bindStore = _ref._bindStore,
    _getStore = _ref._getStore,
    _unbindStore = _ref._unbindStore;

export var bindStore = _bindStore;
export var getStore = _getStore;
export var unbindStore = _unbindStore;