import React, { Component } from "react";
import AppContainer from "./AppContainer.js";
import Map from "../Components/MapComponent.js";

import { createStore, applyMiddleware, compose } from "redux";
import { Provider, connect } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import reducer from "../reducers";

const loggerMiddleware = createLogger({
  predicate: (getState, action) => __DEV__
});

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      loggerMiddleware
    )
  );
  return createStore(reducer, initialState, enhancer);
}

const store = configureStore({});

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
// class App extends Component {
//   render() {
//     return (
//       <Provider store={store}>
//         <AppContainer />
//       </Provider>
//     );
//   }
// }

// const LoginOrMap = connect(state => ({
//   isAuthenticated: state.user.isAuthenticated
// }))(({ isAuthenticated }) => {
//   if (isAuthenticated) {
//     return <Map />;
//   } else {
//     return <AppContainer />;
//   }
// });

const App = () =>
  <Provider store={store}>
    {/* <LoginOrMap /> */}
    <AppContainer />
  </Provider>;

export default App;
