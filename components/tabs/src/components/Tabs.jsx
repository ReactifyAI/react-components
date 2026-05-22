import { useState, useId, useRef } from 'react'
import './Tabs.css'

export default function Tabs({ tabsData }) {
  const [activeTab, setActiveTab] = useState(0)
  const idBase = useId()
  const tabRef = useRef([])

  const handleKeyDown = (e) => {
    let newIndex
    const tabsLength = tabsData.length

    switch (e.key) {
      case 'ArrowRight':
        newIndex = (activeTab + 1) % tabsLength
        break;
      case 'ArrowLeft':
        newIndex = (activeTab - 1 + tabsLength) % tabsLength
        break;
      case 'Home':
        newIndex = 0
        break;
      case 'End':
        newIndex = tabsLength - 1
        break;
      default:
        return;
    }

    e.preventDefault()
    setActiveTab(newIndex)
    tabRef.current[newIndex]?.focus()
  }

  return (
    <div className="tabs-container">
      <div role="tablist" onKeyDown={handleKeyDown} className="tabs-list">
        {tabsData.map((tab, index) => {
          const tabId = `${idBase}-tab-${index}`
          const panelId = `${idBase}-panel-${index}`
          const isSelected = activeTab === index

          return (
            <button
              key={tab.label}
              id={tabId}
              onClick={() => setActiveTab(index)}
              role="tab"
              aria-selected={isSelected}
              aria-controls={panelId}
              tabIndex={isSelected ? 0 : -1}
              ref={(el) => tabRef.current[index] = el}
              className={`tab ${isSelected ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {tabsData.map((tab, index) => {
        const tabId = `${idBase}-tab-${index}`
        const panelId = `${idBase}-panel-${index}`

        return (
          <div
            key={tab.label}
            id={panelId}
            hidden={activeTab !== index}
            role="tabpanel"
            aria-labelledby={tabId}
            className="tabs-panel"
          >
            <p>{tab.content}</p>
          </div>
        )
      })}
    </div>
  )
}