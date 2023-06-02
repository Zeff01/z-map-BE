const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Register
router.post("/register", async (req, res) => {
  try {
    //Generate password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new user
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,  
      password: hashedPassword,
    });

    //Push the user to DB
    const user = await newUser.save();
    res.status(200).json(user._id);
    console.log("[SUCCESS] new user created!");
  } catch (error) {
    console.log("[FAILED] to create a new user");
    res.status(500).json(error);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    //Find a specific user
    const user = await User.findOne({ userName: req.body.userName });
    if (!user) {
      console.log("[FAILED] Logging to user");
      res.status(400).json("Wrong username or password!");
    } else {
      //validate password
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        res.status(400).json("Wrong username or password!");
      } else {
        console.log("[SUCCESS] user got login sccuessfully");
        res.status(200).json(user);
      }
    }
  } catch (error) {
    console.log("[FAILED] logging in with user");
    res.status(500).json(error);
  }
});

module.exports = router;
