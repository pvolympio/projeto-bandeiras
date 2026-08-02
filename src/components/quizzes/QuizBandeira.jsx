import React, { useCallback, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { allCountries } from "../../data/countryLoader";
import { getSimilarFlags } from "../../utils/colorUtils";
import { Shuffle, CheckCircle, XCircle, Share2, Flame, Trophy } from "lucide-react";
import { useSound } from "../../hooks/useSound";
import { useQuestionPool } from "../../hooks/useQuestionPool";
import { useHighScore } from "../../hooks/useHighScore";
import { useMastery } from "../../hooks/useMastery";
import { triggerConfetti } from "../../utils/confetti";

function QuizBandeira() {
  const [currentCountry, setCurrentCountry] = useState(null);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [difficulty, setDifficulty] = useState("médio");
  const [loading, setLoading] = useState(true);

  const { getNextCountry } = useQuestionPool();
  const { highScore, updateHighScore } = useHighScore('bandeira');
  const { incrementMastery } = useMastery();
  const playSound = useSound();

  const loadNewQuestion = useCallback(async () => {
    setLoading(true);
    setFeedback("");
    const random = getNextCountry();
    setCurrentCountry(random);

    const n = 3;
    const similar = await getSimilarFlags(random, allCountries, n, difficulty);

    const answers = [...similar, random].sort(() => Math.random() - 0.5);
    setOptions(answers);
    setLoading(false);
  }, [difficulty, getNextCountry]);

  const handleSelect = (selected) => {
    if (!currentCountry) return;
    if (selected.code === currentCountry.code) {
      playSound('correct');
      const newScore = score + 1;
      const newStreak = streak + 1;
      setScore(newScore);
      setStreak(newStreak);

      if (newScore > highScore) {
        updateHighScore(newScore);
        triggerConfetti({ particleCount: 80, spread: 90 });
      } else if (newStreak % 5 === 0) {
        triggerConfetti({ particleCount: 50, spread: 60 });
      }

      incrementMastery(currentCountry.code);
      setFeedback(newStreak >= 5 ? `Incrível! Combo 🔥 x${newStreak}` : "Correto! 🎉");
      setTimeout(loadNewQuestion, 1200);
    } else {
      playSound('wrong');
      setFeedback(`❌ Errado! Era ${currentCountry.name}.`);
      setScore(0);
      setStreak(0);
    }
  };

  useEffect(() => {
    loadNewQuestion();
  }, [loadNewQuestion]);

  if (loading || !currentCountry) {
    return (
      <div className="quiz-play quiz-play--flag quiz-play--loading flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-3 text-gray-700 dark:text-gray-300">Carregando sinal...</p>
      </div>
    );
  }

  return (
    <main className="quiz-play quiz-play--flag flex flex-col items-center p-6 bg-white dark:bg-gray-900 min-h-screen overflow-hidden transition-colors">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Qual é a bandeira de <span className="text-amber-500">{currentCountry.name}</span>?
        </h1>

        <div className="flex justify-between items-center mb-4">
          <div className="text-left flex items-center gap-2">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Recorde</p>
              <p className="text-xl font-bold text-amber-500">{highScore}</p>
            </div>
            {streak >= 3 && (
              <div className="streak-combo-badge bg-gradient-to-r from-amber-500 to-red-500 text-slate-950 px-2.5 py-1 rounded-full text-xs font-black flex items-center gap-1 shadow-lg">
                <Flame className="w-3.5 h-3.5 fill-current" />
                <span>x{streak}</span>
              </div>
            )}
          </div>
          
          <div className="text-right">
             <p className="text-sm text-gray-500 dark:text-gray-400">Pontuação</p>
             <p className="text-xl font-bold text-gray-800 dark:text-white">{score}</p>
          </div>

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="ml-4 p-2 rounded-md border-2 border-amber-500 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
          >
            <option value="fácil">Fácil</option>
            <option value="médio">Médio</option>
            <option value="difícil">Difícil</option>
          </select>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentCountry.code}
            className="grid grid-cols-2 sm:grid-cols-2 gap-6 mt-6 justify-items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {options.map((opt) => (
              <motion.button
                key={opt.code}
                onClick={() => handleSelect(opt)}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md hover:scale-105 transition-transform"
              >
                <img
                  src={`/flags/${opt.code}.svg`}
                  alt={opt.name}
                  className="w-36 h-auto rounded-md border dark:border-gray-700"
                />
              </motion.button>
            ))}
          </motion.div>
        </AnimatePresence>

        {feedback && (
          <motion.p
            key={feedback}
            role="status"
            aria-live="polite"
            className={`mt-6 text-lg font-semibold ${
              feedback.includes("Correto") || feedback.includes("Incrível")
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {feedback}
          </motion.p>
        )}
      </div>
    </main>
  );
}

export default QuizBandeira;
