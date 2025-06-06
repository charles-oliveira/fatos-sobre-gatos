'use client'

import { Chip } from "@nextui-org/react";
import { motion } from "framer-motion";
import { FaTrophy, FaMedal, FaCrown, FaStar } from "react-icons/fa";

interface Player {
  id: number;
  name: string;
  score: number;
  streak: number;
  avatar: string;
}

const mockPlayers: Player[] = [
  {
    id: 1,
    name: "Mestre dos Gatos",
    score: 2500,
    streak: 25,
    avatar: "🐱"
  },
  {
    id: 2,
    name: "Gatuno Supremo",
    score: 2200,
    streak: 18,
    avatar: "😺"
  },
  {
    id: 3,
    name: "Felino Expert",
    score: 1950,
    streak: 15,
    avatar: "😸"
  },
  {
    id: 4,
    name: "Miau Master",
    score: 1700,
    streak: 12,
    avatar: "🐈"
  },
  {
    id: 5,
    name: "Gatinho Pro",
    score: 1500,
    streak: 10,
    avatar: "😻"
  },
  {
    id: 6,
    name: "Cat Whisperer",
    score: 1200,
    streak: 8,
    avatar: "🙀"
  },
  {
    id: 7,
    name: "Purrfect Player",
    score: 1000,
    streak: 7,
    avatar: "😾"
  },
];

const getRankIcon = (index: number) => {
  switch (index) {
    case 0:
      return <FaCrown className="text-yellow-400 text-2xl" />;
    case 1:
      return <FaTrophy className="text-gray-400 text-xl" />;
    case 2:
      return <FaMedal className="text-amber-600 text-xl" />;
    default:
      return <span className="text-gray-500 font-bold text-lg">#{index + 1}</span>;
  }
};

const getRankBg = (index: number) => {
  switch (index) {
    case 0:
      return "bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500/30";
    case 1:
      return "bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/30";
    case 2:
      return "bg-gradient-to-r from-amber-600/20 to-amber-700/20 border-amber-600/30";
    default:
      return "bg-gradient-to-r from-purple-500/10 to-purple-600/10 border-purple-500/20";
  }
};

export default function Leaderboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-3">
          <FaTrophy className="text-yellow-400" />
          Melhores Jogadores
        </h2>
        <p className="text-gray-300">Top jogadores da semana</p>
      </motion.div>

      {/* Top 3 Podium */}
      <motion.div 
        className="grid grid-cols-3 gap-4 mb-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* 2º Lugar */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="modern-card p-4 h-24 bg-gradient-to-t from-gray-600/20 to-gray-500/20 border-gray-400/30">
            <div className="text-2xl mb-1">{mockPlayers[1]?.avatar}</div>
            <FaTrophy className="text-gray-400 mx-auto mb-1" />
            <div className="text-xs text-gray-300">2º</div>
          </div>
          <div className="mt-2 text-center">
            <div className="font-bold text-white text-sm">{mockPlayers[1]?.name}</div>
            <div className="text-purple-400 font-bold">{mockPlayers[1]?.score}</div>
          </div>
        </motion.div>

        {/* 1º Lugar */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="modern-card p-4 h-32 bg-gradient-to-t from-yellow-600/20 to-yellow-500/20 border-yellow-500/30 relative">
            <FaCrown className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-yellow-400 text-xl" />
            <div className="text-3xl mb-2 mt-2">{mockPlayers[0]?.avatar}</div>
            <div className="text-xs text-yellow-200 font-bold">CAMPEÃO</div>
          </div>
          <div className="mt-2 text-center">
            <div className="font-bold text-white">{mockPlayers[0]?.name}</div>
            <div className="text-yellow-400 font-bold text-lg">{mockPlayers[0]?.score}</div>
          </div>
        </motion.div>

        {/* 3º Lugar */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="modern-card p-4 h-20 bg-gradient-to-t from-amber-700/20 to-amber-600/20 border-amber-600/30">
            <div className="text-2xl mb-1">{mockPlayers[2]?.avatar}</div>
            <FaMedal className="text-amber-600 mx-auto mb-1" />
            <div className="text-xs text-amber-200">3º</div>
          </div>
          <div className="mt-2 text-center">
            <div className="font-bold text-white text-sm">{mockPlayers[2]?.name}</div>
            <div className="text-purple-400 font-bold">{mockPlayers[2]?.score}</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Ranking completo */}
      <div className="space-y-3">
        {mockPlayers.map((player, index) => (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className={`modern-card p-4 ${getRankBg(index)} hover:scale-[1.02] transition-all duration-300`}
            whileHover={{ y: -2 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Rank Icon */}
                <div className="flex items-center justify-center w-10 h-10">
                  {getRankIcon(index)}
                </div>

                {/* Avatar */}
                <div className="relative">
                  <span className="text-3xl">{player.avatar}</span>
                  {index < 3 && (
                    <div className="absolute -top-1 -right-1">
                      <FaStar className="text-yellow-400 text-sm" />
                    </div>
                  )}
                </div>

                {/* Player Info */}
                <div>
                  <p className="font-bold text-white text-lg">{player.name}</p>
                  <div className="flex items-center gap-2">
                    <Chip 
                      size="sm" 
                      className="modern-chip text-xs"
                      startContent="🔥"
                    >
                      {player.streak} sequência
                    </Chip>
                  </div>
                </div>
              </div>

              {/* Score */}
              <div className="text-right">
                <p className="text-2xl font-bold text-white">{player.score.toLocaleString()}</p>
                <p className="text-sm text-gray-300">pontos</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Call to action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="text-center mt-6"
      >
        <div className="modern-card p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/30">
          <p className="text-white font-medium mb-2">🎮 Continue jogando para entrar no ranking!</p>
          <p className="text-gray-300 text-sm">Quanto mais você joga, melhor fica sua posição</p>
        </div>
      </motion.div>
    </div>
  );
} 