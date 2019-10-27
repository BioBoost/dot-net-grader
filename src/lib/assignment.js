class Assignment {
  constructor(title, weight, dirname) {
    this.title = title;
    this.weight = weight;
    this.dirname = dirname;
  }

  to_string() {
    return `${this.title} (${(this.weight*100).toFixed(2)}%)`;
  }
}

module.exports = Assignment;