import { faker } from "@faker-js/faker";
import prisma from "../app/helpers/prisma.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();

// await prisma.user.deleteMany();

const roles = await prisma.role.findMany();
async function main() {
  for (let i = 0; i < 5; i++) {
    const password = bcrypt.hashSync(
      `password`,
      Number(process.env.BCRYPT_ROUND)
    );
    await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        password,
        role_id: roles[Math.floor(Math.random() * roles.length)].id,
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
