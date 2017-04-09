const Debug = require('debug')('nca');
const FS = require('fs');
const Http = require('http');

const {EventEmitter} = require('events');


class Agent extends EventEmitter {
  constructor(options = {}) {
    super();

    this.request = null;

    this.dockerVersion = options.dockerVersion || 'v1.26';
    this.logPath = options.logPath || '/var/log/nodeagent/log.txt';
    this.socketPath = options.socketPath || '/var/run/docker.sock';

    this.writeStream = FS.createWriteStream(this.logPath);

    this.logger = (log) => {
      this.writeStream.write(`${log} \n`);
    }

    this.on('exit', () => {
      this._munge();
    });
  }

  start() {
    this.request = Http.request({
        socketPath: this.socketPath,
        method: 'GET',
        path: `http://${this.dockerVersion}/events`
      }, (res) => {
        res.on('data', (data) => {
          Debug(`Data ${data}`);
          this._log(data);
        });

        res.on('error', (error) => {
          Debug(`Error ${error.toString()}`);
        });
    });

    this.request.end();
  }

  exit() {
    this.emit('exit');
  }

  _munge() {
    FS.readFile('/var/log/nodeagent/log.txt', (err, data) => {
      if (err) {
        throw err;
      }
      Debug(`Log file ${data.toString()}`);
      process.exit(0);
    });
  }

  _log(data) {
    let json;
    try {
      json = JSON.parse(data);
    }
    catch (e) {/* just lose the data */}

    if (json && json.from && json.status) {
      Debug(`${Date.now()} - ${json.from} - ${json.status}`);
      this.logger(`${Date.now()} - ${json.from} - ${json.status}`);
    }
  }
}

module.exports = Agent;
