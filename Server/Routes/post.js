import express from 'express';
import {addUser, createProfile} from '../Controllers/postControllers.js';
import {Sqlconnection} from '../Server.js';


const Router = express.Router();

Router.post('/addUser', addUser);
Router.post('/createProfile',  createProfile);


export default Router;
