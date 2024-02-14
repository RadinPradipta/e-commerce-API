import prisma from "../helpers/prisma.js";

class Service {
  prisma;
  model;
  constructor() {
    this.prisma = prisma;
  }

  async get() {
    return await this.prisma[this.model].findMany();
  }

  async find(id) {
    return await this.prisma[this.model].findUnique({ where: { id } });
  }

  async store(data) {
    return await this.prisma[this.model].create({ data });
  }

  async update(id, data) {
    try {
      return await this.prisma[this.model].update({
        where: { id: Number(id) },
        data,
      });
    } catch (err) {
      throw new Error("Not found");
    }
  }

  async delete(id) {
    try {
      return await this.prisma[this.model].delete({
        where: { id: Number(id) },
      });
    } catch (err) {
      throw new Error("Not found");
    }
  }
}

export default Service;
