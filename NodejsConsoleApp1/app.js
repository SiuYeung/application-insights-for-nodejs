const appInsights = require("applicationinsights");
appInsights.setup("ab48a5ba-3a16-48a3-8246-24adf510fece");
appInsights.start();

let client = appInsights.defaultClient;

'use strict';

console.log('Server Starting');

function sayHello0() {
    console.log('sayHello() version 0');
}


var http = require('http');
var i = 0;
http.createServer((req, res) => {

    //trackTrace example, you can type any trace message you like.
    client.trackTrace({message: "Server Requested"});
    console.clear();
    i += 1;
    console.log(`Request number: ${i}`);
    console.log('trying to call sayHello()');
    try {

        var judge = Math.random();
        if (judge < 0.6) { sayHello0(); }
        else { sayHello1(); }

    } catch (ex){
        console.log(ex.message);
        //exception caught, can record it in application insights.
        client.trackException({exception: ex});
    }
    console.log('Exit try-catch block');
    res.write('Hello World!');
    res.end();
}).listen(8000);



