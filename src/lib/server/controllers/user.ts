import { Request, ResponseToolkit, ResponseObject } from "@hapi/hapi";
import { User } from "../../../lib/entity/User";
import { getRepository, Repository } from "typeorm";

let userRepository: Repository<User>;

async function saveUser(user: User): Promise<void> {
  userRepository = getRepository(User);
  await userRepository.save(user);
}

export async function handler(request: Request, h: ResponseToolkit): Promise<ResponseObject | string> {
  const user = new User();
  user.firstName = request.params.name;
  user.lastName = "Kay";
  user.age = 37;

  try {
    saveUser(user);
    return h.redirect("/users");
  } catch (err) {
    console.log(err);
  }

  return `<h1>Error unable to save</h1>`;
}

export default {
  handler,
};
