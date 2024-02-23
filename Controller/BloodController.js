const Blood = require('../Model/BloodRequestModel');
const CatchAsync = require('../Utils/CatchAsync');

exports.createRequest = CatchAsync(async function (request, response) {
  request.body.userId = request._user._id;
  request.body.bloodGroup = request.body.bloodGroup.toUpperCase();
  console.log(request.body);
  await Blood.create(request.body);
  response.redirect('/dashboard');
});

exports.acceptRequest = CatchAsync(async function (request, response) {
  const { id } = request.params;
  await Blood.findByIdAndUpdate(id, { isAccepted: true });
  response.redirect('/dashboard');
});

exports.deleteRequest = CatchAsync(async function (request, response) {
  const { id } = request.params;
  await Blood.findByIdAndDelete(id);
  response.redirect('/dashboard');
});
