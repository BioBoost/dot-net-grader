class Result {
  constructor(passed, total, assignment, errors=[]) {
    this.total = total;
    this.passed = passed;
    this.assignment = assignment;
    this.errors = errors;
  }

  weighted_percentage() {
    if (this.total === 0) return 0;
    
    return 100.0 * (this.passed / this.total) * (this.assignment.weight);
  }

  build_errors() {
    return this.errors;
  }

  to_string() {
    if (this.errors.length != 0) return `Build failed`;
    return `${this.passed}/${this.total} passed`;
  }
}

module.exports = Result;