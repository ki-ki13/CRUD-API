const sql = require("./db.js");

// constructor
const UsersCourses = function(user_course) {
    this.user_id = user_course.user_id;
    this.course_id = user_course.course_id;
  };

  //create
  UsersCourses.create = (newUCourse, result)=>{
    sql.query("INSERT INTO user_courses SET ?", newUCourse, (err, res)=>{
      if(err){
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created user's courses: ", {id:res.insertId, ...newUCourse});
      result(null, {id: res.insertId,...newUCourse});
    });
  };

  //read (by id)
  UsersCourses.findById = (id, result) =>{
    sql.query(`SELECT users.name, courses.title AS course FROM user_courses JOIN users ON user_courses.user_id = users.id JOIN courses ON user_courses.course_id = courses.id WHERE user_courses.id = ${id}`, 
    (err,res)=>{
      if (err){
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length){
        console.log("found user's course: ", res[0]);
        result(null, res[0]);
        return;
      }

      //not found user
      result({kind : "not_found"}, null);
    });
  };

  //read (getAll)
  UsersCourses.getAll = (name, result)=>{
    sql.query("SELECT users.name, courses.title AS course FROM user_courses JOIN users ON user_courses.user_id = users.id JOIN courses ON user_courses.course_id = courses.id", (err,res)=>{
      if (err){
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("user's course: ", res);
      result(null,res);
    });
  };

  UsersCourses.updateById = (id, user_course, result)=>{
    sql.query(
      "UPDATE user_courses SET user_id = ?, course_id = ? WHERE id = ?", 
      [user_course.user_id, user_course.course_id, id],
      (err, res)=>{
        if (err){
          console.log("error:", err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0){
          //not found
          result({kind: "not_found"}, null);
          return;
        }

        console.log("updated user's course:", {id : id, ...user_course});
        result(null, {id:id, ...user_course});
      }
    );
  };

  UsersCourses.remove = (id, result) => {
    sql.query("DELETE FROM user_courses WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted user's course with id: ", id);
      result(null, res);
    });
  };
  
  UsersCourses.removeAll = result => {
    sql.query("DELETE FROM user_courses", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} user's courses`);
      result(null, res);
    });
  };
  
  module.exports = UsersCourses;