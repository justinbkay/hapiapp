'use strict';

// convert to TypeScript
import Hapi, { Server } from '@hapi/hapi'
import Vision from '@hapi/vision'
import Inert from '@hapi/inert'
import Handlebars from 'handlebars'
import Path from 'path'
import Routes from './routes'
import HapiPino from 'hapi-pino'
import Joi from '@hapi/joi'
import { createConnection } from "typeorm"

const server = new Server({
    port: 3000,
    debug: { request: ['params'] },
    host: 'localhost',
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'public')
      }
    }
});

server.validator(Joi)
server.route(Routes)

async function setupDB() {
  createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "hapiapp",
    charset: "UTF8_GENERAL_CI",
    entities: [`${__dirname}/entity/*.js`],
    synchronize: true,
  })
}

exports.init = async (): Promise<Hapi.Server> => {
    await server.register([Inert, Vision]);
    await server.register({
      plugin: HapiPino,
      options: {
        prettyPrint: true,
      },
    });

    server.views({
      engines: { html: Handlebars },
      relativeTo: __dirname,
      path: 'templates'
    });

    await server.initialize()

    return server
};

export default async function start(): Promise<Hapi.Server> {
    await server.register([Vision, Inert]);

    server.views({
      engines: { html: Handlebars },
      relativeTo: __dirname,
      path: 'templates'
    });

    await setupDB()
    await server.start()
    console.log('Server running on %s', server.info.uri);

    return server
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

server.events.on('request', (event, tags) => {
  console.log(tags.tags)
  console.log(tags.data)
});
