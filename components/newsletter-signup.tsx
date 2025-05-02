"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Check } from "lucide-react"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit to a newsletter API
    console.log("Subscribing email:", email)
    setIsSubmitted(true)
  }

  return (
    <section id="newsletter" className="bg-blue-600 text-white rounded-lg p-8 scroll-mt-20">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 mb-6">
          <Mail size={32} className="text-white" />
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">Fique por dentro do mercado de alumínio</h2>

        <p className="text-lg mb-6 text-blue-100">
          Receba quinzenalmente em seu e-mail análises exclusivas, tendências de mercado, previsões de preços e notícias
          relevantes sobre o setor de esquadrias de alumínio.
        </p>

        <div className="bg-blue-700 bg-opacity-30 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-bold mb-3">O que você receberá:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="flex items-start">
              <div className="bg-blue-500 rounded-full p-1 mr-2 mt-1">
                <Check size={16} />
              </div>
              <p>Análises de preços LME e tendências de mercado</p>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-500 rounded-full p-1 mr-2 mt-1">
                <Check size={16} />
              </div>
              <p>Relatórios sobre importações e exportações</p>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-500 rounded-full p-1 mr-2 mt-1">
                <Check size={16} />
              </div>
              <p>Inovações tecnológicas e sustentabilidade</p>
            </div>
          </div>
        </div>

        {isSubmitted ? (
          <div className="bg-green-500 bg-opacity-20 p-6 rounded-lg">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500 mb-4">
              <Check size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Obrigado por se inscrever!</h3>
            <p className="mb-4">Você receberá nossa próxima newsletter com conteúdo exclusivo.</p>
            <button onClick={() => setIsSubmitted(false)} className="text-sm underline hover:text-blue-200">
              Inscrever outro e-mail
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              className="flex-1 px-4 py-3 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn bg-white text-blue-600 hover:bg-blue-50 py-3 font-medium">
              Receber Newsletter
            </button>
          </form>
        )}

        <p className="text-sm text-blue-200 mt-4">
          Respeitamos sua privacidade. Você pode cancelar a inscrição a qualquer momento.
        </p>
      </div>
    </section>
  )
}
