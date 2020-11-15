require("dotenv").config();

const express = require("express");
const db = require("./db/db");
const cors = require("cors");

const user_routes = require("./routes/user");
const pool_routes = require("./routes/pool");

const app = express();
db.then(() => console.log("Connected to MongoDB")).catch((err) =>
  console.log(err)
);

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/user", user_routes);
app.use("/pool", pool_routes);

app.get("/", (req, res) => {
  res.send({ msg: "Default endpoint" });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
