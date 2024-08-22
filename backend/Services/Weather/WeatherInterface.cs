public interface WeatherInterface {
    abstract static Task<object> GetOneCallWeatherConditions(string lat = "", string lon = "", string? lang = "", string? units = "", string? weatherApiKey = "", string? weatherApiUrl = "");
}