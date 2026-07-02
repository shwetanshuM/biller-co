const {Router}=require("express")
const paymentsRouter=Router()




paymentsRouter.post("/",function(req,res){
  res.json({
    message:"user payment recorded"
  })
})


paymentsRouter.get("/",function(req,res){
  res.json({
    message:"details about payments done today or whatever"
  })
})

paymentsRouter.get("/id",function(req,res){
  res.json({
    message:"details about payments done by user with id"
  })
})


module.exports={
  paymentsRouter:paymentsRouter
}