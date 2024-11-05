public static class WeatherRoutes {

    public static void mapWeatherRoutes(this WebApplication app, IConfiguration configuration){

        string weatherApiKey = configuration["WeatherApiKey"] ?? "Failed to fetch weather api key";
        string currentWeatherApiUrl = configuration["CurrentWeatherApiUrl"] ?? "Failed to fetch the current weather api url";
        string forecastWeatherApiUrl = configuration["ForecastWeatherApiUrl"] ?? "Failed to fetch the forecast weather api url";
 
        app.MapGet("/current-weather", async (string lat, string lon, string? lang = "pt", string? units = "metric") => {
            try
            {
                return await WeatherService.GetCurrentWeather(lat, lon, lang, units, weatherApiKey, currentWeatherApiUrl);
                
            }
            catch (Exception exception)
            {
                
                throw new Exception("Failed to fetch the weather data from the weather service due to: ", exception);

            }
        });

        app.MapGet("/forecast-weather", async (string lat, string lon, string? lang = "pt", string? units = "metric", int cnt = 5) => {
            try
            {
                return await WeatherService.GetForecastWeather(lat, lon, lang, units, weatherApiKey, forecastWeatherApiUrl, cnt);
                
            }
            catch (Exception exception)
            {
                
                throw new Exception("Failed to fetch the weather forecast data from the weather service due to: ", exception);

            }
        });
    }
}