const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
const auth = require("./routers/authorization");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/auth", auth);

app.get("/routest", (req, res) => {
  res.json("ok");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
