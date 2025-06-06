'use client'

import { Card, CardBody } from "@nextui-org/react";
import { motion } from "framer-motion";
import { FaLightbulb, FaChartLine, FaTrophy, FaClock, FaGamepad, FaStar } from "react-icons/fa";

interface GameStatsProps {
  totalGames: number;
  totalPoints: number;
  bestStreak: number;
  averageTime: number;
  accuracy: number;
  tips: string[];
}

export default function GameStats({
  totalGames,
  totalPoints,
  bestStreak,
  averageTime,
  accuracy,
  tips
}: GameStatsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="modern-card">
        <CardBody className="p-6">
          <motion.h2 
            className="text-xl font-bold mb-6 flex items-center gap-3 text-white"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FaChartLine className="text-purple-400" />
            Estatísticas
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <motion.div 
              className="modern-card p-4"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <FaGamepad className="text-blue-400" />
                <p className="text-gray-300 text-sm">Total de Jogos</p>
              </div>
              <p className="text-2xl font-bold text-white">{totalGames}</p>
            </motion.div>

            <motion.div 
              className="modern-card p-4"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <FaStar className="text-yellow-400" />
                <p className="text-gray-300 text-sm">Pontos Totais</p>
              </div>
              <p className="text-2xl font-bold text-white">{totalPoints.toLocaleString()}</p>
            </motion.div>

            <motion.div 
              className="modern-card p-4"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <FaTrophy className="text-orange-400" />
                <p className="text-gray-300 text-sm">Melhor Sequência</p>
              </div>
              <p className="text-2xl font-bold text-white">{bestStreak}</p>
            </motion.div>

            <motion.div 
              className="modern-card p-4"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <FaClock className="text-green-400" />
                <p className="text-gray-300 text-sm">Tempo Médio</p>
              </div>
              <p className="text-2xl font-bold text-white">{averageTime.toFixed(1)}s</p>
            </motion.div>
          </div>

          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex justify-between items-center mb-3">
              <p className="text-gray-300 font-medium">Precisão Geral</p>
              <p className="font-bold text-white text-lg">{accuracy}%</p>
            </div>
            <div className="modern-progress">
              <motion.div
                className="modern-progress-bar"
                initial={{ width: 0 }}
                animate={{ width: `${accuracy}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-lg font-bold mb-4 flex items-center gap-3 text-white">
              <FaLightbulb className="text-yellow-400" />
              Dicas de Jogo
            </h3>
            <div className="space-y-3">
              {tips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="modern-card p-3 hover:bg-opacity-80 transition-all duration-300"
                  whileHover={{ x: 5 }}
                >
                  <p className="text-white text-sm leading-relaxed">{tip}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </CardBody>
      </Card>
    </motion.div>
  );
} 