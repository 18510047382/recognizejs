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

The code for this example can be found in the `examples` folder.

## API
**Create a Recognizejs model object:**

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

`cocoSsd` and `mobileNet` are different neural networks in 2. `cocoSsd` is used to identify and classify multiple objects in an image, while `mobileNet` is used to accurately identify an object.

**Initialize the training model:**

```
model.init(modelType?);
```

Args: **modelType** can be a string or an array. You can set the model to be loaded here to avoid loading the model that is not needed. **[If you don't set modelType, it will load both cocoSsd and mobileNet models]**

**Example:**

```javascript
model.init(['cocoSsd', 'mobileNet']);

// or

model.init('cocoSsd');

// or

model.init('mobileNet');
```

If you don't use the `init` function to load the model, the model will load **automatically** when you need to use them, but it may take a long time to load the model, so please choose the loading method as appropriate.

- `model.recognize(buf)` **[r]**

- `model.detect(buf)`

- `model.detectAndRecognize(buf)`

## Bug fixed
国内无法访问tfhub，请搜索node_module将所有 `https://tfhub.dev/` 改为 `https://hub.tensorflow.google.cn/`

```
(node:9153) UnhandledPromiseRejectionWarning: FetchError: request to https://tfhub.dev/google/imagenet/mobilenet_v1_100_224/classification/1/model.json?tfjs-format=file failed, reason: connect ETIMEDOUT
```
