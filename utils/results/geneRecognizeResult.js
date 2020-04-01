'use strict';

module.exports = results => {
    for (let i = 0; i < results.length; i++) {
        results[i].className = results[i].className.split(', ');
    }

    return results;
}
