const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');


const TrajetSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  vehiculeId: {
    type: String,
    required: true
  },
  placeOfDeparture : {
    type: String,
    minLength: 5,
    maxLength: 55,
    required : 'This field is required'
  },

  placeOfDestination : {
    type: String,
    maxLength: 255,
    required : 'This field is required'
  },

  departureTime : {
    type: String,
    required : 'This field is required',
    minLength: 4,
    maxLength: 10
  },

  pathTaken : {
    type: String,
    maxLength: 55,
    required : 'This field is required'
  },
  availableSeats: {
      type: Number,
      required : 'This field is required'      
  },
  price: {
      type: String,
      required : 'This field is required'
  },
  phoneNumber: {
      type: String,
      minLength: 8,
      maxlength: 8,
      required: 'This field is required'
  }
});
TrajetSchema.set('toJSON', { virtuals: true })

TrajetSchema.virtual("user", {
  ref: "User",
  foreignField: "_id",
  localField: "userId"
});

TrajetSchema.plugin(timestamps);
mongoose.model("Trajet", TrajetSchema)