const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: {
    type: 'string',
    required: [true, 'user must have a username'],
    unique: true,
  },
  password: {
    type: 'string',
    required: [true, 'password required'],
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
