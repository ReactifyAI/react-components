import { useState } from 'react'
import CheckboxNode from './CheckboxNode'
import { getAllLeafIds } from '../utils/utils'

export default function HierarchicalCheckboxes({ data }) {
  const [checked, setChecked] = useState(new Set())

  const handleToggle = (node, state) => {
    const leaves = getAllLeafIds(node)

    setChecked(prev => {
      const next = new Set(prev)
      
      if (state === 'checked') {
        leaves.forEach(id => next.delete(id))
      } else {
        leaves.forEach(id => next.add(id))
      }
      return next
    })
  }

  return (
    <div>
      {data.map((node) => (
        <CheckboxNode key={node.id} node={node} checked={checked} onToggle={handleToggle} />
      ))}
    </div>
  )
}