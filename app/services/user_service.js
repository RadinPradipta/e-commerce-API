import Service from "./base_service.js";
import { Prisma } from "@prisma/client";
import prisma from "../helpers/prisma.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
dotenv.config();

class User extends Service {
  model = Prisma.ModelName.User;

  // Create new user
  async store(data) {
    try {
      return {
        result: await prisma[this.model].create({
          data: {
            name: data.name,
            email: data.email.toLowerCase(),
            password: bcrypt.hashSync(
              `${data.password}`,
              Number(process.env.BCRYPT_ROUND)
            ),
            role_id: 2,
          },
        }),
        status: 201,
      };
    } catch (err) {
      const error = new Error("Internal Server Error");
      error.status = 500;
      throw error;
    }
  }

  // Update user
  async update(id, data) {
    try {
      const result = await prisma[this.model].update({
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
      return result.length > 0
        ? { message: "Updated successfully", result, status: 200 }
        : { message: "Id not found" };
    } catch (err) {
      const error = new "Internal Server Error"();
      error.status = 500;
      throw error;
    }
  }

  // Login
  async login(data) {
    const user = await prisma[this.model].findUnique({
      where: { email: data.email.toLowerCase() },
    });
    if (!user) {
      const error = new Error("Email not found");
      error.status = 404;
      throw error;
    }
    if (!bcrypt.compareSync(data.password, user.password)) {
      const error = new Error("Password not match");
      error.status = 401;
      throw error;
    }

    // Generate token for that specific user
    const accessToken = Jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return accessToken;
  }
}

export default new User();
