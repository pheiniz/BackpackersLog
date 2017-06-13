import React, { Component } from "react";
import AppContainer from "./AppContainer.js";
import Map from "../Components/MapComponent.js";
import Spinner from "../Components/Spinner.js";

import { createStore, applyMiddleware, compose } from "redux";
import { Provider, connect } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import reducer from "../reducers";

import Firebase from "../Config/Firebase.js";

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

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { loaded: false };
  }

  componentWillMount() {
    Firebase.auth().onAuthStateChanged(user => {
      this.setState({ loaded: true });

      // if (user) {
      //   store.dispatch({ type: SIGN_IN_SUCCESS, payload: user });
      // }
    });
  }

  render() {
    return (
      <Provider store={store}>
        {this.state.loaded ? <AppContainer /> : <Spinner />}
      </Provider>
    );
  }
}

export default App;
