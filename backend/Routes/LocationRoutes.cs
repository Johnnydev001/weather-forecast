public static class LocationRoutes  {

    public static void mapLocationRoutes(this WebApplication app, IConfiguration configuration){

        string locationApiBaseUrl = configuration["LocationApiUrl"] ?? "Failed to get the location API base url";
        string locationApiKey = configuration["LocationApiKey"] ?? "Failed to get the location API key";


        app.MapGet("/location", async (string lat = "", string lon = "") => {

            try
            {
                return await LocationService.GetLocationByLatAndLon(lat, lon, locationApiBaseUrl, locationApiKey);
            }
            catch (Exception exception)
            {
                
                throw new Exception("Failed to fetch the location data from the location service due to: ", exception);
            }


        });


    }

}