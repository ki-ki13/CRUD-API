const jwt = require("jsonwebtoken");

module.exports = {
    validateRegister: (req,res,next) => {
        //username minimal 3 huruf
        var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
        if(!req.body.email || !req.body.email.match(emailFormat)){
            return res.status(400).send({
                msg:'Masukkan format email dengan benar'
            });
        }

        //password minimal 6 huruf
        if(!req.body.password || req.body.password.length < 6){
            return res.status(400).send({
                msg: "Password minimal 6 character"
            });
        }

        //pencocokan password tidak sesuai dengan yang sebelumnya
        if(!req.body.password_repeat || req.body.password != req.body.password_repeat){
            return res.status(400).send({
                msg: 'Password tidak sesuai'
            });
        } 

        next();
    },

    isLoggedIn: (req,res,next) => {
        try{
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(
                token,
                'qqtoken'
            );
            req.userData = decoded;
            next();
        } 
        catch(err){
            return res.status(401).send({
                msg: "Your session is not valid"
            });
        }
    }
};