import { fetchLMEPrice } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await fetchLMEPrice();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro ao buscar preços LME:", error);
    return NextResponse.json(
      { error: "Falha ao buscar dados de preço do alumínio" },
      { status: 500 }
    );
  }
}