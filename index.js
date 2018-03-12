'use strict';
const IpMonitor = require('ip-monitor');
const freednsApi = require('freedns-api');
const syslog = require('modern-syslog');
process.title = 'freedns-client';

module.exports = (config) => {

    syslog.log(syslog.LOG_NOTICE, '********** Starting freedns-client **********');

    const ipMonitor = new IpMonitor({
        pollingInterval: config.pollingInterval
    });

    // Hack ip monitor logging
    ipMonitor.log = (...args) => {
        syslog.log(syslog.LOG_NOTICE, args.join(' '));
    };

    ipMonitor.on('change', async (prevIp, newIp) => {
        try {
            syslog.log(syslog.LOG_NOTICE, `Ip changed from ${prevIp} to ${newIp} Updating freedns record...`);
            const status = await freednsApi.update({
                updateUrl: config.updateUrl,
                address: newIp
            });
            syslog.log(syslog.LOG_NOTICE, status);
            
        } catch (error) {
            ipMonitor.emit('error', error);
        }
    });


    ipMonitor.on('error', (error) => {
        syslog.log(syslog.LOG_ERR, error);
    });

    ipMonitor.start();


};