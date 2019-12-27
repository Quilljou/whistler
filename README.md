# Chrome Extension TypeScript React Starter

<!-- [![Build Status](https://travis-ci.org/chibat/chrome-extension-typescript-starter.svg?branch=master)](https://travis-ci.org/chibat/chrome-extension-typescript-starter) -->

Chrome Extension, TypeScript, React and Visual Studio Code

## Prerequisites

* [node + npm](https://nodejs.org/) (Current Version)

## Option

* [Visual Studio Code](https://code.visualstudio.com/)

## Includes the following

* TypeScript
* React
* Stylus
* Webpack
* Moment.js
* Eslint
* Prettier
* Example Code
    * Chrome Storage
    * Options Version 2
    * content script
    * count up badge number
    * background

## Project Structure

* src: TypeScript source files
* dist: Chrome Extension directory
* dist/js: Generated JavaScript files

## Setup

```
npm install
```

## Import as Visual Studio Code project

...

## Build

```
npm run prod  # or yarn prod
```

## Build in watch mode

### terminal

```
npm run start  # or yarn start
```

### Visual Studio Code

Run watch mode.

type `Ctrl + Shift + B`

## Load extension to chrome

Load `dist` directory


## About CSS in production mode
If you want to generate independent css files in production mode. you can uncoment the MiniCssExtractPlugin in `webpack/webpack.prod.js` and css entry  in `public/*.html`. comment the style-loader in `webpack/webpack.prod.js`.
