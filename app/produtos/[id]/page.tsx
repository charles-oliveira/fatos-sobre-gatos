'use client'

import { Card, CardBody, CardHeader, Button, Chip, Divider } from "@nextui-org/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaShoppingCart, FaHeart, FaShare, FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface PageProps {
  params: { id: string };
}

interface Product {
  id: number;
  fact: string;
  length: number;
  category: string;
  price: string;
  description: string;
  features: string[];
  inStock: boolean;
}

// Simular busca de produto por ID
async function getProduct(id: string): Promise<Product> {
  // Em uma aplicação real, isso seria uma consulta ao banco/API
  const mockProducts: Record<string, Product> = {
    "1": {
      id: 1,
      fact: "Gatos passam 70% do dia dormindo",
      length: 32,
      category: "Básico",
      price: "R$ 9,90",
      description: "Uma curiosidade essencial sobre o comportamento felino. Perfeita para quem está começando a aprender sobre gatos.",
      features: ["Fato verificado", "Fonte científica", "Linguagem simples", "Ideal para iniciantes"],
      inStock: true
    },
    "2": {
      id: 2,
      fact: "Um gato pode produzir mais de 100 sons vocais diferentes",
      length: 58,
      category: "Premium",
      price: "R$ 19,90",
      description: "Descoberta fascinante sobre a comunicação felina que vai surpreender qualquer amante de gatos.",
      features: ["Pesquisa avançada", "Dados científicos", "Comparação com outros animais", "Curiosidade rara"],
      inStock: true
    },
    "3": {
      id: 3,
      fact: "Os gatos têm uma visão noturna 6 vezes melhor que a dos humanos",
      length: 68,
      category: "Premium",
      price: "R$ 19,90",
      description: "Explore os super poderes visuais dos felinos com este fato científico impressionante.",
      features: ["Base científica sólida", "Comparação detalhada", "Explicação biológica", "Fato premium"],
      inStock: true
    }
  };

  // Se não encontrar o produto específico, buscar na API
  if (!mockProducts[id]) {
    try {
      const res = await fetch('https://catfact.ninja/fact', {
        next: { revalidate: 3600 }
      });
      
      if (res.ok) {
        const data = await res.json();
        return {
          id: parseInt(id),
          fact: data.fact,
          length: data.length,
          category: data.length > 50 ? 'Premium' : 'Básico',
          price: data.length > 100 ? 'R$ 29,90' : data.length > 50 ? 'R$ 19,90' : 'R$ 9,90',
          description: "Uma curiosidade única sobre gatos, especialmente selecionada para você!",
          features: ["Fato único", "API atualizada", "Informação confiável", "Descoberta recente"],
          inStock: true
        };
      }
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
    }
  }

  return mockProducts[id] || mockProducts["1"];
}

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProduct(id).then(data => {
      setProduct(data);
      setLoading(false);
    });
  }, [id]);

  if (loading || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🐱</div>
          <p className="text-xl font-semibold">Carregando produto...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button 
            as={Link}
            href="/produtos"
            variant="light"
            startContent={<FaArrowLeft />}
            className="mb-4"
          >
            Voltar ao Catálogo
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Lado esquerdo - Informações do produto */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-fit">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start w-full">
                  <Chip 
                    size="lg" 
                    color={product.category === 'Premium' ? 'warning' : 'primary'}
                    variant="shadow"
                  >
                    {product.category}
                  </Chip>
                  <div className="flex gap-2">
                    <Button isIconOnly variant="light" size="sm">
                      <FaHeart className="text-red-500" />
                    </Button>
                    <Button isIconOnly variant="light" size="sm">
                      <FaShare className="text-blue-500" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardBody className="pt-0">
                <div className="text-center mb-6">
                  <span className="text-8xl">🐱</span>
                </div>
                
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 leading-relaxed">
                  {product.fact}
                </h1>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {product.description}
                </p>

                <div className="space-y-4 mb-6">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                    Características:
                  </h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Divider className="my-6" />

                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>Produto ID: #{product.id}</span>
                  <span>{product.length} caracteres</span>
                  <span className={`font-semibold ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                    {product.inStock ? 'Em estoque' : 'Indisponível'}
                  </span>
                </div>
              </CardBody>
            </Card>
          </motion.div>

          {/* Lado direito - Compra */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="sticky top-8">
              <CardBody className="p-8">
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                    {product.price}
                  </span>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Acesso vitalício à curiosidade
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <Button 
                    color="primary"
                    size="lg"
                    className="w-full"
                    startContent={<FaShoppingCart />}
                    disabled={!product.inStock}
                  >
                    {product.inStock ? 'Adicionar ao Carrinho' : 'Indisponível'}
                  </Button>
                  
                  <Button 
                    color="secondary"
                    variant="bordered"
                    size="lg"
                    className="w-full"
                  >
                    Comprar Agora
                  </Button>
                </div>

                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex justify-between">
                    <span>✅ Garantia</span>
                    <span>30 dias</span>
                  </div>
                  <div className="flex justify-between">
                    <span>🚚 Entrega</span>
                    <span>Instantânea</span>
                  </div>
                  <div className="flex justify-between">
                    <span>💳 Pagamento</span>
                    <span>Seguro</span>
                  </div>
                  <div className="flex justify-between">
                    <span>📱 Suporte</span>
                    <span>24/7</span>
                  </div>
                </div>

                <Divider className="my-6" />

                <div className="text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                    🔒 Compra 100% segura e protegida
                  </p>
                  
                  <div className="flex justify-center gap-4">
                    <Button 
                      as={Link}
                      href="/produtos"
                      variant="light"
                      size="sm"
                    >
                      Ver Mais Produtos
                    </Button>
                    <Button 
                      as={Link}
                      href="/"
                      variant="light"
                      size="sm"
                    >
                      Jogar Quiz
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </div>

        {/* Produtos relacionados */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
            Outros produtos que você pode gostar
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].filter(num => num !== parseInt(id)).slice(0, 3).map((relatedId) => (
              <Card key={relatedId} className="hover:shadow-lg transition-shadow">
                <CardBody className="p-4">
                  <div className="text-center mb-4">
                    <span className="text-4xl">🐱</span>
                  </div>
                  <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                    Curiosidade Premium #{relatedId}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-purple-600">R$ 19,90</span>
                    <Button 
                      as={Link}
                      href={`/produtos/${relatedId}`}
                      size="sm"
                      color="primary"
                      variant="light"
                    >
                      Ver
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 