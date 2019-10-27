const {table} = require('table');

class ResultsTableGenerator {

  static generate(results) {
    let maxColumnWidth = results[0].map(header => header.length).reduce((a, b) => Math.max(a, b));

    let config = {
      columnDefault: {
        alignment: 'center',
        width: maxColumnWidth
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

module.exports = ResultsTableGenerator;