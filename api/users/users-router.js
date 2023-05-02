const router = require('express').Router();
const User = require('./users-model');
const { protect, checkRole} = require('../auth/auth-middleware');

router.get('/', protect, checkRole("Admin"), async (req,res,next)=> {
    const users = await User.getAll();
    res.json(users);
})

router.post('/', protect, checkRole("Admin"), async (req,res,next)=> {
    const user = await User.create(payload);
    res.json(user);
})

module.exports = router;