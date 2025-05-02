import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="relative mb-12 rounded-xl overflow-hidden">
      <div className="relative h-[400px] md:h-[500px]">
        <Image
          src="/placeholder.svg?height=500&width=1200"
          alt="Indústria de alumínio"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/40" />

        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-heading">
                Jornal do Alumínio
              </h1>
              <p className="text-xl text-gray-100 mb-6">
                Acompanhe em tempo real os dados e notícias que impactam o mercado de esquadrias de alumínio.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#dashboard" className="btn btn-primary">
                  Ver Dados em Tempo Real
                </a>
                <a href="/news" className="btn bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm">
                  Últimas Notícias
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
