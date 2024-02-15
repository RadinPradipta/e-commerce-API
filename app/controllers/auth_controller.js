import User from "../services/user_service.js";

const authController = {
  login: async (req, res) => {
    try {
      const results = await User.login(req.body);
      res.json(results);
    } catch (error) {}
  },
};

export default authController;
