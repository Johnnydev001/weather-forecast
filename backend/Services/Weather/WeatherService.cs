
using System.Text.Json.Serialization;

public class WeatherService : WeatherInterface
{

    private static readonly HttpClient httpClient = new();

    public static async Task<WeatherModel?> GetOneCallWeatherConditions(string lat, string lon, string? lang, string? units, string? weatherApiKey = "", string? weatherApiUrl = "")
    {
        try
        {
            var response = await httpClient.GetAsync($"{weatherApiUrl}?lat={lat}&lon={lon}&lang={lang}&units={units}&appid={weatherApiKey}");

            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadFromJsonAsync<WeatherModel>();

            }
            return null;

        }
        catch (System.Exception exception)
        {
        
            throw new Exception("Failed to fetch the weather data from the API due to: ", exception);
        }
    }
}