#!/usr/bin/env node

var request = require('request'),
  cradle = require('cradle');

var db = new(cradle.Connection)().database('do');

// var oboUrl = "http://www.berkeleybop.org/ontologies/doid.obo";
var oboUrl = "https://github.com/DiseaseOntology/HumanDiseaseOntology/blob/master/src/ontology/HumanDO.obo?raw=true";

request(oboUrl, function(error, response, body) {
  var stanzas = body.toString().split('\n\n');
  var terms = [];
  stanzas.forEach(function(stanza) {
    var stanzaLines = stanza.split('\n');
    if (stanzaLines[0] === '[Term]') {
      var term = {};
      stanzaLines.slice(1).forEach(function(line) {
          var keyValSeperatorIndex = line.indexOf(':')
          var key = line.slice(0, keyValSeperatorIndex)
          var val = line.slice(keyValSeperatorIndex + 1).trim()

          if (term[key]) {
            if (term[key].constructor !== Array) {
              term[key] = new Array(term[key])
            }

            term[key].push(val)
          } else {
            term[key] = val
          }
        })
        // console.log(term);
      term._id = term.id;
      terms.push(term);
    }
  });
  console.log(terms);
  db.save(terms, function(error, response) {
    console.log(error);
    console.log(response);
  });
});
