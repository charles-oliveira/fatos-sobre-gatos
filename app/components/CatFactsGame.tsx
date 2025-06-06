'use client'

import { Card, CardBody, Button, Progress, Chip, Modal, ModalContent, ModalHeader, ModalBody, Input } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaHeart, FaStar, FaBolt, FaClock, FaTrophy, FaUsers, FaGift, FaCheck, FaMedal, FaCrown, FaGamepad, FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import Leaderboard from "./Leaderboard";
import GameStats from "./GameStats";


interface CatFact {
  fact: string;
  length: number;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

interface DailyChallenge {
  id: number;
  title: string;
  description: string;
  reward: number;
  completed: boolean;
}

interface Level {
  level: number;
  xpRequired: number;
  rewards: string[];
}

const achievements: Achievement[] = [
  { id: 1, title: "Primeiro Passo", description: "Complete seu primeiro jogo", icon: "🎮", unlocked: false },
  { id: 2, title: "Mestre dos Gatos", description: "Alcance 1000 pontos", icon: "👑", unlocked: false },
  { id: 3, title: "Sequência Perfeita", description: "Acertar 10 fatos em sequência", icon: "🔥", unlocked: false },
  { id: 4, title: "Sobrevivente", description: "Jogar 5 partidas", icon: "💪", unlocked: false },
  { id: 5, title: "Colecionador", description: "Desbloqueie 5 conquistas", icon: "🎯", unlocked: false },
  { id: 6, title: "Mestre do Tempo", description: "Complete 10 jogos em menos de 5 minutos", icon: "⏱️", unlocked: false },
];

const dailyChallenges: DailyChallenge[] = [
  { id: 1, title: "Gatuno Iniciante", description: "Complete 3 jogos hoje", reward: 100, completed: false },
  { id: 2, title: "Mestre Felino", description: "Alcance uma sequência de 5", reward: 200, completed: false },
  { id: 3, title: "Explorador de Fatos", description: "Descubra 10 fatos novos", reward: 150, completed: false },
];

const levels: Level[] = [
  { level: 1, xpRequired: 0, rewards: ["Acesso a fatos básicos"] },
  { level: 2, xpRequired: 100, rewards: ["Fatos intermediários", "Novos avatares"] },
  { level: 3, xpRequired: 300, rewards: ["Fatos avançados", "Temas especiais"] },
  { level: 4, xpRequired: 600, rewards: ["Fatos raros", "Efeitos visuais"] },
  { level: 5, xpRequired: 1000, rewards: ["Todos os fatos", "Todas as recompensas"] },
];

const gameTips = [
  "🎯 Leia com atenção cada fato antes de responder",
  "⏰ Mantenha a calma quando o tempo estiver acabando",
  "⚡ Use os power-ups estrategicamente",
  "🔥 Tente manter uma sequência para ganhar mais pontos",
  "🎪 Explore os diferentes modos de jogo disponíveis",
];

export default function CatFactsGame({ facts }: { facts: CatFact[] }) {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [streak, setStreak] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [currentFact, setCurrentFact] = useState<CatFact | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);

  const [showDailyChallenges, setShowDailyChallenges] = useState(false);
  const [showMultiplayer, setShowMultiplayer] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [powerUps, setPowerUps] = useState({
    extraTime: 1,
    doublePoints: 1,
    skipQuestion: 1,
  });
  const [difficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<number>>(new Set());
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [averageTime] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [xp, setXp] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);

  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalAnswers, setTotalAnswers] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (currentFact && gameStarted && !isPaused && !gameOver) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleGameOver();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFact, gameStarted, isPaused, gameOver]);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('highScore', score.toString());
    }
  }, [score, highScore]);

  useEffect(() => {
    const savedHighScore = localStorage.getItem('highScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  const getRandomFact = () => {
    const randomIndex = Math.floor(Math.random() * facts.length);
    return facts[randomIndex];
  };

  // Lógica melhorada para determinar se o fato é verdadeiro ou falso
  const isFactTrue = (fact: CatFact) => {
    // Análise básica de palavras-chave para determinar veracidade
    const trueFacts = [
      'cat', 'cats', 'feline', 'purr', 'whiskers', 'paws', 'tail', 
      'meow', 'kitten', 'sleep', 'hunt', 'night', 'eyes', 'hearing'
    ];
    
    const factLower = fact.fact.toLowerCase();
    const trueKeywordCount = trueFacts.filter(keyword => 
      factLower.includes(keyword)
    ).length;
    
    // Se o fato contém muitas palavras-chave sobre gatos, provavelmente é verdadeiro
    // Também considera o comprimento do fato
    return (trueKeywordCount >= 2) || (fact.length > 50 && trueKeywordCount >= 1);
  };

  const handleAnswer = (answer: boolean) => {
    if (!currentFact) return;
    
    const correct = isFactTrue(currentFact) === answer;
    setIsCorrect(correct);
    setTotalAnswers(prev => prev + 1);

    if (correct) {
      const basePoints = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 15 : 20;
      const streakBonus = Math.floor(streak / 3) * 5;
      const timeBonus = Math.floor(timeLeft / 5);
      const points = basePoints + streakBonus + timeBonus;
      
      const newScore = score + points;
      setScore(newScore);
      setTotalPoints(prev => prev + points);
      setStreak(prev => prev + 1);
      setBestStreak(prev => Math.max(prev, streak + 1));
      
      // Adicionar XP
      const xpGained = points * (difficulty === 'easy' ? 1 : difficulty === 'medium' ? 1.5 : 2);
      setXp(prev => {
        const newXp = prev + xpGained;
        checkLevelUp(newXp);
        return newXp;
      });

      // Verificar conquistas
      if (newScore >= 1000 && !unlockedAchievements.has(2)) {
        unlockAchievement(2);
      }
      if (streak + 1 >= 10 && !unlockedAchievements.has(3)) {
        unlockAchievement(3);
      }
      setCorrectAnswers(prev => prev + 1);
    } else {
      setLives(prev => {
        const newLives = prev - 1;
        if (newLives <= 0) {
          setTimeout(() => handleGameOver(), 1500);
        }
        return newLives;
      });
      setStreak(0);
    }

    // Atualizar precisão
    setAccuracy(Math.round(((correctAnswers + (correct ? 1 : 0)) / (totalAnswers + 1)) * 100));

    setTimeout(() => {
      setIsCorrect(null);
      if (lives > 1 || correct) {
        setCurrentFact(getRandomFact());
        setTimeLeft(30);
      }
    }, 1500);
  };

  const checkLevelUp = (newXp: number) => {
    const nextLevel = levels.find(level => newXp >= level.xpRequired && level.level > currentLevel);
    if (nextLevel) {
      setCurrentLevel(nextLevel.level);
      // Mostrar notificação de level up
      alert(`🎉 Parabéns! Você alcançou o nível ${nextLevel.level}!`);
    }
  };

  const createMultiplayerRoom = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomCode(code);
  };

  const joinMultiplayerRoom = () => {
    if (roomCode) {
      alert(`🎮 Entrando na sala ${roomCode}...`);
    }
  };

  const handleGameOver = () => {
    setGameOver(true);
    setGameStarted(false);
    setGamesPlayed(prev => prev + 1);
    
    // Verificar conquistas
    if (gamesPlayed + 1 === 1 && !unlockedAchievements.has(1)) {
      unlockAchievement(1);
    }
    if (gamesPlayed + 1 >= 5 && !unlockedAchievements.has(4)) {
      unlockAchievement(4);
    }
    
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('highScore', score.toString());
    }
    
    checkAchievements();
  };

  const startGame = () => {
    setGameStarted(true);
    setCurrentFact(getRandomFact());
    setGameOver(false);
  };

  const resetGame = () => {
    setScore(0);
    setLives(3);
    setStreak(0);
    setCurrentFact(null);
    setTimeLeft(30);
    setGameOver(false);
    setGameStarted(false);
    setPowerUps({
      extraTime: 1,
      doublePoints: 1,
      skipQuestion: 1,
    });
    setIsCorrect(null);
    setIsPaused(false);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const unlockAchievement = (id: number) => {
    setUnlockedAchievements(prev => {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
  };

  const handlePowerUp = (type: keyof typeof powerUps) => {
    if (powerUps[type] > 0) {
      setPowerUps(prev => ({ ...prev, [type]: prev[type] - 1 }));
      
      switch (type) {
        case 'extraTime':
          setTimeLeft(prev => prev + 15);
          break;
        case 'doublePoints':
          setScore(prev => prev * 2);
          break;
        case 'skipQuestion':
          setCurrentFact(getRandomFact());
          setTimeLeft(30);
          break;
      }
    }
  };

  const checkAchievements = () => {
    const newAchievementIds = achievements
      .filter(achievement => {
        if (achievement.id === 1 && gamesPlayed >= 1) return true;
        if (achievement.id === 2 && score >= 1000) return true;
        if (achievement.id === 3 && streak >= 10) return true;
        if (achievement.id === 4 && gamesPlayed >= 5) return true;
        return false;
      })
      .map(a => a.id);

    setUnlockedAchievements(prev => {
      const newSet = new Set(prev);
      newAchievementIds.forEach(id => newSet.add(id));
      return newSet;
    });
  };

  const getTimeColor = () => {
    if (timeLeft > 20) return 'success';
    if (timeLeft > 10) return 'warning';
    return 'danger';
  };

  return (
    <div className="game-container">
      {/* Header moderno */}
      <motion.div 
        className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-wrap gap-3">
          <Button
            className="modern-button"
            startContent={<FaTrophy />}
            onClick={() => setShowLeaderboard(true)}
            size="sm"
          >
            Ranking
          </Button>
          <Button
            className="modern-button"
            startContent={<FaMedal />}
            onClick={() => setShowAchievements(true)}
            size="sm"
          >
            Conquistas
          </Button>
          <Button
            className="modern-button"
            startContent={<FaCrown />}
            onClick={() => setShowDailyChallenges(true)}
            size="sm"
          >
            Desafios
          </Button>
          <Button
            className="modern-button"
            startContent={<FaUsers />}
            onClick={() => setShowMultiplayer(true)}
            size="sm"
          >
            Multiplayer
          </Button>
        </div>
        
        <div className="flex items-center gap-4">
          <Chip className="modern-chip" startContent={<FaStar />}>
            Nível {currentLevel}
          </Chip>
          <Chip className="modern-chip" startContent={<FaBolt />}>
            {xp} XP
          </Chip>
          <Button
            isIconOnly
            className="modern-button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            size="sm"
          >
            {soundEnabled ? <FaVolumeUp /> : <FaVolumeMute />}
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Game Area */}
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="modern-card">
              <CardBody className="p-8">
                {!gameStarted && !gameOver ? (
                  // Tela inicial
                  <motion.div 
                    className="text-center space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="space-y-4">
                      <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        🐱 Fatos sobre Gatos
                      </h1>
                      <p className="text-lg text-gray-300">
                        Teste seus conhecimentos sobre o fascinante mundo felino!
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                      <div className="modern-card p-4">
                        <div className="text-2xl mb-2">🎯</div>
                        <div className="text-sm">Recorde</div>
                        <div className="text-xl font-bold text-purple-400">{highScore}</div>
                      </div>
                      <div className="modern-card p-4">
                        <div className="text-2xl mb-2">🎮</div>
                        <div className="text-sm">Jogos</div>
                        <div className="text-xl font-bold text-purple-400">{gamesPlayed}</div>
                      </div>
                      <div className="modern-card p-4">
                        <div className="text-2xl mb-2">🔥</div>
                        <div className="text-sm">Sequência</div>
                        <div className="text-xl font-bold text-purple-400">{bestStreak}</div>
                      </div>
                    </div>

                    <Button
                      className="modern-button text-lg px-12 py-6 pulse-animation"
                      startContent={<FaPlay />}
                      onClick={startGame}
                      size="lg"
                    >
                      Começar Jogo
                    </Button>
                  </motion.div>
                ) : gameOver ? (
                  // Tela de game over
                  <motion.div 
                    className="text-center space-y-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="space-y-4">
                      <h2 className="text-3xl font-bold text-purple-400">
                        {score > highScore ? "🎉 Novo Recorde!" : "🎮 Fim de Jogo!"}
                      </h2>
                      <div className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        {score}
                      </div>
                      <p className="text-gray-300">
                        {score > highScore ? "Parabéns! Você quebrou seu recorde!" : `Recorde atual: ${highScore}`}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                      <div className="modern-card p-4">
                        <div className="text-2xl mb-2">🔥</div>
                        <div className="text-sm text-gray-400">Sequência</div>
                        <div className="text-xl font-bold">{streak}</div>
                      </div>
                      <div className="modern-card p-4">
                        <div className="text-2xl mb-2">🎯</div>
                        <div className="text-sm text-gray-400">Precisão</div>
                        <div className="text-xl font-bold">{accuracy}%</div>
                      </div>
                    </div>

                    <div className="flex gap-4 justify-center">
                      <Button
                        className="modern-button"
                        onClick={resetGame}
                        startContent={<FaPlay />}
                      >
                        Jogar Novamente
                      </Button>

                    </div>
                  </motion.div>
                ) : (
                  // Tela do jogo
                  <div className="space-y-6">
                    {/* Stats Header */}
                    <div className="flex flex-wrap justify-between items-center gap-4">
                      <div className="flex gap-3">
                        <Chip className="modern-chip" startContent={<FaHeart />} color={lives > 1 ? "success" : "danger"}>
                          {lives}
                        </Chip>
                        <Chip className="modern-chip" startContent={<FaGamepad />} color="primary">
                          {score}
                        </Chip>
                        <Chip className="modern-chip" startContent={<FaBolt />} color={streak > 5 ? "warning" : "default"}>
                          {streak}x
                        </Chip>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Button
                          isIconOnly
                          className="modern-button"
                          onClick={togglePause}
                          size="sm"
                        >
                          {isPaused ? <FaPlay /> : <FaPause />}
                        </Button>
                        <div className="w-32">
                          <Progress
                            value={(timeLeft / 30) * 100}
                            color={getTimeColor()}
                            className="modern-progress"
                            label={`${timeLeft}s`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Fact Display */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentFact?.fact}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-center space-y-6"
                      >
                        <div className="modern-card p-6">
                          <h2 className="text-xl md:text-2xl font-semibold mb-4 leading-relaxed">
                            {currentFact?.fact || "Carregando fato..."}
                          </h2>
                          <p className="text-gray-300">
                            Este fato sobre gatos é verdadeiro ou falso?
                          </p>
                        </div>

                        <div className="flex gap-4 justify-center">
                          <Button
                            className="modern-button bg-green-600 hover:bg-green-700 text-lg px-8 py-6"
                            onClick={() => handleAnswer(true)}
                            disabled={isPaused}
                            size="lg"
                          >
                            ✅ Verdadeiro
                          </Button>
                          <Button
                            className="modern-button bg-red-600 hover:bg-red-700 text-lg px-8 py-6"
                            onClick={() => handleAnswer(false)}
                            disabled={isPaused}
                            size="lg"
                          >
                            ❌ Falso
                          </Button>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Feedback */}
                    <AnimatePresence>
                      {isCorrect !== null && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className={`text-center p-4 rounded-xl ${
                            isCorrect ? 'success-feedback' : 'error-feedback'
                          }`}
                        >
                          <div className="text-2xl mb-2">
                            {isCorrect ? '🎉' : '😿'}
                          </div>
                          <p className="text-lg font-semibold">
                            {isCorrect ? 'Correto! Muito bem!' : 'Ops! Tente novamente!'}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Power-ups */}
                    <div className="flex gap-3 justify-center">
                      <Button
                        className="modern-button"
                        size="sm"
                        onClick={() => handlePowerUp('extraTime')}
                        disabled={powerUps.extraTime === 0}
                        startContent={<FaClock />}
                      >
                        +15s ({powerUps.extraTime})
                      </Button>
                      <Button
                        className="modern-button"
                        size="sm"
                        onClick={() => handlePowerUp('doublePoints')}
                        disabled={powerUps.doublePoints === 0}
                        startContent={<FaStar />}
                      >
                        2x Pontos ({powerUps.doublePoints})
                      </Button>
                      <Button
                        className="modern-button"
                        size="sm"
                        onClick={() => handlePowerUp('skipQuestion')}
                        disabled={powerUps.skipQuestion === 0}
                        startContent={<FaBolt />}
                      >
                        Pular ({powerUps.skipQuestion})
                      </Button>
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar com estatísticas */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GameStats
              totalGames={gamesPlayed}
              totalPoints={totalPoints}
              bestStreak={bestStreak}
              averageTime={averageTime}
              accuracy={accuracy}
              tips={gameTips}
            />
          </motion.div>
        </div>
      </div>

      {/* Modais */}
      <Modal
        isOpen={showLeaderboard}
        onClose={() => setShowLeaderboard(false)}
        className="modern-card max-w-2xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader className="text-xl font-bold">
            🏆 Ranking Global
          </ModalHeader>
          <ModalBody>
            <Leaderboard />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={showAchievements}
        onClose={() => setShowAchievements(false)}
        className="modern-card max-w-4xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader className="text-xl font-bold">
            🏅 Conquistas
          </ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map(achievement => (
                <motion.div
                  key={achievement.id}
                  className={`modern-card p-4 ${
                    unlockedAchievements.has(achievement.id)
                      ? 'border-yellow-500'
                      : 'opacity-50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{achievement.icon}</span>
                    <div>
                      <h3 className="font-bold text-white">
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-gray-300">
                        {achievement.description}
                      </p>
                    </div>
                    {unlockedAchievements.has(achievement.id) && (
                      <FaCheck className="text-green-500 ml-auto" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={showDailyChallenges}
        onClose={() => setShowDailyChallenges(false)}
        className="modern-card max-w-2xl"
      >
        <ModalContent>
          <ModalHeader className="text-xl font-bold">
            🎯 Desafios Diários
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              {dailyChallenges.map(challenge => (
                <div
                  key={challenge.id}
                  className="modern-card p-4"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-white">
                        {challenge.title}
                      </h3>
                      <p className="text-sm text-gray-300">
                        {challenge.description}
                      </p>
                    </div>
                    <Chip className="modern-chip" startContent={<FaGift />}>
                      {challenge.reward} XP
                    </Chip>
                  </div>
                </div>
              ))}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={showMultiplayer}
        onClose={() => setShowMultiplayer(false)}
        className="modern-card"
      >
        <ModalContent>
          <ModalHeader className="text-xl font-bold">
            👥 Modo Multiplayer
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Seu Nome"
                value={playerName}
                onChange={e => setPlayerName(e.target.value)}
                className="modern-input"
              />
              {roomCode ? (
                <div className="modern-card p-4 text-center">
                  <p className="text-white text-lg font-bold mb-2">
                    Código da Sala: {roomCode}
                  </p>
                  <p className="text-sm text-gray-300">
                    Compartilhe este código com seus amigos
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Button
                    className="modern-button w-full"
                    onClick={createMultiplayerRoom}
                  >
                    Criar Sala
                  </Button>
                  <div className="flex gap-2">
                    <Input
                      label="Código da Sala"
                      value={roomCode}
                      onChange={e => setRoomCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      className="modern-button"
                      onClick={joinMultiplayerRoom}
                    >
                      Entrar
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
} 