<div align="center">
    <h1>Recognize.js</h1>
    <h4>Node.js image detection and recognition framework</h4>
    <img src='https://img.shields.io/travis/18510047382/recognizejs'>
    <img src='https://img.shields.io/npm/dt/recognizejs'>
    <img src='https://img.shields.io/github/stars/18510047382/recognizejs?style=flat'>
    <img src='https://img.shields.io/github/license/18510047382/recognizejs'>
    <img src='https://img.shields.io/npm/v/recognizejs'>
</div>

## Installation
First download and install [GraphicsMagick](http://www.graphicsmagick.org/). In Mac OS X, you can simply use [Homebrew](https://brew.sh/) and do:

```shell
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
1. Create a model with `Recognizejs` and initialize it:

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

The code for this example can be found in the `examples` folder.

## API
### Create a Recognizejs model object

```
new Recognizejs(config?);
```

Args: **config** is an optional parameter and has the following attributes:

```typescript
{
    cocoSsd?: {
        // base: Controls the base cnn model, can be 'mobilenet_v1', 'mobilenet_v2' or 'lite_mobilenet_v2'. Defaults to 'lite_mobilenet_v2'. lite_mobilenet_v2 is smallest in size, and fastest in inference speed. mobilenet_v2 has the highest classification accuracy.
        base?: ObjectDetectionBaseModel,

        // An optional string that specifies custom url of the model. This is useful for area/countries that don't have access to the model hosted on GCP.
        modelUrl?: string
    },
    mobileNet?: {
        // The MobileNet version number. Use 1 for MobileNetV1, and 2 for MobileNetV2. Defaults to 1.
        version: 1,

        // Controls the width of the network, trading accuracy for performance. A smaller alpha decreases accuracy and increases performance. 0.25 is only available for V1. Defaults to 1.0.
        alpha?: 0.25 | .50 | .75 | 1.0,

        // Optional param for specifying the custom model url or tf.io.IOHandler object. Returns a model object.
        // If you are in mainland China, please change modelUrl to the link of the model on https://hub.tensorflow.google.cn
        modelUrl?: string

        // Optional param specifying the pixel value range expected by the trained model hosted at the modelUrl. This is typically [0, 1] or [-1, 1].
        inputRange?: [number, number]
    }
}
```

`cocoSsd` and `mobileNet` are different neural networks. `cocoSsd` is used to identify and classify multiple objects in an image, while `mobileNet` is used to accurately identify an object.

### Initialize the training model

```
model.init(modelType?);
```

The `init` function returns a `Promise` object, you can use `await` statement to handle it.

Args: **modelType** can be a string or an array. You can set the model to be loaded here to avoid loading the model that is not needed. **[If you don't set modelType, it will load both cocoSsd and mobileNet models]**

**Example:**

```javascript
model.init();

// or

model.init(['cocoSsd', 'mobileNet']);

// or

model.init('cocoSsd');

// or

model.init('mobileNet');
```

If you don't use the `init` function to load the model, the model will load **automatically** when you need to use them, but it may take a long time to load the model, so please choose the loading method as appropriate.

### Identify objects in image

```
model.recognize(buf);
```

The `recognize` function returns a `Promise` object, you can use `await` statement to get its return value.

Args: The **buf** parameter requires you to pass a buffer type of image data. You can read the image through the fs module.

**Return value:**

```javascript
[
    {
        className: [
            'giant panda',
            'panda',
            'panda bear',
            'coon bear',
            'Ailuropoda melanoleuca'
        ],
        probability: 0.9819085597991943
    },
    {
        className: [ 'Chihuahua' ],
        probability: 0.006128392647951841
    },
    {
        className: [ 'French bulldog' ],
        probability: 0.0026271280366927385
    }
]
```

**Example:**

```javascript
const myImgBuf = require('fs').readFileSync(myImgPath);

model.recognize(myImgBuf);
```

### Detect all objects in the image

```
model.detect(buf)
```

The `detect` function returns a `Promise` object, you can use `await` statement to get its return value.

Args: The **buf** parameter requires you to pass a buffer type of image data. You can read the image through the fs module.

**Return value:**

```javascript
[
    {
        bbox: {
            x: 66.92952662706375,
        y: 158.30181241035461,
        width: 157.67111629247665,
        height: 165.00252485275269
        },
        class: 'bear',
        score: 0.9642460346221924
    },
    {
      bbox: {
          x: 180.56899309158325,
          y: -0.32786130905151367,
        width: 246.6680407524109,
        height: 308.3251893520355
        },
        class: 'bear',
        score: 0.9133073091506958
    }
]
```

**Example:**

```javascript
const myImgBuf = require('fs').readFileSync(myImgPath);

model.detect(myImgBuf);
```

### Detect all objects in the image and identify them

```
model.detectAndRecognize(buf);
```

The `detectAndRecognize` function returns a `Promise` object, you can use `await` statement to get its return value.

Args: The **buf** parameter requires you to pass a buffer type of image data. You can read the image through the fs module.

**Return value:**

```javascript
[
    recognizeObject,
    recognizeObject,
    recognizeObject
]
```

**Example:**

```javascript
const myImgBuf = require('fs').readFileSync(myImgPath);

model.detectAndRecognize(myImgBuf);
```

## License
[MIT](http://opensource.org/licenses/MIT)

Copyright ©️ 2020, Yingxuan (Bill) Dong
