const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const detailedCatch = new Schema({
//   image: {type: String},
//   fishName: {type: String},
//   length: {type: Number},
//   weight: {type: Number},
//   bait: {type: String},
//   equipment: {type: String},
//   notes: {type: String}
// });

//Define regulation schema
const regulationSchema = new Schema({
  state: { type: String, required: true },
  fishName: { type: String, required: true },
  season: {type: String},
  length: {type: String},
  limit: {type: String},
  regulationLocation: {type: String}
});


const Regulation = mongoose.model("Regulation", regulationSchema);

module.exports = Regulation;