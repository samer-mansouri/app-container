const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

const NoteSchema = new mongoose.Schema({
  userNoted: {
    type: String,
    required: true
  },
  userWhoNotes : {
    type: String,
    required: true
  },
  note : {
    type: Number,
    min: 0,
    max: 5,
    required: true  
  },
});

NoteSchema.plugin(timestamps);
mongoose.model("Note", NoteSchema)