import User from "../services/user_service.js";

const userController = {
  browseUsers: async (req, res) => {
    try {
      const results = await User.get();
      res.json({ results: results });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  register: async (req, res) => {
    try {
      const results = await User.store(req.body);
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  readUser: async (req, res) => {
    try {
      const results = await User.find(Number(req.params.id));
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  editUser: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const results = await User.update(id, req.body);
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default userController;
