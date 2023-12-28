const express = require('express');
const router = require('express').Router();
const {registerUser,loginUser,getAllUsers, updateUser,deleteUser} = require('../controllers/controller')


router.post('/register', registerUser);

router.post('/login',loginUser)

router.get('/', getAllUsers);

router.put('/:id',updateUser);

router.delete('/delete/:id',deleteUser)


module.exports = router;

