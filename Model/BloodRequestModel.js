const mongoose = require('mongoose');

const BloodSchema = new mongoose.Schema({
  requestType: {
    type: String,
    required: [true, 'Please enter requestType'],
    enum: ['DONATE', 'RECEIVE'],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Please enter userId'],
    ref: 'User',
  },
  bloodGroup: {
    type: String,
    required: [true, 'Please enter your blood group'],
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  requiredPint: {
    type: Number,
    required: [true, 'Please enter blood pint'],
    max: [1, 'You cannot request blood more than 1 pint'],
  },
  isAccepted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Blood = mongoose.model('Request', BloodSchema);

module.exports = Blood;
