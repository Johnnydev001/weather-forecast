public class WeatherService : WeatherInterface
{

    private static readonly HttpClient httpClient = new();

    public static async Task<CurrentWeatherModel?> GetCurrentWeather(string lat, string lon, string? lang, string? units, string? weatherApiKey = "", string? currentWeatherApiUrl = "")
    {
        try
        {
            var response = await httpClient.GetAsync($"{currentWeatherApiUrl}?lat={lat}&lon={lon}&lang={lang}&units={units}&appid={weatherApiKey}&exclude=minutely,hourly,alerts");

            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadFromJsonAsync<CurrentWeatherModel>();

            }
            return null;

        }
        catch (System.Exception exception)
        {
        
            throw new Exception("Failed to fetch the weather data from the API due to: ", exception);
        }
    }
}