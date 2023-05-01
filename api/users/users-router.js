const router = require('express').Router();
const User = require('./users-model');
const { protect } = require('../auth/auth-middleware');

router.get('/', protect, async (req,res,next)=> {
    const users = await User.getAll();
    res.json(users);
})

module.exports = router;