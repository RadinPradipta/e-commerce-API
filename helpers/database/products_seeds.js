import prisma from "../prisma.js";
import { faker } from "@faker-js/faker";



async function main() {
    await prisma.product.deleteMany();
  for (let i = 0; i < 20; i++) {
    await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        category: faker.commerce.department(),
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
