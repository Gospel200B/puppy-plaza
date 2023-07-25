const mongoose = require ('mongoose');
const {isEmail} = require ('validator');
const bcrypt = require ('bcrypt')

const userSchema = mongoose.Schema({
    name: {
        type : String,
        required : [true,"Field name required"],
        trim : true,
    },

    email: {
        type: String,
        required: [true, "Enter your email"],
        unique: [true, "Email address already in use"],
        validate: [isEmail, "pls enter a valid email address"],
        trim: true,
        toLowerCase: true,
    }, 

    password: {
        type: String,
        required: [true, "Enter a valid password"],
        trim: true,
        minlength: [8, "password must be at least 8 characters"]

    },

    pic: {
        type: String,
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-24.jpg"
    },

    phone:{
        type: String,
        required: [true, "Enter phone number"]
    },

    street: {
        type: String,
        default : ""
    },
    apartment: {
        type: String,
        default: ""
    },

    isAdmin : {
        type: Boolean,
        default: false
    },

    zip  : {
        type: String,
        default: ""
    },

    city: {
        type: String,
        default: "",
    },

    country : {
        type: String,
        default: "",
    }
}, {timestamp : true})

userSchema.virtual('id').get(function() {
    return this._id.toHexString();
  });
  
  userSchema.set('toJSON' , { 
    virtuals: true,
  })



const User = mongoose.model('User', userSchema)
module.exports = User;

