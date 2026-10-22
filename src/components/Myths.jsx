import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

// Наша база мифов и фактов
const questions = [
  {
    id: 1,
    text: "Сдавать кровь — это очень больно и занимает полдня.",
    isMyth: true,
    explanation: "Сам процесс сдачи цельной крови занимает всего 10-15 минут. Ощущения сравнимы с обычным забором крови из вены на анализ."
  },
  {
    id: 2,
    text: "Людям с татуировками навсегда запрещено быть донорами.",
    isMyth: true,
    explanation: "Сдавать кровь можно! Нужно лишь подождать 120 дней после нанесения татуировки, татуажа или пирсинга."
  },
  {
    id: 3,
    text: "Донорство полезно для здоровья самого донора.",
    isMyth: false,
    explanation: "Правда! Регулярная сдача крови стимулирует обновление клеток, снижает риск сердечно-сосудистых заболеваний и мягко тренирует иммунитет."
  }
];

export default function Myths() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]); // Сюда потом будем собирать статистику для БД
  
  const cardRef = useRef(null);

  // Анимация при смене вопроса
  useEffect(() => {
    gsap.fromTo(cardRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, [currentIndex, showResult]);

  const currentQ = questions[currentIndex];

  const handleAnswer = (answeredMyth) => {
    // Сохраняем ответ пользователя (для будущей статистики)
    setUserAnswers([...userAnswers, { questionId: currentQ.id, answeredMyth }]);
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setShowResult(false);
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <section className="py-24 relative z-10 flex justify-center px-6">
      <div 
        ref={cardRef}
        className="w-full max-w-2xl rounded-3xl bg-white dark:bg-zinc-800/80 p-8 md:p-12 shadow-xl ring-1 ring-zinc-200 dark:ring-zinc-700 backdrop-blur-md text-center"
      >
        <p className="text-sm font-bold text-orange-500 dark:text-purple-400 uppercase tracking-widest mb-6">
          Вопрос {currentIndex + 1} из {questions.length}
        </p>
        
        <h3 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white mb-8 leading-tight">
          "{currentQ.text}"
        </h3>

        {!showResult ? (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => handleAnswer(true)}
              className="px-8 py-4 rounded-xl font-bold text-white bg-linear-to-r from-red-500 to-orange-500 hover:scale-105 transition-transform duration-200 shadow-lg shadow-orange-500/30"
            >
              Это миф
            </button>
            <button 
              onClick={() => handleAnswer(false)}
              className="px-8 py-4 rounded-xl font-bold text-white bg-linear-to-r from-emerald-500 to-teal-500 hover:scale-105 transition-transform duration-200 shadow-lg shadow-teal-500/30"
            >
              Это правда
            </button>
          </div>
        ) : (
          <div className="mt-6 text-left border-t border-zinc-200 dark:border-zinc-700 pt-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{currentQ.isMyth ? "🛑" : "✅"}</span>
              <h4 className="text-xl font-bold text-zinc-900 dark:text-white">
                На самом деле это {currentQ.isMyth ? "миф" : "правда"}
              </h4>
            </div>
            <p className="text-zinc-600 dark:text-zinc-300 mb-8 leading-relaxed">
              {currentQ.explanation}
            </p>
            <button 
              onClick={handleNext}
              className="w-full py-4 rounded-xl font-bold text-zinc-900 bg-zinc-100 hover:bg-zinc-200 dark:text-white dark:bg-zinc-700 dark:hover:bg-zinc-600 transition-colors"
            >
              {currentIndex < questions.length - 1 ? "Следующий факт →" : "Завершить"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}