export default [
    {
        regex: /^(#{1,6}) (.*?)(?:(?: \1)|$)/gm, 
        assign: (match) => {
            return {
                type: 'header',
                subtype: `h${match[1].length}`,
                content: match[2],
            }
        },
        template: (entry) => {
            return `<${entry.subtype}>${entry.content}<${entry.subtype}>`
        },
        index: 1
    },
    {
        regex: /^((?: {2})*)([*+-]) (.*)/gm,
        assign: (match) => {
            return {
                type: 'unordered-list',
                indentation: match[1].length,
                prefix: match[2],
                content: match[3]
            }
        },
        template: (entry) => {
            return `<li>${entry.content}</li>`
        },
        index: 0
    },
    {
        regex: /(?:^>+ .*\n?)+/gm,
        assign: (match) => {
            return {
                type: 'quote-block',
                content: match[0],
            }
        },
        template: (entry) => {
            
            while (entry.content.match(/^> /gm)) {
                entry.content = entry.content.replace(/^> /gm, '')
            }
            
            entry.content.replace(/\n$/g, '')

            return `<blockquote>${entry.content}</blockquote>`
        },
        index: 2
    }
]