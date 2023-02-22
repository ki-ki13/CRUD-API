const sql = require("./db.js");

// constructor
const Users = function(user) {
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
  };

  //create
  Users.create = (newUser, result)=>{
    sql.query("INSERT INTO users SET ?", newUser, (err, res)=>{
      if(err){
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created user: ", {id:res.insertId, ...newUser});
      result(null, {id: res.insertId,...newUser});
    });
  };

  //read (by id)
  Users.findById = (id, result) =>{
    sql.query(`SELECT * FROM users WHERE id = ${id}`, (err,res)=>{
      if (err){
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length){
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }

      //not found user
      result({kind : "not_found"}, null);
    });
  };

  //read (getAll)
  Users.getAll = (name, result)=>{
    sql.query("SELECT * FROM users", (err,res)=>{
      if (err){
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("users: ", res);
      result(null,res);
    });
  };

  Users.updateById = (id, user, result)=>{
    sql.query(
      "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?", 
      [user.name, user.email, user.password, id],
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

        console.log("updated user:", {id : id, ...user});
        result(null, {id:id, ...user});
      }
    );
  };

  Users.remove = (id, result) => {
    sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
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
  
      console.log("deleted user with id: ", id);
      result(null, res);
    });
  };
  
  Users.removeAll = result => {
    sql.query("DELETE FROM users", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} users`);
      result(null, res);
    });
  };
  
  module.exports = Users;