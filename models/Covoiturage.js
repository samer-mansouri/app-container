const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

const CovoiturageSchema = new mongoose.Schema({
    userId :{
        type: String,
        required: true
    },
    lieuDepart : {
        type: String,
        required: true
    },
    lieuArrivee : {
        type: String,
        required: true
    },
    heureDepart : {
        type: String,
        required: true
    },
    cause: {
        type: String,
        required: true
    }
});

CovoiturageSchema.set('toJSON', { virtuals: true })

CovoiturageSchema.virtual("user", {
  ref: "User",
  foreignField: "_id",
  localField: "userId"
});



CovoiturageSchema.plugin(timestamps);
mongoose.model("Covoiturage", CovoiturageSchema)