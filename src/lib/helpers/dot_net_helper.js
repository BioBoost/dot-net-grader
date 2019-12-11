class DotNetHelper {
  static parse_test_output(stdout) {
    // console.log(stdout);

    let total = 0;
    let passed = 0;
    let errors = [];

    if (stdout.match(/Starting test execution, please wait.../)) {
      total = stdout.match(/Total tests: (.*)/)[1]
      if (stdout.match(/.*?Passed: (.*)/)) {
        passed = stdout.match(/.*?Passed: (.*)/)[1]
      } else {
        passed = total - stdout.match(/.*?Failed: (.*)/)[1]
      }
    } else {
      errors = Array.from(stdout.matchAll(/(.*?error.*)/g)).map(e => e[0]);
      // console.log(errors);
    }

    return {
      total: total,
      passed: passed,
      errors: errors
    }
  }

  static build_unit_test_command(directory) {
    return `dotnet test ${directory} -v q`;
  }
}

module.exports = DotNetHelper;