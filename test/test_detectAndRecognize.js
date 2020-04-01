'use strict';

import test from 'ava';

const fs = require('fs'),
    path = require('path');

const Recognizejs = require(path.join(__dirname, './../index'));

test('detect and recognize testing', async t => {
    const model = new Recognizejs();
    await model.init(['cocoSsd', 'mobileNet']);

    const types = [undefined, null, 0, true, [], {}, () => {}, Symbol()];

    for (let i = 0; i < types.length; i++) {
        await t.throwsAsync(async function() {
            await model.detectAndRecognize(types[i]);
        })
    }

    const testImgBuf = fs.readFileSync(path.join(__dirname, './img/test.jpg'));

    t.is(Array.isArray(await model.detectAndRecognize(testImgBuf)), true);
})
