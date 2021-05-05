import { Sqlconnection } from "../Server.js";
import mongoose from "mongoose";
import userSchema from "../Model/userSchema.js"

export function getUserCredentials(req, res) {
  let query = `SELECT id, Email, ENCRYPTEDPWD FROM users WHERE Email = \"${req.query["Email"]}\";`;
  Sqlconnection.query(query, function (err, results, fields) {
    if (err) {
      res.json({ message: "An Error Occured While Gathering the info" });
    } else {
      if (results.length === 0) {
        res.json({
          message: "There is no match of the email you entered in our database",
        });
      } else {
        let Email = results[0].Email;
        let Password = results[0].ENCRYPTEDPWD;
        let id = results[0].id;
        res.json({
          message: "Successful",
          Email: Email,
          ENCRYPTEDPWD: Password,
          id: id, 
        });
      }
    }
  });
} 

export function getUser(req, res){
  userSchema.findOne({"userId" : `${req.query.userId}`}).then(
    (result) => {
      res.json(result);
    }
  ).catch( (err) => {
    res.send(err);
  })
}

export function getBudget(req, res){
  userSchema.findOne({"budgets._id" : `${req.query.id}`}).then(
    (user) => {
      let budgets = user.budgets;
      let budget = budgets.find(
        ({ _id }) => _id.toString() === `${req.query.id}`
      );

      res.json(budget);
    }
  ).catch( (err) => {
    res.send(err);
  })


}



