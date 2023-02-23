const express = require("express")
const router = express()
const User = require("../models/usermodel")
const RecentUser = require("../models/recentusers")

router.post("/recentsearch", async (req, res) => {
  const { username } = req.body
  const myId = req.session.userId

  let x = User.findOne({ username })
  x = await x.clone()

  let result = new RecentUser({
    myId,
    userId: x._id
  })

  result.save()
    .then(() => {
      res.status(200).json({ stato: "success" })
    })
    .catch((err) => {
      res.status(400).json({ err })
    })

})

router.get("/recentsearch", async (req,res)=>{
  const myId=req.session.userId

  console.log(myId)

  const result=await RecentUser.aggregate([
    {
      '$match': {
        'myId': myId.toString()
      }
    }, {
      '$sort': {
        'createdAt': -1
      }
    }, {
      '$addFields': {
        'id_string': {
          '$toString': '$userId'
        }
      }
    }, {
      '$group': {
        '_id': '$id_string', 
        'count': {
          '$count': {}
        }
      }
    }, {
      '$limit': 5
    }, {
      '$addFields': {
        'id_obj': {
          '$toObjectId': '$_id'
        }
      }
    }, {
      '$lookup': {
        'from': 'users', 
        'localField': 'id_obj', 
        'foreignField': '_id', 
        'as': 'user'
      }
    }, {
      '$unwind': {
        'path': '$user', 
        'preserveNullAndEmptyArrays': true
      }
    }, {
      '$addFields': {
        'username': '$user.username',
        'name': '$user.name',
        'surname': '$user.surname',
        'imageName': '$user.imageName'
      }
    }, {
      '$project': {
        'username': 1,
        'name': 1,
        'surname': 1,
        'imageName': 1
      }
    }
  ],(err,data)=>{
    console.log(data)
    if (data) res.status(200).json({stato: data})
    else res.status(200).json({ stato: false })
  })
})

router.post("/checkusername", async (req, res) => {
  const {username} = req.body
  const myId = req.session.userId

  let x = User.findOne({ _id: myId })
  x = await x.clone()

  if (username == x.username) {
    res.status(200).json({ stato: true })
  } else {
    res.status(200).json({ stato: false })
  }

})

router.post("/find", async (req, res) => {
  const { letters } = req.body
  console.log(letters)

  await User.aggregate([
    {
      '$match': {
        'username': {
          '$regex': letters,
          '$options': 'i'
        }
      }
    }
  ],(err,data)=>{
    if (data) res.status(200).json({stato: data})
    else res.status(200).json({stato: []})
  })
})

router.post("/getone", (req, res) => {
  const { username } = req.body
  
  User.findOne({ username },{ _id: 0, password: 0, email: 0 },  (err, data) => {
    if (data) {
      res.status(200).json({ data: data })
    } else {
      res.status(400).json({ stato: err })
    }
  })
})

module.exports = router