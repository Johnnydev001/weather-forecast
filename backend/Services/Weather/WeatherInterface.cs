public interface WeatherInterface
{
    abstract static Task<CurrentWeatherModel?> GetCurrentWeather(string lat = "", string lon = "", string? lang = "", string? units = "", string? weatherApiKey = "", string? currentWeatherApiUrl = "");
    abstract static Task<ForecastWeatherModel?> GetForecastWeather(string lat = "", string lon = "", string? lang = "", string? units = "", string? weatherApiKey = "", string? forecastWeatherApiUrl = "");

}