export type WeatherRequestType = {
    lat: string | number;
    lon: string | number;
    lang?: string;
    units?: string;
}

export type WeatherResponseType = {
    temperature: number;
    feelsLikeTemperature: number;
    weatherStatus: string;
    windSpeed: number;
    humidity: number;
    pressure: number;
    cloudsPercentage: number;
}