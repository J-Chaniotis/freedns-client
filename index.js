'use strict';

var crypto = require('crypto');
var request = require('request');
var utils = require('utils');

var config = {
    username: '',
    password: '',
    domains: ''
};

var shasum = crypto.createHash('sha1').update(config.username + '|' + config.password).digest('hex');

var options = {
    url: 'http://freedns.afraid.org/api/',
    qs: {
        action: 'getdyndns',
        sha: shasum,
    }
};

var parse = function (body) {
    return body.split('\n').map(function (entry) {
        entry = entry.split('|');
        return {
            domain: entry[0],
            ip: entry[1],
            update: entry[2]
        };
    });
};

var response = function (err, res, body) {
    if (err) {
        throw err;
    }
    console.log(parse(body));

};

request(options, response);

module.exports.setup = function (config) {

    var isValid = utils.validateConfig(config);

    if (isValid.errors.length) {
        console.error(isValid.errors);
        process.exit(1);
    }

    var update = function (address, cb) {

    };

    return {
        update: update
    };
};