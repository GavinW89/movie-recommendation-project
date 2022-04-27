const express = require("express")
const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors({credentials: true, origin:'http://localhost:8000'}));
// const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions));

// const whitelist = ["http://localhost:8000"]
// const corsOptions = {
//     origin: function (origin, callback) {
//         console.log(origin)
//     if (!origin || whitelist.indexOf(origin) !== -1) {
//         callback(null, true)
//     } else {
//         callback(new Error("Not allowed by CORS"))
//     }
//     },
//     // origin: whitelist[0],
//     credentials: true,
// }
// app.use(cors(corsOptions))



const cookieParser = require("cookie-parser");
app.use(cookieParser());

// app.get("/api/test", (req,res) =>{
    //     console.log({message:"hey it's me!"})
    // })
    require("./server/config/mongoose.config")
    
    client_build =__dirname.substring(0, __dirname.length - 7) +"/client/build";

    app.use(express.static(client_build));
    
    app.use(express.json(), express.urlencoded({extended:true}));
    
    require("./server/routes/user.routes")(app,client_build);

app.listen(port, ()=>console.log(`Running on port ${port} is a new I like to be!`));