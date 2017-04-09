#!/usr/bin/env node

// turn debug logging on
process.env.DEBUG='nca';

const NCA = require('..');

const options = process.argv.slice(2);

const Agent = new NCA(options);

Agent.start();

// exit on SIGINT and write to file
process.on('SIGINT', () => {
  Agent.exit();
});
