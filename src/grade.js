#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');

const ResultsTableGenerator = require('./lib/output/results_table_generator');
const Assignment = require('./lib/assignment');
const Student = require('./lib/student');
const Result = require('./lib/result');
const StudentRoster = require('./lib/student_roster');
const UnitTestTask = require('./lib/unit_test_task');
const StudentRosterBuilder = require('./lib/factories/student_roster_builder');

program
  .version('0.0.1')
  .option('-c, --config <file>', 'json config file', './grade.json');
 
program.parse(process.argv);

// Load json config
const config = JSON.parse(fs.readFileSync(program.config));

// Build assignments and student roster
let assignments = config.evaluation.assignments.map(a => new Assignment(a.title, a.weight, a.dir));
const studentRoster = StudentRosterBuilder.build_roster_from_directories('.', config.evaluation.repo_prefix);

// console.log(assignments);
// console.log(studentRoster);

// Build task list
let tasks = studentRoster.get_students().map(student => {
  return assignments.map(assignment => new UnitTestTask(student, assignment, `${student.repoDir}/${assignment.dirname}`))
}).flat();

// console.log(tasks);

async function run_tasks() {
  const asyncTasks = tasks.map(m => m.execute());
  await Promise.all(asyncTasks);
  console.log("Done running unit tests");
  console.log(JSON.stringify(studentRoster));
}

run_tasks();
console.log("Working ...");

// let results = [
//   ['Student', 'Assignment 1 (15%)', 'Assignment 2 (40%)', 'Assignment 3 (45%)', 'Total'],
//   ['Marki', '3/6 passed', '1/8 passed', '1/2 passed', '14.7%'],
//   ['Danny', '6/6 passed', '7/8 passed', '1/2 passed', '94.5%']
// ];

// console.log(ResultsTableGenerator.generate(results));