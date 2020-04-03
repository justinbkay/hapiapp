import { Request, ResponseObject, ResponseToolkit } from "@hapi/hapi";
import Boom from "@hapi/boom";

export async function handler(request: Request, h: ResponseToolkit): Promise<ResponseObject | Boom.Boom> {
  const accept = request.headers["content-type"];

  if (accept && accept.match(/json/)) {
    return Boom.notFound("This resource isn't available");
  }

  return h.view("404").code(404);
}

export default {
  handler,
};
