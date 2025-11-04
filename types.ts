
export interface CurrentWeather {
  temperature: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  description: string;
  icon: string;
  wind_speed: number;
  sunrise: string;
  sunset: string;
  cloudiness: number;
  visibility: number;
}

export interface DailyForecast {
  date: string;
  day_name: string;
  temp_max: number;
  temp_min: number;
  description: string;
  icon: string;
  humidity: number;
  wind_speed: number;
}

export interface WeatherData {
  currentWeather: CurrentWeather;
  forecast: DailyForecast[];
}
