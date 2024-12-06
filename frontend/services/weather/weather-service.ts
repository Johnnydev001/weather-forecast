import type { WeatherRequestType, WeatherResponseType } from "~/types/weather/weather-types";

const requestData = {
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    withCredentials: true
}

export async function getCurrentWeather(queryParams: WeatherRequestType): Promise<WeatherResponseType | undefined | null> {

    const {
        lat = '',
        lon = '',
        lang = 'pt',
        units = 'metric'
    }: WeatherRequestType = queryParams;

    // let baseEndpoint = `${process?.env?.BASE_URL}/${process?.env?.ONE_CALL_WEATHER_API_URL}?lat=${lat}&lon=${lon}`;

    // if(lang){
    //     baseEndpoint += `&lang=${lang}`
    // }
    // if(units){
    //     baseEndpoint += `&units=${units}`
    // }

    try {
        const oneCallWeatherRequest = await fetch(`http://localhost:80/current-weather?lat=${lat}&lon=${lon}&lang=${lang}&units=${units}`, requestData);

        if (oneCallWeatherRequest?.status === 200 || oneCallWeatherRequest?.ok) {
            return await oneCallWeatherRequest?.json();
        }

        return null;

    } catch (error) {
        console.error('Error calling the weather service due to: ', error)
    }

}
