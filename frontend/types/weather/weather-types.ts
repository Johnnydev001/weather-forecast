export type WeatherRequestType = {
    lat: string | number;
    lon: string | number;
    lang?: string;
    units?: string;
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
    temp_min: number;
    temp_max: number
}

type WeatherForecastType = {
    weather: Array<WeatherType>;
    main: TemperatureType;
    date: string;
}

export type WeatherResponseType = {
    current: CurrentType;
}

export type WeatherForecastResponseType = {
    list: Array<WeatherForecastType>;
}