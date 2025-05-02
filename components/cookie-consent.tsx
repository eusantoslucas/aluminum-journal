"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem("cookieConsent")
    if (!hasAccepted) {
      setIsVisible(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true")
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="mb-4 sm:mb-0 text-center sm:text-left">
          <p className="text-sm">
            Utilizamos cookies para melhorar sua experiência em nosso site. Ao continuar navegando, você concorda com
            nossa{" "}
            <a href="/privacy" className="underline hover:text-blue-300">
              Política de Privacidade
            </a>
            .
          </p>
        </div>
        <div className="flex space-x-4">
          <button onClick={acceptCookies} className="btn btn-primary text-sm">
            Aceitar
          </button>
          <button onClick={() => setIsVisible(false)} className="text-gray-300 hover:text-white" aria-label="Fechar">
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
