const Categories = require("../models/categories.model.js");

// Create and Save a new category
exports.create = (req, res) => {
  if (!req.body){
    res.status(400).send({
        message:"Content cannot be empty!"
    });
  }
  //create
  const category = new Categories({
    name: req.body.name
  });
//save
Categories.create(category, (err, data)=>{
    if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating category."
        });
    else res.send(data);
});
};

// Retrieve all categories from the database (with condition).
exports.findAll = (req, res) => {
    const name = req.query.name;

    Categories.getAll(name, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving categories."
        });
      else res.send(data);
    });
};

// Find a single category with a id
exports.findOne = (req, res) => {
    Categories.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found category with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving category with id " + req.params.id
            });
          }
        } else res.send(data);
      });
};

// Update a category identified by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      console.log(req.body);
    
      Categories.updateById(
        req.params.id,
        new Categories(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found category with id ${req.params.id}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating category with id " + req.params.id
              });
            }
          } else res.send(data);
        }
      );
};

// Delete a category with the specified id in the request
exports.delete = (req, res) => {
    Categories.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found category with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete category with id " + req.params.id
            });
          }
        } else res.send({ message: `category was deleted successfully!` });
      });
};

// Delete all categories from the database.
exports.deleteAll = (req, res) => {
    Categories.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all categories."
          });
        else res.send({ message: `All categories were deleted successfully!` });
      });
};
