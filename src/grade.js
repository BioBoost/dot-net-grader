#!/usr/bin/env node

const program = require('commander');

program
  .version('0.0.1')
  .option('-c, --config <file>', 'json config file', './grade.json');
 
program.parse(process.argv);

console.log("Grading ...");
