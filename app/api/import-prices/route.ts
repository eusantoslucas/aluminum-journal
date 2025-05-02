import { fetchImportPrices } from "@/lib/api";
import { NextResponse } from "next/server";
import { cacheService } from "@/lib/cache-service";

export async function GET() {
  try {
    // Usar o serviço de cache para otimizar chamadas
    const data = await cacheService.getOrFetch(
      'import-prices',
      fetchImportPrices,
      15 * 60 * 1000 // Cache de 15 minutos
    );
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro ao buscar preços de importação:", error);
    return NextResponse.json(
      { error: "Falha ao buscar dados de importação de alumínio", message: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 }
    );
  }
}