public interface LocationInterface {
    abstract static Task<LocationModel?> GetLocationByLatAndLon(string lat, string lon, string locationApiBaseUrl, string locationApiKey);
}