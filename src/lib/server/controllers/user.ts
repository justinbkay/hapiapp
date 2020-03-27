import { Request } from "@hapi/hapi"
import { User } from "../../../lib/entity/User";
import { getRepository, Repository } from "typeorm"

let userRepository: Repository<User>;

async function saveUser(user: User): Promise<void> {
  userRepository = getRepository(User)
  await userRepository.save(user)
}

async function getUsers(): Promise<User[]> {
  return await userRepository.find()
}

export async function handler(request: Request): Promise<string> {
    const user = new User()
    user.firstName = request.params.name
    user.lastName = 'Kay'
    user.age = 37

    try {
      saveUser(user)
      const users = await getUsers()
      console.log(users)
    } catch (err) {
      console.log(err)
    }

    return `<h1>Hello ${request.params.name}!</h1>`;
}

export default {
  handler
}