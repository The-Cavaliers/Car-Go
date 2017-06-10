const models = require('./db/models');

const seedDataBase = function (argument) {
  const username = ['Phong', 'Aly', 'Micheal', 'Mary', 'Shawn'];
  const from = ['Fremont', 'FosterCity', 'San Mateo'];
  const to = ['Oakland', 'San Francisco', 'Sunnyvale'];
  const group_id = [1, 2, 3];

  for (let i = 0; i < 10; i++) {
    new models.User({
      username: username[Math.floor(Math.random() * 5)],
      from: from[Math.floor(Math.random() * 3)],
      to: to[Math.floor(Math.random() * 3)],
      group_id: group_id[Math.floor(Math.random() * 3)],
    }).save();
  }
};
seedDataBase();
