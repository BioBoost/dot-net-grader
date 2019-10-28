const Result = require('./result');
const DotNetHelper = require('./helpers/dot_net_helper');
const { exec } = require('child_process');

class UnitTestTask {

  constructor(student, assignment, dir) {
    this.student = student;
    this.assignment = assignment;
    this.dir = dir;
  }

  execute() {
    return new Promise((resolve, reject) => {
      exec(DotNetHelper.build_unit_test_command(this.dir), (error, stdout, stderr) => {
        //   console.log(`Running unit test for ${this.student.name}`);
        let testResults = DotNetHelper.parse_test_output(stdout);
        this.student.add_result(new Result(testResults.passed, testResults.total, this.assignment, testResults.errors));
        resolve(null);
      });
    });
  }

}

module.exports = UnitTestTask;