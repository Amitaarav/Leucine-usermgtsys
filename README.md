## 


`src` -> Inside the src folder all the actual source code regarding the project woll reside, this will not include any kind of tests.

Lets take a look inside the `src` folder

- `config` -> In this folder anything and everything regarding any configurations  on setup of a library or module will be done. For example: setting up `dotenv` so that we can use the environment variables anywhere in a cleaner fasion, this is done in the '`erver-config.js`. One more example can be to setup you logging library that can help you to prepare meaningful logs, so configuration for this library should also be done here.

- `route` -> In the routes folder, we have registered a route and the corresponding middleware and controllers to it. 

- `middleware`-> They are just going to intercept the incoming requests where we can write valdators, authenticators etc.

- `controllers` -> They are kind of last middlewares as post them you call your business layer to execute the business logis. In controllers we just receive the incoming requests and data and the pass ot to the business layer, and ince business layer returns an output, we structure the API response in controllers and send the output.

- `services` -> contains the business logic and interacts with repositories for data from the database

-`utils` -> contains helper methods, error classes etc.

