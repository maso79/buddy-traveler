const aws = require("aws-sdk")
const dotenv = require("dotenv")
const crypto = require('crypto')
const { promisify } = require("util")
const User = require("../models/usermodel")
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

const generateUploadURL = async (email) => {
  const rawBytes = await randomBytes(16)
  const imageName = rawBytes.toString('hex') //valore da salvare come imageName nel modello dell'utente 

  const params = ({
    Bucket: bucketName,
    Key: imageName,
    Expires: 60
  })

  const uploadURL = await s3.getSignedUrlPromise('putObject', params)

  User.findOneAndUpdate({ email }, {imageName}, (err, data) => {
    if (!data) return { stato: "error" } 
  })

  return uploadURL
}

const generateRetriveURL = async (email) => {
  try {
    aws.config.setPromisesDependency()
    aws.config.update({
      accesKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: "eu-central-1"
    })

    User.findOne({ email })
      .then(response => {
        if (!response.email) {
          return { stato: "error" }
        } else {
          var params = { Bucket: "buddytraveler-s3-bucket", Key: response.imageName }
          var promise = s3.getSignedUrlPromise('getObject', params)
          promise.then((url) => {
          console.log(url)
          return url
        })
        }
    })

  } catch {
    return { stato: "error" }
  }
}

module.exports = { generateUploadURL, generateRetriveURL }