const models = require('../../db/models');
const CONFIG = require('../../config/development.json');
const knex = require('knex')(CONFIG.knex_config);

module.exports.getAll = (req, res) => {
  models.Profile.fetchAll()
    .then((profiles) => {
      res.status(200).send(profiles);
    })
    .catch((err) => {
      res.status(503).send(err);
    });
};

// gets groups from the database
module.exports.checkDestinations = (req, res) => {
  const date = req.body.travelDate;
  const leaving_from = req.body.leaving_from;
  const going_to = req.body.going_to;
  const email = req.body.email;
  knex('groups').where('leaving_from', leaving_from)
  .whereNot('groups.email', email)
  .andWhere('going_to', going_to)
  .andWhere('travelDate', date)
  .andWhere('seats', '>', 0)
  .then((groups) => {
    if (groups.length === 0) {
      res.status(201).send([]);
    } else {
      res.status(201).send(groups);
    }
  })
  .catch((err) => {
    console.log('this is the err', err);
    res.status(503);
  });
};

module.exports.getOne = (req, res) => {
  models.Profile.where({ id: req.params.id }).fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      res.status(200).send(profile);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.update = (req, res) => {
  models.Profile.where({ id: req.params.id }).fetch()
    .then((profile) => {
      if (!profile) {
        throw profile;
      }
      return profile.save(req.body, { method: 'update' });
    })
    .then(() => {
      res.sendStatus(201);
    })
    .error((err) => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};
