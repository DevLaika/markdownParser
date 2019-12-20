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
            return {
                element: `<${entry.subtype}>${entry.content}</${entry.subtype}>`
            }
        },
        index: 1
    },
    {
        regex: /^((?: {2})*)([*+-]) (.*)/gm,
        assign: (match) => {
            return {
                type: 'unorderedList',
                indentation: match[1].length,
                prefix: match[2],
                content: match[3],
            }
        },
        template: (entry) => {
            return {
                wrapper: 'ul',
                element: `<li>${entry.content}</li>`
            }
        },
        index: 0
    },
    {
        regex: /^(?:> ?)+(.*)/gm,
        assign: (match) => {
            return {
                type: 'quote',
                content: match[1],
            }
        },
        template: (entry) => {
            return {
                element: `<blockquote>${entry.content}</blockquote>`
            }
        },
        index: 2
    }
]