public static class LocationRoutes
{

    public static void mapLocationRoutes(this WebApplication app, IConfiguration configuration)
    {

        string locationAutocompleteApiBaseUrl = configuration["LocationAutocompleteApiUrl"] ?? "Failed to get the location autocomplete API base url";
        string locationReverseApiBaseUrl = configuration["LocationReverseApiUrl"] ?? "Failed to get the location reverse API base url";
        string locationApiKey = configuration["LocationApiKey"] ?? "Failed to get the location API key";

        app.MapGet("/location-by-query", async (string query = "") =>
        {

            try
            {
                return await LocationService.GetLocationByLocationQuery(query, locationAutocompleteApiBaseUrl, locationApiKey);

            }
            catch (Exception exception)
            {

                throw new Exception("Failed to fetch the location data by query from the location service due to: ", exception);
            }
        });

        app.MapGet("/location-by-coordinates", async (string lat = "", string lon = "") =>
        {

            try
            {
                double parsedLat = double.Parse(lat, System.Globalization.CultureInfo.InvariantCulture);
                double parsedLon = double.Parse(lon, System.Globalization.CultureInfo.InvariantCulture);

                return await LocationService.GetLocationByLocationCoordinates(parsedLat, parsedLon, locationReverseApiBaseUrl, locationApiKey);

            }
            catch (Exception exception)
            {

                throw new Exception("Failed to fetch the location data by coordinates from the location service due to: ", exception);
            }


        });


    }

}