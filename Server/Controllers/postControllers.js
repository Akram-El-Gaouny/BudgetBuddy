import { Sqlconnection } from "../Server.js";
import userSchema from "../Model/userSchema.js";
export function addUser(req, res) {
  let query = `INSERT INTO users (Email, DOB, ENCRYPTEDPWD, PWDREMINDER)
    VALUES ( "${req.body.Email}", "${req.body.DOB}" , "${req.body.ENCRYPTEDPWD}", "${req.body.PWDREMINDER}");`;
  Sqlconnection.query(query, function (err) {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        res.json({ message: "This Email Already Exists Try Logging In" });
      }
    } else {
      let retriveID = `Select id from users WHERE Email = \"${req.body.Email}\";`;
      
      Sqlconnection.query(retriveID, function (err, results) {
        if (err) {
          res.json({ message: err.message });
        } else {
          res.json({ message: "Successful", id: results[0].id });
        }
      });
    }
  });
}

export function createProfile(req, res){
  const user = new userSchema({
    userId: req.query.id,
    budgets: []
  });

  user
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      cosnole.log(err);
    });

}


