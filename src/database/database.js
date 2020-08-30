const mongoose = require('mongoose')
const config = require('dotenv').config().parsed;


module.exports = mongoose.connect(config.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true});
