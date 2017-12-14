const request = require('request');
const requests = require('./requests');
const fs = require('fs');

console.log("\x1b[0m","");

const validTypes = JSON.parse(fs.readFileSync("../CloudFlareTools/resources/valid-types.json"));

function checkInputs() {
    var type = process.argv[2];
    var name = process.argv[3];


    if (process.argv.length !== 4) {
        console.log("\x1b[31m","Incorrect format, format should be: 'node add-dns-record [type] [name]'");

        console.log("\x1b[30m", "");
        return;
    }

    if (validTypes.indexOf(type) === -1) {
        console.log("\x1b[31m", "Invalid type, type must be one of the following : " + validTypes.toString());

        console.log("\x1b[30m", "");
        return;
    }

    var nameArray = name.split(".");

    var error = false;
    for (var i = 0; i < nameArray.length; i++) {
        if (nameArray[i].length === 0) {
            error = true;
        }

        if (!nameArray[i].match(/[a-z]/)) {
            error = true;
        }
    }

    if (nameArray[nameArray.length - 2] !== "wyvern" || nameArray[nameArray.length - 1] !== "xyz") {
        error = true;
    }

    if (error) {
        console.log("\x1b[31m", "Invalid name, name must be in the following format : [a-z].wyvern.xyz");

        console.log("\x1b[30m", "");
        return;
    }

    addDomain(type, name)
}

function addDomain(type, name) {
    requests.addDNSRecord(type, name, function (response, body) {
        var result = JSON.parse(body).success;

        if (result) {
            console.log("\x1b[32m","The record was added successfully");

            console.log("\x1b[30m","");
        } else {
            console.log("\x1b[31m","DNS record with name : " + name + " could not be added");

            console.log("\x1b[30m", "");
        }
    })
}

checkInputs();
