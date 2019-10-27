const {table} = require('table');

class StudentRosterTableGenerator {

  static generate(roster, assignments) {

    let results = roster.get_students().map(student => {
      return [
        student.name,
        assignments.map(assign => {
          return student.results.find(res => res.assignment.title === assign.title).to_string();
        }),
        `${student.percentage().toFixed(2)}%`
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
}

module.exports = StudentRosterTableGenerator;