import Order from "../services/order_service.js";
import dotenv from "dotenv";
import { decrypt } from "../helpers/encryption.js";

dotenv.config();
const paymentController = {
  pay: async (req, res) => {
    try {
      const decryptedBody = decrypt(req.body, process.env.CRYPTO_SECRET_KEY);
      console.log(decryptedBody);
      const order_id = decryptedBody.order_id;
      const results = await Order.pay(order_id, decryptedBody);
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default paymentController;
