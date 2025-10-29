export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-secondary-50 to-success-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="text-center space-y-8 p-8">
        <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
          FitZen
        </h1>
        <p className="text-2xl text-gray-700 dark:text-gray-300 max-w-2xl">
          Комплексное веб-приложение для тренировок, растяжки и медитаций
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-2 text-primary-600">💪 Тренировки</h3>
            <p className="text-gray-600 dark:text-gray-400">Силовые, кардио, HIIT</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-2 text-secondary-600">🧘 Растяжка</h3>
            <p className="text-gray-600 dark:text-gray-400">Йога, стретчинг, пилатес</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-2 text-success-600">🧠 Медитация</h3>
            <p className="text-gray-600 dark:text-gray-400">Mindfulness, релаксация</p>
          </div>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-8">
          В разработке... 🚀
        </p>
      </div>
    </div>
  );
}
