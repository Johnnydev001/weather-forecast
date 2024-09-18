public interface LocationInterface {
    abstract static Task<List<LocationModel>?> GetLocationByLocationQuery(string query, string locationApiBaseUrl, string locationApiKey);
}