const models = require('./db/models');

const seedDataBase = function (argument) {
  const dates = ['2017-06-02', '2017-06-03', '2017-06-04', '2017-06-05', '2017-06-06', '2017-06-07', '2017-06-08', '2017-06-09'];
  const first = ['Bob', 'Bill', 'John', 'Jack', 'Cathy', 'Gail', 'Mary', 'Fred'];
  const last = ['Trump', 'Obama', 'Reagan', 'Bush', 'Ford', 'Carter', 'Nixon', 'Jackson'];

  const going = ['Oakland', 'San Francisco', 'Sunnyvale', 'Mt. View', 'Hayward', 'Palo Alto', 'Santa Clara', 'Cupertino'];
  const addressLocation = {
    Oakland:
    {
      lat: [37.775037, 37.798834, 37.801017],
      long: [-122.229411, -122.274679, -122.272955],
    },

    'San Francisco':
    {
      lat: [37.786523, 37.783404, 37.785360],
      long: [-122.404455, -122.407167, -122.404363],
    },

    Sunnyvale:
    {
      lat: [37.362646, 37.404618, 37.404814],
      long: [-122.027204, -122.009532, -122.025137],
    },

    'Mt. View':
    {
      lat: [37.402839, 37.395730, 37.392889],
      long: [-122.108273, -122.088407, -122.079855],
    },

    Hayward:
    {
      lat: [37.650854, 37.650854, 37.678727],
      long: [-122.110117, -122.110117, -122.083157],
    },

    'Palo Alto':
    {
      lat: [37.443032, 37.443032, 37.438797],
      long: [-122.171446, -122.171446, -122.172292],
    },

    'Santa Clara':
    {
      lat: [37.351500, 37.353957, 37.349778],
      long: [-121.981305, -121.998115, -121.940552],
    },

    Cupertino:
    {
      lat: [37.321734, 37.331046, 37.332348],
      long: [-122.032995, -121.929543, -122.048163],
    },

  };


  const email = ['walkingforyears@gmail.com', 'walkingforyears@gmail.com', 'walkingforyears@gmail.com', 'walkingforyears@gmail.com', 'walkingforyears@gmail.com', 'walkingforyears@gmail.com', 'walkingforyears@gmail.com', 'walkingforyears@gmail.com'];
  for (let i = 0; i < 50; i++) {
    const leavingFrom = going[Math.floor(Math.random() * 8)];
    const goingTo = going[Math.floor(Math.random() * 8)];
    new models.Groups({
      name: `${first[Math.floor(Math.random() * 8)]} ${last[Math.floor(Math.random() * 8)]}`,
      leaving_from: leavingFrom,
      going_to: goingTo,
      email: email[Math.floor(Math.random() * 8)],
      from_coords: JSON.stringify([addressLocation[leavingFrom].lat[Math.floor(Math.random() * 2)], addressLocation[leavingFrom].long[Math.floor(Math.random() * 2)]]),
      to_coords: JSON.stringify([addressLocation[goingTo].lat[Math.floor(Math.random() * 2)], addressLocation[goingTo].long[Math.floor(Math.random() * 2)]]),
      travelDate: dates[Math.floor(Math.random() * 8)],
    }).save();
  }
};
seedDataBase();
