
const User = require("../../Model/Users");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const userDetails = await User.findOne({email})
        if (!userDetails) {
            return res.status(400).json({ message: "User not found", success: false, error: true });
        }
        const validPassword = await bcrypt.compare(password, userDetails.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid password", success: false, error: true });
        }
      
        const tokendata =  jwt.sign({ id: userDetails._id, email: userDetails.email }, process.env.SECRET_KEY, { expiresIn: "24h" })
          return res.status(200).json({ data: userDetails, token: tokendata, message: "User Login successfully.", success: true, error: false });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ data: error.message, message: "Failed to login user.", success: false, error: true });
    }
}
const register = async (req, res) => {
    try {
        const {email, password, confirmPassword} = req.body;
        const existingUser = await User.findOne({email})
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists", success: false, error: true });
        }
     
        if(password !== confirmPassword){
            return res.status(400).json({ message: "Password and Confirm password not matched", success: false, error: true });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
            
        const newUser = new User({email:email, password: hashedPassword});
        const savedUser = await newUser.save();
        console.log("User saved:", savedUser);
        return res.status(200).json({ data: savedUser, message: "User Register successfully.", success: true, error: false });
    } catch (error) {
        return res.status(500).json({ data: error.message, message: "Failed to Register user.", success: false, error: true });
    }
}


module.exports = {login, register}