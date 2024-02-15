import Service from "./service.js";
import { Prisma } from "@prisma/client";
import cart from "./cart.js";
import axios from "axios";

class Order extends Service {
  model = Prisma.ModelName.Order;

  async findByUser(id) {
    return await this.prisma[this.model].findMany({
      where: {
        user_id: id,
      },
    });
  }

  async checkout(product_ids, user_id) {
    const userCart = await cart.findByUser(user_id);

    if (userCart.length === 0) {
      return {
        error: "Cart is empty",
        status: 400,
      };
    }

    // Check if products exist in cart
    const productsExistInCart = await cart.findByProduct(user_id, product_ids);

    if (productsExistInCart.length === 0) {
      return {
        error: "Some selected products do not exist in cart",
        status: 400,
      };
    }

    // Continue the program even if some products do not exist in cart
    const boughtProducts = await cart.findByProduct(user_id, product_ids);

    const total = boughtProducts.reduce(
      (acc, cart) => acc + cart.total_price,
      0
    );

    return await this.prisma.$transaction(async (transaction) => {
      const order = await transaction.order.create({
        data: {
          user_id,
          code: `ORD/${Math.floor(Math.random() * 1000)}`,
          total,
        },
      });

      await transaction.orderItem.createMany({
        data: boughtProducts.map((product) => {
          return {
            order_id: order.id,
            product_id: product.product_id,
            quantity: product.quantity,
            price: product.Product.price,
            total_price: product.total_price,
          };
        }),
      });

      await transaction.cart.deleteMany({
        where: {
          user_id,
          product_id: {
            in: product_ids,
          },
        },
      });

      return {
        success: true,
        order,
        status: 200,
      };
    });
  }

  async pay(order_id, data) {
    return await this.prisma.$transaction(async (tx) => {
      // Find the order
      const order = await tx.order.findUnique({
        where: { id: order_id },
      });

      if (!order) {
        throw new Error("Order not found");
      }

      // Attempting payment
      try {
        const response = await axios.post("http://localhost:3000/pay", {
          amount: order.total,
          cardNumber: data.cardNumber,
          cvv: data.cvv,
          expiryMonth: data.expiryMonth,
          expiryYear: data.expiryYear,
        });

        // const dataPayment = {
        //   amount: order.total,
        //   cardNumber: data.cardNumber,
        //   cvv: data.cvv,
        //   expiryMonth: data.expiryMonth,
        //   expiryYear: data.expiryYear,
        // };
        // const response = await fetch("http://localhost:3000/pay", {
        //   method: "POST",
        //   body: JSON.stringify(dataPayment),
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // });

        // console.log(response);

        // Check response status
        if (response.status === 200) {
          // Update order status
          await tx.order.update({
            where: { id: order_id },
            data: { is_paid: true },
          });

          // Get new updated order
          const newOrder = await tx.order.findUnique({
            where: { id: order_id },
          });

          // Return success response
          return {
            success: true,
            message: "Payment successful",
            order: newOrder,
          };
        } else {
          throw new Error("Payment failed");
        }
      } catch (error) {
        throw new Error({ error: error.message });
      }
    });
  }
}

export default new Order();
