import { encrypt } from "../../helpers/encryption.js";
import dotenv from "dotenv";

dotenv.config();
export default function encryption(req, res, next) {
  req.body = encrypt(req.body, process.env.CRYPTO_SECRET_KEY);
  next();
}
