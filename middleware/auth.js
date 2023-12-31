const authorize = (req, res, next) => {
  const user = req.session.user;
  if (!user) {
    return res.status(401).json({ status: 'fail', message: 'unauthorized' });
  }
  req.user = user;
  next();
};

module.exports = authorize