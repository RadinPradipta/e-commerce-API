import Jwt from "jsonwebtoken";
export default function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  Jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403).json({ error: "Forbidden" });
    req.user = user;
    next();
  });
}
