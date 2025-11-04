
import React, { useMemo } from 'react';
import { CurrentWeather } from '../types';

interface WeatherAlertsProps {
  data: CurrentWeather;
}

const Alert: React.FC<{ message: string }> = ({ message }) => (
  <div className="bg-burnt-sienna/20 border-l-4 border-burnt-sienna text-burnt-sienna-dark p-4 rounded-r-lg" role="alert">
    <p className="font-bold">⚠️ {message}</p>
  </div>
);

const WeatherAlerts: React.FC<WeatherAlertsProps> = ({ data }) => {
  const alerts = useMemo(() => {
    const generatedAlerts: string[] = [];
    if (data.temp_max > 45) {
      generatedAlerts.push("EXTREME HEAT ALERT: Dangerously high temperatures!");
    } else if (data.temp_max > 40) {
      generatedAlerts.push("HIGH TEMPERATURE ALERT: Extreme heat warning!");
    }

    if (data.humidity < 15) {
      generatedAlerts.push("VERY LOW HUMIDITY ALERT: Extremely dry conditions!");
    }

    if (data.wind_speed > 15) {
      generatedAlerts.push("HIGH WIND ALERT: Very strong winds expected!");
    } else if (data.wind_speed > 10) {
      generatedAlerts.push("WIND ALERT: Strong winds expected!");
    }
    
    return generatedAlerts;
  }, [data]);

  if (alerts.length === 0) {
    return null;
  }

  return (
    <div className="bg-white/70 dark:bg-sky-blue/40 backdrop-blur-md p-6 rounded-2xl shadow-lg">
       <h3 className="text-xl font-bold text-sky-blue dark:text-white mb-4">Weather Alerts</h3>
       <div className="space-y-3">
        {alerts.map((alert, index) => (
            <Alert key={index} message={alert} />
        ))}
       </div>
    </div>
  );
};

export default WeatherAlerts;
