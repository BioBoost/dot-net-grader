class DotNetHelper {
  static parse_test_output(stdout) {
    // console.log(stdout);

    let total = 0;
    let passed = 0;

    if (stdout.match(/Starting test execution, please wait.../)) {
      console.log("Tests are running .... all ok");
      total = stdout.match(/Total tests: (.*)/)[1]
      passed = stdout.match(/.*?Passed: (.*)/)[1]
    }

    return {
      total: total,
      passed: passed
    }
  }

  static build_unit_test_command(directory) {
    return `dotnet test ${directory} -v q`;
  }
}

module.exports = DotNetHelper;