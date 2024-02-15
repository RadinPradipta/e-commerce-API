import Service from "./base_service.js";
import { Prisma } from "@prisma/client";

class Product extends Service {
  model = Prisma.ModelName.Product;

  async searchProducts(query, page = 1, perPage = 10) {
    if (Object.keys(query).length === 0) {
      return { error: "Query(s) required", status: 400 };
    }

    const totalCount = await this.prisma[this.model].count({
      where: {
        name: {
          contains: query.name,
        },
        ...(query.category ? { category_id: Number(query.category) } : {}),
      },
    });

    const totalPages = Math.ceil(totalCount / perPage);

    const offset = (page - 1) * perPage;

    const results = await this.prisma[this.model].findMany({
      where: {
        name: {
          contains: query.name,
        },
        ...(query.category ? { category_id: Number(query.category) } : {}),
      },
      skip: offset,
      take: perPage,
    });

    let nextPage = null;
    if (page < totalPages) {
      nextPage = `/products/search?page=${page + 1}&perPage=${perPage}`;
    }

    const response = {
      results,
      pagination: {
        totalPages,
        currentPage: page,
        perPage,
        nextPage,
      },
      status: 200,
    };

    return results.length === 0
      ? { error: "No results found", status: 404 }
      : response;
  }
}

export default new Product();
