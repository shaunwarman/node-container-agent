const Agent = require('..');
const Test = require('tape');

Test('node container agent', t => {

  t.test('create container agent', t => {
    const agent = new Agent();

    t.ok(agent, 'object exists');
    t.ok(typeof agent === 'object', 'is object');
    t.end();
  });

  t.test('default options', t => {
    const agent = new Agent();

    t.equals(agent.dockerVersion, 'v1.25');
    t.equals(agent.logPath, './log.txt');
    t.equals(agent.socketPath, '/var/run/docker.sock');

    t.end();
  });

  t.test('custom options', t => {
    const options = {
      dockerVersion: 'v1.26',
      logPath: './container.txt',
      socketPath: '/tmp/s60'
    };

    const agent = new Agent(options);

    t.equals(agent.dockerVersion, 'v1.26');
    t.equals(agent.logPath, './container.txt');
    t.equals(agent.socketPath, '/tmp/s60');

    t.end();
  });

});
