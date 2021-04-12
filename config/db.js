// Requête connexion BDD
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myapp', {useNewUrlParser: true, useUnifiedTopology: true});

// Connexion
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

module.exports = db;