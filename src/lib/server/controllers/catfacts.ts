import { CatFact } from "../../interfaces/catfact"
import got from "got"

export async function handler(): Promise<string> {
    const body: CatFact = await got.get("https://cat-fact.herokuapp.com/facts/random", {
      maxRedirects: 3,
      headers: {
        "Content-Type": "application/json",
      },
    }).json()
    return body.text;
}

export default {
    handler
}