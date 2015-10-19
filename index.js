import thunkMiddleware from "redux-thunk";
import ReactDOM from "react-dom";
import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ytPlayaReducer from "./reducers";
import YTPlaya from "./components/ytplaya";
import * as Config from "./config";

const store = applyMiddleware(thunkMiddleware)(createStore)(ytPlayaReducer, window.__INIT_STATE__);

ReactDOM.render(
	<Provider store={store}>
		<YTPlaya apiKey={Config.apiKey} artists={Config.artistList}/>
	</Provider>,
	document.getElementById("root")
);