const Admins = require("../models/admins.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); 

const sql = require("../models/db.js");

// Create and Save a new admin
exports.register = async (req, res) => {
    if (!req.body){
      res.status(400).send({
          message:"Content cannot be empty!"
      });
    }

//create
const hash = await bcrypt.hash(req.body.password, 10);
const admin = new Admins({
    name: req.body.name,
    email: req.body.email,
    password: hash
  });


  //save
  Admins.register(admin, (err, data)=>{
    if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while registering admin."
        });
    else res.send(data);
});
}

exports.login = (req,res,next) =>{
    sql.query("SELECT * FROM admins WHERE email = ?", req.body.email, (err,result)=>{
        if (err) {
            // throw err;
            return res.status(400).send({
                msg:err
            });
        }

        if(!result.length){
            return res.status(401).send({
                msg: "Email atau password tidak sesuai"
            });
        }

        //cek password
        bcrypt.compare(
            req.body.password,
            result[0]['password'],
            (bErr, bResult) =>{
                if(bErr){
                    return res.status(401).send({
                        msg: "Email atau password tidak sesuai"
                    });
                }
                if(bResult){
                    const token = jwt.sign({
                        email: result[0].email,
                        userId: result[0].id
                    },
                    'qqtoken',{
                        expiresIn:'7d'
                    }
                    );

                    return res.status(200).send({
                        msg: 'Sudah masuk!',
                        token,
                        user:result[0]
                    });
                }
                return res.status(401).send({
                    msg:"Email atau password tidak sesuai"
                });
            }
        );
    });
}