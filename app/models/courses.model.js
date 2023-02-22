const sql = require("./db.js");

// constructor
const Courses = function(course) {
    this.title = course.title;
    this.course_category_id = course.course_category_id;
  };

  //create
  Courses.create = (newCourse, result)=>{
    sql.query("INSERT INTO courses SET ?", newCourse, (err, res)=>{
      if(err){
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created course: ", {id:res.insertId, ...newCourse});
      result(null, {id: res.insertId,...newCourse});
    });
  };

  //read (by id)
  Courses.findById = (id, result) =>{
    sql.query(`SELECT courses.title, course_categories.name AS category FROM courses JOIN course_categories ON courses.course_category_id = course_categories.id WHERE courses.id = ${id}`, 
    (err,res)=>{
      if (err){
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length){
        console.log("found course: ", res[0]);
        result(null, res[0]);
        return;
      }

      //not found user
      result({kind : "not_found"}, null);
    });
  };

  //read (getAll)
  Courses.getAll = (title, result)=>{
    sql.query("SELECT courses.title, course_categories.name AS category FROM courses JOIN course_categories ON courses.course_category_id = course_categories.id", 
    (err,res)=>{
      if (err){
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("courses: ", res);
      result(null,res);
    });
  };

  Courses.updateById = (id, course, result)=>{
    sql.query(
      "UPDATE courses SET title = ?, course_category_id = ? WHERE id = ?", 
      [course.title, course.course_category_id, id],
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

        console.log("updated course:", {id : id, ...course});
        result(null, {id:id, ...course});
      }
    );
  };

  Courses.remove = (id, result) => {
    sql.query("DELETE FROM courses WHERE id = ?", id, (err, res) => {
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
  
      console.log("deleted course with id: ", id);
      result(null, res);
    });
  };
  
  Courses.removeAll = result => {
    sql.query("DELETE FROM courses", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} courses`);
      result(null, res);
    });
  };
  
  module.exports = Courses;