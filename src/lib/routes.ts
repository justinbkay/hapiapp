import Joi from '@hapi/joi'
import controllers from "./server/controllers"

export default [
  {
    method: 'GET',
    path: '/',
    handler: controllers.base.handler
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
    handler: controllers.about.handler
  },
  {
    method: 'GET',
    path: '/index',
    handler: controllers.index.handler
  },
  {
    method: 'GET',
    path: '/catfacts',
    handler: controllers.catfacts.handler
  },
  {
    method: 'GET',
    path: '/astronauts',
    handler: controllers.astronauts.handler
  },
  {
    method: [ 'GET', 'POST' ],
    path: '/{any*}',
    handler: controllers.catchall.handler
  },
]
