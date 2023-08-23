var express = require('express');
var path = require('path');
const mongoose = require('mongoose')
const dotenv = require("dotenv")
dotenv.config()

const authRoute = require('./routes/auth')

var app = express();

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connection to DB successfull'))
  .catch(err => { console.log("Oops..onnection to DB failed!" + err) });

app.get("/api/test", (req, res) => {
  console.log("Test Succesfull")
  res.json("welcome")
})
app.use(express.json())
app.use("/api/auth", authRoute);

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`App running at port ${PORT}...`)
})

module.exports = app;
