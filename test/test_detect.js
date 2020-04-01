'use strict';

import test from 'ava';

const fs = require('fs'),
    path = require('path');

const Recognizejs = require(path.join(__dirname, './../index'));

test('detect testing', async t => {
    const model = new Recognizejs();
    await model.init('cocoSsd');

    const types = [undefined, null, 0, true, [], {}, () => {}, Symbol()];

    for (let i = 0; i < types.length; i++) {
        await t.throwsAsync(async function() {
            await model.detect(types[i]);
        })
    }

    const testImgBuf = fs.readFileSync(path.join(__dirname, './img/test.jpg'));

    t.is(Array.isArray(await model.detect(testImgBuf)), true);
})
