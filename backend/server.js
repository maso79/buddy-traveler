const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;

app.use((req, res, next)=>{
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); //indirizzo in locale del frontend
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); 

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/routest', (req, res) => {
  res.send("ok")
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
