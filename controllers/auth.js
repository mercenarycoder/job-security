const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError,UnauthenticatedError } = require('../errors/index');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');

const register = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.create({ ...req.body });
    const token=user.tokenGenerator();
    res.status(StatusCodes.CREATED).json({user:{ name: user.getName() }, token});
}


const login = async (req, res) => {
    const {email,password} = req.body;
    if(!email || !password){
        throw new BadRequestError('Please enter a valid email address and password.');
    }
    const user=await User.findOne({email});
    if(!user){
        throw new UnauthenticatedError('Invalid credentials');
    }
    const isPasswordCorrect = await user.checkPassword(password);
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid credentials');
    }
    const token=user.tokenGenerator();
    res.status(StatusCodes.OK).json({user:{name:user.getName()},token});
}

module.exports = {
    register, login
}