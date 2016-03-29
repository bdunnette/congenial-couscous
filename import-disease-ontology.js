#!/usr/bin/env node

var request = require('request'),
  cradle = require('cradle');

var db = new(cradle.Connection)().database('do');

// var oboUrl = "http://www.berkeleybop.org/ontologies/doid.obo";
var oboUrl = "https://github.com/DiseaseOntology/HumanDiseaseOntology/blob/master/src/ontology/HumanDO.obo?raw=true";

// var cradle = require('cradle');
//   var db = new(cradle.Connection)().database('starwars');
//
//   db.get('vader', function (err, doc) {
//       doc.name; // 'Darth Vader'
//       assert.equal(doc.force, 'dark');
//   });
//
//   db.save('skywalker', {
//       force: 'light',
//       name: 'Luke Skywalker'
//   }, function (err, res) {
//       if (err) {
//           // Handle error
//       } else {
//           // Handle success
//       }
//   });
//
//   new(cradle.Connection)('http://living-room.couch', 5984, {
//       cache: true,
//       raw: false,
//       forceSave: true,
//       request: {
//         //Pass through configuration to `request` library for all requests on this connection.
//       }
//   });
// Defaults to 127.0.0.1:5984
//
// Note that you can also use cradle.setup to set a global configuration:
//
//   cradle.setup({
//     host: 'living-room.couch',
//     cache: true,
//     raw: false,
//     forceSave: true
//   });
//
//   var c = new(cradle.Connection),
//      cc = new(cradle.Connection)('173.45.66.92');

// db.get('vader', function (err, doc) {
//       console.log(doc);
//   });
//
// db.save('vader', {
//       name: 'darth', force: 'dark'
//   }, function (err, res) {
//       // Handle response
//   });
//
//   db.save([
//         { name: 'Yoda' },
//         { name: 'Han Solo' },
//         { name: 'Leia' }
//     ], function (err, res) {
//         // Handle response
//     });

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
      terms.push(term);
    }
  });
  console.log(terms);
  db.save(terms, function(error, response){
    console.log(error);
    console.log(response);
  });
});
