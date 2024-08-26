public static class WeatherRoutes {

    public static void mapWeatherRoutes(this WebApplication app, IConfiguration configuration){

        string? weatherApiKey = configuration["WeatherApiKey"] ?? "Failed to fetch weather api key";
        string? weatherApiUrl = configuration["WeatherApiUrl"] ?? "Failed to fetch weather api url";


        app.MapGet("/onecall", async (string lat, string lon, string? lang = "pt", string? units = "metric") => {
            try
            {
              return await WeatherService.GetOneCallWeatherConditions(lat, lon, lang, units, weatherApiKey, weatherApiUrl);
            }
            catch (System.Exception exception)
            {
                Console.WriteLine(exception);
                throw;
            }
        });
    }
}