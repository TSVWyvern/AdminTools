const requests = require('./requests');

if (process.argv.length !== 3) {
    console.log("\x1b[31m","Incorrect format, format should be: 'node delete-dns-record' [name]");

    console.log("\x1b[30m", "");
    return;
}

var name = process.argv[2];

requests.getDNSRecords(function (response, body) {
    var details = JSON.parse(body).result;

    var found = false;
    var id = -1;
    for (var i = 0; i < details.length; i++) {
        if (details[i].name === name) {
            found = true;
            id = details[i].id;
            break;
        }
    }

    if (found) {
        requests.deleteDNSRecord(id, function (res, data) {
            var result = JSON.parse(data).success;

            if (result) {
                console.log("\x1b[32m","The record was deleted successfully");

                console.log("\x1b[30m","");
            } else {
                console.log("\x1b[31m","No DNS record with name : " + name + " was found");

                console.log("\x1b[30m", "");
            }

        });
    } else {
        console.log("\x1b[31m","No DNS record with name : " + name + " was found");

        console.log("\x1b[30m", "");
    }
});