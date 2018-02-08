 "use strict";
const fs = require("fs");
const express = require('express');
const app = express();
app.use(express.static('public'));
app.get('/formulaire', function (req, res) {
 console.log(__dirname);
 res.sendFile( __dirname + "/public/html/01_form.htm" );
})

const transforme_en_tableau = (collection)=>
{
   let chaine = '<table>';
   for (let elm of collection)
   {

      for (let p in elm)
      {

      }
   }
   chaine = chaine+ '</table>';
}

/* La route /membres permet d'afficher l'ensemble des adresses */ 

app.get('/membres', (req, res) => { 
    fs.readFile( __dirname + "/public/data/" + "membres.txt", 
        'utf8',
        (err, data) => {if (err) { return console.error(err);}
        console.log( data );
        let resultat = JSON.parse(data);           
  		res.render('template_0.ejs', {adresses: resultat});

 		res.end(transforme_en_tableau(resultat));   
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
 let reponse = {
 prenom:req.body.prenom,
 nom:req.body.nom,
 telephone:req.body.telephone,
 courriel:req.body.courriel
 };
console.log(reponse);
res.end(JSON.stringify(reponse));

fs.appendFile( __dirname + "/public/data/" + "membres.txt", ","+JSON.stringify(reponse), function (err,data) {
  if (err) throw err;
  console.log('Sauvegardé');
})  

})

var server = app.listen(8081, function () {
 var host = server.address().address
 var port = server.address().port
 
 console.log("Exemple l'application écoute sur http://%s:%s", host, port)

})