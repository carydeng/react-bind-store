# react-bind-store

[![npm package](https://img.shields.io/npm/v/react-bind-store/latest.svg)](https://www.npmjs.com/package/react-bind-store)

A simple shared store for react.

## Installation

```bash
$ npm install --save react-bind-store
```

## Usage

These two component shares the store piece named `'my-store'`, and any call to `setState` will re-render both components.
```javascript
import React from 'react';
import {bindStore, getStore, unbindStore} from 'react-bind-store';

class MyComponent extends React.Component {
    componentWillMount () {
        bindStore('my-store', this, {value: 0});
    }

    componentWillUnmount () {
        unbindStore('my-store', this);
    }
    
    render() {
        const [state, setState] = getStore('default');
        // use state and setState like this.state and this.setState
        return <div>{state}</div>;
    }
}

class MyComponent2 extends React.Component {
    componentWillMount () {
        bindStore('my-store', this, {value: 0});
    }

    componentWillUnmount () {
        unbindStore('my-store', this);
    }
    
    render() {
        const [state, setState] = getStore('default');
        // use state and setState like this.state and this.setState
        return <div>{state}</div>;
    }
}
```

## API

### `bindStore(storeName, component[, defaultState])`

Bind the component to a store; if the store does not exist, a new store will be created. Should be called in `componentWillMount()`;

`storeName`: the unique name (key) of a store. 

`component`: a reference to the component to be bound to the store. Normally it should be `this`.

`defaultState` (optional): the initial state of store.

### `unbindStore(storeName, component)`

Unbind the component from a store. Should be called in `componentWillUnmount()`.

### `getStore(storeName)`

Returns a `[state, setState]` pair used for accessing the store data. Should be used just like the built-in `this.state` and `this.setState()`. Calling `setState` will trigger re-rendering.