const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

const Status = Object.freeze({
    Pending: 'pending',
    Confirmed: 'confirmed',
    Canceled: 'canceled',
});

const ReservationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  trajetId : {
    type: String,
    required: true
  },
  status : {
    type: String,
    enum: Object.values(Status),
    required:true
  },
});

ReservationSchema.virtual("user", {
  ref: "User",
  foreignField: "_id",
  localField: "userId"
});

ReservationSchema.plugin(timestamps);
mongoose.model("Reservation", ReservationSchema)