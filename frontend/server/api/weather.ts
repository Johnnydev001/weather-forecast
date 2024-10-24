import weatherService from "~/services/weather/weather-service";
import {WeatherRequestType, WeatherResponseType} from "~/types/weather/weather-types";
import {readBody} from "#imports";

export default defineEventHandler(async (event) => {

    const bodyFromRequest: WeatherRequestType = await readBody(event);

    let weatherResponseJson = {
            temperature: 0,
            feelsLikeTemperature: 0,
            windSpeed: 0,
            humidity: 0,
            pressure: 0,
            cloudsPercentage: 0,
            weatherMainStatus: '',
            weatherDescription: ''
    }

    try {
        const weatherResponse: WeatherResponseType | undefined | null = await weatherService.getOneCallWeather( bodyFromRequest );

        if (weatherResponse) {

            console.log('weatherResponse',weatherResponse.current.weather)
            weatherResponseJson.temperature = weatherResponse?.current?.temp;
            weatherResponseJson.feelsLikeTemperature = weatherResponse?.current?.feels_like;
            weatherResponseJson.windSpeed = weatherResponse?.current?.wind_speed;
            weatherResponseJson.humidity = weatherResponse?.current?.humidity;
            weatherResponseJson.pressure = weatherResponse?.current?.pressure;
            weatherResponseJson.cloudsPercentage = weatherResponse?.current?.clouds;
            weatherResponseJson.weatherMainStatus = weatherResponse?.current?.weather[0]?.main;
            weatherResponseJson.weatherDescription = weatherResponse?.current?.weather[0]?.description

        }
        return weatherResponseJson;

    } catch (error) {
        console.log('Failed to get the weather data from the service due to: ', error);
    }


})