public interface IWeatherInterface {
    Task<IEnumerable<WeatherModel>> GetWeatherConditions(string lat, string lon, string lang, string units);
}