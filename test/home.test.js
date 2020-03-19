'use strict';

const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { afterEach, before, describe, it } = exports.lab = Lab.script();
const { init } = require('../src/lib/server');

describe('GET /', () => {
    let server;

    before(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('/ responds with 200', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/'
        });
        expect(res.statusCode).to.equal(200);
    });

    it('/ contains Hello World test', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/'
        })
        expect(res.result).to.include('Hello World')
    })

    it('user/name responds with 200', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/user/Justin'
        });
        expect(res.statusCode).to.equal(200);
    });

    it('user/name contains Justin test', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/user/Justin'
        })
        expect(res.result).to.include('Justin')
    })

    it('about responds with 200', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/about'
        });
        expect(res.statusCode).to.equal(200);
    });

    it('/about contains about test', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/about'
        })
        expect(res.result).to.include('About')
    })

    it('index responds with 200', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/index'
        });
        expect(res.result).to.include('<h1>aosdmfasdf</h1>')
    });
});