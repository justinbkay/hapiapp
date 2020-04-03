import Boom from "@hapi/boom";
import { ResponseToolkit, Request, ResponseObject } from "@hapi/hapi";
import got from "got"
import { CatFact } from "./catfact"
import { Astronauts } from "./astronauts"
import Joi from '@hapi/joi'
import controllers from "./server/controllers"

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
    handler: controllers.user.handler,
    options: {
      validate: {
        params: {
          name: Joi.string().min(4).max(10).alphanum().required()
        }
      },
    }
  },
  {
    method: 'GET',
    path: '/users',
    handler: controllers.users.handler
  },
  {
    method: 'GET',
    path: '/about',
    handler: (request: Request, h: ResponseToolkit): ResponseObject => { // eslint-disable-line @typescript-eslint/no-unused-vars
      return h.file('about.html')
    }
  },
  {
    method: 'GET',
    path: '/index',
    handler: (request: Request, h: ResponseToolkit): ResponseObject => { // eslint-disable-line @typescript-eslint/no-unused-vars
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
    method: 'GET',
    path: '/astronauts',
    handler: async (request: Request, h: ResponseToolkit): Promise<object> => {
      const body: Astronauts = await got.get("http://api.open-notify.org/astros.json", {
        maxRedirects: 3,
        headers: {
          "Content-Type": "applicaton/json",
        },
      }).json()
      return h.view('astros.html', {
        people: body.people
      })
    }
  },
  {
    method: [ 'GET', 'POST' ],
    path: '/{any*}',
    handler: (request: Request, h: ResponseToolkit): ResponseObject | Boom.Boom => {
      const accept = request.headers['content-type']

      if (accept && accept.match(/json/)) {
        return Boom.notFound('This resource isn\'t available')
      }

      return h.view('404').code(404)
    }
  },
]
