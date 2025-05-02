import type { Metadata } from "next"
import Image from "next/image"
import ContactForm from "@/components/contact-form"

export const metadata: Metadata = {
  title: "Sobre - aluminio.news",
  description: "Conheça a missão do aluminio.news, sua equipe e parcerias com organizações como a ABAL.",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold font-heading mb-8 text-gray-800">Sobre o aluminio.news</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        <div>
          <h2 className="text-2xl font-bold font-heading mb-4 text-gray-800">Nossa Missão</h2>
          <p className="text-lg mb-6 text-gray-700">
            O aluminio.news é sua fonte confiável para dados em tempo real e notícias sobre o setor de esquadrias
            de alumínio, capacitando profissionais e entusiastas com informações acionáveis.
          </p>
          <p className="text-lg mb-6 text-gray-700">
            Nosso objetivo é fornecer informações precisas e atualizadas sobre os fatores que impactam os preços do
            alumínio, como cotações LME, taxas de câmbio USD/BRL, custos de eletricidade e tendências de importação.
          </p>
          <p className="text-lg text-gray-700">
            Trabalhamos em parceria com organizações como a ABAL (Associação Brasileira do Alumínio) para garantir a
            qualidade e relevância do nosso conteúdo.
          </p>
        </div>

        <div className="relative h-[400px] rounded-lg overflow-hidden bg-blue-100">
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <Image
              src="/aluminum-journal-logo.svg"
              alt="Logo do aluminio.news"
              width={120}
              height={120}
              className="mb-6"
            />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">aluminio.news</h3>
            <p className="text-gray-700 max-w-md">
              Desde 2010 trazendo informações confiáveis e análises precisas sobre o mercado de alumínio no Brasil e no mundo.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold font-heading mb-6 text-gray-800">Entre em Contato</h2>
        <ContactForm />
      </div>
    </div>
  )
}
