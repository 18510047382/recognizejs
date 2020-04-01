<div align="center">
    <h1>Recognize.js</h1>
    <h4>Node.js 物体识别神经网络框架</h4>
    <img src='https://img.shields.io/travis/18510047382/recognizejs'>
    <img src='https://img.shields.io/npm/dt/recognizejs'>
    <img src='https://img.shields.io/github/stars/18510047382/recognizejs?style=flat'>
    <img src='https://img.shields.io/github/license/18510047382/recognizejs'>
    <img src='https://img.shields.io/npm/v/recognizejs'>
</div>

## 安装
首先下载并安装 [GraphicsMagick](http://www.graphicsmagick.org/)。在 Mac OS X 中，你可以方便地使用 [Homebrew](https://brew.sh/) 安装:

```shell
brew install graphicsmagick
```

然后使用 npm 下载 `Recognizejs`：

```shell
npm i recognizejs
```

## 开始
导入 `Recognizejs` 到你的项目中:

```javascript
const Recognizejs = require('recognizejs');
```

### 尝试 Recognizejs
1. 创建一个新的 `Recognizejs` 对象模型，然后初始化它:

```javascript
const myModel = new Recognizejs();

// 初始化它
// init 函数会返回一个 Promise 对象
await myModel.init();
```

PS: 模型初始化可能需要 1-2分钟时间（取决于你的设备性能），所以请耐心等待。 :wink:

2. 读取你的图片文件

```javascript
const fs = require('fs');

const myImgBuffer = fs.readFileSync(myImagePath);
```

3. 调用模型的 `recognize` 函数，并将你的图片的 buffer 通过参数传递给它：

```javascript
// recognize 函数会返回一个 Promise 对象，我们推荐你使用 await 语句获取它的返回值
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

上述例子中的代码可以在 `examples` 文件夹中找到。

## API
### 创建一个 Recognizejs 对象

```
new Recognizejs(config?);
```

参数：**config** 是一个可选的参数，并有以下的属性：

```typescript
{
    cocoSsd?: {
        // base：控制基本cnn模型，可以是“ mobilenet_v1”，“ mobilenet_v2”或“ lite_mobilenet_v2”。 默认为“ lite_mobilenet_v2”。 lite_mobilenet_v2的大小最小，推理速度最快。 mobilenet_v2具有最高的分类精度。
        base?: ObjectDetectionBaseModel,

        // 一个可选的字符串，用于指定模型的自定义网址。 这对于无法访问GCP上托管的模型的区域/国家非常有用。
        modelUrl?: string
    },
    mobileNet?: {
        // MobileNet版本号。 将1用于MobileNetV1，将2用于MobileNetV2。 默认为1。
        version: 1,

        // 控制网络的宽度，交易性能的准确性。 较小的alpha会降低准确性并提高性能。 0.25仅适用于V1。 默认为1.0。
        alpha?: 0.25 | .50 | .75 | 1.0,

        // 用于指定自定义模型url或tf.io.IOHandler对象的可选参数。 返回模型对象。
        // 如果您在中国大陆，请将 modelUrl 改为 https://hub.tensorflow.google.cn 上的模型。
        modelUrl?: string

        // 可选参数，用于指定由modelUrl托管的训练模型期望的像素值范围。 通常为[0，1]或[-1，1]。
        inputRange?: [number, number]
    }
}
```

`cocoSsd` 和 `mobileNet` 是两种不同的神经网络。`cocoSsd` 用来侦测一张图片中的多个物体，而 `mobileNet` 用来精确识别单个物体。

### 初始化训练模型

```
model.init(modelType?);
```

`init` 函数会返回一个 `Promise` 对象，你可以使用 `await` 语句来处理它。

参数：**modelType** 可以是一个字符串或数组。您可以在此处设置要加载的模型，以避免加载不需要的模型。**[如果不设置 modelType，它将同时加载 cocoSsd 和 mobileNet 模型]**

**例子：**

```javascript
model.init();

// 或

model.init(['cocoSsd', 'mobileNet']);

// 或

model.init('cocoSsd');

// 或

model.init('mobileNet');
```

如果你不使用 `init` 函数加载模型，当你需要使用它们的时候，他们会 **自动** 加载，但是加载模型可能需要很长的时间，所以请根据情况选择加载方法。

### 识别图片中的物体

```
model.recognize(buf);
```

`recognize` 函数返回一个 `Promise` 对象，你可以使用 `await` 语句来获取它的返回值。

参数：**buf** 参数需要你传递图片文件的 Buffer 数据，你可以使用 fs 模块读取图片文件。

**返回值：**

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

**例子：**

```javascript
const myImgBuf = require('fs').readFileSync(myImgPath);

model.recognize(myImgBuf);
```

### 侦测图片中的全部物体

```
model.detect(buf)
```

`detect` 函数返回一个 `Promise` 对象，你可以使用 `await` 语句来获取它的返回值。

参数：**buf** 参数需要你传递图片文件的 Buffer 数据，你可以使用 fs 模块读取图片文件。

**返回值：**

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

**例子：**

```javascript
const myImgBuf = require('fs').readFileSync(myImgPath);

model.detect(myImgBuf);
```

### 侦测图片中的全部物体并识别它们

```
model.detectAndRecognize(buf);
```

`detectAndRecognize` 函数返回一个 `Promise` 对象，你可以使用 `await` 语句来获取它的返回值。

参数：**buf** 参数需要你传递图片文件的 Buffer 数据，你可以使用 fs 模块读取图片文件。

**返回值：**

```javascript
[
    recognizeObject,
    recognizeObject,
    recognizeObject
]
```

**例子：**

```javascript
const myImgBuf = require('fs').readFileSync(myImgPath);

model.detectAndRecognize(myImgBuf);
```

## 许可证
[MIT](http://opensource.org/licenses/MIT)

Copyright ©️ 2020, Yingxuan (Bill) Dong
