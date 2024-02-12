import Service from "./service.js";
import { Prisma } from "@prisma/client";
import prisma from "../../helpers/prisma.js";

class Product extends Service {
  model = Prisma.ModelName.Product;
}

export default new Product()
