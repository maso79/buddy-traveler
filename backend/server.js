const express = require("express");
const mongoose = require("mongoose");
const app = express();
const auth = require("./routers/authorization");
const update = require("./routers/updates")
const diary = require("./routers/diary")
const profile = require("./routers/profile")
const activity = require("./routers/activity")
const profilestats = require("./routers/profilestats")
const places = require("./routers/places")
const people = require("./routers/people")
const session = require("express-session")
const MongoDBSession = require("connect-mongodb-session")(session)
const morgan = require("morgan")
require("dotenv").config();

const PORT = process.env.PORT;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8100");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST")
  res.header("Accept", "application/json, text/plain, */*")
  res.header(
    "User-Agent", "axios/0.27.2"
  )
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
app.use(morgan("dev"))

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/update", update)
app.use("/auth", auth);
app.use("/profilestats", profilestats)
app.use("/diary", diary)
app.use("/profile", profile)
app.use("/activity", activity)
app.use("/places", places)
app.use("/people", people)



mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, "localhost", () => {
      console.log(`Listening on port ${PORT}`);
    });
  })


