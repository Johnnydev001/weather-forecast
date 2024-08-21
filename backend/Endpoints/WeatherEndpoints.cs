public static class WeatherEndpoints {

    public static void mapWeatherEndpoints(this WebApplication app){

        app.MapGet("/onecall", async (IWeatherInterface weatherService, string lat, string lon, string lang, string units ) => {
            try
            {
              return await weatherService.GetWeatherConditions(lat, lon, lang, units);
            }
            catch (System.Exception exception)
            {
                Console.WriteLine(exception);
                throw;
            }
        });

    }


}