import markdown from './markdown'
import Rule from './Rule'
import ruleSettings from './rules'

let rules = []
ruleSettings.forEach(setting => {
    rules = [...rules, new Rule(setting.regex, setting.assign, setting.template,setting.index)]
})

let markdownData = [];

rules.forEach(rule => {
    markdownData = [...markdownData, rule.getMarkups(markdown)]
})

console.log(markdownData)