const { Schema, model } = require('mongoose')

const DataSchema = new Schema({
  temperature: { type: Number },
  illumination: { type: Number },
}, {
  timestamps: true,
  versionKey: false
});

module.exports = model('Data', DataSchema)