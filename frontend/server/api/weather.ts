import weatherService from "~/services/weather/weather-service";
import {WeatherRequestType, WeatherResponseType} from "~/types/weather/weather-types";
import {readBody} from "#imports";

export default defineEventHandler(async (event) => {

    const bodyFromRequest: WeatherRequestType = await readBody(event);

    let weatherResponseJson= {

            temperature: 0,
            feelsLikeTemperature: 0,
            weatherStatus: '',
            windSpeed: 0,
            humidity: 0,
            pressure: 0,
            cloudsPercentage: 0

    }

    try {
        const weatherResponse: WeatherResponseType | undefined | null = await weatherService.getOneCallWeather( bodyFromRequest );

        if (weatherResponse) {

            weatherResponseJson.temperature = weatherResponse?.current?.temperature;
            weatherResponseJson.feelsLikeTemperature = weatherResponse?.current?.feelsLikeTemperature;
            weatherResponseJson.weatherStatus = weatherResponse?.current?.weatherStatus;
            weatherResponseJson.windSpeed = weatherResponse?.current?.windSpeed;
            weatherResponseJson.humidity = weatherResponse?.current?.humidity;
            weatherResponseJson.pressure = weatherResponse?.current?.pressure;
            weatherResponseJson.cloudsPercentage = weatherResponse?.current?.cloudsPercentage;

        }
        return weatherResponseJson;

    } catch (error) {
        console.log('Failed to get the weather data from the service due to: ', error);
    }


})