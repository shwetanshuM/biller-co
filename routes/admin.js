
const { Router } = require("express");
const { adminModel } = require("../db");
const jwt = require("jsonwebtoken");

const adminRouter = Router();

//ADD THE BCRYPT AND ZOD PARTS PLS
//ADD THE BCRYPT AND ZOD PARTS PLS
//ADD THE BCRYPT AND ZOD PARTS PLS
//ADD THE BCRYPT AND ZOD PARTS PLS
//ADD THE BCRYPT AND ZOD PARTS PLS

adminRouter.post("/signup", async function (req, res) {
  try {
    const { email, password, business_name } = req.body;
    await adminModel.create({
      email: email,
      password: password,
      business_name: business_name,
    });
    res.json({
      message: "user is signed up",
    });
  } catch (e) {
    res.status(500).json({
      message: `something went wrong`,
    });
  }
});

adminRouter.post("/signin", async function (req, res) {
  try {
    const { email, password } = req.body;
    const admin = await adminModel.findOne({ email: email });
    if (!admin) {
      return res.status(403).json({ message: "invalid credentials" });
    }
    if (admin.password != password) {
      return res.status(403).json({ message: "invalid credentials" });
    }

    const token=jwt.sign({ id: admin._id }, process.env.JWT_SECRET)

    res.json({
      token: token,
    });
  } catch (e) {
    res.status(500).json({
      message: `something went wrong`,
    });
  }
});

module.exports = {
  adminRouter: adminRouter,
};
