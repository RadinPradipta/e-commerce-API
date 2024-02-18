import Jwt from "jsonwebtoken";
export default function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  try {
    const user = Jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;

    if (!req.params.id || Number(req.params.id) === user.id) {
      next();
    }
    if (user.is_banned === true) {
      return res.status(401).json({ error: "You are banned" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
