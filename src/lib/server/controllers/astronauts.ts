import { Request, ResponseToolkit } from "@hapi/hapi";
import got from "got";
import { Astronauts } from "../../interfaces/astronauts";

export async function handler(request: Request, h: ResponseToolkit): Promise<object> {
  const body: Astronauts = await got
    .get("http://api.open-notify.org/astros.json", {
      maxRedirects: 3,
      headers: {
        "Content-Type": "applicaton/json",
      },
    })
    .json();
  return h.view("astros.html", {
    people: body.people,
  });
}

export default {
  handler,
};
