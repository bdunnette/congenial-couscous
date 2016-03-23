var ddoc = {
  _id: '_design/diseaseOntology',
  rewrites: [{
    from: '_db',
    to: '../..'
  }, {
    from: '_db/*',
    to: '../../*'
  }, {
    from: '_ddoc',
    to: ''
  }, {
    from: '_ddoc/*',
    to: '*'
  }, {
    from: '/',
    to: 'index.html'
  }, {
    from: '/*',
    to: '*'
  }],
  views: {
    "diseases": {
      "map": "function(doc) {if (doc.name) {emit(doc.name, doc);}}"
    }
  },
  shows: {},
  lists: {},
  validate_doc_update: function(newDoc, oldDoc, userCtx) {
    if (newDoc._deleted === true && userCtx.roles.indexOf('_admin') === -1) {
      throw 'Only admin can delete documents on this database.';
    }
  }
};
module.exports = ddoc;
