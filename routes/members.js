const {Router}=require("express")


const membersRouter=Router()



membersRouter.post("/",function(req,res){
  res.json({
    message:"added a member"
  })
})

membersRouter.get("/",function(req,res){
  res.json({
    message:"list of all members"
  })
})

membersRouter.get("/id",function(req,res){
  res.json({
    message:"details of this id user"
  })
})


module.exports={
  membersRouter:membersRouter
}