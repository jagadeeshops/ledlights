var mongoose = require("mongoose");

var teamFundSchema = new mongoose.Schema({
  name: { type: String, trim: true }
}, { strict: false });

module.exports = mongoose.model('products', teamFundSchema, 'products'); 
