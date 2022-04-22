const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

const Gender = Object.freeze({
  Male: 'Male',
  Female: 'Female',
});


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
  permisPic : {
    type: String,
  },
  gender : {
    type: String,
    enum: Object.values(Gender),
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

UserSchema.set('toJSON', { virtuals: true })

UserSchema.virtual("garage", {
  ref: "Vehicule",
  foreignField: "userId",
  localField: "_id"
});

UserSchema.plugin(timestamps);
mongoose.model("User", UserSchema)