public static class WeatheRoutes {

    public static void mapWeatherRoutes(this WebApplication app, IConfiguration configuration, WeatherRequestModel weatherRequestModel){

        string? weatherApiKey = configuration["WeatherApiKey"] ?? "Failed to fetch weather api key";
        string? weatherApiUrl = configuration["WeatherApiUrl"] ?? "Failed to fetch weather api url";


        app.MapGet("/onecall", async () => {
            try
            {
              return await WeatherService.GetOneCallWeatherConditions(weatherRequestModel.lat, weatherRequestModel.lon, weatherRequestModel.lang, weatherRequestModel.units, weatherApiKey, weatherApiUrl);
            }
            catch (System.Exception exception)
            {
                Console.WriteLine(exception);
                throw;
            }
        });

    }


}