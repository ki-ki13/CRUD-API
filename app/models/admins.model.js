const sql = require("./db.js");
// const uuid = require("uuid");


// constructor
const Admins = function(admin) {
    this.name = admin.name;
    this.email = admin.email;
    this.password = admin.password;
  };

//register
Admins.register = (admin, result) =>{
    sql.query(
        "SELECT * FROM admins WHERE email = ?", admin.email,
        (err,email)=>{
            if(email.length){
                console.log("Email sudah dipakai");
                result(err, "Email sudah dipakai");
                return;
            }else{
                sql.query("INSERT INTO admins SET name = ?, email = ?, password = ? ", [admin.name,admin.email,admin.password], (err, res)=>{
                        if(err){
                            console.log("error: ", err);
                            result(err, null);
                            return;
                          }
                    
                          console.log("registered!");
                          result(null, "registered!");
                  });
            }
        });
     
                        
  };

module.exports = Admins;