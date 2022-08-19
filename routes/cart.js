const router = require("express").Router();
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken")
const Cart = require("../models/Cart");

//create cart
router.post("/", verifyToken, async (req,res)=>{
    const newCart = new Cart(req.body)
    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (error) {
        res.status(500).json(error)
    }
})

//UPDATE 
router.put("/update/:id", verifyTokenAndAuthorization, async (req, res)=>{
    try {
        const updatedCart = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new:true});
        res.status(200).json(updatedCart)
    } catch (error) {
        res.status(500).json(error)
    }
})
// delete
router.delete("/delete/:id", verifyTokenAndAuthorization, async (req, res)=>{
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart deleted")
    } catch (error) {
        res.status(500).json(error)
    }
})
// get user cart
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res)=>{
    try {
        const cart = await Cart.find({id: req.params.id})
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json(error)
    }
})
// get all
router.get("/", verifyTokenAndAdmin, async(req, res)=>{
    try {
        const cart = await Cart.find()
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json(error)
    }
})



module.exports = router