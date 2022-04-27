const UserController = require("../controllers/user.controller")
const {authenticate} = require("../config/jwt")
const ReactController = require("../controllers/react.controller")

module.exports = (app, client_build )=> {
    // app.post("/api/users/register", UserController.register);
    app.post('/api/users/register', UserController.register)
    // app.post("/api/users/login", UserController.login);
    app.post('/api/users/login', UserController.login)

    app.get("/api/users/getall", UserController.getall);
    // app.post('/api/users/getall', function(req,res){
    //     UserController.getAll
    // })
    app.get("/api/users/loggedinuser", authenticate, UserController.getLoggedInUser)
    
    app.get('/api/users/logout', UserController.logout)
    app.get("/*",(req,res)=>{
        return ReactController.serve(req,res,client_build);
    });

// =====================================User Related Routes===================================

}