const Result = require('./result');

class UnitTestTask {

  constructor(student, assignment, dir) {
    this.student = student;
    this.assignment = assignment;
    this.dir = dir;
  }

  execute() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(`Running unit test for ${this.student.name}`);
        this.student.add_result(new Result(3, 6, this.assignment));
        resolve(null);
      }, 2000);
    });
  }

}

module.exports = UnitTestTask;