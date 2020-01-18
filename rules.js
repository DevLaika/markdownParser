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
    regex: /(?:^(?:(?: {2})*\d. )(?:.*)\n?|^(?:(?: {2})*[-+*] )(?:.*)\n?)+/gm,
    assign: (match) => {
      return {
        type: 'list',
        content: match[0]
      }
    },
    template: (entry) => {
      /**
       *  content = whole element
       *  while list elements exist
       *    for each list element
       *      get list type from prefix -> prefix
       *      remove prefix from list element
       *      wrap element in <?prefix><li>...</li></?prefix>
       *      replace original in content with wrapped
       *    remove all <(ul|ol)></\1>
      **/

      while (entry.content.match(/^(?: {2})*(?:\d+\.|[*+-]) /m)) {
        while (entry.content.match(/^(?:\d+\.|[*+-]) /m)) {
          let listItem = entry.content.match(/^(?:\d+\.|[*+-]) .*(?:\r?\n(?!\d+\.|[*+-]).*)*/m)[0]
          let type = (listItem.match(/^\d+\. /)) ? 'ol' : 'ul'
          let parsedListItem = listItem.replace(/^(?:\d+\.|[*+-]) /, '')
          // console.log(parsedListItem);

          let wrappedListItem = `<${type}><li>${parsedListItem}</li></${type}>`
          console.log(entry.content)
          console.log('=====div=====')
          entry.content = entry.content.replace(listItem, wrappedListItem)
        }
        entry.content = entry.content.replace(/<\/(ol|ul)>\r?\n?<\1>/g, '\n')
        entry.content = entry.content.replace(/^ {2}/gm, '')
      }

      return entry.content
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