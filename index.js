import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import logger from "morgan";
import mainRouters from "./server/routes/index";
import dotenv from "dotenv";
import cors from "cors";

const result = dotenv.config();
if (result.error) {
  console.log(result.error);
}

var allowedOrigins = [
  "https://localhost:3000",
  "https://random-food.vercel.app",
];

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use("/api/", mainRouters);

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

let db_message = "";
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connected");
    db_message = "database connected";
  })
  .catch((e) => {
    console.log(e.message);
    db_message = e.message;
  });

const port = process.env.PORT || 5035;
app.get("/", (request, response) => {
  response.status(200).json({
    message: "Welcom to Random Food Api 1.0.0",
    db_status: mongoose.connection.readyState,
    db_message,
  });
});

app.listen(port, (request, response) => {
  console.log(`Server is running on port ${port}...`);
});
