"use client"

import { useState } from "react"
import { Share2, Twitter, Linkedin, Facebook, LinkIcon, Check } from "lucide-react"

type ShareButtonsProps = {
  url: string
  title: string
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const fullUrl = typeof window !== "undefined" ? `${window.location.origin}${url}` : url

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fullUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(fullUrl)}`,
      "_blank",
    )
  }

  const shareOnLinkedin = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`, "_blank")
  }

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`, "_blank")
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hover:text-accent-blue transition-colors"
        aria-label="Compartilhar"
      >
        <Share2 size={14} />
      </button>

      {isOpen && (
        <div className="absolute right-0 bottom-full mb-2 bg-white rounded-md shadow-md border border-aluminum-200 p-2 z-10 flex space-x-2 animate-fade-in">
          <button
            onClick={shareOnTwitter}
            className="p-1.5 hover:bg-aluminum-100 rounded-full"
            aria-label="Compartilhar no Twitter"
          >
            <Twitter size={14} />
          </button>
          <button
            onClick={shareOnLinkedin}
            className="p-1.5 hover:bg-aluminum-100 rounded-full"
            aria-label="Compartilhar no LinkedIn"
          >
            <Linkedin size={14} />
          </button>
          <button
            onClick={shareOnFacebook}
            className="p-1.5 hover:bg-aluminum-100 rounded-full"
            aria-label="Compartilhar no Facebook"
          >
            <Facebook size={14} />
          </button>
          <button
            onClick={handleCopyLink}
            className="p-1.5 hover:bg-aluminum-100 rounded-full"
            aria-label="Copiar link"
          >
            {copied ? <Check size={14} className="text-green-600" /> : <LinkIcon size={14} />}
          </button>
        </div>
      )}
    </div>
  )
}
