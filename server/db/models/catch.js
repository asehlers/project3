const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const detailedCatch = new Schema({
  image: {type: String},
  fishName: {type: String},
  length: {type: Number},
  weight: {type: Number},
  bait: {type: String},
  equipment: {type: String},
  notes: {type: String}
});


const catchSchema = new Schema({
  amountCaught: { type: Number, required: true },
  location: { type: String, required: true },
  time: String,
  date: { type: Date, default: Date.now },
  notes: String,
  catchDetails: [detailedCatch]
});


const Catch = mongoose.model("Catch", catchSchema);

module.exports = Catch;