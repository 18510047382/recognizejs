'use strict';

const gm = require('gm');

module.exports = async (buf, width, height, x, y) => {
    const newImgBuf = await (new Promise((res, rej) => {
        const img = gm(buf)
            .crop(width, height, x, y)
            .toBuffer(function(err, newBuf) {
                if (err) {
                    rej();
                    return;
                }

                res(newBuf);
            })
    }))

    return newImgBuf;
}
