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

  email : {
    type: String,
    minLength: 5,
    maxLength: 255,
    required : 'This field is required'
  },

  password : {
    type: String,
    required : 'This field is required',
    minLength: 8,
    maxLength: 255
  },
  refreshToken: String,

});

UserSchema.plugin(timestamps);
mongoose.model("User", UserSchema)