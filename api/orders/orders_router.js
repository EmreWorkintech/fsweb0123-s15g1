const router = require('express').Router();
const Order = require('./orders_model');

router.get('/', async (req,res)=> {
    const orders = await Order.getAll();
    res.json(orders);
})

module.exports = router;