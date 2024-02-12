import Service from "./service.js";
import { Prisma } from "@prisma/client";

class Cart extends Service{
    model = Prisma.ModelName.Cart

    async store(){
        
    }

}