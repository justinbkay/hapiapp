import Boom from "@hapi/boom";
import { ResponseToolkit, Request } from "@hapi/hapi";
import got from "got"
import { CatFact } from "./catfact"

export default [
  {
    method: 'GET',
    path: '/',
    handler: (request: Request , h: ResponseToolkit): string => { // eslint-disable-line @typescript-eslint/no-unused-vars
      return '<h1>Hello World!</h1>';
    }
  },
  {
    method: 'GET',
    path: '/user/{name}',
    handler: (request: Request, h: ResponseToolkit): string => { // eslint-disable-line @typescript-eslint/no-unused-vars
      return `<h1>Hello ${request.params.name}!</h1>`;
    }
  },
  {
    method: 'GET',
    path: '/about',
    handler: (request: Request, h: ResponseToolkit): string => { // eslint-disable-line @typescript-eslint/no-unused-vars
      // @ts-ignore
      return h.file('about.html')
    }
  },
  {
    method: 'GET',
    path: '/index',
    handler: (request: Request, h: ResponseToolkit): string => { // eslint-disable-line @typescript-eslint/no-unused-vars
      // @ts-ignore
      return h.view('index', {
        title: 'aosdmfasdf',
        message: 'alsdf alsdf alsdkf asdf a'
      })
    }
  },
  {
    method: 'GET',
    path: '/catfacts',
    handler: async (): Promise<string> => {
      const body: CatFact = await got.get("https://cat-fact.herokuapp.com/facts/random", {
        maxRedirects: 3,
        headers: {
          "Content-Type": "application/json",
        },
      }).json()
      return body.text;
    }
  },
  {
    method: [ 'GET', 'POST' ],
    path: '/{any*}',
    handler: (request: Request, h: ResponseToolkit): string | Boom.Boom => {
      const accept = request.headers['content-type']

      if (accept && accept.match(/json/)) {
        return Boom.notFound('This resource isn\'t available')
      }

      // @ts-ignore
      return h.view('404').code(404)
    }
  },
]
