class ReactController{
    serve = (req,res,client_build) =>{
        res.sendFile(client_build + "/index.html");
    }
}

module.exports = new ReactController();