const {_bindStore, _getStore, _unbindStore} = (() => {
    let stores = {};
    return {
        _bindStore: function (name, component, initState = {}) {
            if(!name) throw 'missing store name';
            if(!component || !component.forceUpdate) throw 'missing component';
            if (stores[name])
                stores[name].components.push(component);
            else {
                const store = {
                    state: initState,
                    setState: function(updater) {
                        if (typeof updater === 'function')
                            this.state = updater(this.state);
                        else
                            this.state = updater;
                        this.components.forEach(component => component.forceUpdate());
                    },
                    components: [component]
                };
                store.setState = store.setState.bind(store);
                stores = Object.assign({}, stores, {[name]: store});
            }
        },
        _getStore: function (name) {
            if (!stores[name]) throw `cannot find a store named ${name}`;
            return [stores[name].state, stores[name].setState];
        },
        _unbindStore: function (name, component) {
            if (!stores[name]) throw `cannot find a store named ${name}`;
            let deleteElement = (array, element) => array.splice(array.indexOf(element), 1);
            deleteElement(stores[name].components, component);
        },
    }
})();

export const bindStore = _bindStore;
export const getStore = _getStore;
export const unbindStore = _unbindStore;