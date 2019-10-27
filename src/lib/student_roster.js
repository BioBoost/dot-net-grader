class StudentRoster {
  constructor() {
    this.students = [];
  }

  add_student(student) {
    this.students.push(student);
  }

  get_students() {
    return this.students;
  }
}

module.exports = StudentRoster;