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
        regex: /(?:^(?: {2})*\d+\. .*\n?)+/gm,
        assign: (match) => {
            return {
                type: 'ordered-list',
                content: match[0]
            }
        },
        template: (entry) => {
            entry.content = entry.content.replace(/^\d+\. /gm, '<li>')
            entry.content = entry.content.replace(/\n<li>/gm, '</li><li>')
            entry.content = entry.content.replace(/\n$/g, '</li>')

            // while (entry.content.match(/^(?: {2})+/gm)) {
            //     let newNested = entry.content.match(/(?:^>+ .*\n?)+/gm)[0]
            //     newNested = newNested.replace(/^> /gm, '')
            //     newNested = `<blockquote>${newNested}</blockquote>`
            //     entry.content = entry.content.replace(/(?:^>+ .*\n?)+/gm, newNested)
            // }
            return `<ol>${entry.content}</ol>`
        },
        index: 0
    },
    {
        regex: /(?:^>+ .*\n?)+/gm,
        assign: (match) => {
            return {
                type: 'blockquote',
                content: match[0],
            }
        },
        template: (entry) => {
            while (entry.content.match(/^> /m)) {
                let newNested = entry.content.match(/(?:^>+ .*\n?)+/m)[0]
                newNested = newNested.replace(/^> /gm, '')
                newNested = `<blockquote>${newNested}</blockquote>`
                entry.content = entry.content.replace(/(?:^>+ .*\n?)+/m, newNested)
            }
            entry.content = entry.content.replace(/\n/g, '<br>')
            return entry.content
        },
        index: 2
    }
]