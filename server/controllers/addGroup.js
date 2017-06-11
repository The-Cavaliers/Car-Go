const models = require('../../db/models');

module.exports.saveGroup = function (res, req) {
	console.log('this is',res.body)
  new models.Groups({
    name: res.body.username,
    leaving_from: res.body.leaving_from,
    going_to: res.body.going_to,
    email: res.body.email,
    img_url: res.body.picture_url,
    travelDate: res.body.travelDate,
    user_id: res.body.user_id,
  }).save();
	console.log('saved to data base')
}
