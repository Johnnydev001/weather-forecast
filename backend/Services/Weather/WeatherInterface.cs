public interface WeatherInterface {
    abstract static Task<WeatherModel?> GetOneCallWeatherConditions(string lat = "", string lon = "", string? lang = "", string? units = "", string? weatherApiKey = "", string? weatherApiUrl = "");
}