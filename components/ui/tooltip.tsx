"use client"

import { useState, useRef, useEffect, type ReactNode, createContext, useContext } from "react"
import { createPortal } from "react-dom"

type TooltipContextType = {
  delayDuration: number
}

const TooltipContext = createContext<TooltipContextType>({ delayDuration: 300 })

export function TooltipProvider({
  children,
  delayDuration = 300,
}: {
  children: ReactNode
  delayDuration?: number
}) {
  return <TooltipContext.Provider value={{ delayDuration }}>{children}</TooltipContext.Provider>
}

type TooltipProps = {
  children: ReactNode
  content: ReactNode
  position?: "top" | "bottom" | "left" | "right"
}

export function Tooltip({ children, content, position = "top" }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const { delayDuration } = useContext(TooltipContext)

  const showTooltip = () => {
    timerRef.current = setTimeout(() => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect()
        let x = 0
        let y = 0

        switch (position) {
          case "top":
            x = rect.left + rect.width / 2
            y = rect.top
            break
          case "bottom":
            x = rect.left + rect.width / 2
            y = rect.bottom
            break
          case "left":
            x = rect.left
            y = rect.top + rect.height / 2
            break
          case "right":
            x = rect.right
            y = rect.top + rect.height / 2
            break
        }

        setCoords({ x, y })
        setIsVisible(true)
      }
    }, delayDuration)
  }

  const hideTooltip = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    setIsVisible(false)
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  const getTooltipStyles = () => {
    if (!isVisible) return { display: "none" }

    const baseStyles = {
      position: "fixed" as const,
      zIndex: 1000,
      padding: "0.5rem",
      backgroundColor: "white",
      borderRadius: "0.25rem",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
      border: "1px solid #e2e8f0",
      fontSize: "0.75rem",
      maxWidth: "200px",
      wordBreak: "break-word" as const,
    }

    switch (position) {
      case "top":
        return {
          ...baseStyles,
          transform: "translateX(-50%) translateY(-100%) translateY(-8px)",
          left: `${coords.x}px`,
          top: `${coords.y}px`,
        }
      case "bottom":
        return {
          ...baseStyles,
          transform: "translateX(-50%) translateY(8px)",
          left: `${coords.x}px`,
          top: `${coords.y}px`,
        }
      case "left":
        return {
          ...baseStyles,
          transform: "translateX(-100%) translateX(-8px) translateY(-50%)",
          left: `${coords.x}px`,
          top: `${coords.y}px`,
        }
      case "right":
        return {
          ...baseStyles,
          transform: "translateX(8px) translateY(-50%)",
          left: `${coords.x}px`,
          top: `${coords.y}px`,
        }
    }
  }

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
      >
        {children}
      </div>
      {isVisible &&
        createPortal(
          <div ref={tooltipRef} style={getTooltipStyles()}>
            {content}
          </div>,
          document.body,
        )}
    </>
  )
}
