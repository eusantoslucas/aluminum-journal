import { fetchElectricityCost } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await fetchElectricityCost();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro ao buscar custo de energia:", error);
    return NextResponse.json(
      { error: "Falha ao buscar dados de custo de energia" },
      { status: 500 }
    );
  }
}