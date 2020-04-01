'use strict';

module.exports = results => {
    for (let i = 0; i < results.length; i++) {
        results[i].bbox = {
            x: results[i].bbox[0],
            y: results[i].bbox[1],
            width: results[i].bbox[2],
            height: results[i].bbox[3]
        }
    }

    return results;
}
