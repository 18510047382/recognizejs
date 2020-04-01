<div align="center">
    <h1>Recognize.js</h1>
    <h4>Node.js image detection and recognition framework</h4>
    <img src='https://img.shields.io/travis/18510047382/recognizejs'>
    <img src='https://img.shields.io/npm/dt/recognizejs'>
    <img src='https://img.shields.io/github/downloads/18510047382/recognizejs/total'>
    <img src='https://img.shields.io/github/license/18510047382/recognizejs'>
    <img src='https://img.shields.io/npm/v/recognizejs'>
</div>

## Installation
First download and install [GraphicsMagick](http://www.graphicsmagick.org/). In Mac OS X, you can simply use [Homebrew](https://brew.sh/) and do:

```shell
brew install imagemagick
brew install graphicsmagick
```

Then download the `Recognizejs` using npm:

```shell
npm i recognizejs
```

## Getting started
Import `Recognizejs` into your project:

```javascript
const Recognizejs = require('recognizejs');
```

### Try Recognizejs
1. Create a model with Recognizejs and initialize it:

```javascript
const myModel = new Recognizejs();

// initialize it
// The init function returns a Promise object
await myModel.init();
```

PS: Model initialization may take up to 1-2 minutes (depending on the performance of your device), so please be patient. :wink:

2. Read your image file

```javascript
const fs = require('fs');

const myImgBuffer = fs.readFileSync(myImagePath);
```

3. Call the model's `recognize` function and pass the image buffer as a parameter:

```javascript
// The recognize function will return a Promise object, we recommend that you use await statement to get the return value.
const results = await myModel.recognize(myImgBuffer);

/*
    [
        {
            className: ['className1', 'className2', 'className...'],
            probability: 0.9
        },
        {
            className: ['className1', 'className2', 'className...'],
            probability: 0.599
        }
    ]
*/
console.log(results);
```

## Bug fixed
国内无法访问tfhub，请搜索node_module将所有 `https://tfhub.dev/` 改为 `https://hub.tensorflow.google.cn/`
