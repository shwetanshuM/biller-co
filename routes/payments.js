const { Router } = require("express");
const { paymentsModel,memberModel } = require("../db");
const { adminMiddleware } = require("../middleware/admin");

const paymentsRouter = Router();


//register a payment
paymentsRouter.post("/", adminMiddleware, async function (req, res) {
  try {
    const { member_id, amount, month, mode } = req.body;
    const member = await memberModel.findOne({
      _id: member_id,
      owner_id: req.userId,
    });

    if (!member) {
      return res.status(404).json({ message: "member not found" });
    }
    await paymentsModel.create({
      member_id: member_id,
      owner_id: req.userId,
      amount: amount,
      month: month,
      mode: mode,
    });
    res.json({
      message: "the payment was completed",
    });
  } catch (e) {
    res.status(500).json({
      message: "some error occurred",
    });
  }
});





//all payments today and all the collections today
paymentsRouter.get("/", adminMiddleware, async function (req, res) {
  try{
    const start=new Date()
    const end=new Date()
    start.setHours(0,0,0,0)
    end.setHours(23,59,59,999)
    const allPaymentsToday=await paymentsModel.find({
      paid_on:{ $gte:start,$lte:end},
      owner_id:req.userId,
    })
    let total=0;
    let cash=0;
    let upi=0;
    for(let i=0;i<allPaymentsToday.length;i++){
      let payment=allPaymentsToday[i];
      total+=payment.amount
      if(payment.mode==="cash"){
        cash+=payment.amount
      }
      if(payment.mode==="upi"){
        upi+=payment.amount
      }
    }
    res.json({
      total:total,
      cash:cash,
      upi:upi,
      payments:allPaymentsToday
    })

  }catch(e){
    res.status(500).json({
      message:"some error occurred"
    })
  }
});








paymentsRouter.get("/member/:id",adminMiddleware, async function (req, res) {
  try{
    const id=req.params.id
    const payments=await paymentsModel.find({
      member_id:id,
      owner_id:req.userId
    })
    res.json({
      payments:payments
    })

  }catch(e){
    res.status(500).json({
      message:"some error occurred"
    })
  }
});


paymentsRouter.get("/month/:month",adminMiddleware, async function(req,res){
  try{
    const month=req.params.month
    const payments=await paymentsModel.find({
      month:month,
      owner_id:req.userId
    })
    res.json({
      payments:payments
    })
  }catch(e){
    res.status(500).json({
      message:"some error occurred"
    })
  }
})







module.exports = {
  paymentsRouter: paymentsRouter,
};
