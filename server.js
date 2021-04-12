let express = require('express');

let app = express();

app.use(express.urlencoded({
    extended: true
  }));

// Système de vues
app.set('view engine', 'ejs');

// Adresses statiques
app.use('/assets', express.static("public"));

// Pages
app.get('/', (request, response) => {
    response.render('pages/index', {page:'accueil'});
});

app.get('/livre', require('./handlers/livreHandler').getAll);
app.get('/livre', (request, response) => {
    response.locals.page = 'livre';
    response.render('pages/livre', response.locals);
});


app.post('/livre', require('./handlers/livreHandler').post);

// Base de données
let db = require('./config/db');


app.listen(80);