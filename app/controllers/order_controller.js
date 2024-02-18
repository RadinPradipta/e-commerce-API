import Order from "../services/order_service.js";

const orderController = {
  browseOrders: async (req, res) => {
    try {
      const results = await Order.get();
      res.json({ data: results });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  browseOrderByUser: async (req, res) => {
    try {
      const user_id = req.user.id;
      const results = await Order.findByUser(user_id);
      res.json({ data: results });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  checkout: async (req, res) => {
    try {
      const user_id = req.user.id;
      console.log(user_id);
      const product_ids = req.body.product_ids;
      const results = await Order.checkout(product_ids, user_id);
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default orderController;
