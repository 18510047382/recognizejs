'use strict';

const jpeg = require('jpeg-js');

module.exports = buf => {
    const pixels = jpeg.decode(buf);

    const numChannels = 3;
    const numPixels = pixels.width * pixels.height;
    const values = new Int32Array(numPixels * numChannels);

    for (let i = 0; i < numPixels; i++) {
        for (let channel = 0; channel < numChannels; ++channel) {
            values[i * numChannels + channel] = pixels[i * 4 + channel];
        }
    }

    return pixels;
}
