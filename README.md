### Hapi.js example site with a few tests using lab/code

Hapi.js version is 19.1

- Includes Typescript setup
- Includes templating with handlebars
- Includes public folder serving
- Eslint for typescript

# build for production
docker image build --build-arg NODE_ENV=production --tag hapiapp .

# Run
docker container run hapiapp