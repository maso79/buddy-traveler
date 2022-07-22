const express = require("express");
const router = express()
const User = require("../models/usermodel")

router.get("/picture",async (req,res)=>{
    //TODO: trovare un modo per trasferire le foto al frontend
})

router.get("/all",async (req,res)=>{
    const userId=req.session.userId
    console.log("user id "+userId)
    User.findOne({
        _id: userId
    },{
        _id: 0,
        password: 0
    },(err,data)=>{
        if (data) res.status(200).json({user: data})
        else res.status(400).json({stato: err})
    })
})

module.exports = router