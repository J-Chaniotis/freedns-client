'use strict';
const freednsClient = require('./index');
freednsClient({
    updateUrl: 'https://freedns.afraid.org/dynamic/update.php?xxxxxxxxxxxxxxxxx=',
    pollingInterval: 900000
});