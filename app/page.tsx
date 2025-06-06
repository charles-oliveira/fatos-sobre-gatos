import CatFactsGame from "./components/CatFactsGame";
import { Suspense } from "react";

// Tipagem para os dados que esperamos da API
interface CatFact {
  fact: string;
  length: number;
}

interface ApiResponse {
  data: CatFact[];
}

// Componente de loading
function GameSkeleton() {
  return (
    <div className="game-container">
      <div className="animate-pulse">
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 bg-gray-700 rounded-lg w-24"></div>
            ))}
          </div>
          <div className="flex gap-4">
            <div className="h-8 bg-gray-700 rounded-full w-20"></div>
            <div className="h-8 bg-gray-700 rounded-full w-16"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="modern-card p-8">
              <div className="space-y-6">
                <div className="h-8 bg-gray-700 rounded w-3/4 mx-auto"></div>
                <div className="h-32 bg-gray-700 rounded"></div>
                <div className="flex gap-4 justify-center">
                  <div className="h-12 bg-gray-700 rounded w-32"></div>
                  <div className="h-12 bg-gray-700 rounded w-32"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="modern-card p-6">
              <div className="h-6 bg-gray-700 rounded mb-4"></div>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-16 bg-gray-700 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

async function getCatFacts(): Promise<ApiResponse> {
  try {
    const res = await fetch('https://catfact.ninja/facts?limit=50', {
      // Revalidar os dados a cada 1 hora para não sobrecarregar a API
      next: { revalidate: 3600 },
      // Timeout de 10 segundos
      signal: AbortSignal.timeout(10000)
    });

    if (!res.ok) {
      throw new Error(`Erro HTTP: ${res.status}`);
    }

    const data = await res.json();
    
    // Validar se os dados têm o formato esperado
    if (!data.data || !Array.isArray(data.data)) {
      throw new Error('Formato de dados inválido da API');
    }

    return data;
  } catch (error) {
    console.error('Erro ao buscar fatos de gatos:', error);
    
    // Fallback com fatos estáticos em caso de erro
    return {
      data: [
        { fact: "Gatos passam 70% do dia dormindo", length: 32 },
        { fact: "Um gato pode produzir mais de 100 sons vocais diferentes", length: 58 },
        { fact: "Os gatos têm uma visão noturna 6 vezes melhor que a dos humanos", length: 68 },
        { fact: "O ronronar dos gatos está numa frequência que pode curar ossos", length: 65 },
        { fact: "Gatos podem girar suas orelhas 180 graus", length: 42 },
        { fact: "Um gato adulto tem 30 dentes", length: 30 },
        { fact: "Os gatos não conseguem sentir o gosto doce", length: 44 },
        { fact: "Gatos podem correr até 48 km/h", length: 31 },
        { fact: "Os bigodes dos gatos são do mesmo tamanho que a largura do seu corpo", length: 70 },
        { fact: "Gatos passam mais tempo se limpando do que caçando", length: 53 }
      ]
    };
  }
}

export default async function HomePage() {
  const catFactsData = await getCatFacts();
  const facts = catFactsData.data;

  return (
    <main className="min-h-screen">
      <Suspense fallback={<GameSkeleton />}>
        <CatFactsGame facts={facts} />
      </Suspense>
    </main>
  );
}