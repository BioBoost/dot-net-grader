class Result {
  constructor(passed, total, assignment) {
    this.total = total;
    this.passed = passed;
    this.assignment = assignment;
  }

  weighted_percentage() {
    return 100.0 * (this.passed / this.total) * (this.assignment.weight);
  }

  to_string() {
    return `${this.passed}/${this.total} passed`;
  }
}

module.exports = Result;