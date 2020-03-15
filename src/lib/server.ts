'use strict';

// convert to TypeScript
import { Server } from '@hapi/hapi'
const Vision = require('@hapi/vision')
import Handlebars from 'handlebars'
import Path from 'path'
import Routes from './routes'

const server = new Server({
    port: 3000,
    host: 'localhost',
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'public')
      }
    }
});

server.route(Routes)

exports.init = async () => {
    await server.register(require('inert'));
    await server.register(Vision)

    // @ts-ignore
    server.views({
      engines: { html: Handlebars },
      relativeTo: __dirname,
      path: 'templates'
    });

    await server.initialize()

    return server
};

export default async function start() {
    await server.register(require('inert'));
    await server.register(Vision)

    // @ts-ignore
    server.views({
      engines: { html: Handlebars },
      relativeTo: __dirname,
      path: 'templates'
    });

    await server.start()
    console.log('Server running on %s', server.info.uri);

    return server
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
