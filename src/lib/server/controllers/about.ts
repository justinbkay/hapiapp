import { ResponseObject, ResponseToolkit, Request } from "@hapi/hapi";

export async function handler(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
  return h.file("about.html");
}

export default {
  handler,
};
