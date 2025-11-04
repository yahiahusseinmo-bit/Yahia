
import React from 'react';

const WeatherTips: React.FC = () => {
  const tips = [
    "Stay hydrated - drink plenty of water throughout the day.",
    "Wear light-colored, loose-fitting clothing.",
    "Use high SPF sunscreen and reapply regularly.",
    "Plan outdoor activities for early morning or evening.",
    "Check weather updates regularly for sandstorm warnings.",
    "Keep emergency water supplies during heatwaves.",
  ];

  return (
    <div className="bg-white/70 dark:bg-sky-blue/40 backdrop-blur-md p-6 rounded-2xl shadow-lg">
      <h3 className="text-xl font-bold text-sky-blue dark:text-white mb-4">💡 Extended Weather Tips for Riyadh</h3>
      <ul className="list-disc list-inside space-y-2 text-sky-blue dark:text-gray-200">
        {tips.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
    </div>
  );
};

export default WeatherTips;
