import Service from "./service.js";
import { Prisma } from "@prisma/client";
import prisma from "../../helpers/prisma.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();

class User extends Service {
  model = Prisma.ModelName.User;

  async store(data) {
    const roles = await prisma.role.findMany();
    return await prisma.user.create({
      data: {
        name: data.name,
        email: data.email.toLowerCase(),
        password: bcrypt.hashSync(
          `${data.password}`,
          Number(process.env.BCRYPT_ROUND)
        ),
        role_id: roles[Math.floor(Math.random() * roles.length)].id,
      },
    });
  }
}

export default new User();
