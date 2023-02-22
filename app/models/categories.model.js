const sql = require("./db.js");

// constructor
const Categories = function(category) {
    this.name = category.name;
  };

  //create
  Categories.create = (newCategory, result)=>{
    sql.query("INSERT INTO course_categories SET ?", newCategory, (err, res)=>{
      if(err){
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created category: ", {id:res.insertId, ...newCategory});
      result(null, {id: res.insertId,...newCategory});
    });
  }; 

  //read (by id)
  Categories.findById = (id, result) =>{
    sql.query(`SELECT * FROM course_categories WHERE id = ${id}`, (err,res)=>{
      if (err){
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length){
        console.log("found category: ", res[0]);
        result(null, res[0]);
        return;
      }

      //not found category
      result({kind : "not_found"}, null);
    });
  };

  //read (getAll)
  Categories.getAll = (name, result)=>{
    sql.query("SELECT * FROM course_categories", (err,res)=>{
      if (err){
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("categories: ", res);
      result(null,res);
    });
  };

  Categories.updateById = (id, category, result)=>{
    sql.query(
      "UPDATE course_categories SET name = ? WHERE id = ?", 
      [category.name, id],
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

        console.log("updated category:", {id : id, ...category});
        result(null, {id:id, ...category});
      }
    );
  };

  Categories.remove = (id, result) => {
    sql.query("DELETE FROM course_categories WHERE id = ?", id, (err, res) => {
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
  
      console.log("deleted category with id: ", id);
      result(null, res);
    });
  };
  
  Categories.removeAll = result => {
    sql.query("DELETE FROM course_categories", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} categories`);
      result(null, res);
    });
  };
  
  module.exports = Categories;