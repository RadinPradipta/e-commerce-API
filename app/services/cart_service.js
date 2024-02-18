import Service from "./base_service.js";
import { Prisma } from "@prisma/client";
import Product from "./product_service.js";

class Cart extends Service {
  model = Prisma.ModelName.Cart;

  // Get cart by user id
  async findByUser(id) {
    const carts = await this.prisma[this.model].findMany({
      where: {
        user_id: id,
      },
      include: {
        Product: true,
      },
    });
    const total = carts.reduce((acc, cart) => acc + cart.total_price, 0);

    const total_items = carts.reduce((acc, cart) => acc + cart.quantity, 0);

    return { carts, total: total, total_items: total_items };
  }

  // Get cart by user id and product id
  async findByProduct(id, product_ids) {
    const rows = await this.prisma[this.model].findMany({
      where: {
        user_id: id,
        product_id: {
          in: product_ids,
        },
      },
      include: {
        Product: true,
      },
    });
    return rows;
  }

  // Add product to cart
  async store(product_id, user_id, quantity) {
    const product = await Product.find(product_id);

    if (!product) {
      const err = new Error("Product not found");
      err.status = 404;
      throw err;
    }

    // Check if product is in stock
    if (product.in_stock === 0) {
      const err = new Error("Product out of stock");
      err.status = 400;
      throw err;
    }

    // Find if product exist in the cart
    const existInCart = await this.prisma[this.model].findFirst({
      where: {
        product_id,
        user_id,
      },
    });
    // Update quantity if product exist
    if (existInCart) {
      return await this.prisma[this.model].update({
        where: {
          id: existInCart.id,
        },
        data: {
          quantity: existInCart.quantity + quantity,
          total_price: (existInCart.quantity + quantity) * product.price,
        },
      });
    } else {
      return await this.prisma[this.model].create({
        data: {
          product_id,
          user_id,
          quantity,
          total_price: quantity * product.price,
        },
      });
    }
  }

  async delete(product_ids, user_id) {
    return await this.prisma[this.model].delete({
      where: {
        product_id: {
          in: product_ids,
        },
        user_id,
      },
    });
  }
}

export default new Cart();
