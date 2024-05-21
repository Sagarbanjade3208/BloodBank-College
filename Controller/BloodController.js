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

// update
exports.updateRequest = CatchAsync(async (request, response) => {
  const { id } = request.params;
  if (request._user.isAdmin === false) {
    return response.redirect('/dashboard');
  }
  await Blood.findByIdAndUpdate(id, { bloodGroup: request.body.bloodGroup });
  console.log('updated');
  response.redirect('/admin');
});
