import User from "../services/user_service.js";

const authController = {
  login: async (req, res) => {
    try {
      const results = await User.login(req.body);
      res.json(results);
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  },
};

export default authController;
