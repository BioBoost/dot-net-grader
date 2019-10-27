#!/usr/bin/env node

const program = require('commander');
const ResultsTableGenerator = require('./lib/results_table_generator');

const Assignment = require('./lib/assignment');
const Student = require('./lib/student');
const Result = require('./lib/result');
const StudentRoster = require('./lib/student_roster');
const UnitTestTask = require('./lib/unit_test_task');

program
  .version('0.0.1')
  .option('-c, --config <file>', 'json config file', './grade.json');
 
program.parse(process.argv);

console.log("Grading ...");

let assignments = [
  { title: 'Assignment 1', weight: 0.15 },
  { title: 'Assignment 2', weight: 0.4 },
  { title: 'Assignment 3', weight: 0.45 },
]

let testResults = [
  {
    student: 'Marki',
    results: {
      'Assignment 1': { tests: { passed: 3, total: 6 } },
      'Assignment 2': { tests: { passed: 1, total: 8 } },
      'Assignment 3': { tests: { passed: 1, total: 2 } }
    }
  }
]

// these we parse from the config
let assignment1 = new Assignment('Assignment 1', 0.15);

// Should be created when building the tasks for running the tests
let roster = new StudentRoster();
let marki = new Student('Marki');
roster.add_student(marki);

console.log(JSON.stringify(roster));

// Runnings tasks
let tasks = [
  new UnitTestTask(marki, assignment1, './somedir')
];

async function run_tasks() {
  const asyncTasks = tasks.map(m => m.execute());
  await Promise.all(asyncTasks);
  console.log("Done running unit tests");
  console.log(JSON.stringify(roster));
}

run_tasks();
console.log("Working ...");

// let results = [
//   ['Student', 'Assignment 1 (15%)', 'Assignment 2 (40%)', 'Assignment 3 (45%)', 'Total'],
//   ['Marki', '3/6 passed', '1/8 passed', '1/2 passed', '14.7%'],
//   ['Danny', '6/6 passed', '7/8 passed', '1/2 passed', '94.5%']
// ];

// console.log(ResultsTableGenerator.generate(results));