/**
 * ToDo.js
 *
 * @description :: Contains the information for each ToDo
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    text: {
      type: 'string',
      required: true
    },
    category: {
      type: 'string',
      required: false,
      defaultsTo: ''
    },
    order: {
      type: 'integer',
      autoIncrement: true
    },
    complete: {
      type: 'boolean',
      defaultsTo: false
    }
  },
  beforeCreate : function (values, next) {
    // auto increments the order because it is not supported with MongoDB
    ToDo.count().exec(function(err, count) {
      if(err) next(err);
      else {
        values['order'] = count + 1;
        next(null);
      }
    });
  }
};

