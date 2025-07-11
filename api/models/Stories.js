/**
 * Stories.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    title:{
      type: 'string'
    },
    preview:{
      type:'string'
    },
    publish_date:{
      type:'string'
    },
    author:{
      username:{
        type:'string'
      },
      author: {
        type:'string'
      },
    }
  },
  connection:'mongodb'
};

