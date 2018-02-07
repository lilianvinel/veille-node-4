 "use strict";
const fs = require("fs");
const express = require('express');
const app = express();
app.use(express.static('public'));
app.get('/formulaire', function (req, res) {
 console.log(__dirname);
 res.sendFile( __dirname + "/public/html/01_form.htm" );
})

/* La route /membres permet d'afficher l'ensemble des adresses */ 

app.get('/membres', (req, res) => { 
    fs.readFile( __dirname + "/public/data/" + "adresses.json", 
        'utf8',
        (err, data) => {if (err) { return console.error(err);}
        console.log( data );
        let resultat = JSON.parse(data);           
  res.render('template_0.ejs', {adresses: resultat})  
  });
})

/* on associe le moteur de vue au module «ejs» */

app.set('view engine', 'ejs'); // générateur de template

/* on utilise le module «body-parser» pour traiter le formulaire transmis par POST */
var bodyParser = require('body-parser');

// Créer le parser « application/x-www-form-urlencoded » 
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', (req, res) => {
 console.log('accueil')
 res.end('<h1>Accueil</h1>')
})

app.post('/formulaire', urlencodedParser, function (req, res) {
 // Preparer l'output en format JSON

console.log('la route /formulaire')

// on utilise l'objet req.body pour récupérer les données POST
 reponse = {
 prenom:req.body.prenom,
 nom:req.body.nom,
 telephone:req.body.telephone,
 courriel:req.body.courriel
 };
console.log(reponse);
 res.end(JSON.stringify(reponse));
})

var server = app.listen(8081, function () {
 var host = server.address().address
 var port = server.address().port
 
 console.log("Exemple l'application écoute sur http://%s:%s", host, port)

})