const jwt = require('jsonwebtoken');
const student= require('../models/student');
const process= require('process');
require('dotenv').config();

const authenticate = async (req, res, next) => {
  const token = req.headers['authorization'];
  const replaceBearerPrefix = (token) => {
    return token.replace(/^Bearer\s+/, '');
  };
  console.log(token);
  if (!token) {
    return res.status(401).json({ error: 'No token provided.' });
  }

  const tokenWithoutBearerPrefix = replaceBearerPrefix(token);
  try {
    const decoded = jwt.verify(tokenWithoutBearerPrefix, process.env.JWT_SECRET);
    console.log("code:" ,decoded);
    const user = await student.findOne({_id:decoded.id});
    console.log(user);
    if (!user) {
      return res.status(401).json({ error: 'Invalid token.' });
    }
    req.user = user;
    req.decoded=decoded;
    next();
  } catch (error) {
    return res.status(408).json({ error: 'Invalid token.' });
  }
};


module.exports = authenticate;