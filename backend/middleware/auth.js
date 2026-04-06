const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Not authorized to access this route' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      console.log('Authorization failed: No user on request object');
      return res.status(401).json({ message: 'User not authenticated' });
    }
    
    console.log(`Checking role: user.role is "${req.user.role}", needed is one of [${roles.join(', ')}]`);
    
    if (!roles.includes(req.user.role)) {
      console.log(`Authorization denied for role: ${req.user.role}`);
      return res.status(403).json({ message: 'User role not authorized for this action' });
    }
    next();
  };
};
