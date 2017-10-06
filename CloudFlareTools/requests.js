const fs = require('fs');
const request = require('request');

var options;

function setupRequest() {
    options = JSON.parse(fs.readFileSync("./options.json"));
}

module.exports.getDNSRecords = function (callback) {
    setupRequest();
    options.url += "dns_records";
    options.method = "GET";

    request(options, function (error, response, body) {
        if (error) {
            console.log(error);
        } else {
            callback(response, body);
        }
    });
};

module.exports.deleteDNSRecord = function (id, callback) {
    setupRequest();
    options.url += "dns_records/" + id;
    options.method = "DELETE";
    
    request(options, function (error, response, body) {
        if (error) {
            console.log(error);
        } else {
            callback(response, body);
        }
    })
};