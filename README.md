Now I am learning the architecture of a standard project mode and let me figure out the architecture of the backend.

first of all, the app.ts is my message receiver, and the services/server.ts configures it's ip address(localhost only) and listening port(3000), and when the client(from this I would call it browser) send a message to me, the app.ts would contact it first(I think it's 'express' automatically despatch the route and orders) and app.ts would match from the left(like get '/api/health', it would match /api) and app.use('/api',routes) would lead express despatch the second params /health to routes(index.ts), and route is like a bus station and it would base on the route '/health' and router.use('/health',healthRoutes) to despatch it to the other router health.routers, the benefits to use two routers is avoid the complex situations make the code confused, like there are /api/health/check and /api/health/update, and if not using the index and specific routers, it may be like this: app.use('/health/check', healthCheck); and one more row for update, but use the current mode. it would be one row:app.use('.health', healthRouter), and in the end there are one specific file in the end just use the endpoint and into the controllers, easy to maintain and lower the difficulty of index.ts.
-- so it's routers architecture and the reason why make it like a bus station. and it's main function is to call the right controllers, it's also the endpoint of a api request and now we dive into controllers

the main functions of controllers are connecting services and response to browser. the details of algorism and data are all handled by services so controllers functions is easy: to get the data and response it to browser. you may ask why don't response browser by services? because if the routers call services directly, so one routers for one services, it would lower the reusability and ability to modularize the services(which is also enhance reusing code). for example, if a api's function is return the sum and minus of two num, and the other is for sum only, and the another is for minus only, so if we use controllers, we just need two services(sum and minus), but if we not doing so, either we need if..else or need 3 different services and the sum and minus is repeat with sum(),minus(). 

-- I think this is why we need apart the controllers and services. and for standard the project, we need utils.

now my utils have the standard style of response to browser and a consistent way to debug the services so we can get rid of try..catch everywhere. even though my response is very simple :{success, message, data}, It avoid the variety of response style, if one respond with {data, message} and the other respond: {result}, it would be difficult for project maintain. if I want get it's output, I don't even know what its params are.

--so utils is for standard. and it's time to talk about middlewares-which I'm not familiar with.

In my point, it;s error handler for different kind of error. like 404 page not found or 500 internal server error. and use NextFunction.next() would help you detect the error whatever it's type is. and you don't need have throw error everywhere, all you need is next(err), and with the help with asyncHandler,which is async function to detect your services uses asynchronous functions wait until your services done(like try catch). so is's a very   convenient mode to avoid try catch and your code is under detect with asyncHandler helping you monitoring.


that's all I've learnt about the architecture of this project so far and I'm still learning Typescript & later web frontend & Security vulnerabilities labs.

--last update in 2026/4/21, 2:51 a.m.
