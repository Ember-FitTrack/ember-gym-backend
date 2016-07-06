'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let gymLiftSchema = new Schema({
  latitude: Number,
  longitude: Number,
  age: Number,
  sex: String,
  weight: Number,
  height: Number,
  male: Boolean,
  bench: Number,
  squat: Number,
  deadlift: Number,
  total: Number
});

module.exports = mongoose.model('gymlifts', gymLiftSchema);
