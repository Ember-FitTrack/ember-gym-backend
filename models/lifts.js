'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let liftSchema = new Schema({
  age: Number,
  sex: String,
  weight: Number,
  height: Number,
  bench: Number,
  squat: Number,
  deadlift: Number,
  total: Number
});

module.exports = mongoose.model('Lift', liftSchema);
