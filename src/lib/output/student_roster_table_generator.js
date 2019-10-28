const {table} = require('table');
const chalk = require('chalk');

class StudentRosterTableGenerator {

  static generate(roster, assignments) {

    let results = roster.get_students().map(student => {
      return [
        student.name,
        assignments.map(assign => {
          let result = student.results.find(res => res.assignment.title === assign.title)
          return StudentRosterTableGenerator.format_test_result(result);
        }),
        StudentRosterTableGenerator.format_total_percentage(student.percentage())
      ].flat();
    });

    results.unshift(
      [
        'Student', assignments.map(assign => assign.to_string()), 'Total'
      ].flat()
    );

    let config = {
      columnDefault: {
        alignment: 'center'
      },
      columns: {
        0: {
          alignment: 'right'
        }
      }
    }
    return table(results, config);
  }

  static format_test_result(result) {
    if (result.build_errors().length > 0) {
      return chalk.bgHex('#990308')(result.to_string());
    } else if (result.passed < result.total/2) {
      return chalk.bgHex('#bc7100')(result.to_string());
    } else {
      return chalk.bgHex('#027c00')(result.to_string());
    }
  }

  static format_total_percentage(percentage) {
    if (percentage < 50) {
      return chalk.bgHex('#bc7100')(`${percentage.toFixed(2)}%`)
    } else {
      return chalk.bgHex('#027c00')(`${percentage.toFixed(2)}%`)
    }
  }
}

module.exports = StudentRosterTableGenerator;