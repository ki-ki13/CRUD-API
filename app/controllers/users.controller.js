const Users = require("../models/users.model.js");

// Create and Save a new user
exports.create = (req, res) => {
  if (!req.body){
    res.status(400).send({
        message:"Content cannot be empty!"
    });
  }
  //create
  const user = new Users({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
//save
Users.create(user, (err, data)=>{
    if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating user."
        });
    else res.send(data);
});
};

// Retrieve all users from the database (with condition).
exports.findAll = (req, res) => {
    const name = req.query.name;

    Users.getAll(name, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      else res.send(data);
    });
};

// Find a single user with a id
exports.findOne = (req, res) => {
    Users.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found user with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving user with id " + req.params.id
            });
          }
        } else res.send(data);
      });
};

// Update a user identified by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      console.log(req.body);
    
      Users.updateById(
        req.params.id,
        new Users(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found user with id ${req.params.id}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating user with id " + req.params.id
              });
            }
          } else res.send(data);
        }
      );
};

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
    Users.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found user with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete user with id " + req.params.id
            });
          }
        } else res.send({ message: `user was deleted successfully!` });
      });
};

// Delete all users from the database.
exports.deleteAll = (req, res) => {
    Users.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all users."
          });
        else res.send({ message: `All users were deleted successfully!` });
      });
};
