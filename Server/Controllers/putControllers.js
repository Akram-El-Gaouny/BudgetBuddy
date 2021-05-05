import mongoose from "mongoose";
import userSchema from "../Model/userSchema.js";

export function pinBudget(req, res) {

    
  userSchema.findOne({ "budgets._id": `${req.query.id}` }).then((user) => {
    let budgets = user.budgets;
    let budget = budgets.find(
      ({ _id }) => _id.toString() === `${req.query.id}`
    );

    budget.pinned = req.query.pinned;

    user
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });


  });
}

export function addBudget(req, res){

  userSchema.findOne ( { "userId" : req.query.userId}).then ((profile) => {



    profile.budgets.push(req.body);

    profile
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });


  });
}

export function removeLog(req, res){

  userSchema.findOne ( { "budgets.logs._id" : req.query.id}).then((profile) => {
    
    let budget = profile.budgets.find(
      ({ _id }) => _id.toString() === `${req.query.budgetId}`
    );

    let log = budget.logs.find(
      ({ _id }) => _id.toString() === `${req.query.id}`
    );

    if(log.isSpending){
      budget.spendingAmount -= parseFloat(log.Amount);
    }else{
      budget.budgetedAmount -= parseFloat(log.Amount);
    }

    budget.logs = budget.logs.filter ( (log) => { return log._id.toString() !== req.query.id } );
    profile
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });


  }).catch( (err) => {
    res.send(err);
  });
}

export function addLog(req, res){

  userSchema.findOne ( { "budgets._id" : req.query.budgetId}).then((profile) => {
    
    let budget = profile.budgets.find(
      ({ _id }) => _id.toString() === `${req.query.budgetId}`
    );

    
    if (req.body.isSpending){
      budget.spendingAmount += parseFloat(req.body.Amount);
    }else{
      budget.budgetedAmount +=  parseFloat(req.body.Amount);
    }
  

    budget.logs.push(req.body);

    
    profile
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });


  }).catch( (err) => {
    res.send(err);
  });


}