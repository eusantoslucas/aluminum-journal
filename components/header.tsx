"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Search, Mail } from "lucide-react"
import { usePathname } from "next/navigation"
import ThemeToggle from "@/components/theme-toggle"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-white/90 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <Link href="/" className="flex flex-col items-center mb-4">
            <Image
              src="/aluminum-journal-logo.svg"
              alt="aluminio.news Logo"
              width={60}
              height={60}
              className="mb-2"
            />
            <span className="text-xl font-bold font-heading text-gray-800">aluminio.news</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/") ? "bg-gray-200 text-gray-900" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              Home
            </Link>
            <Link
              href="/news"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/news") ? "bg-gray-200 text-gray-900" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              Notícias
            </Link>
            <Link
              href="/dashboard"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/dashboard")
                  ? "bg-gray-200 text-gray-900"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              Painel de Dados
            </Link>
            <Link
              href="/about"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/about") ? "bg-gray-200 text-gray-900" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              Sobre
            </Link>
            <Link
              href="/contact"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/contact")
                  ? "bg-gray-200 text-gray-900"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              Contato
            </Link>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-full text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              aria-label="Buscar"
            >
              <Search size={20} />
            </button>
            <ThemeToggle />
            <button
              onClick={() =>
                window.scrollTo({ top: document.getElementById("newsletter")?.offsetTop, behavior: "smooth" })
              }
              className="btn btn-primary flex items-center"
            >
              <Mail size={16} className="mr-2" />
              Newsletter
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-full text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              aria-label={isSearchOpen ? "Fechar busca" : "Buscar"}
            >
              <Search size={20} />
            </button>
            <button
              className="p-2 rounded-full text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search Bar (conditionally rendered) */}
        {isSearchOpen && (
          <div className="py-3 animate-fade-in">
            <form className="relative">
              <input
                type="text"
                placeholder="Buscar notícias, dados e mais..."
                className="w-full px-4 py-2 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <button type="submit" className="sr-only">
                Buscar
              </button>
            </form>
          </div>
        )}

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 animate-slide-up">
            <div className="flex flex-col space-y-1">
              <Link
                href="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/") ? "bg-gray-200 text-gray-900" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                Home
              </Link>
              <Link
                href="/news"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/news")
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                Notícias
              </Link>
              <Link
                href="/dashboard"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/dashboard")
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                Painel de Dados
              </Link>
              <Link
                href="/about"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/about")
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                Sobre
              </Link>
              <Link
                href="/contact"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/contact")
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                Contato
              </Link>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <ThemeToggle />
              <button
                onClick={() => {
                  setIsMenuOpen(false)
                  window.scrollTo({ top: document.getElementById("newsletter")?.offsetTop, behavior: "smooth" })
                }}
                className="btn btn-primary w-full mt-3 flex items-center justify-center"
              >
                <Mail size={16} className="mr-2" />
                Newsletter
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
