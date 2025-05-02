import { fetchExchangeRate } from "@/lib/api";
import { cacheService } from "@/lib/cache-service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Usar o serviço de cache para otimizar chamadas
    const data = await cacheService.getOrFetch(
      'exchange-rate',
      fetchExchangeRate,
      10 * 60 * 1000 // Cache de 10 minutos
    );
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro ao buscar taxa de câmbio:", error);
    return NextResponse.json(
      { error: "Falha ao buscar dados de taxa de câmbio", message: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 }
    );
  }
}