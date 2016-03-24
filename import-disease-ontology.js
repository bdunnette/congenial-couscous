#!/usr/bin/env node

var fs = require('fs'),
  http = require('http'),
  path = require('path'),
  argv = require('yargs').argv,
  cradle = require('cradle'),
  db = new(cradle.Connection)().database('do');

var oboUrl = "http://www.berkeleybop.org/ontologies/doid.obo";
var oboFile = path.join(__dirname, 'doid.obo');

var parseStanza = function(stanza, getStanzaType) {
  var stanzaObject = {};
  stanzaLines = stanza.split("\n");
  if (getStanzaType === true) {
    stanzaObject.type = stanzaLines.shift();
  }
  stanzaLines.forEach(function(line) {
    var splitString = line.split(":");
    var key = splitString.shift();
    var value = splitString.join(":").replace(/^\s+/, '');
    if (value.match(/ \! /)) {
      value = value.split(" ! ")[0];
    }
    if (stanzaObject.hasOwnProperty(key) && typeof stanzaObject[key] === 'object') {
      stanzaObject[key].push(value);
    }
    else if (stanzaObject.hasOwnProperty(key)) {
      var keyVal = stanzaObject[key];
      stanzaObject[key] = [];
      stanzaObject[key].push(keyVal);
      stanzaObject[key].push(value);
    }
    else {
      stanzaObject[key] = value;
    }
  });
  return stanzaObject;
};

var getOBOFile = function(oboUrl) {
  request(oboUrl).pipe(fs.createWriteStream(oboFile));
};


var parseOBOStanzas = function(oboUrl) {
  console.log('Parsing OBO file from ' + oboUrl);
  var oboFile = Diseases.findOne({
    oboUrl: oboUrl
  });
  if (!oboFile) {
    console.log(oboFile);
    return oboFile;
  }
  var oboContent = oboFile.oboContent;
  var stanzas = oboContent.split("\n\n");
  var ontology = parseStanza(stanzas[0]);

  Diseases.update({
    'oboUrl': oboUrl
  }, {
    $set: {
      'stanzas': stanzas.slice(1)
    }
  }, function(error, result) {
    return result;
  });
};

var parseOBOHeader = function(oboUrl) {
  console.log('Parsing OBO file header from ' + oboUrl);
  var oboFile = Diseases.findOne({
    oboUrl: oboUrl
  });
  var stanzas = oboFile.stanzas;
  var ontology = parseStanza(stanzas[0]);

  Diseases.update({
    'oboUrl': oboUrl
  }, {
    $set: {
      'ontology': ontology
    }
  }, function(err, result) {
    return result;
  });
};

var parseOBOTerms = function(oboUrl) {
  console.log('Parsing OBO file terms from ' + oboUrl);

  terms.forEach(function(stanza) {
    var term = parseStanza(stanza, true);
    delete term.type;
    Diseases.upsert({
      'id': term.id
    }, {
      $set: term
    });
  });
};

var file = fs.createWriteStream(oboFile);
var request = http.get(oboUrl, function(response) {
  response.pipe(file);
  response.on('end', function(){
    var fileData = fs.readFileSync(oboFile);
    console.log(fileData.toString());
  });
});



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
