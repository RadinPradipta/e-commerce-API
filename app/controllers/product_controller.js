import Product from "../services/product_service.js";

const productController = {
  browseProducts: async (req, res) => {
    try {
      const results = await Product.get();
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  searchProducts: async (req, res) => {
    try {
      const results = await Product.searchProducts(req.query);
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  readProduct: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const results = await Product.find(id);
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  addProduct: async (req, res) => {
    try {
      const results = await Product.store(req.body);
      res.json({ message: "Product Created Successfully", results });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  editProduct: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const results = await Product.update(id, req.body);
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const results = await Product.delete(id);
      res.json({ message: "Product Deleted Successfully", results });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default productController;
