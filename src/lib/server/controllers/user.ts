import { Request } from "@hapi/hapi"
import { User } from "../../../lib/entity/User";
import { getManager } from "typeorm"

async function saveUser(user: User) {
  const entityManager = getManager();
  await entityManager.save(user)
}

export async function handler(request: Request): Promise<string> {
    let user = new User()
    user.firstName = request.params.name
    user.lastName = 'Kay'
    user.age = 37

    try {
    saveUser(user)
    } catch (err) {
    console.log(err)
    }

    return `<h1>Hello ${request.params.name}!</h1>`;
}

export default {
  handler
}