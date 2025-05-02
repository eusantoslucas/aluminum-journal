import { fetchElectricityCost } from "@/lib/api";
import { cacheService } from "@/lib/cache-service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Usar o serviço de cache para otimizar chamadas
    const data = await cacheService.getOrFetch(
      'electricity-cost',
      fetchElectricityCost,
      15 * 60 * 1000 // Cache de 15 minutos
    );
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro ao buscar custo de energia:", error);
    return NextResponse.json(
      { error: "Falha ao buscar dados de custo de energia", message: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 }
    );
  }
}