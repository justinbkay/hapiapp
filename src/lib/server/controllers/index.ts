import { ResponseToolkit, Request, ResponseObject } from "@hapi/hapi";

export async function handler(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
  return h.view("index", {
    title: "aosdmfasdf",
    message: "alsdf alsdf alsdkf asdf a",
  });
}

export default {
  handler,
};
