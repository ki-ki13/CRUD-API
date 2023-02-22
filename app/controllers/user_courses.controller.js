const UsersCourses = require("../models/user_courses.model.js");

// Create and Save a new user_course
exports.create = (req, res) => {
  if (!req.body){
    res.status(400).send({
        message:"Content cannot be empty!"
    });
  }
  //create
  const user_course = new UsersCourses({
    user_id: req.body.user_id,
    course_id: req.body.course_id
  });
//save
UsersCourses.create(user_course, (err, data)=>{
    if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating user's course."
        });
    else res.send(data);
});
};

// Retrieve all user_courses from the database (with condition).
exports.findAll = (req, res) => {
    const name = req.query.name;

    UsersCourses.getAll(name, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving user's course."
        });
      else res.send(data);
    });
};

// Find a single user_course with a id
exports.findOne = (req, res) => {
    UsersCourses.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found user's course with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving user's course with id " + req.params.id
            });
          }
        } else res.send(data);
      });
};

// Update a user_courses identified by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      console.log(req.body);
    
      UsersCourses.updateById(
        req.params.id,
        new UsersCourses(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found user's course with id ${req.params.id}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating user's course with id " + req.params.id
              });
            }
          } else res.send(data);
        }
      );
};

// Delete a user_course with the specified id in the request
exports.delete = (req, res) => {
    UsersCourses.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found user's course with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete user's course with id " + req.params.id
            });
          }
        } else res.send({ message: `user's course was deleted successfully!` });
      });
};

// Delete all user_courses from the database.
exports.deleteAll = (req, res) => {
    UsersCourses.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all user's course."
          });
        else res.send({ message: `All user;s courses were deleted successfully!` });
      });
};
