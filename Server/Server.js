import express from "express";
import mySql from "mysql";
import getRequests from "./Routes/get.js";
import postRequests from "./Routes/post.js";
import putRequests from "./Routes/put.js";
import deleteRequests from "./Routes/delete.js"
import mongoose from "mongoose";
import cors from "cors";
import userSchema from "./Model/userSchema.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(8000);
console.log("Running on port 8000");
export var Sqlconnection = mySql.createConnection({
  host: "localhost",
  user: "root",
  password: "test123",
  database: "budget_buddy_users",
});


Sqlconnection.connect((err) => {
  if (err) {
    console.error("error connecting \n " + err.stack);
    return;
  }
  console.log("connected to MySQL");
});

const MongoDBConnectionURL = "mongodb+srv://Akram:@cluster0.gnnlh.mongodb.net/BudgetBuddy?retryWrites=true&w=majority";
mongoose
  .connect(MongoDBConnectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });


app.use("/put", putRequests);
app.use("/get", getRequests);
app.use("/post", postRequests);
app.use("/delete", deleteRequests);
