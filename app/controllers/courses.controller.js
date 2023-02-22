const Courses = require("../models/courses.model.js");

// Create and Save a new course
exports.create = (req, res) => {
  if (!req.body){
    res.status(400).send({
        message:"Content cannot be empty!"
    });
  }
  //create
  const course = new Courses({
    title: req.body.title,
    course_category_id: req.body.course_category_id
  });
//save
  Courses.create(course, (err, data)=>{
      if (err)
          res.status(500).send({
              message:
              err.message || "Some error occurred while creating course."
          });
      else res.send(data);
  });
};

// Retrieve all courses from the database (with condition).
exports.findAll = (req, res) => {
    const name = req.query.name;

    Courses.getAll(name, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving courses."
        });
      else res.send(data);
    });
};

// Find a single course with a id
exports.findOne = (req, res) => {
    Courses.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found course with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving course with id " + req.params.id
            });
          }
        } else res.send(data);
      });
};

// Update a course identified by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      console.log(req.body);
    
      Courses.updateById(
        req.params.id,
        new Courses(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found course with id ${req.params.id}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating course with id " + req.params.id
              });
            }
          } else res.send(data);
        }
      );
};

// Delete a course with the specified id in the request
exports.delete = (req, res) => {
    Courses.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found course with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete course with id " + req.params.id
            });
          }
        } else res.send({ message: `course was deleted successfully!` });
      });
};

// Delete all courses from the database.
exports.deleteAll = (req, res) => {
    Courses.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all courses."
          });
        else res.send({ message: `All courses were deleted successfully!` });
      });
};
