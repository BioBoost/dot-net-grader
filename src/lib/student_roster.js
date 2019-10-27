class StudentRoster {
  constructor() {
    this.students = [];
  }

  add_student(student) {
    this.students.push(student);
  }

  // add_result(studentName, result) {
  //   let student = this.students.find((student) => student.name === studentName);
  //   if (student) {
  //     student.add_result(result);
  //   } else throw `Student ${studentName} does not exist in roster`;
  // }
}

module.exports = StudentRoster;