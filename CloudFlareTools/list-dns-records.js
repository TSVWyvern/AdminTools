const requests = require('./requests');

requests.getDNSRecords(function(response, body) {
    var details = JSON.parse(body).result;
    for (var i = 0; i < details.length; i++) {
        var domain = details[i];
        switch (domain.type) {
            case 'A':
                console.log("\x1b[32m","Type : " + domain.type);
                console.log("\x1b[32m","Base domain : " + domain.name);
                console.log("\x1b[32m","Public IP : " + domain.content);
                console.log("\x1b[32m","Proxiable : " + domain.proxiable);
                console.log("\x1b[32m","Proxied : " + domain.proxied);
                break;
            default:
                console.log("\x1b[33m","Type : " + domain.type);
                console.log("\x1b[33m","Sub domain : " + domain.name);
                console.log("\x1b[33m","Proxiable : " + domain.proxiable);
                console.log("\x1b[33m","Proxied : " + domain.proxied);
                break;
        }
        console.log("\x1b[30m","");
    }
});


