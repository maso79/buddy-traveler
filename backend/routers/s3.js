const aws = require("aws-sdk")
const dotenv = require("dotenv")
const crypto = require('crypto')
const { promisify } = require("util")
const User = require("../models/usermodel")
const Diary = require("../models/diarymodel")
const randomBytes = promisify(crypto.randomBytes)
dotenv.config()

const region = "eu-central-1"
const bucketName = "buddytraveler-s3-bucket"
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4"
})

// ************** INIZIO FUNZIONI PROFILO **************

//funzione importata per eliminare la vecchia foto prima dell'upload della nuova

const deleteProfileOldImage = async (email) => {
  var x = User.findOne({ email })

  x = await x.clone()

  if (x.imageName != "") {
    const params = { Bucket: bucketName, Key: x.imageName }
  
    s3.deleteObject(params, (err, data) => {
      if (err) return err
      else console.log(data)
    })
  }
  
}

//rimozione foto profilo corrente
const removeOldProfilePicture = async (email) => {
  var x = User.findOne({ email })

  x = await x.clone()

  if (x.imageName != "") {
    const params = { Bucket: bucketName, Key: x.imageName }
  
    s3.deleteObject(params, (err, data) => {
      if (err) return err
      else console.log(data)
    })
  } else {
    return { stato: "You got to have an image before you can delete it -.- " }
  }

  User.findOneAndUpdate({ email }, { imageName: "" }, (err, data) => {
      if (!data) return { stato: "error" }
    })
}

//upload foto profilo
const generateUploadURL = async (email) => {
  const rawBytes = await randomBytes(16)
  const imageName = rawBytes.toString('hex') //valore da salvare come imageName nel modello dell'utente 

  const params = ({
    Bucket: bucketName,
    Key: imageName,
    Expires: 60
  })

  deleteProfileOldImage(email)

  const uploadURL = await s3.getSignedUrlPromise('putObject', params)

  User.findOneAndUpdate({ email }, { imageName }, (err, data) => {
    if (!data) return { stato: "error" }
  })

  return uploadURL
}

//ottieni foto profilo
const generateRetriveURL = async (email) => {

  try {
    aws.config.setPromisesDependency()
    aws.config.update({
      accesKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: "eu-central-1"
    })

    var x = User.findOne({ email })

    x = await x.clone()

    if (x.imageName == "") {
      return { url: "not found" }
    } 

    var params = { Bucket: "buddytraveler-s3-bucket", Key: x.imageName }
    var url = await s3.getSignedUrlPromise('getObject', params)

    return url

  } catch (err) {
    return err
  }

}

// ************** FINE FUNZIONI PROFILO **************




// ************** INIZIO FUNZIONI DIARIO **************


//funzione importata per eliminare la vecchia foto prima dell'upload della nuova
const deleteDiaryOldImage = async (diaryId) => {
  var x = Diary.findOne({ _id: diaryId })

  x = await x.clone()

  if (x.imageName != "") {
    const params = { Bucket: bucketName, Key: x.imageName }
  
    s3.deleteObject(params, (err, data) => {
      if (err) return err
      else console.log(data)
    })
  }
  
}

//upload copertina diario
const genereateUploadDiaryURL = async (diaryId) => {
  const rawBytes = await randomBytes(16)
  const imageName = rawBytes.toString('hex')

  const params = ({
    Bucket: bucketName,
    Key: imageName,
    Expires: 60
  })

  deleteDiaryOldImage(diaryId)

  const uploadURL = await s3.getSignedUrlPromise('putObject', params)

  Diary.findOneAndUpdate({ _id: diaryId }, { imageName }, (err, data) => {
    if (!data) return { stato: "error" }
  })

  return uploadURL

}

//rimozione foto profilo corrente
const removeOldDiaryPicture = async (diaryId) => {
  var x = Diary.findOne({ _id: diaryId })

  x = await x.clone()

  if (x.imageName != "") {
    const params = { Bucket: bucketName, Key: x.imageName }
  
    s3.deleteObject(params, (err, data) => {
      if (err) return err
      else console.log(data)
    })
  } else {
    return { stato: "You got to have an image before you can delete it -.- " }
  }

  Diary.findOneAndUpdate({ _id: diaryId }, { imageName: "" }, (err, data) => {
      if (!data) return { stato: "error" }
    })
}

//ottieni foto diario
const generateRetriveDiaryURL = async (userId) => {

  try {
    aws.config.setPromisesDependency()
    aws.config.update({
      accesKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: "eu-central-1"
    })

    var x = Diary.findOne({ _id: userId })

    x = await x.clone()

    if (x.imageName == "") {
      return { url: "not found" }
    } 

    var params = { Bucket: "buddytraveler-s3-bucket", Key: x.imageName }
    var url = await s3.getSignedUrlPromise('getObject', params)

    return url

  } catch (err) {
    return err
  }

}

module.exports = {
  generateUploadURL,
  generateRetriveURL,
  removeOldProfilePicture,
  genereateUploadDiaryURL,
  removeOldDiaryPicture,
  generateRetriveDiaryURL
}