const models = require('../../db/models');
const dbConfig = require('../dbConfig.js');
const knex = require('knex')(dbConfig);

module.exports.getAll = (req, res) => {
  models.Profile.fetchAll()
    .then(profiles => {
      res.status(200).send(profiles);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

//gets groups from the database
module.exports.checkDestinations = (req, res) => {
  var date = req.body.date;
  var leaving_from = req.body.leaving_from;
  var going_to = req.body.going_to;
  knex('groups').where('leaving_from', leaving_from).andWhere('going_to', going_to)
  .then(groups => {
    //console.log(groups)
    if(groups.length === 0) {
      res.status(201).send(null)
      console.log('nothing found')
    } else {
      res.status(201).send(groups);
    }
  })
  .catch(err => {
    console.log('this is the err',err)
    res.status(503);
  })
}
// module.exports.create = (req, res) => {
//   models.Profile.forge({ username: req.body.username, password: req.body.password })
//     .save()
//     .then(result => {
//       res.status(201).send(result.omit('password'));
//     })
//     .catch(err => {
//       if (err.constraint === 'users_username_unique') {
//         return res.status(403);
//       }
//       res.status(500).send(err);
//     });
// };

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
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      return profile.save(req.body, { method: 'update' });
    })
    .then(() => {
      res.sendStatus(201);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

const dates = ['2017-06-02T21:43:29.231Z', '2017-06-03T21:43:29.231Z', '2017-06-04T21:43:29.231Z','2017-06-05T21:43:29.231Z','2017-06-06T21:43:29.231Z','2017-06-07T21:43:29.231Z','2017-06-08T21:43:29.231Z'];
const first = ['Bob', 'Bill', 'John', 'Jack', 'Cathy', 'Gail', 'Mary', 'Fred']
const last = ['Trump', 'Obama', 'Reagan', 'Bush', 'Ford', 'Carter', 'Nixon', 'Jackson'];

const going = ['Oakland', 'San Francisco', 'Sunnyvale', 'Mt. View', 'Hayward', 'Palo Alto', 'Santa Clara', 'Cupertino'];

const email = ['hello@gmail.com', 'bye@gmail.com', 'hi@gmail.com', 'why@gmail.com','sowhat@gmail.com','joe@gmail.com','notsogood@gmail.com','ok@gmail.com']

var seedDataBase= function (argument) {
  for (var i = 0; i < 100; i++) {
    new models.Groups({
      name: first[Math.floor(Math.random() * 8)] + ' ' + last[Math.floor(Math.random() * 8)],
      leaving_from: going[Math.floor(Math.random() * 8)],
      going_to: going[Math.floor(Math.random() * 8)],
      email: email[Math.floor(Math.random() * 8)],
      travelDate: dates[Math.floor(Math.random() * 8)]
    }).save()
  }
}
//seedDataBase()
// module.exports.deleteOne = (req, res) => {
//   models.Profile.where({ id: req.params.id }).fetch()
//     .then(profile => {
//       if (!profile) {
//         throw profile;
//       }
//       return profile.destroy();
//     })
//     .then(() => {
//       res.sendStatus(200);
//     })
//     .error(err => {
//       res.status(503).send(err);
//     })
//     .catch(() => {
//       res.sendStatus(404);
//     });
// };
