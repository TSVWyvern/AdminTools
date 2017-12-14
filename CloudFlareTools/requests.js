const fs = require('fs');
const request = require('request');

var options;

function setupRequest() {
    options = JSON.parse(fs.readFileSync("../CloudFlareTools/resources/options.json"));
}

function makeRequest(options, callback) {
    request(options, function (error, response, body) {
        if (error) {
            console.log(error);
        } else {
            callback(response, body);
        }
    });
}

module.exports.getDNSRecords = function (callback) {
    setupRequest();
    options.url += "dns_records";
    options.method = "GET";
    makeRequest(options, callback);
};

module.exports.deleteDNSRecord = function (id, callback) {
    setupRequest();
    options.url += "dns_records/" + id;
    options.method = "DELETE";
    makeRequest(options, callback);
};

module.exports.addDNSRecord = function (type, name, callback) {
    setupRequest();
    const content = "wyvern.xyz";
    options.url += "dns_records";
    options.method = "POST";
    options.headers['Content-Type'] = "multipart/form-data";
    options.formData = {
        type: type,
        name: name,
        content: content
    };
    makeRequest(options, callback);
};