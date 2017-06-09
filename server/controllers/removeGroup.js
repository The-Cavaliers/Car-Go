const models = require('../../db/models');
const dbConfig = require('../dbConfig.js');
const knex = require('knex')(dbConfig);


module.exports.remvoveGroup = function (req, res) {
  console.log('in remvoveGroup',req.body);
  knex('groups')
  .where('id', req.body.group_id )
  .del()
  .then(() =>{
    knex('groups')
    .where('user_id', req.body.user_id)
    .then(groups => {
      if(groups.length === 0) {
        console.log('nothing found')
        res.status(201).send([])
      } else {
        res.status(201).send(groups);
      }
    })
    .catch(err => {
      console.log('this is the err',err)
      res.status(503);
    })
  })
}