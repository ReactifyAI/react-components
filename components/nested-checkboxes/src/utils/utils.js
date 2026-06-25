export function getNodeState(node, checked) {
  if (!node?.children?.length) {
    return checked.has(node.id) ? 'checked' : 'unchecked'
  }

  const childStates = node?.children?.map(childNode => getNodeState(childNode, checked))

  if (childStates?.every(state => state === 'checked')) return 'checked';
  if (childStates?.every(state => state === 'unchecked')) return 'unchecked';

  return 'indeterminate'
}

export function getAllLeafIds(node, result = []) {
  if (!node?.children?.length) {
    result.push(node.id)
    return result
  }

  for (const child of node.children) {
    getAllLeafIds(child, result)
  }

  return result
}