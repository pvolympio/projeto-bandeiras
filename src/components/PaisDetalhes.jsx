import React, { useMemo } from 'react';
import { useParams, Link } from 'wouter';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, MapPin, Users, Globe, Info, Play, Star, Share2, Award } from 'lucide-react';
import { allCountries } from '../data/countryLoader';
import { useMastery } from '../hooks/useMastery';
import { countryDetails } from '../data/countryDetails';
import { generateCountryDescription } from '../utils/textGenerator';
import CountryMiniMap from './CountryMiniMap';
import WavyFlag3D from './WavyFlag3D';

function PaisDetalhes() {
  const { code } = useParams();
  const { isMastered, getMasteryLevel } = useMastery();

  const country = useMemo(() => {
    return allCountries.find(c => c.code === code);
  }, [code]);

  const relatedCountries = useMemo(() => {
    if (!country) return [];

    return allCountries
      .filter(c => c.continent === country.continent && c.code !== country.code)
      .sort((a, b) => a.code.localeCompare(b.code))
      .slice(0, 3);
  }, [country]);

  if (!country) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">País não encontrado 😕</h1>
        <Link href="/" className="text-amber-500 hover:underline">Voltar para o início</Link>
      </div>
    );
  }

  const extraData = countryDetails[country.code] || {};
  const mastered = isMastered(country.code);
  const masteryLevel = getMasteryLevel(country.code);

  const handleShare = async () => {
    const shareData = {
      title: `Bandeira do ${country.name}`,
      text: `Você sabia? ${extraData.funFact || `A capital do ${country.name} é ${country.capital}.`} Aprenda mais no Bandeiras do Mundo!`,
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
      <Helmet>
        <title>Bandeira do {country.name} - Significado, História e Curiosidades</title>
        <meta name="description" content={generateCountryDescription(country, extraData).intro.substring(0, 160) + "..."} />
        <link rel="canonical" href={`https://bandeirasdomundo.com/pais/${country.code}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`Bandeira do ${country.name} — significado e curiosidades`} />
        <meta property="og:description" content={generateCountryDescription(country, extraData).intro.substring(0, 160)} />
        <meta property="og:url" content={`https://bandeirasdomundo.com/pais/${country.code}`} />
        <meta property="og:image" content={`https://bandeirasdomundo.com/flags/${country.code}.svg`} />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => window.history.length > 1 ? window.history.back() : window.location.assign('/')}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-amber-500 mb-6 transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5" /> Voltar
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden relative">
          {/* Header Cinematográfico com Bandeira desfocada em Parallax Backdrop */}
          <div className="relative p-8 text-center overflow-hidden border-b border-gray-100 dark:border-gray-700">
            <div 
              className="absolute inset-0 bg-cover bg-center blur-2xl opacity-20 dark:opacity-30 scale-125 pointer-events-none"
              style={{ backgroundImage: `url(/flags/${country.code}.svg)` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white dark:via-gray-800/80 dark:to-gray-800 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="relative inline-block mb-6">
                <WavyFlag3D flagUrl={`/flags/${country.code}.svg`} countryName={country.name} />
                {mastered && (
                  <div className="absolute -top-4 -right-4 bg-amber-500 text-slate-950 px-3 py-1.5 rounded-full font-black text-xs shadow-xl flex items-center gap-1 mastered-stamp-anim border-2 border-white dark:border-slate-900 z-20">
                    <Award className="w-4 h-4" />
                    <span>DOMINADO</span>
                  </div>
                )}
              </div>
              
              <h1 className="text-4xl font-black text-gray-800 dark:text-white mb-2 flex items-center justify-center gap-3">
                {country.name}
                {mastered && <Star className="w-8 h-8 text-amber-500 fill-current animate-pulse" title="País Dominado!" />}
              </h1>
              <p className="text-xl text-gray-500 dark:text-gray-400 mb-6">{country.officialName || country.name}</p>
              
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 rounded-full hover:bg-amber-500/20 transition font-bold text-sm"
              >
                <Share2 className="w-4 h-4" />
                Desafiar Amigos
              </button>
            </div>
          </div>

          {/* Informações Principais (Grid) + Mini Mapa */}
          <div className="p-8 border-t border-gray-100 dark:border-gray-700 space-y-6">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                  <Info className="w-6 h-6 text-amber-500" /> Informações Básicas
                </h2>
             </div>
              
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Capital</p>
                      <p className="text-lg font-bold text-gray-800 dark:text-white">{country.capital || '—'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">População estimada</p>
                      <p className="text-lg font-bold text-gray-800 dark:text-white">
                        {country.population ? country.population.toLocaleString('pt-BR') : '—'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                      <Globe className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Continente</p>
                      <p className="text-lg font-bold text-gray-800 dark:text-white">{country.continent}</p>
                    </div>
                  </div>

                  {extraData.currency && (
                    <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg text-yellow-600 dark:text-yellow-400">
                        <span className="text-xl font-bold">$</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Moeda</p>
                        <p className="text-lg font-bold text-gray-800 dark:text-white">{extraData.currency}</p>
                      </div>
                    </div>
                  )}
               </div>

               {/* MINI MAPA DA REGIÃO */}
               <div className="md:col-span-1">
                 <CountryMiniMap countryName={country.name} continent={country.continent} capital={country.capital} />
               </div>
             </div>
          </div>

          {/* Seção de Conteúdo Gerado (SEO + Informação) */}
          <div className="p-8 border-t border-gray-100 dark:border-gray-700 space-y-6 bg-gray-50/50 dark:bg-gray-800/50">
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <Globe className="w-6 h-6 text-amber-500" /> Sobre o {country.name}
              </h2>
              
              {(() => {
                const { intro, details, trivia } = generateCountryDescription(country, extraData);
                return (
                  <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    <p>{intro}</p>
                    <p>{details}</p>
                    <p>{trivia}</p>
                  </div>
                );
              })()}
            </div>

            {/* Curiosidades Específicas */}
            {(extraData.meaning || extraData.funFact) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {extraData.meaning && (
                  <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl border border-amber-200 dark:border-amber-800">
                    <h3 className="text-lg font-bold text-amber-600 dark:text-amber-400 mb-2">Significado da Bandeira</h3>
                    <p className="text-gray-700 dark:text-gray-300 italic">"{extraData.meaning}"</p>
                  </div>
                )}

                {extraData.funFact && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                    <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">Você Sabia?</h3>
                    <p className="text-gray-700 dark:text-gray-300">{extraData.funFact}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Seção Pratique */}
          <div className="p-8 border-t border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-6">
              <Play className="w-6 h-6 text-amber-500" /> Pratique
            </h2>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-amber-700 dark:text-amber-400 mb-2">
                  Teste seus conhecimentos!
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Você já acertou este país <strong>{masteryLevel}</strong> vezes.
                  {mastered ? " Você é um mestre! 🌟" : " Continue jogando para dominar."}
                </p>
              </div>
              <Link 
                href="/quiz/bandeira" 
                className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Jogar Agora
              </Link>
            </div>
          </div>

          {/* Seção Veja Também */}
          <div className="bg-gray-50 dark:bg-gray-900/50 p-8 border-t border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Veja Também ({country.continent})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedCountries.map(rel => (
                  <Link 
                    key={rel.code} 
                    href={`/pais/${rel.code}`}
                    className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 dark:border-gray-700"
                  >
                    <img 
                      src={`/flags/${rel.code}.svg`} 
                      alt={rel.name} 
                      className="w-12 h-8 object-cover rounded shadow-sm"
                    />
                    <span className="font-medium text-gray-700 dark:text-gray-200">{rel.name}</span>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PaisDetalhes;
