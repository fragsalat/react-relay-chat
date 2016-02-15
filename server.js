import express from 'express';
import graphQLHTTP from 'express-graphql';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import {Schema} from './data/schema';

const APP_PORT = 3001;
const GRAPHQL_PORT = 8081;

// Expose a GraphQL endpoint
var graphQLServer = express();
graphQLServer.use('/', graphQLHTTP({
  graphiql: true,
  pretty: true,
  schema: Schema,
}));
graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
));

// Serve the Relay app
var compiler = webpack({
  entry: path.resolve(__dirname, 'src/js', 'chat.js'),
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        test: /\.js$/,
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      },
      {
        test: /\.(eot|woff|ttf|svg)(\?.*)?$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  output: {filename: 'chat.js', path: '/'}
});
var app = new WebpackDevServer(compiler, {
  contentBase: '/src/',
  proxy: {'/graphql': `http://localhost:${GRAPHQL_PORT}`},
  publicPath: '/js/',
  stats: true
});
// Serve static resources
app.use('/', express.static(path.resolve(__dirname, 'src')));
app.listen(APP_PORT, () => console.log('Listen on', APP_PORT));
