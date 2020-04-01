'use strict';

const tf = require('@tensorflow/tfjs-node'),
    cocoSsd = require('@tensorflow-models/coco-ssd'),
    mobilenet = require('@tensorflow-models/mobilenet');

const cropImg = require('./utils/cropImg'),
    getPixels = require('./utils/getPixels');

const generateDetectResult = require('./utils/results/geneDetectResult'),
    generateRecognizeResult = require('./utils/results/geneRecognizeResult');

class Model {
    constructor(config = {}) {
        this.cocoSsdModel = null;
        this.mobileNetModel = null;
        this.config = config;
    }

    // init model
    async init(model = ['cocoSsd', 'mobileNet']) {
        if (model.indexOf('cocoSsd') !== -1) {
            this.cocoSsdModel = await cocoSsd.load(this.config.cocoSsd);
        }

        if (model.indexOf('mobileNet') !== -1) {
            this.mobileNetModel = await mobilenet.load(this.config.mobileNet);
        }
    }

    // detect objects
    async detect(buf) {
        if (!this.cocoSsdModel) {
            await this.init('cocoSsd');
        }

        const pixels = getPixels(buf);

        const predictions = await this.cocoSsdModel.detect(pixels);

        return generateDetectResult(predictions);
    }

    // recognize single object
    async recognize(buf) {
        if (!this.mobileNetModel) {
            await this.init('mobileNet');
        }

        const pixels = getPixels(buf);

        const predictions = await this.mobileNetModel.classify(pixels);

        return generateRecognizeResult(predictions);
    }

    // detect and recognize all objects
    async detectAndRecognize(buf) {
        const predictions = await this.detect(buf),
            results = [];

        for (let i = 0; i < predictions.length; i++) {
            const newImgBuf = await cropImg(buf, predictions[i].bbox.width, predictions[i].bbox.height, predictions[i].bbox.x, predictions[i].bbox.y);

            results.push(await this.recognize(newImgBuf));
        }

        return results;
    }
}

module.exports = Model;
