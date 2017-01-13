/**
 * The contents of this file are subject to the OpenMRS Public License
 * Version 1.0 (the "License"); you may not use this file except in
 * compliance with the License. You may obtain a copy of the License at
 * http://license.openmrs.org
 * Software distributed under the License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
 * License for the specific language governing rights and limitations
 * under the License.
 * Copyright (C) OpenMRS, LLC.  All Rights Reserved.
 */
// generated on 2016-12-10 using generator-openmrs-owa 0.3.2
'use strict';
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const env = require('yargs').argv.mode;
const target = require('yargs').argv.target;

const UglifyPlugin = webpack.optimize.UglifyJsPlugin;
const CommonsChunkPlugin =  webpack.optimize.CommonsChunkPlugin;
const DedupePlugin = webpack.optimize.DedupePlugin;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackOnBuildPlugin = require('on-build-webpack');

const nodeModulesDir = path.resolve(__dirname, '../node_modules');

const THIS_APP_ID = 'reporting';

var plugins = [];
const nodeModules = {};

let outputFile = `.bundle`;
let outputPath = `${__dirname}/dist/`;;

let devtool;

/** Minify for production */
if (env === 'production') {

    outputFile = `${outputFile}.min.js`;

	  plugins.push(new UglifyPlugin({
	    output: {
	      comments: false,
	    },
	    minimize: true,
	    sourceMap: false,
	    compress: {
	        warnings: false
	    }
	  }));

	  plugins.push(new DedupePlugin());

	  plugins.push(new WebpackOnBuildPlugin(function(stats) {
	      var archiver = require('archiver');
	      var output = fs.createWriteStream(THIS_APP_ID +'.zip');
	      var archive = archiver('zip');
	      output.on('close', function () {
	          console.log('distributable has been zipped! size: '+archive.pointer());
	      });
	      archive.on('error', function(err) {
	          throw err;
	      });
	      archive.pipe(output);
	      archive.directory(`${outputPath}`, '');
	      archive.finalize();
	  }))

}
else {

    outputFile = `${outputFile}.js`;
    devtool = 'source-map';

}

if (env === 'deploy') {

    var config = require('./config.json');

    outputPath = `${config.LOCAL_OWA_FOLDER}${THIS_APP_ID}`;

    plugins.push(new BrowserSyncPlugin({
        proxy: {
            target : config.APP_ENTRY_POINT
        }
    }));

}

plugins.push(new CommonsChunkPlugin("vendor", "vendor.bundle.js"));

plugins.push(new HtmlWebpackPlugin({
    template: './app/index.html',
    inject: 'body'
}));

var webpackConfig = {
  quiet: false,
  entry: {
	  app : `${__dirname}/app/js/reporting.jsx`,
	  css: `${__dirname}/app/css/reporting.css`,
	  vendor: [
	      'openmrs-contrib-uicommons',
          'react',
          'react-dom'
    ]
  },
  devtool: devtool,
  target,
  output: {
    path: outputPath,
    filename: '[name]'+outputFile,
  },
  module: {
    loaders: [{
	    test: /\.jsx?$/,
	    loader: 'babel-loader',
	    exclude: /node_modules/,
	    query: {
	        presets: ['es2015', 'react'],
	        cacheDirectory : true
	    }
    },{
	    test: /\.css$/,
	    loader: 'style-loader!css-loader'
	}, {
	    test: /\.(png|jpg|jpeg|gif|svg)$/,
	    loader: 'url'
    }, {
	    test: /\.html$/,
	    loader: 'html'
	}],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins,
  externals: nodeModules,
};

module.exports = webpackConfig;
