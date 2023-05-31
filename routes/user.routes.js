const express = require('express');
const router = express.Router();
const User = require('../model/user');
const  {alluser,createUser,login}  = require('../controller/user.controller')
const {authenticateToken} = require('../middlewere/jwt')

router.post("/login",login)
router.get("/alluser",authenticateToken,alluser);
router.post("/create",authenticateToken,createUser)


module.exports = router