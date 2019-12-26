const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
	entry: {
		'root-application': 'src/root-application/root-application.js',
		'common-dependencies': [
			'core-js/client/shim.min.js',
			'@angular/common',
			'@angular/compiler',
			'@angular/core',
			'@angular/platform-browser-dynamic',
			'@angular/router',
			'reflect-metadata',
			'react',
			'react-dom',
			'vue',
			'vue-router'
		],
	},
	output: {
		publicPath: '/dist/',
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: [path.resolve(__dirname, 'node_modules')],
				loader: 'babel-loader',
			},
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
			},
			{
        test: /\.vue$/,
        loader: 'vue-loader'
      }
		],
	},
	node: {
		fs: 'empty'
	},
	resolve: {
		modules: [
			__dirname,
			'node_modules',
		],
		alias: {
      vue: 'vue/dist/vue.js'
    },
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new VueLoaderPlugin(['dist']),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common-dependencies',
		}),
		new ContextReplacementPlugin(
			/(.+)?angular(\\|\/)core(.+)?/,
			path.resolve(__dirname, '../src')
			)
	],
	devtool: 'source-map',
	externals: [
		'vue', 'vue-router'
	],
};
