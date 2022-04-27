const mongoose = require("mongoose")
const bcrypt =  require("bcrypt")

const UserSchema = new mongoose.Schema(
{

    name: {
        type: String,
        required: [true, "Name is required"],
        minLength: [3, "Name must at least 3 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        },
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"],
    }

    }, { timestamps: true });
// creates virtual field for confirm password
UserSchema.virtual('confirm')
    .get( () => this.confirm)
    .set( value => this.confirm = value );
// use the virtual field to confirem password to make sure they match with password
UserSchema.pre('validate', function(next) {
    console.log(`pass:${this.password}, confirm:${this.confirm}`)
    if (this.password !== this.confirm) {
        this.invalidate('confirm', 'Password must match confirm password');
        }
        next();
    });
// Hash the password w/ Bcrypt
// this should go after 
UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        })
        .catch(err => {
            console.log("hashing failed", err)
            next();
        })
});


const User = mongoose.model("user", UserSchema )

module.exports = User;
