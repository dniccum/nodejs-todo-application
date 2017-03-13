# To Do Application

This is a simple NodeJS application that uses [SailsJS](http://sailsjs.org), Angular 2, and Web Sockets/

### Requirements

* MongoDB database named `nodejs-todo`
* NodeJS version > 4

### Sample local.js content

To replicate this file, create a new JS file named `local.js` within the `/config` directory with the content below:

```
models: {
    connection: 'localMongoDB',
    migrate: 'alter',
},
session: {
    url: 'mongodb://localhost:27017/nodejs-todo'
}
```