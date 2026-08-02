import React from 'react';
import { motion } from 'framer-motion';
import { useMastery } from '../hooks/useMastery';
import { Trophy, Star, Medal, Crown, Map, Flag, Zap, Users, Type, MapPin, Share2, Sparkles } from 'lucide-react';
import { Link } from 'wouter';
import BioluminescentDonutChart from './BioluminescentDonutChart';

function Perfil() {
  const { getTotalMastered } = useMastery();
  const totalStars = getTotalMastered();
  const totalCountries = 193;
  const masteryPercentage = Math.min(100, (totalStars / totalCountries) * 100);

  // Níveis baseados em estrelas
  const getLevel = (stars) => {
    if (stars >= 150) return { title: "Lenda da Geografia", color: "text-purple-500", icon: <Crown className="w-8 h-8" /> };
    if (stars >= 100) return { title: "Mestre das Bandeiras", color: "text-red-500", icon: <Medal className="w-8 h-8" /> };
    if (stars >= 50) return { title: "Aventureiro Global", color: "text-amber-500", icon: <Trophy className="w-8 h-8" /> };
    if (stars >= 10) return { title: "Explorador Curioso", color: "text-blue-500", icon: <Map className="w-8 h-8" /> };
    return { title: "Viajante Iniciante", color: "text-gray-500", icon: <Flag className="w-8 h-8" /> };
  };

  const level = getLevel(totalStars);

  const getScore = (id) => localStorage.getItem(`highscore_${id}`) || 0;

  const stats = [
    { id: 'bandeira', label: 'Bandeiras', icon: <Flag className="w-5 h-5" />, color: 'bg-blue-100 text-blue-600' },
    { id: 'capital', label: 'Capitais', icon: <MapPin className="w-5 h-5" />, color: 'bg-green-100 text-green-600' },
    { id: 'nome-pais', label: 'Nomes', icon: <Type className="w-5 h-5" />, color: 'bg-pink-100 text-pink-600' },
    { id: 'relampago', label: 'Relâmpago', icon: <Zap className="w-5 h-5" />, color: 'bg-yellow-100 text-yellow-600' },
    { id: 'populacao', label: 'População', icon: <Users className="w-5 h-5" />, color: 'bg-indigo-100 text-indigo-600' },
    { id: 'continente', label: 'Continentes', icon: <Map className="w-5 h-5" />, color: 'bg-teal-100 text-teal-600' },
  ];

  const handleShare = async () => {
    const shareData = {
      title: `Meu Progresso no Bandeiras do Mundo`,
      text: `Eu já dominei ${totalStars} bandeiras e sou um ${level.title}! Tente me superar no Bandeiras do Mundo!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
      alert('Link copiado para a área de transferência!');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors">
      <div className="max-w-4xl mx-auto">
        
        {/* Cabeçalho do Perfil com Gráfico Bioluminescente */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="holographic-card p-8 mb-8 text-center"
        >
          <div className="flex flex-col md:flex-row items-center justify-around gap-6">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700/80 rounded-full mb-4 flex items-center justify-center text-4xl shadow-inner border border-white/20">
                🌐
              </div>
              <h1 className="text-3xl font-black text-gray-800 dark:text-white mb-1">Seu Perfil</h1>
              <div className="flex items-center gap-2 mb-4">
                <span className={`${level.color} flex items-center gap-2 font-bold text-lg`}>
                  {level.icon} {level.title}
                </span>
              </div>
            </div>

            {/* GRÁFICO DONUT BIOLUMINESCENTE */}
            <BioluminescentDonutChart
              percentage={masteryPercentage}
              size={150}
              label="Progresso de Atlas"
              subLabel={`${totalStars}/${totalCountries}`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto my-6">
            <div className="bg-amber-50/80 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-200 dark:border-amber-800">
              <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">Países Dominados</p>
              <p className="text-3xl font-black text-amber-500 flex items-center justify-center gap-2 mt-1">
                {totalStars} <Star className="w-6 h-6 fill-current animate-pulse" />
              </p>
            </div>
            <div className="bg-cyan-50/80 dark:bg-cyan-900/20 p-4 rounded-xl border border-cyan-200 dark:border-cyan-800">
              <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">Próximo Nível</p>
              <p className="text-xl font-bold text-cyan-600 dark:text-cyan-400 mt-2">
                {totalStars < 10 ? 10 - totalStars : 
                 totalStars < 50 ? 50 - totalStars : 
                 totalStars < 100 ? 100 - totalStars : 
                 totalStars < 150 ? 150 - totalStars : 'Máximo!'} 
                 <span className="text-xs font-normal text-gray-400 ml-1">países</span>
              </p>
            </div>
          </div>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 rounded-full hover:scale-105 transition font-black shadow-lg"
          >
            <Share2 className="w-5 h-5" />
            Compartilhar Progresso
          </button>
        </motion.div>

        {/* Recordes com Holographic Cards */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-amber-500" /> Seus Recordes por Categoria
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.08 }}
              className="holographic-card p-6 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${stat.color} shadow-sm`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-2xl font-black text-gray-800 dark:text-white">{getScore(stat.id)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/quiz" className="px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl transition shadow-xl inline-block hover:scale-105">
            Continuar Jogando
          </Link>
        </div>

      </div>
    </main>
  );
}

export default Perfil;
