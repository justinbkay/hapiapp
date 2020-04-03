import { Request, ResponseToolkit, ResponseObject } from "@hapi/hapi";
import { User } from "../../../lib/entity/User";
import { getRepository } from "typeorm";

export async function handler(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
  const users = await getRepository(User)
    .createQueryBuilder("user")
    .getMany();
  return h.view("users", {
    users: users,
  });
}

export default {
  handler,
};
