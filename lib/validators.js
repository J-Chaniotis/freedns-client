'use strict';

var revalidator = require('revalidator');

var getUpdateUrls = function (config) {
    return revalidator.validate(config, {
        properties: {
            username: {
                required: true,
                allowEmpty: false,
                type: 'string'
            },
            password: {
                required: true,
                allowEmpty: false,
                type: 'string'
            }
        }
    });
};

var updateByUrl = function (config) {
    return revalidator.validate(config, {
        properties: {
            url: {
                required: true,
                allowEmpty: false,
                format: 'url'
            },
            ip: {
                required: false,
                format: 'ip-address'
            }
        }
    });
};


var update = function (config) {
    return revalidator.validate(config, {
        properties: {
            username: {
                required: true,
                allowEmpty: false
            },
            password: {
                required: true,
                allowEmpty: false
            }
            //Domain OR DomainS?
        }
    });
};



module.exports = {
    getUpdateUrls: getUpdateUrls,
    updateByUrl: updateByUrl,
    update: update

};