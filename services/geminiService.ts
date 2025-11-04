
import { GoogleGenAI, Type } from "@google/genai";
import { WeatherData } from '../types';

const getRiyadhWeatherData = async (): Promise<WeatherData> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const weatherSchema = {
    type: Type.OBJECT,
    properties: {
      currentWeather: {
        type: Type.OBJECT,
        properties: {
          temperature: { type: Type.NUMBER, description: "Current temperature in Celsius." },
          feels_like: { type: Type.NUMBER, description: "What the temperature feels like in Celsius." },
          temp_min: { type: Type.NUMBER, description: "Minimum temperature for the day in Celsius." },
          temp_max: { type: Type.NUMBER, description: "Maximum temperature for the day in Celsius." },
          pressure: { type: Type.INTEGER, description: "Atmospheric pressure in hPa." },
          humidity: { type: Type.INTEGER, description: "Humidity percentage." },
          description: { type: Type.STRING, description: "A brief, title-cased description of the weather (e.g., 'Clear Sky', 'Scattered Clouds')." },
          icon: { type: Type.STRING, description: "An icon code. Choose from: 'sun', 'cloud-sun', 'cloud', 'smog', 'wind'." },
          wind_speed: { type: Type.NUMBER, description: "Wind speed in meters per second." },
          sunrise: { type: Type.STRING, description: "Sunrise time in HH:MM format." },
          sunset: { type: Type.STRING, description: "Sunset time in HH:MM format." },
          cloudiness: { type: Type.INTEGER, description: "Cloudiness percentage." },
          visibility: { type: Type.INTEGER, description: "Visibility in meters." },
        },
        required: ["temperature", "feels_like", "temp_min", "temp_max", "pressure", "humidity", "description", "icon", "wind_speed", "sunrise", "sunset", "cloudiness", "visibility"]
      },
      forecast: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            date: { type: Type.STRING, description: "Date in YYYY-MM-DD format." },
            day_name: { type: Type.STRING, description: "The full name of the day of the week (e.g., 'Monday')." },
            temp_max: { type: Type.NUMBER, description: "Maximum temperature for the day in Celsius." },
            temp_min: { type: Type.NUMBER, description: "Minimum temperature for the day in Celsius." },
            description: { type: Type.STRING, description: "A brief, title-cased description of the weather for that day." },
            icon: { type: Type.STRING, description: "An icon code for the day. Choose from: 'sun', 'cloud-sun', 'cloud', 'smog', 'wind'." },
            humidity: { type: Type.INTEGER, description: "Average humidity percentage for the day." },
            wind_speed: { type: Type.NUMBER, description: "Average wind speed in meters per second for the day." },
          },
          required: ["date", "day_name", "temp_max", "temp_min", "description", "icon", "humidity", "wind_speed"]
        },
      }
    },
    required: ["currentWeather", "forecast"],
  };

  const prompt = `
    Generate a realistic weather forecast for Riyadh, Saudi Arabia.
    The data should be for today and the next 15 days (total of 16 days in the forecast array).
    Riyadh is in a desert climate, so reflect that with high temperatures (can exceed 40°C), low humidity, and generally sunny conditions.
    Make the temperature fluctuate realistically day-by-day and between day and night.
    Include some variations, like occasional cloudiness, haziness (smog), or windy days, but sunny/clear should be the most common.
    The current date is ${new Date().toISOString().split('T')[0]}.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: weatherSchema,
      },
    });

    const jsonText = response.text.trim();
    const weatherData: WeatherData = JSON.parse(jsonText);
    return weatherData;

  } catch (error) {
    console.error("Error fetching weather data from Gemini:", error);
    throw new Error("Could not fetch weather data. Please check your API key and try again.");
  }
};

export default getRiyadhWeatherData;
