const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

const DeclarationSchema = new mongoose.Schema({
  userId :{
    type: String,
    required: true
  },
  title: {
    type: String,
    maxLength: 55,
    required: true
  },
  description : {
    type: String,
    required: true
  },
});


DeclarationSchema.set('toJSON', { virtuals: true })
DeclarationSchema.set('toObject', { virtuals: true })

DeclarationSchema.virtual("user", {
  ref: "User",
  foreignField: "_id",
  localField: "userId"
});


DeclarationSchema.plugin(timestamps);
mongoose.model("Declaration", DeclarationSchema)