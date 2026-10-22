import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function Checker() {
  // Возможные шаги: 'start', 'gender', 'age', 'weight', 'absolute', 'temp', 'result'
  const [step, setStep] = useState('start');
  
  // Данные для статистики
  const [userData, setUserData] = useState({ gender: '', age: '' });
  
  // Результат теста
  const [result, setResult] = useState({ success: false, message: '' });
  
  const contentRef = useRef(null);

  // Анимация при каждом переключении шага
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current, 
        { opacity: 0, x: 30 }, 
        { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [step]);


  return (
    <section className="py-24 relative z-10 flex justify-center px-6">
      <div className="w-full max-w-2xl rounded-3xl bg-white dark:bg-zinc-800/80 p-8 md:p-12 shadow-2xl ring-1 ring-zinc-200 dark:ring-zinc-700 backdrop-blur-md">
        
        <div ref={contentRef}>
          {/* ЭКРАН 1: СТАРТ */}
          {step === 'start' && (
            <div className="text-center">
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
                Могу ли я сдать кровь завтра?
              </h2>
              <p className="text-zinc-600 dark:text-zinc-300 mb-8">
                Пройди короткий тест из 5 вопросов, чтобы узнать, готов ли твой организм к донации прямо сейчас.
              </p>
              <button 
                onClick={() => setStep('gender')}
                className="rounded-xl bg-orange-500 px-8 py-4 font-bold text-white shadow-lg shadow-orange-500/30 transition-transform hover:scale-105"
              >
                Начать проверку
              </button>
            </div>
          )}

          {/* ЭКРАН 2: ПОЛ */}
          {step === 'gender' && (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8">Укажите ваш пол</h3>
              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => { setUserData({...userData, gender: 'М'}); setStep('age'); }}
                  className="w-32 rounded-xl bg-zinc-100 dark:bg-zinc-700 py-6 text-xl font-bold transition-colors hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/50"
                >
                  Мужской
                </button>
                <button 
                  onClick={() => { setUserData({...userData, gender: 'Ж'}); setStep('age'); }}
                  className="w-32 rounded-xl bg-zinc-100 dark:bg-zinc-700 py-6 text-xl font-bold transition-colors hover:bg-pink-100 hover:text-pink-600 dark:hover:bg-pink-900/50"
                >
                  Женский
                </button>
              </div>
            </div>
          )}

          {/* ЭКРАН 3: ВОЗРАСТ */}
          {step === 'age' && (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8">Сколько вам полных лет?</h3>
              <div className="flex flex-col items-center gap-4">
                <input 
                  type="number" 
                  placeholder="Например: 20"
                  onChange={(e) => setUserData({...userData, age: e.target.value})}
                  className="w-32 rounded-xl border-2 border-zinc-200 dark:border-zinc-600 bg-transparent py-4 text-center text-2xl font-bold outline-none focus:border-orange-500 dark:text-white"
                />
                <button 
                  onClick={() => {
                    if (!userData.age) return;
                    if (Number(userData.age) < 18) {
                      finishTest(false, "Донором можно стать только с 18 лет. Ждем тебя, когда подрастешь!");
                    } else {
                      setStep('weight');
                    }
                  }}
                  className="mt-4 rounded-xl bg-zinc-900 dark:bg-white dark:text-zinc-900 px-8 py-3 font-bold text-white transition-transform hover:scale-105"
                >
                  Далее
                </button>
              </div>
            </div>
          )}

          {/* ЭКРАН 4: ВЕС */}
          {step === 'weight' && (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8">Ваш вес больше 50 кг?</h3>
              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => finishTest(false, "Твой вес меньше 50 кг. Сдача крови при таком весе может быть опасна для твоего здоровья.")}
                  className="w-32 rounded-xl bg-zinc-100 dark:bg-zinc-700 py-4 font-bold transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-600"
                >
                  Нет
                </button>
                <button 
                  onClick={() => setStep('absolute')}
                  className="w-32 rounded-xl bg-zinc-100 dark:bg-zinc-700 py-4 font-bold transition-colors hover:bg-orange-100 hover:text-orange-600 dark:hover:bg-orange-900/30"
                >
                  Да
                </button>
              </div>
            </div>
          )}

          {/* ЭКРАН 5: АБСОЛЮТНЫЕ ПРОТИВОПОКАЗАНИЯ */}
          {step === 'absolute' && (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Есть ли у вас серьезные заболевания?</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-8 max-w-md mx-auto">
                ВИЧ, вирусные гепатиты B и C, сифилис, туберкулез, онкология, болезни крови, тяжелые заболевания сердца.
              </p>
              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => finishTest(false, "К сожалению, с такими заболеваниями донорство строго противопоказано ради безопасности пациента и вашей собственной.")}
                  className="px-8 rounded-xl bg-zinc-100 dark:bg-zinc-700 py-4 font-bold transition-colors hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30"
                >
                  Да, есть
                </button>
                <button 
                  onClick={() => setStep('temp')}
                  className="px-8 rounded-xl bg-zinc-100 dark:bg-zinc-700 py-4 font-bold transition-colors hover:bg-emerald-100 hover:text-emerald-600 dark:hover:bg-emerald-900/30"
                >
                  Нет, я здоров
                </button>
              </div>
            </div>
          )}

          {/* ЭКРАН 6: ВРЕМЕННЫЕ ПРОТИВОПОКАЗАНИЯ */}
          {step === 'temp' && (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">За последние полгода вы...</h3>
              <ul className="text-sm text-zinc-600 dark:text-zinc-400 mb-8 max-w-md mx-auto text-left list-disc list-inside space-y-2">
                <li>Делали тату, пирсинг или операции? (меньше 120 дней назад)</li>
                <li>Болели ОРВИ или пили антибиотики? (меньше 30 дней назад)</li>
                <li>Пили алкоголь в последние 48 часов?</li>
              </ul>
              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => finishTest(false, "У вас временный отвод. Подождите необходимое время (например, 120 дней после тату или 48 часов после вечеринки) и приходите!")}
                  className="px-8 rounded-xl bg-zinc-100 dark:bg-zinc-700 py-4 font-bold transition-colors hover:bg-orange-100 hover:text-orange-600 dark:hover:bg-orange-900/30"
                >
                  Да, было
                </button>
                <button 
                  onClick={() => finishTest(true, "Отлично! Твой организм готов спасать жизни. Не забудь паспорт, СНИЛС и легкий завтрак!")}
                  className="px-8 rounded-xl bg-zinc-100 dark:bg-zinc-700 py-4 font-bold transition-colors hover:bg-emerald-100 hover:text-emerald-600 dark:hover:bg-emerald-900/30"
                >
                  Нет, ничего такого
                </button>
              </div>
            </div>
          )}

          {/* ЭКРАН РЕЗУЛЬТАТА */}
          {step === 'result' && (
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <span className="text-7xl">{result.success ? "🎉" : "⏳"}</span>
              </div>
              <h3 className={`text-3xl font-black mb-4 ${result.success ? 'text-emerald-500' : 'text-orange-500'}`}>
                {result.success ? "Ты можешь быть донором!" : "Пока придется подождать"}
              </h3>
              <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-8 max-w-md mx-auto leading-relaxed">
                {result.message}
              </p>
              <button 
                onClick={() => {
                  setStep('start');
                  setUserData({ gender: '', age: '' });
                }}
                className="font-bold text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors underline decoration-dotted"
              >
                Пройти заново
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}