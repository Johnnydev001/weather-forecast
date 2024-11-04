import weatherService from "~/services/weather/weather-service";
import {WeatherForecastType, WeatherRequestType, WeatherResponseType} from "~/types/weather/weather-types";
import {readBody} from "#imports";

export default defineEventHandler(async (event) => {

    const {weatherType} = getQuery(event);

    switch (weatherType) {
        case 'current':
            return await getCurrentWeather(event);

        case 'forecast':
            return await getForecastWeather(event);

        default:
            break;

    }

})

const getCurrentWeather = async (event ) => {

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
        const weatherResponse: WeatherResponseType | undefined | null = await weatherService.getCurrentWeather( bodyFromRequest );

        if (weatherResponse) {

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
}

const getForecastWeather = async (event) => {

    const bodyFromRequest: WeatherRequestType = await readBody(event);

    let weatherForecastResponseJson = {
            maxTemperature: 0,
            minTemperature: 0,
            weatherMainStatus: '',
            weatherDescription: ''
    }

    try {
        const weatherResponse: WeatherForecastType | undefined | null = await weatherService.getForecastWeather( bodyFromRequest );

        if (weatherResponse) {

            weatherForecastResponseJson.maxTemperature = weatherResponse?.temp_max;
            weatherForecastResponseJson.minTemperature = weatherResponse?.temp_min;
            weatherForecastResponseJson.weatherMainStatus = weatherResponse?.weather[0]?.main || '';
            weatherForecastResponseJson.weatherDescription = weatherResponse?.weather[0]?.description || '';

        }
        return weatherForecastResponseJson;

    } catch (error) {
        console.log('Failed to get the weather data from the service due to: ', error);
    }
}

