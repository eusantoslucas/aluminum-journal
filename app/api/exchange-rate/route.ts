import { fetchExchangeRate } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await fetchExchangeRate();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro ao buscar taxa de câmbio:", error);
    return NextResponse.json(
      { error: "Falha ao buscar dados de taxa de câmbio" },
      { status: 500 }
    );
  }
}