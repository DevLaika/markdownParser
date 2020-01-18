export default class Rule {
  constructor(regex, assign, template, index) {
    this.regex = regex
    this.assign = assign
    this.template = template
    this.index = index
  }

  getAssigned(content) {
    let assigned = []
    const matches = [...content.matchAll(this.regex)]
    matches.forEach(match => {
      let entry = this.assign(match)
      entry.index = match.index
      entry.length = match[0].length
      entry.end = match.index + match[0].length - 1
      assigned = [...assigned, entry]
    })
    return assigned
  }

  getAssignedMarkups(content) {
    const assigned = this.getAssigned(content)
    let entries = []
    assigned.forEach(entry => {
      let withMarkup = {}
      Object.assign(withMarkup, entry)
      withMarkup.markup = this.template(entry)
      entries = [...entries, withMarkup]
    })

    return entries
  }
}