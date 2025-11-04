
import React, { useState, useEffect, useCallback } from 'react';
import { WeatherData } from './types';
import getRiyadhWeatherData from './services/geminiService';

import CurrentWeather from './components/CurrentWeather';
import ForecastDay from './components/ForecastDay';
import WeatherAlerts from './components/WeatherAlerts';
import WeatherSummary from './components/WeatherSummary';
import WeatherTips from './components/WeatherTips';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRiyadhWeatherData();
      setWeatherData(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeatherData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 text-red-800 p-4">
        <h2 className="text-2xl font-bold mb-4">🚨 Error Fetching Weather Data</h2>
        <p className="text-center mb-4">{error}</p>
        <button
          onClick={fetchWeatherData}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!weatherData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-sky-blue/90 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-sky-blue dark:text-white">
                Riyadh Weather Forecaster
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                AI-Powered 16-Day Forecast
            </p>
        </header>
        
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <CurrentWeather data={weatherData.currentWeather} />
            <div className="bg-white/70 dark:bg-sky-blue/40 backdrop-blur-md p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-sky-blue dark:text-white mb-4">16-Day Forecast</h3>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                    {weatherData.forecast.slice(0, 16).map((day, index) => (
                        <ForecastDay key={day.date} data={day} isToday={index === 0} />
                    ))}
                </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <WeatherAlerts data={weatherData.currentWeather} />
            <WeatherSummary forecast={weatherData.forecast} />
            <WeatherTips />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
