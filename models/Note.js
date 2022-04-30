const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

const NoteSchema = new mongoose.Schema({
  sender: { // id of the user who send the note
    type: String,
    required: true
  },
  receiver : { // id of the user who receive the note
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