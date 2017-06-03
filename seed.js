const models = require('./db/models');

const seedDataBase = function (argument) {
  const dates = ['2017-06-02', '2017-06-03', '2017-06-04','2017-06-05','2017-06-06','2017-06-07','2017-06-08','2017-06-09'];
  const first = ['Bob', 'Bill', 'John', 'Jack', 'Cathy', 'Gail', 'Mary', 'Fred']
  const last = ['Trump', 'Obama', 'Reagan', 'Bush', 'Ford', 'Carter', 'Nixon', 'Jackson'];

  const going = ['Oakland', 'San Francisco', 'Sunnyvale', 'Mt. View', 'Hayward', 'Palo Alto', 'Santa Clara', 'Cupertino'];

  const email = ['walkingforyears@gmail.com','walkingforyears@gmail.com','walkingforyears@gmail.com','walkingforyears@gmail.com','walkingforyears@gmail.com','walkingforyears@gmail.com','walkingforyears@gmail.com','walkingforyears@gmail.com' ]
    for (var i = 0; i < 1000; i++) {
      new models.Groups({
        name: `${first[Math.floor(Math.random() * 8)]  } ${  last[Math.floor(Math.random() * 8)]}`,
        leaving_from: going[Math.floor(Math.random() * 8)],
        going_to: going[Math.floor(Math.random() * 8)],
        email: email[Math.floor(Math.random() * 8)],
        travelDate: dates[Math.floor(Math.random() * 8)],
      }).save();
    }
};
seedDataBase();
