import Service from "./base_service.js";
import { Prisma } from "@prisma/client";

class Product extends Service {
  model = Prisma.ModelName.Product;

  // Search functionality
  async searchProducts(query) {
    // console.log(url);
    const page = Number(query.page) || 1;
    const perPage = 10;
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
      orderBy: { name: "asc" },
    });

    const response = {
      results,
      pages: {
        totalPages,
        currentPage: page,
      },
      status: 200,
    };

    return results.length === 0
      ? { error: "No results found", status: 404 }
      : response;
  }
}

export default new Product();
