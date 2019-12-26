import markdown from './markdown'
import Rule from './Rule'
import ruleSettings from './rules'

let rules = []
ruleSettings.forEach(setting => {
    rules = [...rules, new Rule(setting.regex, setting.assign, setting.template, setting.isWrapped, setting.index)]
})

let markdownData = [];

rules.forEach(rule => {
    markdownData = [...markdownData, rule.getAssignedMarkups(markdown)]
})

console.log(markdownData)