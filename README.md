# To Do Application

This is a simple NodeJS application that uses [SailsJS](http://sailsjs.org), Angular 2, and Web Sockets/

### Sample local.js content

To replicate this file, create a new JS file within the `/config` directory with the content below:

```
module.exports = {
  models: {
    connection: 'localMongoDB',
    migrate: 'alter'
  }  
}
```