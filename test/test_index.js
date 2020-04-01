'use strict';

import test from 'ava';

const fs = require('fs'),
    path = require('path');

const Recognizejs = require(path.join(__dirname, './../index'));

test('init testing', async t => {
    const types = [null, 0, true, {}, () => {}, Symbol()];

    for (let i = 0; i < types.length; i++) {
        await t.throwsAsync(async function() {
            await (new Recognizejs()).init(types[i]);
        })
    }

    t.notThrows(async () => {
        new Recognizejs();
    })

    t.notThrows(async () => {
        await ((new Recognizejs()).init());
    })

    t.notThrows(async () => {
        await ((new Recognizejs()).init('cocoSsd'));
    })

    t.notThrows(async () => {
        await ((new Recognizejs()).init('mobileNet'));
    })

    t.notThrows(async () => {
        await ((new Recognizejs()).init(['mobileNet', 'cocoSsd']));
    })
})
