const express = require("express");
const router = express()
const User = require("../models/usermodel")

router.get("/profileprivacy", (req, res) => {
    const userId = req.session.userId

    User.findOneAndUpdate({ _id: userId }, { isPrivate: !isPrivate }, (err, data) => {
        if (err) {
            res.status(400).json({ stato: err })
        } else {
            res.status(200).json({ stato: "success" })
        }
    })
})

router.get("/all",async (req,res)=>{
    const userId=req.session.userId
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

router.get("/personal-information",async (req,res)=>{
    const userId=req.session.userId
    console.log(userId)
    User.findOne({
        _id: userId
    },{
        _id: 0,
        name: 1,
        surname: 1,
        username: 1
    },(err,data)=>{
        if (data) res.status(200).json({user: data})
        else res.status(400).json({stato: err})
    })
})

router.get("/email",async (req,res)=>{
    const userId=req.session.userId
    User.findOne({
        _id: userId
    },{
        _id: 0,
        email: 1
    },(err,data)=>{
        if (data) res.status(200).json({user: data})
        else res.status(400).json({stato: err})
    })
})

module.exports = router