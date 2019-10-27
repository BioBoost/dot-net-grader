const Student = require('./student')
const StudentRoster = require('./student_roster');
const DirectoryHelper = require('./directory_helper');

class StudentRosterBuilder {

  static build_roster_from_directories(topDir, repoPrefix) {
    let studentRoster = new StudentRoster();
    
    DirectoryHelper.get_student_assignment_dirs(topDir, repoPrefix)
      .forEach(dir => {
        studentRoster.add_student(new Student(
          dir.replace(repoPrefix, '').replace(/-/g, ' ').trim(),
          `${topDir}/${dir}`
        ));
      });
  
    return studentRoster;
  }
}

module.exports = StudentRosterBuilder;