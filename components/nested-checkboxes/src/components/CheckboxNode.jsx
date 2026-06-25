import { getNodeState } from '../utils/utils'
import './CheckboxNode.css'

export default function CheckboxNode({ node, checked, onToggle }) {
  const state = getNodeState(node, checked)
  const labelId = `label-${node.id}`

  return (
    <div>
      <div className="checkbox-label-container">
        <input
          type="checkbox"
          id={node.id}
          checked={state === 'checked'}
          ref={el => { if (el) { el.indeterminate = state === 'indeterminate'}}}
          onChange={() => onToggle(node, state)}
          aria-labelledby={labelId}
          aria-checked={state === 'indeterminate' ? 'mixed' : state === 'checked'}
        />
        <label id={labelId} htmlFor={node.id} className="checkbox-label">{node.name}</label>
      </div>

      {node.children?.length > 0 && (
        <div
          role="group"
          aria-labelledby={labelId}
          className="checkbox-child-node"
        >
          {node.children.map((child) => (
            <CheckboxNode key={child.id} node={child} checked={checked} onToggle={onToggle} />
          ))}
        </div>
      )}
    </div>
  )
}