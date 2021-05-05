import userSchema from "../Model/userSchema.js";

export function deleteBudget(req, res){

    userSchema.findOne({ "userId": req.query.userId}).then((user) => {
        user.budgets = user.budgets.filter ( (budget) => {return req.query.id !== budget._id.toString()} );

        user
        .save()
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          res.send(err);
        });
        
    }).catch( (err) => {
        console.log(err);
    })

    



}