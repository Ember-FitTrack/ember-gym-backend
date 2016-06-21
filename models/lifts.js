var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var liftSchema = new Schema({
  age: Number,
  weight: Number,
  height: Number,
  male: Boolean,
  bench: Number,
  squat: Number,
  deadlift: Number
});

module.exports = mongoose.model('Lift', liftSchema);
