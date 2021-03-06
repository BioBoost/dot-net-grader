class Student {
  constructor(name, repoDir) {
    this.name = name;
    this.repoDir = repoDir;
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