import Cart from "../services/cart_service.js";

const cartController = {
  readCart: async (req, res) => {
    try {
      console.log(req.user);
      const results = await Cart.findByUser(req.user.id);
      if(results.carts.length == 0){
        res.status(400).json({message: "Cart is empty"})
      }
      res.json(results);

      return;
    } catch (error) {}
  },
  addToCart: async (req, res) => {
    try {
      const results = await Cart.store(
        req.body.product_id,
        req.user.id,
        req.body.quantity
      );
      res.json(results);
    } catch (error) {
      res.status(error.status).json({ error: error.message });
    }
  },
  deleteCart: async (req, res) => {
    const user_id = req.user.id;
    const product_id = req.body.product_id;
    const results = await Cart.delete(product_id, user_id);
    res.json(results);
  },
};

export default cartController;
