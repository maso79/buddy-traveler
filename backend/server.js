const express = require("express");
const mongoose = require("mongoose");
const app = express();
const auth = require("./routers/authorization");
const updates = require("./routers/updates")
const session = require("express-session")
const MongoDBSession = require("connect-mongodb-session")(session)
require("dotenv").config();

const PORT = process.env.PORT;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const store = new MongoDBSession({
  uri: process.env.DB_URI,
  collection: "Sessions"
})

store.on("error", (error) => {
  console.log(error)
})

app.use(
  require("express-session")({
    secret: process.env.SECRET_TOKEN,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, //Una settimana
    },
    store: store,
    resave: true,
    saveUninitialized: true
  })
)

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/update", updates)
app.use("/auth", auth);

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })


