'use client'

import { Card, CardBody, CardHeader, Button, Chip, Tooltip } from "@nextui-org/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTwitter, FaFacebook, FaWhatsapp, FaCopy, FaHeart } from "react-icons/fa";

async function getRandomFact() {
  const res = await fetch('https://catfact.ninja/fact', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Falha ao buscar dado');
  }

  return res.json();
}

interface CatFact {
  fact: string;
  length: number;
}

export default function FactDetail({ id }: { id: string }) {
  const [fact, setFact] = useState<CatFact | null>(null);
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    getRandomFact().then(setFact);
  }, []);

  const handleCopy = () => {
    if (fact) {
      navigator.clipboard.writeText(fact.fact);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = (platform: string) => {
    const text = fact?.fact || '';
    const url = window.location.href;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`);
        break;
    }
  };

  if (!fact) return <div className="flex justify-center items-center min-h-screen">Carregando...</div>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col justify-center items-center min-h-screen p-8 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      <Chip color="secondary" variant="shadow" className="mb-4">
        ID: {id}
      </Chip>
      <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        Detalhes do Fato
      </h1>
      <Card className="max-w-xl w-full shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <CardHeader className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Curiosidade Felina</h2>
          <Button
            isIconOnly
            color={liked ? "danger" : "default"}
            variant="light"
            onClick={() => setLiked(!liked)}
            aria-label={liked ? "Descurtir" : "Curtir"}
          >
            <FaHeart className={liked ? "text-red-500" : "text-gray-400"} />
          </Button>
        </CardHeader>
        <CardBody>
          <p className="text-lg text-default-700 leading-relaxed">{fact.fact}</p>
          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-default-500">Tamanho: {fact.length} caracteres</p>
            <div className="flex gap-2">
              <Tooltip content={copied ? "Copiado!" : "Copiar fato"}>
                <Button
                  isIconOnly
                  color="primary"
                  variant="light"
                  onClick={handleCopy}
                  aria-label="Copiar fato"
                >
                  <FaCopy />
                </Button>
              </Tooltip>
              <Tooltip content="Compartilhar no Twitter">
                <Button
                  isIconOnly
                  color="primary"
                  variant="light"
                  onClick={() => handleShare('twitter')}
                  aria-label="Compartilhar no Twitter"
                >
                  <FaTwitter />
                </Button>
              </Tooltip>
              <Tooltip content="Compartilhar no Facebook">
                <Button
                  isIconOnly
                  color="primary"
                  variant="light"
                  onClick={() => handleShare('facebook')}
                  aria-label="Compartilhar no Facebook"
                >
                  <FaFacebook />
                </Button>
              </Tooltip>
              <Tooltip content="Compartilhar no WhatsApp">
                <Button
                  isIconOnly
                  color="primary"
                  variant="light"
                  onClick={() => handleShare('whatsapp')}
                  aria-label="Compartilhar no WhatsApp"
                >
                  <FaWhatsapp />
                </Button>
              </Tooltip>
            </div>
          </div>
        </CardBody>
      </Card>
      <Button 
        as={Link} 
        href="/" 
        color="primary" 
        variant="ghost" 
        className="mt-8 hover:scale-105 transition-transform"
      >
        Voltar para a Listagem
      </Button>
    </motion.div>
  );
} 