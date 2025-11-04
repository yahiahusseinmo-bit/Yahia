
import React from 'react';
import { CurrentWeather as CurrentWeatherType } from '../types';
import { getWeatherIcon, ThermometerIcon, DropletIcon, WindIcon, SunriseIcon, SunsetIcon } from './IconComponents';

interface CurrentWeatherProps {
  data: CurrentWeatherType;
}

const InfoPill: React.FC<{ icon: React.ReactNode; label: string; value: string | number }> = ({ icon, label, value }) => (
  <div className="flex items-center space-x-2 bg-sky-blue/10 dark:bg-sky-blue/50 p-3 rounded-lg">
    <div className="text-earth-brown dark:text-desert-sand">{icon}</div>
    <div>
      <p className="text-sm text-gray-600 dark:text-gray-300">{label}</p>
      <p className="font-bold text-sky-blue dark:text-white">{value}</p>
    </div>
  </div>
);

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  const WeatherIcon = getWeatherIcon(data.icon);
  
  return (
    <div className="bg-white/70 dark:bg-sky-blue/40 backdrop-blur-md p-6 rounded-2xl shadow-lg text-sky-blue dark:text-white">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">Current Weather</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">Riyadh, SA</p>
        </div>
        <WeatherIcon className="w-20 h-20 text-sun-yellow" />
      </div>
      <div className="mt-4 flex items-end space-x-4">
        <p className="text-7xl font-bold">{Math.round(data.temperature)}°C</p>
        <div className="flex flex-col">
           <p className="text-2xl font-medium">{data.description}</p>
           <p className="text-md text-gray-600 dark:text-gray-300">Feels like {Math.round(data.feels_like)}°</p>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
        <InfoPill icon={<ThermometerIcon className="w-6 h-6"/>} label="High / Low" value={`${Math.round(data.temp_max)}° / ${Math.round(data.temp_min)}°`} />
        <InfoPill icon={<DropletIcon className="w-6 h-6"/>} label="Humidity" value={`${data.humidity}%`} />
        <InfoPill icon={<WindIcon className="w-6 h-6"/>} label="Wind Speed" value={`${data.wind_speed.toFixed(1)} m/s`} />
        <InfoPill icon={<SunriseIcon className="w-6 h-6"/>} label="Sunrise" value={data.sunrise} />
        <InfoPill icon={<SunsetIcon className="w-6 h-6"/>} label="Sunset" value={data.sunset} />
         <InfoPill icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>} label="Visibility" value={`${data.visibility / 1000} km`} />
      </div>
    </div>
  );
};

export default CurrentWeather;
