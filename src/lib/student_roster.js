class StudentRoster {
  constructor() {
    this.students = [];
  }

  add_student(student) {
    this.students.push(student);
  }
}

module.exports = StudentRoster;