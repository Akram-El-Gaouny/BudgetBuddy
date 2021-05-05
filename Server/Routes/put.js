import express from 'express';
import {pinBudget, addBudget, removeLog, addLog} from "../Controllers/putControllers.js";




const Router = express.Router();

Router.put('/pinbudget', pinBudget);
Router.put('/addBudget', addBudget); 
Router.put('/removeLog', removeLog); 
Router.put('/addLog', addLog); 

export default Router;