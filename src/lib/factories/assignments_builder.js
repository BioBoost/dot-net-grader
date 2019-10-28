const Assignment = require('../assignment');

class AssignmentsBuilder {
  static build(config) {
    return config.evaluation.assignments
      .filter(a => (a.skip === undefined || !a.skip))
      .map(a => new Assignment(a.title, a.weight, a.dir));
  }
}

module.exports = AssignmentsBuilder;