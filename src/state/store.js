import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
//import { offline } from '@redux-offline/redux-offline';
//import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
//import * as localforage from "localforage";

import { rootReducer } from './reducers/rootReducer';

//offlineConfig.persistOptions = { storage: localforage }; // store offline data in indexedDB

const composeEnhancers =
  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

//const store = createStore(
//  rootReducer,
//  {},
//  composeEnhancers(applyMiddleware(thunk), offline(offlineConfig))
//);

const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(thunk)));

// const storeParams = [
//   rootReducer,
//   window.STATE_FROM_SERVER,
//   // compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), offline(offlineConfig)),
//   compose(applyMiddleware(thunk), offline(offlineConfig)),
// ];

// const store = createStore(...storeParams);

export default store;
