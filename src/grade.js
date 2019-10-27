#!/usr/bin/env node

const program = require('commander');
const ResultsTableGenerator = require('./lib/results_table_generator');

program
  .version('0.0.1')
  .option('-c, --config <file>', 'json config file', './grade.json');
 
program.parse(process.argv);

console.log("Grading ...");

let results = [
  ['Student', 'Assignment 1 (15%)', 'Assignment 2 (40%)', 'Assignment 3 (45%)', 'Total'],
  ['Marki', '3/6 passed', '1/8 passed', '1/2 passed', '14.7%'],
  ['Danny', '6/6 passed', '7/8 passed', '1/2 passed', '94.5%']
];

console.log(ResultsTableGenerator.generate(results));