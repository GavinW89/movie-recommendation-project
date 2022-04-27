const jwt = require("jsonwebtoken");
const secret = "It's a secret";


// const payload = {
//     id: user._id
//     };

//   // notice that we're using the SECRET_KEY from our .env file
//     const userToken = jwt.sign(payload, process.env.SECRET_KEY);

module.exports.secret = secret;

module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.usertoken, secret, (err, payload) => {
        if (err) {
            res.status(401).json({ verified: false });
        } else {
        next();
        }
    });
};
