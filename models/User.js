const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
    },
});

UserSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

UserSchema.methods.getName = function() { 
    return this.name
}

UserSchema.methods.tokenGenerator= function() {
    return jwt.sign({userId:this._id,name:this.name},process.env.JWT_SECRET,{expiresIn:'30d'});
}

UserSchema.methods.checkPassword=async function(valid){
    const isValid=await bcrypt.compare(valid,this.password);
    return isValid;
}

module.exports=mongoose.model('User', UserSchema);