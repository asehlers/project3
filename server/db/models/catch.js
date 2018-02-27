const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//define detailed catch schema for specific fish info
const detailedCatch = new Schema({
  image: {type: String},
  fishName: {type: String},
  length: {type: Number},
  weight: {type: Number},
  bait: {type: String},
  equipment: {type: String},
  notes: {type: String}
});

//define catch schema for high level information
const catchSchema = new Schema({
  userid: {type: String},
  amountCaught: { type: Number, required: true },
  location: { type: String, required: true },
  time: String,
  date: { type: Date, default: Date.now },
  catchDetails: [detailedCatch]
});


const Catch = mongoose.model("Catch", catchSchema);

module.exports = Catch;