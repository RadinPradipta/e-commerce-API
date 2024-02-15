import prisma from "../app/helpers/prisma.js";
import { faker } from "@faker-js/faker";

async function main() {
  // await prisma.product.deleteMany();
  for (let i = 0; i < 5; i++) {
    await prisma.category.create({
      data: {
        name: faker.commerce.department(),
      },
    });
  }
  for (let i = 0; i < 400; i++) {
    await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        category_id: faker.number.int({ min: 1, max: 10 }),
        price: parseFloat(faker.commerce.price()) + 0.99,
        in_stock: faker.datatype.boolean(),
        description: faker.lorem.paragraph(),
      },
    });
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
