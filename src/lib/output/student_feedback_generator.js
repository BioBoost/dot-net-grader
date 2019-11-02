const fs = require('fs');

class StudentFeedbackGenerator {

  static create_feedback(student) {
    let content = '# Feedback';
    content += `\n\nStudent name: ${student.name}`;

    student.results.forEach(result => {
      content += `\n\n## ${result.assignment.title}\n\n`;
      if (result.errors.length > 0) {
        content += `* code did not compile`
      } else {
        content += `* ${result.passed}/${result.total} tests passed`
      }
      content += `\n* Weight factor: ${100*result.assignment.weight}%`
      content += `\n* Subscore: ${result.weighted_percentage().toFixed(2)}%`
    })

    content += `\n\n## Total Score`;
    content += `\n\n**Final Score: ${student.percentage().toFixed(2)}%**`;

    StudentFeedbackGenerator.write_to_file(`${student.repoDir}/feedback.md`, content);
  }

  static write_to_file(filename, content) {
    fs.writeFile(filename, content, function(err) {
      if(err) {
        return console.log(err);
      }
    }); 
  }
}

module.exports = StudentFeedbackGenerator;