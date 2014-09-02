'use strict';

/*
Parse responses from freeDNS API, more info at: http://freedns.afraid.org/api/
*/


/*
Parse ASCII formated update urls

sample request:
http://freedns.afraid.org/api/?action=getdyndns&sha=<username|password>

sample response:
blah.mooo.com|10.10.10.1|http://freedns.afraid.org/dynamic/update.php?xxxx
bloh.mooo.com|85.73.73.102|http://freedns.afraid.org/dynamic/update.php?xxxx
bleh.mooo.com|94.65.142.5|http://freedns.afraid.org/dynamic/update.php?xxx
        
*/
var updateUrls = function (body) {
    return body.split('\n').map(function (row) {
        row = row.split('|');
        return {
            domain: row[0],
            ip: row[1],
            updateUrl: row[2]
        };
    });
};



/*
Parse update status

sample request:
http://freedns.afraid.org/dynamic/update.php?xxxx

sample responses:
ERROR: Address 85.75.249.86 has not changed

Updated bleh.mooo.com to 85.75.249.86 in 0.346 seconds

*/
var updateStatus = function (body) {
    var parsed = body.split(':');
    
    if (parsed[0] === 'ERROR') {
        throw new Error(parsed[1]);
    }
    return parsed[0];
};


module.exports = {
    updateUrls: updateUrls,
    updateStatus: updateStatus
};