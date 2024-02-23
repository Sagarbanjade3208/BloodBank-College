const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
  },
  password: {
    type: String,
    requied: [true, 'Please enter your password'],
  },
  address: {
    type: String,
    required: [true, 'Please enter your address'],
  },
  phoneNumber: {
    type: Number,
    required: [true, 'Please enter your phone number'],
  },
  bloodGroup: {
    type: String,
    required: [true, 'Please enter your blood group'],
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
});

UserSchema.pre('save', async function (next) {
  if (!this.isNew || !this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword,
  password
) {
  return await bcrypt.compare(candidatePassword, password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
