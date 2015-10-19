import path from "path";
import Express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { loadPlaylist, artistChange } from "./actions"
import ytPlayaReducer from "./reducers";
import YTPlaya from "./dist/server";
import * as Config from "./config";
import thunkMiddleware from "redux-thunk";
import fs from "fs";
import morgan from "morgan";

const app = Express();

app.use(morgan("combined"));
app.use("/static", Express.static("dist"));

function renderIndex(rootRender, initState) {
	const indexFile = fs.readFileSync("index.html", "utf8");
	const initStateVar = "window.__INIT_STATE__=" + JSON.stringify(initState) + ";";
	return indexFile.replace("<!--ROOT_RENDER-->", rootRender).replace("<!--INIT_STATE-->", initStateVar);
}

app.use((req, res) => {
	const store = applyMiddleware(thunkMiddleware)(createStore)(ytPlayaReducer, {
		currentArtist: Config.artistList[Config.defaultArtist]
	});
	store.dispatch(loadPlaylist(Config.artistList[Config.defaultArtist], Config.apiKey))
	.then(val => {
		const rootRender = renderToString(
			<Provider store={store}>
				<YTPlaya apiKey={Config.apiKey} artists={Config.artistList}/>
			</Provider>
		);
		res.send(renderIndex(rootRender, store.getState()));
	})
	.catch(() => {
		res.send("error");
	});
});

app.listen(1337, "0.0.0.0", function(err) {
	if(err) {
		console.log(err);
	} else {
		console.log("Listening at 0.0.0.0: 1337");
	}
});

