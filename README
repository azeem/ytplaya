# Youtube Playlist Module

A simple playlist module with dropdown for artist selection.

# Running

The application is bundled with webpack. Webpack CLI is required to build the bundle. The following
commands install's webpack cli.

	npm install webpack -g

Install and dependencies with the following command

	npm install

To build the bundles, run the following command

	npm run build

To start the server, run the following command

	npm run start

This starts a server at `0.0.0.0:1337`.

# Design

+ The app is built using the Redux container library. Redux is predictable, extremely simple and efficient. Redux
  also works well on node, making it easy to reuse code between server and client side.
+ Webpack is used for bundling the application. This allows cleaner build pipline, modularization and asset handling.
+ Styles are modularized using CSS-Modules. This makes styles local to components and easily composable.
+ Two webpack configs are used. One for server and one for client. The client side config bundles all the javascript
  and CSS to be sent to the client (`dist/bundle.js`). The server side config bundles the React Components for server 
  side rendering (`dist/server.js`). This is required because the react components import css styles directly, these 
  import statements must be resolved by a webpack loader. During server side rendering react components are imported
  from the `dist/server` file rather than the component files directly.
+ The above choices along with Isomorphic fetch API allows nearly full code re-use across client and server.

# Issues

+ Webpack config for both client-side and server-side generates `dist/style.css`. The server-side requires the css
  parsing pipeline to get the localized classnames. While the client-side requires this to generate the raw css asset.
  A "Parse Only" config for the css loader could fix this redundant file generation.
