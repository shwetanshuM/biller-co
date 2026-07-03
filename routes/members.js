const { Router } = require("express");
const { memberModel } = require("../db");
const { adminMiddleware } = require("../middleware/admin");

const membersRouter = Router();

//this one adds a member
membersRouter.post("/", adminMiddleware, async function (req, res) {
  try {
    const { registration_number, name, phone, monthly_fee, status } = req.body;
    await memberModel.create({
      registration_number,
      name,
      phone,
      monthly_fee,
      status,
      owner_id: req.userId,
    });
    res.json({
      message: "user has been added",
    });
  } catch (e) {
    console.log(e) 
    res.status(500).json({
      message: "some error has occured in adding member",
    });
  }
});





//this one gets all the members
membersRouter.get("/", adminMiddleware, async function (req, res) {
  try {
    const allMembers = await memberModel.find({ owner_id: req.userId });
    res.json({
      members: allMembers,
    });
  } catch (e) {
    console.log(e) 
    res.status(500).json({
      message: "some error occured",
    });
  }
});





//this one returns the details of one particular member with id
membersRouter.get("/:id", adminMiddleware, async function (req, res) {
  try{
    const id=req.params.id
    const thisUser=await memberModel.findOne({
      _id:id,
      owner_id:req.userId
    })
    if(thisUser){
      res.json({
        user:thisUser
      })
    }else{
      res.json({
        message:"user not found"
      })
    }
  }catch(e){
    console.log(e) 
    res.status(500).json({
      message:"some error occured"
    })
  }
});

module.exports = {
  membersRouter: membersRouter,
};
