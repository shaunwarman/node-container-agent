#!/usr/bin/env node

const NCA = require('..');

const Agent = new NCA();

Agent.start();

process.on('SIGINT', () => {
  Agent.exit();
});
