'use client'

import { Card, CardBody, CardHeader, Button, Chip } from "@nextui-org/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Interface para os "produtos" (fatos sobre gatos)
interface CatFact {
  id: number;
  fact: string;
  length: number;
  category: string;
  price: string; // Simulando um "preço" para ser um produto
}

// API que transforma fatos em "produtos"
async function getCatFactProducts(): Promise<CatFact[]> {
  try {
    const res = await fetch('https://catfact.ninja/facts?limit=20', {
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      throw new Error('Falha ao buscar dados');
    }

    const data = await res.json();
    
    // Transformar fatos em "produtos"
    return data.data.map((fact: any, index: number) => ({
      id: index + 1,
      fact: fact.fact,
      length: fact.length,
      category: fact.length > 50 ? 'Premium' : 'Básico',
      price: fact.length > 100 ? 'R$ 29,90' : fact.length > 50 ? 'R$ 19,90' : 'R$ 9,90'
    }));
  } catch (error) {
    console.error('Erro ao buscar fatos:', error);
    
    // Fallback com produtos mockados
    return [
      { id: 1, fact: "Gatos passam 70% do dia dormindo", length: 32, category: "Básico", price: "R$ 9,90" },
      { id: 2, fact: "Um gato pode produzir mais de 100 sons vocais diferentes", length: 58, category: "Básico", price: "R$ 19,90" },
      { id: 3, fact: "Os gatos têm uma visão noturna 6 vezes melhor que a dos humanos", length: 68, category: "Premium", price: "R$ 19,90" },
      { id: 4, fact: "O ronronar dos gatos está numa frequência que pode curar ossos", length: 65, category: "Premium", price: "R$ 19,90" },
      { id: 5, fact: "Gatos podem girar suas orelhas 180 graus", length: 42, category: "Básico", price: "R$ 9,90" },
    ];
  }
}

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<CatFact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCatFactProducts().then(data => {
      setProdutos(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🐱</div>
          <p className="text-xl font-semibold">Carregando produtos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            🐱 Catálogo de Curiosidades Felinas
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Descubra nossa coleção exclusiva de fatos fascinantes sobre gatos. 
            Cada curiosidade é cuidadosamente selecionada para expandir seu conhecimento felino!
          </p>
        </motion.div>

        {/* Filtros */}
        <motion.div 
          className="flex flex-wrap gap-4 justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Chip size="lg" color="primary" variant="shadow">
            Todos os Produtos ({produtos.length})
          </Chip>
          <Chip size="lg" color="secondary" variant="flat">
            Categoria Básica
          </Chip>
          <Chip size="lg" color="warning" variant="flat">
            Categoria Premium
          </Chip>
        </motion.div>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {produtos.map((produto, index) => (
            <motion.div
              key={produto.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border border-purple-100 dark:border-purple-800">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start w-full">
                    <Chip 
                      size="sm" 
                      color={produto.category === 'Premium' ? 'warning' : 'primary'}
                      variant="flat"
                    >
                      {produto.category}
                    </Chip>
                    <span className="text-2xl">🐱</span>
                  </div>
                </CardHeader>
                
                <CardBody className="pt-0">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 line-clamp-3 leading-relaxed">
                      {produto.fact}
                    </h3>
                    
                    <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                      <span>{produto.length} caracteres</span>
                      <span>ID: #{produto.id}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {produto.price}
                      </span>
                      <Button 
                        as={Link}
                        href={`/produtos/${produto.id}`}
                        color="primary"
                        variant="shadow"
                        size="sm"
                      >
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Footer da página */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              🎮 Quer testar seus conhecimentos?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Jogue nosso quiz interativo e descubra o quanto você sabe sobre gatos!
            </p>
            <Button 
              as={Link}
              href="/"
              color="primary"
              variant="shadow"
              size="lg"
              className="px-8"
            >
              Jogar Quiz dos Gatos
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 