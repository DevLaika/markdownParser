export default class Rule {
    constructor(regex, assign, template, index) {
        this.regex = regex,
        this.assign = assign,
        this.template = template,
        this.index = index
    }

    getMatches(content) {
        let entries = this.getEntries(content)
        entries.forEach(entry => {
            let markup = this.template(entry)
            entries = [...entry, markup]
        });
        return entries
    }

    getEntries(content) {
        let entries = []
        const matches = [...content.matchAll(this.regex)]
        matches.forEach(match => {
            let entry = this.assign(match)
            entry.index = match.index
            entries = [...entries, entry]
        })
        return entries
    }

    getMarkups(content) {
        const entries = this.getEntries(content)
        let markups = []
        entries.forEach(entry => {
            let markup = { markup: `${this.template(entry).element}` }
            markup.index = entry.index
            markups = [...markups, markup]
        });
        return markups
    }
}