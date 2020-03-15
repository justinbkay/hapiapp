'use strict';

// convert to TypeScript

const Hapi = require('@hapi/hapi')
const Vision = require('@hapi/vision')
const Handlebars = require('handlebars')
const Path = require('path')
const Routes = require('./routes')

const server = Hapi.server({
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

    server.views({
      engines: { html: Handlebars },
      relativeTo: __dirname,
      path: 'templates'
    });

    await server.initialize()

    return server
};

exports.start = async () => {
    await server.register(require('inert'));
    await server.register(Vision)

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
