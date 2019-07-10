# Logging in Application Insights (Node.js Version)

## Preparation
1. Create an Application Insights resource on Azure portal.
2. Set up the Node.js SDK. In your root location of your project, use the following cmd command:
```
npm install applicationinsights --save
```

3. In the ```.js``` file that will be run earliest (for example, in the sample code, ```app.js``` is the first ```.js``` that will be run), add the following code to the top of the code, 
  instrumentation_key can be found in overview page of the resource.
```
const appInsights = require("applicationinsights");
appInsights.setup("<instrumentation_key>");
appInsights.start();

let client = appInsights.defaultClient;
```

## Usage
1. After the above preparation, the Application Insights resource should be connected with the project successfully.
2. In your desired position, you can log the project with code.
3. In the example, in ```http.createServer()```, the first line

     ```client.trackTrace({message: "Server Requested"});```

   will send a log with message ```"Server Requested"``` to Azure once the server is requested.
4. Now, we have a function called ```sayHello0()```, which will display ```sayHello() version 0``` in console. 
5. Inside the function ```http.createServer()```, we have the code
```
    try {
        var judge = Math.random();         // random number between 0 and 1
        if (judge < 0.6) { sayHello0(); }  // if the random number is smaller than 0.6, call sayHello0()
        else { sayHello1(); }              // else, call sayHello1(), 
                                           // which is undefined and exception caught, go to catch block

    } catch (ex){
        //log in console only
        console.log(ex.message);

        //exception caught, can record it in application insights.
        client.trackException({exception: ex});
    }
```
6. After several minutes, you should be able to view the log on Azure portal.
