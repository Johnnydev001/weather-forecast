
using System.Text.Json.Serialization;

public class WeatherService : WeatherInterface
{

    private static readonly HttpClient httpClient = new();

    public static async Task<CurrentWeatherModel?> GetCurrentWeather(string lat, string lon, string? lang, string? units, string? weatherApiKey = "", string? currentWeatherApiUrl = "")
    {
        try
        {
            var response = await httpClient.GetAsync($"{currentWeatherApiUrl}?lat={lat}&lon={lon}&lang={lang}&units={units}&appid={weatherApiKey}");

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

      public static async Task<ForecastWeatherModel?> GetForecastWeather(string lat, string lon, string? lang, string? units, string? weatherApiKey = "", string? forecastWeatherApiUrl = "", int cnt = 5)
    {
        try
        {
            var response = await httpClient.GetAsync($"{forecastWeatherApiUrl}?lat={lat}&lon={lon}&lang={lang}&units={units}&appid={weatherApiKey}&cnt={cnt}");

            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadFromJsonAsync<ForecastWeatherModel>();

            }
            return null;

        }
        catch (System.Exception exception)
        {
        
            throw new Exception("Failed to fetch the weather data from the API due to: ", exception);
        }
    }
}