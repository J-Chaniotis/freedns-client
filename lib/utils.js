'use strict';

var revalidator = require('revalidator');

var validateConfig = function (config) {
    return revalidator.validate(config, {
        properties: {
            username: {
                required: true,
                allowEmpty: false
            },
            password: {
                required: true,
                allowEmpty: false
            },
            domains: {
                required: true,
                allowEmpty: false,
                type: 'array',
                minItems: 1
            }
        }
    });
};


module.exports = {
    validateConfig: validateConfig
};