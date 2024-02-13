import Service from "./service.js";
import { Prisma } from "@prisma/client";
import prisma from "../../helpers/prisma.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
dotenv.config();

class User extends Service {
  model = Prisma.ModelName.User;

  async store(data) {
    const roles = await prisma.role.findMany();
    return await prisma[this.model].create({
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

  async update(id, data) {
    try {
      return await prisma[this.model].update({
        where: { id: Number(id) },
        data: {
          name: data.name,
          email: data.email.toLowerCase(),
          password: bcrypt.hashSync(
            `${data.password}`,
            Number(process.env.BCRYPT_ROUND)
          ),
        },
      });
    } catch (err) {
      throw new Error("Id not found");
    }
  }

  async login(data) {
    const user = await prisma[this.model].findUnique({
      where: { email: data.email.toLowerCase() },
    });
    if (!user) {
      throw new Error("Email not found");
    }
    if (!bcrypt.compareSync(data.password, user.password)) {
      throw new Error("Password not match");
    }

    const accessToken = Jwt.sign(user, process.env.JWT_SECRET );

    return accessToken;
  }
}

export default new User();
