import { getCurrentWeather } from "~/services/weather/weather-service";
import { WeatherRequestType, WeatherResponseType } from "~/types/weather/weather-types";
import { readBody } from "#imports";

export default defineEventHandler(async (event) => {

    const { weatherType = 'current' } = getQuery(event);

    switch (weatherType) {
        case 'current':
            return await callGetCurrentWeather(event);

        default:
            return await callGetCurrentWeather(event);

    }

})

const callGetCurrentWeather = async (event) => {

    const bodyFromRequest: WeatherRequestType = await readBody(event);

    try {
        const weatherResponse: WeatherResponseType | undefined | null = await getCurrentWeather(bodyFromRequest);

        if (!Object.entries(weatherResponse).length) {

            return createError({
                status: 404,
                statusMessage: 'No weather data was found for the given location'
            })
        }

        return {
            temperature: weatherResponse?.current?.temp,
            feelsLikeTemperature: weatherResponse?.current?.feels_like,
            windSpeed: weatherResponse?.current?.wind_speed,
            humidity: weatherResponse?.current?.humidity,
            pressure: weatherResponse?.current?.pressure,
            cloudsPercentage: weatherResponse?.current?.clouds,
            weatherMainStatus: weatherResponse?.current?.weather[0]?.main,
            weatherDescription: weatherResponse?.current?.weather[0]?.description,
            daily: weatherResponse?.daily,
        };

    } catch (error) {
        return createError({
            status: error?.statusCode || error?.status,
            statusMessage: 'Failed to get the weather data'
        })
    }
}
