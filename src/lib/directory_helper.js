const fs = require('fs');

class DirectoryHelper {

  static get_student_assignment_dirs(topDir, repoPrefix='') {
    return fs.readdirSync(topDir, { withFileTypes: true })
      .filter(entry => entry.isDirectory()).filter(dir => dir.name.startsWith(repoPrefix))
      .map(dir => dir.name);
  }
}

module.exports = DirectoryHelper;