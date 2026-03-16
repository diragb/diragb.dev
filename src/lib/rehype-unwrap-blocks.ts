// Constants:
export const INLINE_ELEMENTS = new Set([
  'a', 'strong', 'em', 'code', 'span', 'br', 'img',
  'sub', 'sup', 'del', 'abbr', 'mark', 'math',
])

// Functions:
const rehypeUnwrapBlocks = () => {
  return (tree: any) => {
    (function visit(node: any) {
      if (!node.children) return
      let i = 0
      while (i < node.children.length) {
        const child = node.children[i]
        visit(child)
        if (
          child.type === 'element' &&
          child.tagName === 'p' &&
          child.children?.some((c: any) => c.type === 'element' && !INLINE_ELEMENTS.has(c.tagName))
        ) {
          node.children.splice(i, 1, ...child.children)
          continue
        }
        i++
      }
    })(tree)
  }
}

// Exports:
export default rehypeUnwrapBlocks
