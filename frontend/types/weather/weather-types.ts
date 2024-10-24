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

export type WeatherResponseType = {
    current: CurrentType;

}