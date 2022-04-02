const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');


const VehiculeSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  mark : {
    type: String,
    maxLength: 55,
    required: 'This field is required'
  },

  model : {
    type: String,
    minLength: 2,
    maxLength: 55,
    required : 'This field is required'
  },

  color : {
    type: String,
    maxLength: 255,
    required : 'This field is required'
  },

  year : {
    type: String,
    required : 'This field is required',
    minLength: 4,
    maxLength: 4
  },

  category : {
    type: String,
    maxLength: 55,
    required : 'This field is required'
  },
  motorization: {
      type: String,
      maxLength: 55,
      required : 'This field is required'      
  },
  power: {
      type: String,
      maxLength: 2,
      required : 'This field is required'
  }
});

VehiculeSchema.plugin(timestamps);
mongoose.model("Vehicule", VehiculeSchema)