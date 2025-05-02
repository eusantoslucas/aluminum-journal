import type { Metadata } from "next"
import ContactForm from "@/components/contact-form"
import { Mail, Phone, MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "Contato - aluminio.news",
  description: "Entre em contato com a equipe do aluminio.news para dúvidas, sugestões ou parcerias.",
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold font-heading mb-8 text-aluminum-800">Entre em Contato</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 border border-aluminum-200">
            <h2 className="text-2xl font-bold font-heading mb-6 text-aluminum-800">Envie uma Mensagem</h2>
            <ContactForm />
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-md p-6 border border-aluminum-200 h-full">
            <h2 className="text-2xl font-bold font-heading mb-6 text-aluminum-800">Informações de Contato</h2>

            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="text-accent-blue mr-4 mt-1" size={20} />
                <div>
                  <h3 className="font-medium text-aluminum-800 mb-1">E-mail</h3>
                  <a
                    href="mailto:redacao@jornaldoaluminio.com.br"
                    className="text-aluminum-600 hover:text-accent-blue transition-colors"
                  >
                    contato@aluminio.news
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="text-accent-blue mr-4 mt-1" size={20} />
                <div>
                  <h3 className="font-medium text-aluminum-800 mb-1">Telefone</h3>
                  <a href="tel:+551147213500" className="text-aluminum-600 hover:text-accent-blue transition-colors">
                    (11) 4721-3500
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="text-accent-blue mr-4 mt-1" size={20} />
                <div>
                  <h3 className="font-medium text-aluminum-800 mb-1">Endereço</h3>
                  <address className="text-aluminum-600 not-italic">
                    Av. Eng. de Billings, 2227
                    <br />
                    Jd. Clementino, Alumínio - SP
                    <br />
                    CEP: 18125-000
                  </address>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-medium text-aluminum-800 mb-3">Horário de Atendimento</h3>
              <p className="text-aluminum-600">
                Segunda a Sexta: 9h às 18h
                <br />
                Sábado: 9h às 13h
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 border border-aluminum-200 mb-12">
        <h2 className="text-2xl font-bold font-heading mb-6 text-aluminum-800">Nossa Localização</h2>
        <div className="aspect-[16/9] w-full rounded-md overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3659.0123456789!2d-47.2612345!3d-23.5312345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cf5d1d0f1e5555%3A0x776123456789abcd!2sAlum%C3%ADnio%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1651234567890!5m2!1spt-BR!2sbr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa da localização do aluminio.news"
          ></iframe>
        </div>
      </div>
    </div>
  )
}
