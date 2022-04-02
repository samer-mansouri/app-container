const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

const UserSchema = new mongoose.Schema({
  firstName : {
    type: String,
    minLength: 5,
    maxLength: 55,
    required: 'This field is required'
  },

  lastName : {
    type: String,
    minLength: 5,
    maxLength: 55,
    required : 'This field is required'
  },
  dateOfBirth : {
    type: Date,
    required : 'This field is required'
  },
  picture: {
    type: String,
    required: true,
  },
  address:{
    type: String,
    required: 'This field is required'
  },
  phoneNumber: {
    type: String,
    minLength: 8,
    maxLength: 8,
    required: 'This field is required'
  },
  email : {
    type: String,
    minLength: 5,
    maxLength: 255,
    unique: true,
    required : 'This field is required'
  },
  permis: {
    type: String,
    required: 'This field is required',
  },
  password : {
    type: String,
    required : 'This field is required',
    minLength: 8,
    maxLength: 255
  },
  isAdmin : {
    type: Boolean,
    default: false
  },
  refreshToken: String,
});

UserSchema.plugin(timestamps);
mongoose.model("User", UserSchema)