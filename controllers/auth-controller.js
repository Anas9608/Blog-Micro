const User = require("../models/user-models.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;
// login user
exports.signUp = async (req, res) => {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            return res.status(400).json({ data: "user name or password is missing" });
        }
        const hashPassword = await bcrypt.hash(password, saltRounds);
        const user = await User.create({ userName, password: hashPassword });
        return res.status(200).json({
            status: "success",
            data: {
                user
            }
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ body: "Internal server error" });
    }

}

//sign up user
exports.signIn = async (req, res) => {
    try {
        const { userName, password } = req.body;

        if (!userName || !password) {
            return res.status(400).json({ data: "user name or password is missing" });
        }
        const user = await User.findOne({ userName: userName });
        if (!user) {
            return res.status().json({ status: failed, data: "user not found with this user name" })
        };
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ status: "failed", data: "password is incorrect" });
        }
        // set user id in session
        req.session.user = user;

        return res.status(200).json({
            status: "success",
            data: {
                user
            }
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ body: "Internal server error" });
    }
}


