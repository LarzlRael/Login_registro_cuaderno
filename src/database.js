
const mongoose = require('mongoose');
const { mongodb } = require('./keys')
mongoose.connect(mongodb.URL)
    .then(db => console.log('base de datos conectada'))
    .catch(err => console.err(err))
