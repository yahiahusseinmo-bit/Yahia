
import React, { useMemo } from 'react';
import { DailyForecast } from '../types';

interface WeatherSummaryProps {
  forecast: DailyForecast[];
}

const WeatherSummary: React.FC<WeatherSummaryProps> = ({ forecast }) => {
  const weeklyData = useMemo(() => {
    if (forecast.length < 7) return null;
    
    const weekForecast = forecast.slice(0, 7);
    const allTemps = weekForecast.flatMap(day => [day.temp_max, day.temp_min]);
    const allHumidities = weekForecast.map(day => day.humidity);
    const allWinds = weekForecast.map(day => day.wind_speed);

    const tempTrend = () => {
        const firstDayAvg = (weekForecast[0].temp_max + weekForecast[0].temp_min) / 2;
        const lastDayAvg = (weekForecast[6].temp_max + weekForecast[6].temp_min) / 2;
        const tempChange = lastDayAvg - firstDayAvg;

        if (tempChange > 2) return "📈 Warming trend expected this week.";
        if (tempChange < -2) return "📉 Cooling trend expected this week.";
        return "📊 Stable temperatures expected this week.";
    };

    return {
      tempRange: `${Math.round(Math.min(...allTemps))}°C - ${Math.round(Math.max(...allTemps))}°C`,
      avgHumidity: `${Math.round(allHumidities.reduce((a, b) => a + b, 0) / allHumidities.length)}%`,
      avgWind: `${(allWinds.reduce((a, b) => a + b, 0) / allWinds.length).toFixed(1)} m/s`,
      trend: tempTrend(),
    };
  }, [forecast]);

  if (!weeklyData) return null;

  return (
    <div className="bg-white/70 dark:bg-sky-blue/40 backdrop-blur-md p-6 rounded-2xl shadow-lg">
      <h3 className="text-xl font-bold text-sky-blue dark:text-white mb-4">Weekly Summary & Trends</h3>
      <div className="space-y-3 text-sky-blue dark:text-gray-200">
        <p><strong className="text-earth-brown dark:text-desert-sand">Trend:</strong> {weeklyData.trend}</p>
        <p><strong className="text-earth-brown dark:text-desert-sand">Temp Range:</strong> {weeklyData.tempRange}</p>
        <p><strong className="text-earth-brown dark:text-desert-sand">Avg Humidity:</strong> {weeklyData.avgHumidity}</p>
        <p><strong className="text-earth-brown dark:text-desert-sand">Avg Wind:</strong> {weeklyData.avgWind}</p>
      </div>
    </div>
  );
};

export default WeatherSummary;
