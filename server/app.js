const express = require("express");
const routes = require("./routes/");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const app = express();
const router = express.Router();
const login = "snuri";
const pass = "Rflfdh2120";
const uri = process.env.MONGODB_URI
  || `mongodb://${login}:${pass}@cluster0-shard-00-02-bqfon.mongodb.net:27017/chek-ins?authSource=admin&ssl=true&autoReconnect=true`;
const options = {
  useNewUrlParser: true,
  autoIndex: false,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  poolSize: 10
};

mongoose.connect(uri, options).then(
  () => {},
  err => {}
);
const port = 5000 || process.env.PORT;

routes(router);

app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

app.use("/api", router);

app.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});
