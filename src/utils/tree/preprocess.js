function generateMap(data) {
  let map = new Map()

  data.forEach(page => {
    let children = []
    if (map.has(page.parent)) {
      children = map.get(page.parent)
    }
    children.push(page)
    map.set(page.parent, children)
  })

  return map
}

function getRootList(data) {
  return data.filter(page => page.parent === null)
}

export default function generateOrder(data) {
  let map = generateMap(data)
  let rootList = getRootList(data)
  let treeOrder = []

  rootList.forEach(root => {
    let internalTree = generateOrderHelper(map, root, 0)
    treeOrder.push(...internalTree)
  })

  return treeOrder
}

function generateOrderHelper(map, page, depth) {
  if (!map.has(page.id)) return [{ page: page, depth: depth }]

  let subtree = [{ page: page, depth: depth }]
  map.get(page.id).forEach(child => {
    subtree = subtree.concat(generateOrderHelper(map, child, depth + 1))
  })

  return subtree
}
