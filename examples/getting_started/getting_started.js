const fs = require('fs');

// const Recognizejs = require('recognizejs');
const Recognizejs = require('./../../index');

async function main() {
    // If you are in mainland China, please change modelUrl to the link of the model on https://hub.tensorflow.google.cn
    // const myModel = new Recognizejs({
    //     mobileNet: {
    //         version: 1,
    //         modelUrl: 'https://hub.tensorflow.google.cn/google/imagenet/mobilenet_v1_100_224/classification/1/model.json?tfjs-format=file'
    //     }
    // });
    const myModel = new Recognizejs();

    // initialize it
    // The init function returns a Promise object
    await myModel.init();

    const myImgBuffer = fs.readFileSync('./test.jpg');

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
}

main();
