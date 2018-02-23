const db = require("../db/models");

// Defining methods for the catchController
module.exports = {
  //findAll returns all catch objects sorted by date
  findAll: function(req, res) {
    db.Catch
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  //findById returns catch by given id-no planned use
  findById: function(req, res) {
    db.Catch
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  //create inserts record into the database
  create: function(req, res) {
    db.Catch
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  //update will change record according to id
  update: function(req, res) {
    db.Catch
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  //remove will remove the record according to id
  remove: function(req, res) {
    db.Catch
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
