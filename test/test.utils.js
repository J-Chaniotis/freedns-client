'use strict';
/* globals describe, it*/

var utils = require('../lib/utils');
var expect = require('chai').expect;

describe('utils.js test', function () {

    it('should validate config', function () {

        var config = {
            valid: {
                username: 'batman',
                password: 'b@',
                domains: ['blah.bloh.bl', 'blah.bleh.bl']
            },
            invalid1: {
                username: '',
                password: '',
                domains: []
            },
            invalid2: {
                username: 'batman',
                password: 'b@'
            },
            invalid3: {},
            invalid4: undefined
        };

    });
});