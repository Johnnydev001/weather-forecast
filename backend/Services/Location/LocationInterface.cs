public interface LocationInterface {
    abstract static Task<List<LocationModel>?> GetLocationByLocationQuery(string query, string locationApiBaseUrl, string locationApiKey);
    abstract static Task<LocationModel?> GetLocationByLocationCoordinates(double lat, double lon, string locationApiBaseUrl, string locationApiKey);
}