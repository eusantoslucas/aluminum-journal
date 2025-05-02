"use client"

import Link from "next/link"
import { Mail, Phone, MapPin, Linkedin, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 font-heading">aluminio.news</h3>
            <p className="mb-4 text-gray-300">
              Sua fonte confiável para dados em tempo real e notícias sobre o setor de esquadrias de alumínio.
            </p>
            <div className="flex space-x-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="text-gray-300 hover:text-white transition-colors" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="text-gray-300 hover:text-white transition-colors" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <Youtube className="text-gray-300 hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 font-heading">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-300 hover:text-white transition-colors">
                  Notícias
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                  Painel de Dados
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  Sobre
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 font-heading">Contato</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-gray-300" />
                <a
                  href="mailto:contato@aluminio.news"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  contato@aluminio.news
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-gray-300" />
                <a href="tel:+551147213500" className="text-gray-300 hover:text-white transition-colors">
                  (11) 4721-3500
                </a>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-gray-300" />
                <span className="text-gray-300">Av. Eng. de Billings, 2227 - Jd. Clementino, Alumínio - SP</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 font-heading">Newsletter</h3>
            <p className="mb-4 text-gray-300">
              Receba atualizações quinzenais sobre o mercado de alumínio diretamente em seu e-mail.
            </p>
            <a
              href="/#newsletter"
              className="btn btn-primary flex items-center justify-center"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({
                  top: document.getElementById("newsletter")?.offsetTop,
                  behavior: "smooth",
                })
              }}
            >
              <Mail size={16} className="mr-2" />
              Assinar Newsletter
            </a>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Jornal do Alumínio. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
