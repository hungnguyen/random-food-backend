import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import logger from "morgan";
import mainRouters from "./server/routes/index";
import dotenv from "dotenv";

const result = dotenv.config();
if (result.error) {
  console.log(result.error);
}

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use("/api/", mainRouters);

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connected");
  })
  .catch((e) => {
    console.log(e.message);
  });

const port = process.env.PORT || 5035;
app.get("/", (request, response) => {
  response.status(200).json({
    message: "Welcom to Random Food Api 1.0.0",
    db_status: mongoose.connection.readyState,
  });
});

app.listen(port, (request, response) => {
  console.log(`Server is running on port ${port}...`);
});
