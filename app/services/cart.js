import Service from "./service.js";
import { Prisma } from "@prisma/client";
import prisma from "../../helpers/prisma.js";
import Product from "./product.js";

class Cart extends Service {
  model = Prisma.ModelName.Cart;

  // Get cart by user id
  async getBy(id) {
    return await this.prisma[this.model].findMany({
      where: {
        user_id: id,
      },
    });
  }
  async store(product_id, user_id, quantity) {
    const product = await Product.find(product_id);

    if (!product) throw new Error("Product not found");

    // Find if product exist in the cart
    const existInCart = await prisma[this.model].findFirst({
      where: {
        product_id,
        user_id,
      },
    });
    // Update quantity if product exist
    if (existInCart) {
      return this.prisma[this.model].update({
        where: {
          id: existInCart.id,
        },
        data: {
          quantity: existInCart.quantity + quantity,
          total_price: (existInCart.quantity + quantity) * product.price,
        },
      });
    } else {
      return this.prisma[this.model].create({
        data: {
          product_id,
          user_id,
          quantity,
          total_price: quantity * product.price,
        },
      });
    }
  }

  async delete(product_id,user_id) {
    return await this.prisma[this.model].delete({
      where: {
        product_id,
        user_id,
      },
    });
  }
}

export default new Cart();
