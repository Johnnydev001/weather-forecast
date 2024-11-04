import { getCurrentWeather, getForecastWeather } from "~/services/weather/weather-service";
import { WeatherForecastResponseType, WeatherRequestType, WeatherResponseType } from "~/types/weather/weather-types";
import { readBody } from "#imports";

export default defineEventHandler(async (event) => {

    const { weatherType = 'current' } = getQuery(event);

    switch (weatherType) {
        case 'current':
            return await callGetCurrentWeather(event);

        case 'forecast':
            return await callGetForecastWeather(event);

        default:
            return await callGetCurrentWeather(event);

    }

})

const callGetCurrentWeather = async (event) => {

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
        const weatherResponse: WeatherResponseType | undefined | null = await getCurrentWeather(bodyFromRequest);

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
        console.error('Failed to get the current weather data from the service due to: ', error);
    }
}

const callGetForecastWeather = async (event) => {

    const bodyFromRequest: WeatherRequestType = await readBody(event);

    try {

        const forecastResponse = await getForecastWeather(bodyFromRequest);

        const mappedForecastResponse: WeatherForecastResponseType = forecastResponse?.list?.map(elem => {
            return {
                main: {
                    tempMin: elem?.main?.temp_min,
                    tempMax: elem?.main?.temp_max
                },
                weather: elem?.weather,
                date: elem?.dt
            }
        })

        return mappedForecastResponse;



    } catch (error) {
        console.error('Failed to get the forecast weather data from the service due to: ', error);
    }
}

