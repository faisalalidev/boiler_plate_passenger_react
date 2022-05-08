// // @flow
// import * as storage from "redux-storage";
// import { createLogger } from "redux-logger";
// import createSagaMiddleware from "redux-saga";
// import filter from "redux-storage-decorator-filter";
// import { createStore, applyMiddleware, combineReducers } from "redux";
// import { composeWithDevTools } from "remote-redux-devtools";
// import {
//   createReactNavigationReduxMiddleware,
//   createReduxContainer,
//   createNavigationReducer
// } from "react-navigation-redux-helpers";
// import { createAppContainer } from "react-navigation";
// import { connect } from "react-redux";
// import createEngine from "redux-storage-engine-reactnativeasyncstorage";
// import { routeConfig } from "../navigator";

// import sagas from "../sagas";
// import reducers from "../reducers";

// const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

// const logger = createLogger({
//   predicate: () => isDebuggingInChrome,
//   collapsed: true,
//   duration: true,
//   diff: true
// });

// const AppNavigator = createAppContainer(routeConfig);
// const middleware = createReactNavigationReduxMiddleware(
//   state => state.nav,
//   "root"
// );

// const App = createReduxContainer(AppNavigator, "root");

// const mapStateToProps = state => ({
//   state: state.nav
// });

// export const AppWithNavigationState = connect(mapStateToProps)(App);
// export let store = null;
// export default function configureStore(onComplete: Function) {
//   const engine = filter(
//     createEngine("AppTree"),
//     [
//       "whitelisted-key",
//       ["user", "data"],
//       ["appStateReducer", "showAutoCompleteViews"],
//       ["appStateReducer", "showCompleteRideViews"],
//       ["appStateReducer", "showHomeViews"],
//       ["appStateReducer", "showRequestRideViews"],
//       ["appStateReducer", "showRideRatingContentViews"],
//       ["appStateReducer", "showStartRideViews"],
//       ["appStateReducer", "showRideRatingContentViews"],
//       ["appStateReducer", "showRideSearchDetailViews"],
//       ["appStateReducer", "showRideSearchingViews"],
//       ["calculateEstimateFare", "data"],
//       ["getPassengerRecentLocation", "data"],
//       ["googleAutoComplete", "dropoffLocation"],
//       ["googleAutoComplete", "geoRequestType"],
//       ["googleAutoComplete", "nearByData"],
//       ["googleAutoComplete", "pickupLocation"],
//       ["googleAutoComplete", "selectedDropOffLocation"],
//       ["googleAutoComplete", "selectedDropoffQueryText"],
//       ["googleAutoComplete", "selectedPickupLocation"],
//       ["googleAutoComplete", "selectedPickupQueryText"],
//       ["googleAutoComplete", "selectedType"],
//       ["nearByAllDriver", "data"],
//       ["vehicleCategory", "data"],
//       ["tripReducer", "data"],
//       //   ["requestRide", "requestRideStatus"],
//       //   ["requestRide", "requestRideSuccess"],

//       //   ["startRideReducer", "startTripStatus"],
//       //   ["startRideReducer", "data"],

//       ["shortestPath", "data"],
//       ["shortestPath", "distance"],
//       ["shortestPath", "duration"],
//       ["shortestPath", "polyLinecoordinates"]
//     ],
//     []
//   );
//   const storeMiddleware = storage.createMiddleware(engine);
//   const sagaMiddleware = createSagaMiddleware();

//   store = createStore(
//     storage.reducer(reducers),
//     composeWithDevTools(
//       applyMiddleware(sagaMiddleware, storeMiddleware, logger, middleware)
//     )
//   );

//   if (isDebuggingInChrome) {
//     window.store = store;
//   }

//   const load = storage.createLoader(engine);
//   load(store)
//     .then(onComplete)
//     .catch(() =>
//       console.log("Failed to load previous state @ configureStore.js#44")
//     );

//   sagaMiddleware.run(sagas);

//   return store;
// }

import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import {createLogger} from 'redux-logger';
import reducers from '../reducers';
import rootSaga from '../sagas';
import AsyncStorage from '@react-native-community/async-storage';

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

/* redux logger config */
const logger = createLogger({
  predicate: () => isDebuggingInChrome,
  collapsed: true,
  duration: true,
  diff: true,
});

/* redux persist config */
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

/* saga config */
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware, logger),
);
const persistor = persistStore(store);

// run the saga
sagaMiddleware.run(rootSaga);

export {store, persistor};
