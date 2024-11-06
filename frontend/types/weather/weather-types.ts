export type WeatherRequestType = {
    lat: string | number;
    lon: string | number;
    lang?: string;
    units?: string;
    cnt?: number;
}

type WeatherType = {
    main: string;
    description: string;
}

type CurrentType = {
    temp: number;
    feels_like: number;
    wind_speed: number;
    humidity: number;
    pressure: number;
    clouds: number;
    weather: Array<WeatherType>;
}

type TemperatureType = {
    min: number;
    max: number
}

type WeatherForecastType = {
    weather: Array<WeatherType>;
    main: TemperatureType;
    date: string;
}

type DailyWeatherType = {
    dt: number;
    temp: TemperatureType;
    weather: Array<WeatherType>;
}

export type WeatherResponseType = {
    current: CurrentType;
    daily: Array<DailyWeatherType>;
}

export type WeatherForecastResponseType = {
    list: Array<WeatherForecastType>;
}