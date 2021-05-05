import express from 'express';
import {getUserCredentials, getUser, getBudget} from '../Controllers/getControllers.js'
import cors from 'cors'

const Router = express.Router();


Router.get('/UserAuth', cors() ,getUserCredentials);
Router.get('/getUser', cors(), getUser );
Router.get('/getBudget', cors(), getBudget)


export default Router;
