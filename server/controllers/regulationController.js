const db = require("../db/models");

// Defining methods for the regulationController
module.exports = {
  //findAll will return alphabetical list of fish and associated regulation 
  findAll: function(req, res) {
    db.Regulation
      .find(req.query)
      .sort({ fishName: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  //findById will return fish by given id- no planned use
  findById: function(req, res) {
    db.Regulation
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  //create will insert a record into the table. 
  create: function(req, res) {
    db.Regulation
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  //update will update the record by id-no planned use
  update: function(req, res) {
    db.Regulation
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  //remove will remove record by id-no planned use
  remove: function(req, res) {
    db.Regulation
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
