import React, { useRef, useEffect } from 'react'
import { useDropdownContext } from './PDropdownContext'

const PDropdownContent = ({ children }) => {
  const { isOpen, dropdownRef, setIsOpen } = useDropdownContext()
  const firstFocusableElement = useRef(null)
  const lastFocusableElement = useRef(null)

  useEffect(() => {
    if (isOpen) {
      const focusableElements = dropdownRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      firstFocusableElement.current = focusableElements[0]
      lastFocusableElement.current = focusableElements[focusableElements.length - 1]
      firstFocusableElement.current?.focus()
    }
  }, [isOpen])

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement.current) {
          e.preventDefault()
          lastFocusableElement.current?.focus()
        }
      } else {
        if (document.activeElement === lastFocusableElement.current) {
          e.preventDefault()
          firstFocusableElement.current?.focus()
        }
      }
    }
  }

  if (!isOpen) return null

  return (
    <div 
      ref={dropdownRef}
      className="p-dropdown-content"
      role="menu"
      aria-orientation="vertical"
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  )
}

export default PDropdownContent
