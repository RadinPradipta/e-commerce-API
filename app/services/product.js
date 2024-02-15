import Service from "./service.js";
import { Prisma } from "@prisma/client";

class Product extends Service {
  model = Prisma.ModelName.Product;

  async searchProducts(query) {
    console.log(Object.keys(query).length);
    if (Object.keys(query).length === 0) {
      return { data: "No Product Found", status: 400 };
    }

    const results = await this.prisma[this.model].findMany({
      where: {
        name: {
          contains: query.name,
        },
        category: {
          contains: query.category,
        },
      },
    });

    return {
      data: results,
    };
  }
}

export default new Product();
