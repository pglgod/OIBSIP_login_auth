


const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require("express-validator");



// User encription
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken"); 
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "KORERO";

router.post('/auth/signup',
[
    body('username', 'Enter a valid name').isLength({min: 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password must be atleast five charecters').isLength({min: 5}),
    body('cource', 'Enter a valid cource name').isLength({min: 2}),
    body('phone', 'Enter a valid phone number').isLength({min: 10, max: 10}),
    body('enrollment', 'Enter your enrollment number').isLength({min: 9, max: 13}),
    body('profileImg', 'Enter your profile image url').isURL(),

], async (req, res)=>{
    let success;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success = false;
        return res.status(400).json({ success: success, errors : errors.array() });
    }

    try {
        let user = await User.findOne({email: req.body.email});
        if (user) {
            success = false;
            return res.status(400).json({success : success, error: "Sorry a user with this email alrady exists!" })
        }
        let enroll = await User.findOne({enrollment : req.body.enrollment});
        if (enroll) {
            success = false;
            return res.status(400).json({success : success, error: "Sorry a user with this enrollment number alrady exists!" })
        }

        const salt = await bcrypt.genSalt(10);
        secpass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: secpass,
            cource: req.body.cource,
            phone: req.body.phone,
            enrollment: req.body.enrollment,
            profileImg: req.body.profileImg
        });

        const data = {
            user: {
                id: user.id
            }
        };

        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken });



    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }
});


router.post( "/auth/login", [
    body("email", "Enter a valid email").isEmail(),
    body("password","password cannot be blank").exists()
], async (req, res)=>{
    let success = false;
    const errors = validationResult(req);
    if (!errors) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password} = req.body;
    try {
        let user = await User.findOne({email})
        if (!user) {
            success = false;
            return res.status(400).json({ success, error: "Plz Login With Correct Credential" });
        }
        const passwordCompare = bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({success, error: "Plz Login With Correct Credential" });
        }

        const data = {
            user:{
                id: user.id
            }
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authToken});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured"); 
    }
});


router.post("/auth/getuser", fetchuser, async (req, res) => {
    try {
      let userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Enternal Server Error");
    }
  });



module.exports = router;
