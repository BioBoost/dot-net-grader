class ConfigChecker {

  constructor() {
    this.errors = [];
  }

  is_valid(config) {
    return (this.check(config).length == 0);
  }

  get_errors() {
    return this.errors;
  }

  // Internal methods //

  check(config) {
    this.errors = [];
    this.check_total_weight_of_assignments(config);
    return this.errors;
  }

  check_total_weight_of_assignments(config) {
    let totalWeight = config.evaluation.assignments.reduce((total, assign) => total + assign.weight, 0.0);
    let isValid = Math.abs(totalWeight-1.0) < 0.01;
    if (!isValid) this.errors.push(`Total assignment weight is not 1.0`);
  }
}

module.exports = ConfigChecker;