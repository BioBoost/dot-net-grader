class DotNetHelper {
  static parse_test_output(stdout) {
    // console.log(stdout);
    return {
      total: stdout.match(/Total tests: (.*)/)[1],
      passed: stdout.match(/.*?Passed: (.*)/)[1]
    }
  }

  static build_unit_test_command(directory) {
    return `dotnet test ${directory} -v q`;
  }
}

module.exports = DotNetHelper;