#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');

const Assignment = require('./lib/assignment');
const Student = require('./lib/student');
const Result = require('./lib/result');
const StudentRoster = require('./lib/student_roster');
const UnitTestTask = require('./lib/unit_test_task');
const StudentRosterBuilder = require('./lib/factories/student_roster_builder');
const StudentRosterTableGenerator = require('./lib/output/student_roster_table_generator');
const AssignmentsBuilder = require('./lib/factories/assignments_builder');

program
  .version('0.0.1')
  .option('-c, --config <file>', 'json config file', './grade.json');
 
program.parse(process.argv);

// Load json config
const config = JSON.parse(fs.readFileSync(program.config));

// Build assignments and student roster
let assignments = AssignmentsBuilder.build(config);
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
  // console.log("Done running unit tests");
  // console.log(JSON.stringify(studentRoster));
  console.log(StudentRosterTableGenerator.generate(studentRoster, assignments));
}

run_tasks();
console.log("Working ...");

// Example config !
// Stacktrace log