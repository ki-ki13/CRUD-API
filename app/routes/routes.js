module.exports = app =>{
    const users = require("../controllers/users.controller.js");
    const categories = require("../controllers/categories.controller.js")
    const courses = require("../controllers/courses.controller.js")
    const userCourses = require("../controllers/user_courses.controller.js")
    const admins = require("../controllers/admins.controller.js")

    var router = require("express").Router();

    const adminMiddleware = require("../middleware/admins.js")

  // SIGN-UP and LOGIN
  router.post("/sign-up", adminMiddleware.validateRegister, admins.register);
  router.post("/login", admins.login);  

  //USER
  // Create a new user
  router.post("/user",adminMiddleware.isLoggedIn, users.create);
  // Retrieve all users
  router.get("/user",adminMiddleware.isLoggedIn, users.findAll);
  // Retrieve a single user with id
  router.get("/user/:id", adminMiddleware.isLoggedIn,users.findOne);
  // Update a user with id
  router.put("/user/:id",adminMiddleware.isLoggedIn, users.update);
  // Delete all users
  router.delete("/user",adminMiddleware.isLoggedIn, users.deleteAll);
  // Delete a user with id
  router.delete("/user/:id",adminMiddleware.isLoggedIn, users.delete);

  //CATEGORIES
  // Create a new category
  router.post("/category",adminMiddleware.isLoggedIn, categories.create);
  // Retrieve all categories
  router.get("/category",adminMiddleware.isLoggedIn, categories.findAll);
  // Retrieve a single category with id
  router.get("/category/:id",adminMiddleware.isLoggedIn, categories.findOne);
  // Update a category with id
  router.put("/category/:id",adminMiddleware.isLoggedIn, categories.update);
  // Delete a category with id
  router.delete("/category/:id",adminMiddleware.isLoggedIn,categories.delete);
  // Delete all categories
  router.delete("/category",adminMiddleware.isLoggedIn, categories.deleteAll);

  //COURSES
  // Create a new course
  router.post("/course",adminMiddleware.isLoggedIn, courses.create);
  // Retrieve all courses
  router.get("/course",adminMiddleware.isLoggedIn, courses.findAll);
  // Retrieve a single course with id
  router.get("/course/:id",adminMiddleware.isLoggedIn, courses.findOne);
  // Update a course with id
  router.put("/course/:id",adminMiddleware.isLoggedIn, courses.update);
  // Delete a course with id
  router.delete("/course/:id",adminMiddleware.isLoggedIn, courses.delete);
  // Delete all courses
  router.delete("/course",adminMiddleware.isLoggedIn, courses.deleteAll);

  //USER'S COURSES
  // Create a new user_course
  router.post("/user-course",adminMiddleware.isLoggedIn, userCourses.create);
  // Retrieve all user_courses
  router.get("/user-course",adminMiddleware.isLoggedIn, userCourses.findAll);
  // Retrieve a single user_course with id
  router.get("/user-course/:id",adminMiddleware.isLoggedIn, userCourses.findOne);
  // Update a user_course with id
  router.put("/user-course/:id",adminMiddleware.isLoggedIn, userCourses.update);
  // Delete a user_course with id
  router.delete("/user-course/:id",adminMiddleware.isLoggedIn, userCourses.delete);
  // Delete all user_courses
  router.delete("/user-course",adminMiddleware.isLoggedIn, userCourses.deleteAll);

  app.use('/api/asses2', router);
}