
import React from 'react';
import { DailyForecast } from '../types';
import { getWeatherIcon } from './IconComponents';

interface ForecastDayProps {
  data: DailyForecast;
  isToday?: boolean;
}

const ForecastDay: React.FC<ForecastDayProps> = ({ data, isToday = false }) => {
  const WeatherIcon = getWeatherIcon(data.icon);
  const dayAbbreviation = data.day_name.substring(0, 3);
  
  return (
    <div className={`flex flex-col items-center p-4 rounded-xl space-y-2 transition-all duration-300 ${isToday ? 'bg-desert-sand/80 text-white scale-105 shadow-lg' : 'bg-white/50 dark:bg-sky-blue/30'}`}>
      <p className={`font-bold ${isToday ? 'text-white' : 'text-sky-blue dark:text-white'}`}>{isToday ? 'Today' : dayAbbreviation}</p>
      <WeatherIcon className={`w-10 h-10 ${isToday ? 'text-white' : 'text-sun-yellow'}`} />
      <div className="flex space-x-2">
        <p className={`font-semibold ${isToday ? 'text-white' : 'text-sky-blue dark:text-white'}`}>{Math.round(data.temp_max)}°</p>
        <p className={`text-gray-600 ${isToday ? 'text-gray-200' : 'dark:text-gray-400'}`}>{Math.round(data.temp_min)}°</p>
      </div>
    </div>
  );
};

export default ForecastDay;
