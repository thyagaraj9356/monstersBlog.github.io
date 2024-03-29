const router = require('express').Router()
const User = require('../models/User')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

//REGISTER
router.post("/register", async (req, res) => {

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC)
    });
    try {
        const user = await newUser.save();

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err)
    }
})

//LOGIN
router.post("/login", async (req, res) => {

    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(401).json("Invalid Credentials")
        //console.log(user)

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        console.log(hashedPassword)
        console.log("9778645123")
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)
        console.log(originalPassword)
        originalPassword !== req.body.password && res.status(401).json("Invalid Credentials")
        const { password, ...others } = user._doc
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_SEC, { expiresIn: "3d" })

        res.status(200).json({ ...pothers, accessToken });
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router