const CONFIG = require('../../config/development.json');
const knex = require('knex')(CONFIG.knex_config);

module.exports.getGroups = function (req, res) {
	var id = req.body.user_id;
  knex('groups').where('user_id', req.body.user_id)
  .then(groups => {
    if(groups.length === 0) {
      console.log('nothing found');
      res.status(201).send({data: []});
    } else {
      res.status(201).send(groups);
    }
  })
  .catch(err => {
    console.log('this is the err', err);
    res.status(503).send({data: []});;
  });
};
