const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');


    const userSchema = new mongoose.Schema({
        name:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            validate: [validator.isEmail]
        },
        password:{
            type: String,
            required: true,
            minlength: 8,
            select: false,
        },
        phoneNumber:{
            type:Number,
            required: true,   
        },
        profession:{
             type: String,
             required: true,
        },
        createddAt:{
          type:  Date,
        default: Date.now()
        },
    });


    userSchema.pre('save', async function(next){
        const salt = await bcrypt.genSalt(10); 
        this.password =  await bcrypt.hash(this.password,salt);
        next()
    });

    
    userSchema.methods.matchPassword =   async function(enteredPassword){
        return await bcrypt.compare(enteredPassword,this.password)
    };

    const User = mongoose.model("User", userSchema);

    module.exports = User;