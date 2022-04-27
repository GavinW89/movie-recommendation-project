const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const{secret} = require("../config/jwt");


class UserController{
    register(req, res){
        console.log("registering now");
        User.create(req.body)
        .then(user => {
            const userToken = jwt.sign({
                _id: user._id
            }, secret);

            res
                .cookie("usertoken", userToken, secret, {
                    httpOnly: true
                })
                .json({ msg: "success!", user: user });
        })
        .catch(err=> res.json(err))
    }

    login(req,res){
        User.findOne({email:req.body.email})
        .then(user => { 
            if(user == null){
                res.json({msg:"Invalid login attempt"}) //email is not found
                
            }else{
                bcrypt.compare(req.body.password, user.password)
                    .then(passwordIsValid=>{
                        if(passwordIsValid){
                            res.cookie("usertoken", jwt.sign({_id: user._id}, secret), {httpOnly:true})
                            .json({msg:"success!", user: user });
                        }else{
                            res.json({msg:"Invalid login attempt"})//incorrect password
                        }
                    })
                    .catch(err => res.json({msg:"Invalid login attempt", err}))
            }
        })  
        .catch(err=>res.json(err))
    }

    logout(req, res) {
        console.log("Hit the logout");
        res.clearCookie('usertoken')
        res.sendStatus(200)
    }


    getLoggedInUser(req,res){
        const decoddedJWT = jwt.decode(req.cookies.usertoken, {complete:true});
        console.log(decoddedJWT);
        User.findById(decoddedJWT.payload._id)
            .then(user=> res.json({results: user}))
            .catch(err=> res.json(err))

    }

    
}

module.exports = new UserController();

// module.exports.register =(req, res)=>{
//     User.create(req.body)
//     .then((user) =>{
//         const userToken = jwt.sign({
//             id: user._id
//         }, process.env.SECRET_KEY);

//         res
//         .cookie("usertoken", jwt.sign({_id:user._id}, secret,{httpOnly: true}))
//         .json({msg:"success", user:user})
//     })
//     .catch(err=> res.json(err))

// }

// module.exports.login =(req,res)=>{
//     User.findOne({email:req.body.email})
//     .then(user => { 
//         if(user == null){
//             res.json({msg:"Invalid login attempt"}) //email is not found
            
//         }else{
//             bcrypt.compare(req.body.password, user.password)
//                 .then(passwordIsValid=>{
//                     if(passwordIsValid){
//                         res.cookie("usertoken", jwt.sign({_id: user._id}, secret), {httpOnly:true})
//                         .json({msg:"success!"});
//                     }else{
//                         res.json({msg:"Invalid login attempt"})//incorrect password
//                     }
//                 })
//                 .catch(err => res.json({msg:"Invalid login attempt", err}))
//         }
//     })  
//     .catch(err=>res.json(err))
// }

module.exports.getall = (req,res) => {
    User.find().sort({name:1})
    .then(results => res.json(results))
    .catch(err=> res.status(400).json({message: "Did not work!", err}))
}


// module.exports.findAll = (req,res) => {
//     User.find().sort({name:1})
//     .then(results => res.json(results))
//     .catch(err=> res.status(400).json({message: "Did not work!", err}))
// }

// module.exports.register = (req,res) => {
//     User.create(req.body)
//     .then(results => res.json(results))
//     .catch(err=> res.status(400).json({message: "Did not work!", err}))
// }

// module.exports.findOne = (req, res) => {
//     User.findOne({_id: req.params._id})
//     .then(results => res.json(results))
//     .catch(err => res.status(400).json({message: "Did not work", err}))
// }