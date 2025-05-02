import { fetchImportPrices } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await fetchImportPrices();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro ao buscar preços de importação:", error);
    return NextResponse.json(
      { error: "Falha ao buscar dados de importação de alumínio" },
      { status: 500 }
    );
  }
}