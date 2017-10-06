const request = require('request');
const fs = require('fs');

console.log("\x1b[0m","");

var options = JSON.parse(fs.readFileSync("./options.json"));
const validTypes = JSON.parse(fs.readFileSync("./valid-types.json"));

options.url += "dns_records";
options.method = "POST";
options.headers['Content-Type'] = "multipart/form-data";

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
    const content = "wyvern.xyz";
    options.formData = {
        type : type,
        name : name,
        content : content
    };

    request(options, function (error, response, body) {
        if (error) {
            console.log(error);
        } else {
            console.log(response);
        }
    });
}

checkInputs();
