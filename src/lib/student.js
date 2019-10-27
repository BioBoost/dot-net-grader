class Student {
  constructor(name) {
    this.name = name;
    this.results = [];
  }

  add_result(result) {
    this.results.push(result);
  }

  percentage() {
    return this.results.reduce((total, result) => total + result.weighted_percentage(), 0.0);
  }
}

module.exports = Student;