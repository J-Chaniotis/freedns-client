'use strict';

var crypto = require('crypto');
var request = require('request');
var find = require('array-find');
var parse = require('./parsers');
var validate = require('./validators');

/*
Get update urls from freedns API
More info at: http://freedns.afraid.org/api/
@param config {Object} props: username, password
@param cb {Function}
*/
var getUpdateUrls = function (config, cb) {

    var isValid = validate.getUpdateUrls(config);
    if (isValid.errors.length) {
        throw new Error(isValid.errors);
    }

    var shasum = crypto.createHash('sha1').update(config.username + '|' + config.password).digest('hex');
    var options = {
        url: 'http://freedns.afraid.org/api/',
        qs: {
            action: 'getdyndns',
            sha: shasum,
        }
    };

    request(options, function (err, res, body) {
        if (err) {
            return cb(err, null);
        }

        try {
            var parsed = parse.updateUrls(body);
            cb(null, parsed);
        } catch (err) {
            cb(err, null);
        }

    });
};

/*
Updates a domain using a direct url
@param config {Object} props: url, [ip]
@param cb {Function}
*/
var updateByUrl = function (config, cb) {

    var isValid = validate.updateByUrl(config);
    if (isValid.errors.length) {
        throw new Error(isValid.errors);
    }

    var options = {
        url: config.url,
        qs: config.ip ? {
            address: config.ip
        } : null
    };

    request(options, function (err, res, body) {
        if (err) {
            return cb(err, null);
        }
        try {
            var parsed = parse.updateStatus(body);
            cb(null, parsed);
        } catch (err) {
            cb(err, null);
        }

    });

};

/*
High level update function. Logs in to freeDNS and update a domain name.

*/
var update = function (config, cb) {

    var isValid = validate.update(config);
    if (isValid.errors.length) {
        throw new Error(isValid.errors);
    }

    getUpdateUrls(config.username, config.password, function (err, data) {
        var details = find(data, function (elm) {
            return elm.domain === config.domain;
        });

        if (!details) {
            return cb(new Error('Domain not found'), null);
        }

        updateByUrl(details.updateUrl, config.address, cb);
    });
};

module.exports = {
    getUpdateUrls: getUpdateUrls,
    updateByUrl: updateByUrl,
    update: update
};