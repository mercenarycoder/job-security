const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors/index');

const auth =async (req, res, next) => {
    // console.log('hi i am authenticating user');
    const authHeader = req.headers.authorization;
    // console.log(authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('Authentication invalid 1');
    }
    const token = authHeader.split(' ')[1];
    try {
        // console.log(token);
        const payload =await jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: payload.userId, name: payload.name };
        console.log(req.user);
        next();
    } catch (error) {
        throw new UnauthenticatedError('Authentication invalid');
    }
}

module.exports=auth;