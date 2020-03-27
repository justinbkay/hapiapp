import convict from 'convict'

const config = convict({
    env: {
        doc: 'The application environment.',
        format: ['production', 'development', 'test'],
        default: 'development',
        env: 'NODE_ENV'
      },
      ip: {
        doc: 'The IP address to bind.',
        format: 'ipaddress',
        default: '127.0.0.1',
        env: 'IP_ADDRESS',
      },
      port: {
        doc: 'The port to bind.',
        format: 'port',
        default: 3000,
        env: 'PORT',
        arg: 'port'
      },
      db: {
        host: {
          doc: 'Database host name/IP',
          format: 'ipaddress',
          default: '127.0.0.1'
        },
        name: {
          doc: 'Database name',
          format: String,
          default: 'hapiapp'
        },
        username: {
          doc: 'Database user',
          format: String,
          default: 'root'
        },
        password: {
          doc: 'Database user password',
          format: String,
          default: 'alenslenaw'
        }
      } 
})

// Load environment dependent configuration
const env = config.get('env');
config.loadFile('./config/' + env + '.json');

// Perform validation
config.validate({allowed: 'strict'});

export default config