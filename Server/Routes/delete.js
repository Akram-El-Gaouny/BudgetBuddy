import express from 'express';
import {deleteBudget} from "../Controllers/deleteControllers.js";

const Router = express.Router();


Router.delete("/deleteBudget", deleteBudget);


export default Router;
