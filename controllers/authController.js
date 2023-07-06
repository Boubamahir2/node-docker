const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
exports.signUp = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const hashpassword = await bcrypt.hash(password, 12);
    const userAvalaible = await User.findOne({ username });
    if (userAvalaible) {
     return res.status(400).json({
        status: 'success',
        message: 'username not available',
      });
    } else {
      const user = await User.create({ username, password: hashpassword });
      req.session.user = user;
      res.status(200).json({
        status: 'success',
        data: { user },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
    });
  }
};

exports.signIn = async (req, res, next) => {
  // console.log(req)
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'not found',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        status: 'fail',
        message: 'invalid credentials',
      });
    }
    req.session.user = user;
    // console.log(req.session);
    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
    });
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: 'success',
      result: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
    });
  }
};
