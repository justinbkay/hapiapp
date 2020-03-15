import Boom from "@hapi/boom";
import { ResponseToolkit, Request } from "@hapi/hapi";

export default [
  {
    method: 'GET',
    path: '/',
    handler: (request: Request, h: ResponseToolkit) => {
      return '<h1>Hello World!</h1>';
    }
  },
  {
    method: 'GET',
    path: '/user/{name}',
    handler: (request: Request, h: ResponseToolkit) => {
      return `<h1>Hello ${request.params.name}!</h1>`;

    }
  },
  {
    method: 'GET',
    path: '/about',
    handler: (request: Request, h: ResponseToolkit) => {
      // @ts-ignore
      return h.file('about.html')
    }
  },
  {
    method: 'GET',
    path: '/index',
    handler: (request: Request, h: ResponseToolkit) => {
      // @ts-ignore
      return h.view('index', {
        title: 'aosdmfasdf',
        message: 'alsdf alsdf alsdkf asdf a'
      })
    }
  },
  {
    method: [ 'GET', 'POST' ],
    path: '/{any*}',
    handler: (request: Request, h: ResponseToolkit) => {
      const accept = request.headers['content-type']

      if (accept && accept.match(/json/)) {
        return Boom.notFound('This resource isn\'t available')
      }

      // @ts-ignore
      return h.view('404').code(404)
    }
  }
]
